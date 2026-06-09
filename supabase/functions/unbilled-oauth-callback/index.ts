// supabase/functions/unbilled-oauth-callback/index.ts
//
// LawStack — Unbilled Time Tracker
// Clio OAuth callback — called AFTER Stripe payment
//
// Flow:
// 1. Stripe success → /connect?pending_id=X&session_id=Y
// 2. /connect builds Clio OAuth URL with state = btoa({pending_id, session_id})
// 3. Clio redirects here with ?code=xxx&state=xxx
// 4. Decode state → pending_id, session_id
// 5. Exchange code for tokens, get firm info
// 6. Upsert firms + integrations (with stripe_session_id + pending_id)
// 7. Upsert unbilled_tracker_config
// 8. Send welcome email (best-effort, non-blocking)
// 9. Redirect to /confirmed?firm_id=xxx

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CLIO_TOKEN_URL  = 'https://app.clio.com/oauth/token';
const CLIO_API_BASE   = 'https://app.clio.com/api/v4';
const RESEND_API_KEY  = Deno.env.get('RESEND_API_KEY')!;

// ── Welcome email ──────────────────────────────────────────────────────────

function buildWelcomeEmail(params: {
  firstName: string;
  openMatterCount: number;
  unbilledEntryCount: number;
  unbilledValueEstimate: number;
  firmId: string;
}): string {
  const { firstName, openMatterCount, unbilledEntryCount,
          unbilledValueEstimate, firmId } = params;

  const value = unbilledValueEstimate.toLocaleString('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  });

  return [
    `Hey ${firstName},`,
    ``,
    `You just connected your Clio account to Unbilled Time Tracker.`,
    ``,
    `Here's what we found in the first 30 seconds.`,
    ``,
    `${'━'.repeat(40)}`,
    `YOUR PRACTICE RIGHT NOW`,
    `${'━'.repeat(40)}`,
    `Open matters:          ${openMatterCount}`,
    `Uninvoiced entries:    ${unbilledEntryCount}`,
    `Est. uncaptured value: ${value}`,
    `${'━'.repeat(40)}`,
    ``,
    `Every Sunday at 6pm, you'll get one email with this`,
    `list updated. That's it. You don't log in. You don't`,
    `check anything. It just arrives.`,
    ``,
    `I built this because I watched attorneys leave thousands`,
    `of dollars on the table every month not because they`,
    `were bad at their jobs — because nobody told them the`,
    `number. Now you know yours.`,
    ``,
    `If your first Sunday email surfaces something useful,`,
    `reply and tell me. I read every one.`,
    ``,
    `— Pep`,
    `Founder, LawStack`,
    `pep@lawstack.co`,
    ``,
    `${'─'.repeat(40)}`,
    `LawStack Inc. · Tacoma, WA`,
    `Unsubscribe: https://unbilled.lawstack.co/unsubscribe?firm_id=${firmId}`,
  ].join('\n');
}

// ── Main handler ───────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  const url    = new URL(req.url);
  const code   = url.searchParams.get('code');
  const error  = url.searchParams.get('error');
  const state  = url.searchParams.get('state');
  const appUrl = Deno.env.get('UNBILLED_APP_URL') ?? 'https://unbilled.lawstack.co';

  if (error || !code) {
    console.error('Clio OAuth error:', error ?? 'no code');
    return Response.redirect(`${appUrl}/connect?error=auth_failed`, 302);
  }

  // Decode state → pending_id + session_id
  let pendingId  = '';
  let sessionId  = '';
  if (state) {
    try {
      const decoded = JSON.parse(atob(state));
      pendingId = decoded.pending_id  ?? '';
      sessionId = decoded.session_id  ?? '';
    } catch {
      console.warn('Failed to decode state param:', state);
    }
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    // 1. Exchange code for tokens
    const tokenRes = await fetch(CLIO_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id:     Deno.env.get('UNBILLED_CLIO_CLIENT_ID')!,
        client_secret: Deno.env.get('UNBILLED_CLIO_CLIENT_SECRET')!,
        grant_type:    'authorization_code',
        code,
        redirect_uri:  Deno.env.get('UNBILLED_CLIO_REDIRECT_URI')!,
      }),
    });

    if (!tokenRes.ok) {
      console.error('Token exchange failed:', await tokenRes.text());
      return Response.redirect(`${appUrl}/connect?error=token_failed`, 302);
    }

    const { access_token, refresh_token, expires_in } = await tokenRes.json();
    const tokenExpiresAt = new Date(Date.now() + (expires_in ?? 3600) * 1000).toISOString();

    // 2. Get Clio user info (rate added for welcome email)
    const whoRes = await fetch(
      `${CLIO_API_BASE}/users/who_am_i.json?fields=id,email,name,rate`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!whoRes.ok) {
      console.error('who_am_i failed:', await whoRes.text());
      return Response.redirect(`${appUrl}/connect?error=clio_api_failed`, 302);
    }

    const { data: clioUser } = await whoRes.json();
    const recipientEmail: string = clioUser.email;
    const clioUserId: string     = String(clioUser.id);

    // 3. Get firm/account info (best effort)
    let clioFirmId: string   = clioUserId;
    let clioFirmName: string = clioUser.name;

    const accountsRes = await fetch(
      `${CLIO_API_BASE}/accounts.json?fields=id,name`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (accountsRes.ok) {
      const accounts = await accountsRes.json();
      if (accounts.data?.length > 0) {
        clioFirmId   = String(accounts.data[0].id);
        clioFirmName = accounts.data[0].name;
      }
    }

    // 4. Check if this Clio firm already has a record
    const { data: existingInt } = await supabase
      .from('integrations')
      .select('firm_id')
      .eq('clio_firm_id', clioFirmId)
      .eq('tool_name', 'unbilled_time_tracker')
      .maybeSingle();

    let firmId: string;

    if (existingInt) {
      firmId = existingInt.firm_id;
      await supabase.from('firms').update({
        name: clioFirmName,
        clio_connected: true,
        clio_connected_at: new Date().toISOString(),
      }).eq('id', firmId);
    } else {
      const { data: newFirm, error: firmErr } = await supabase
        .from('firms')
        .insert({
          name: clioFirmName,
          clio_connected: true,
          clio_connected_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (firmErr || !newFirm) {
        console.error('Failed to create firm:', firmErr);
        return Response.redirect(`${appUrl}/connect?error=db_failed`, 302);
      }
      firmId = newFirm.id;
    }

    // 5. Upsert integration record (include Stripe identifiers)
    const { error: intErr } = await supabase.from('integrations').upsert({
      firm_id:           firmId,
      tool_name:         'unbilled_time_tracker',
      status:            'active',
      access_token,
      refresh_token,
      token_expires_at:  tokenExpiresAt,
      clio_firm_id:      clioFirmId,
      clio_firm_name:    clioFirmName,
      clio_user_id:      clioUserId,
      clio_user_email:   recipientEmail,
      connected_at:      new Date().toISOString(),
      stripe_session_id: sessionId  || null,
      pending_id:        pendingId  || null,
    }, { onConflict: 'firm_id,tool_name' });

    if (intErr) {
      console.error('Integration upsert failed:', intErr);
      return Response.redirect(`${appUrl}/connect?error=db_failed`, 302);
    }

    // 6. Upsert unbilled tracker config
    const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    const { error: configErr } = await supabase.from('unbilled_tracker_config').upsert({
      firm_id:             firmId,
      recipient_email:     recipientEmail,
      subscription_status: 'trialing',
      trial_ends_at:       trialEndsAt,
      subscribed:          true,
    }, { onConflict: 'firm_id' });

    if (configErr) {
      console.error('Config upsert failed:', configErr);
      return Response.redirect(`${appUrl}/connect?error=db_failed`, 302);
    }

    // 7. Send welcome email — best-effort, non-blocking
    try {
      const attorneyRate  = clioUser.rate ?? 250;
      const firstName     = (clioUser.name as string).split(' ')[0];

      // Unbilled time entries (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const since = thirtyDaysAgo.toISOString().split('T')[0];

      const entriesQs = new URLSearchParams({
        type:     'TimeEntry',
        billed:   'false',
        date_min: since,
        fields:   'quantity_in_hours,activity_description{rate}',
        limit:    '200',
      });
      const entriesRes = await fetch(
        `${CLIO_API_BASE}/activities.json?${entriesQs}`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      const entriesData  = entriesRes.ok ? await entriesRes.json() : { data: [] };
      const entries      = entriesData.data ?? [];
      const unbilledCount = entries.length;
      const unbilledValue = entries.reduce((sum: number, e: any) => {
        const hours = e.quantity_in_hours ?? 0;
        const rate  = e.activity_description?.rate ?? attorneyRate;
        return sum + Math.round(hours * rate);
      }, 0);

      // Open matters count — request 1 record, read total from meta
      const mattersRes = await fetch(
        `${CLIO_API_BASE}/matters.json?status=open&fields=id&limit=1`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      const mattersData   = mattersRes.ok ? await mattersRes.json() : {};
      const openMatters   = mattersData.meta?.pager?.total_entries ?? 0;

      // Build and send welcome email
      const emailBody = buildWelcomeEmail({
        firstName,
        openMatterCount:       openMatters,
        unbilledEntryCount:    unbilledCount,
        unbilledValueEstimate: unbilledValue,
        firmId,
      });

      const sendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization:  `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:    'Pep at LawStack <pep@lawstack.co>',
          to:      [recipientEmail],
          subject: `${firstName}, here's what's sitting unbilled in your Clio account`,
          text:    emailBody,
        }),
      });

      if (!sendRes.ok) {
        console.error('Welcome email send failed:', await sendRes.text());
      } else {
        // Log to digest_log
        await supabase.from('digest_log').insert({
          firm_id:         firmId,
          app_id:          'unbilled-welcome',
          sent_at:         new Date().toISOString(),
          items_count:     unbilledCount,
          recipient_email: recipientEmail,
          status:          'sent',
        });
        console.log(`Welcome email sent: firm=${firmId} entries=${unbilledCount} value=${unbilledValue}`);
      }
    } catch (welcomeErr: unknown) {
      // Non-blocking — log and continue to redirect
      const msg = welcomeErr instanceof Error ? welcomeErr.message : String(welcomeErr);
      console.error('Welcome email error (non-fatal):', msg);
    }

    console.log(`Connected: firm=${firmId} (${clioFirmName}) email=${recipientEmail} pending=${pendingId} stripe=${sessionId}`);
    return Response.redirect(`${appUrl}/confirmed?firm_id=${firmId}`, 302);

  } catch (err) {
    console.error('OAuth callback error:', err);
    return Response.redirect(`${appUrl}/connect?error=unexpected`, 302);
  }
});
