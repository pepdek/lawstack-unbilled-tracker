import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY            = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL              = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CLIO_CLIENT_ID            = Deno.env.get("UNBILLED_CLIO_CLIENT_ID")!;
const CLIO_CLIENT_SECRET        = Deno.env.get("UNBILLED_CLIO_CLIENT_SECRET")!;
// NOTE: using UNBILLED_APP_URL — APP_URL points to deadline.lawstack.co
const UNBILLED_APP_URL          = Deno.env.get("UNBILLED_APP_URL") ?? "https://unbilled.lawstack.co";

// ── Token refresh ──────────────────────────────────────────────────────────

async function refreshClioToken(integration: any, supabase: any) {
  const response = await fetch("https://app.clio.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "refresh_token",
      refresh_token: integration.refresh_token,
      client_id:     CLIO_CLIENT_ID,
      client_secret: CLIO_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Token refresh failed for firm ${integration.firm_id}: ${err}`);
  }

  const tokens = await response.json();
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

  const { error } = await supabase
    .from("integrations")
    .update({
      access_token:     tokens.access_token,
      refresh_token:    tokens.refresh_token ?? integration.refresh_token,
      token_expires_at: expiresAt,
    })
    .eq("id", integration.id);

  if (error) throw new Error(`Failed to update token: ${error.message}`);

  return tokens.access_token;
}

async function getValidToken(integration: any, supabase: any) {
  const expiresAt  = new Date(integration.token_expires_at).getTime();
  const fiveMinutes = 5 * 60 * 1000;

  if (Date.now() < expiresAt - fiveMinutes) {
    return integration.access_token;
  }

  console.log(`Refreshing token for firm ${integration.firm_id}`);
  return await refreshClioToken(integration, supabase);
}

// ── Clio API helpers ───────────────────────────────────────────────────────

async function clioGet(path: string, token: string) {
  const response = await fetch(`https://app.clio.com/api/v4${path}`, {
    headers: {
      Authorization:  `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Clio API error ${response.status} at ${path}: ${err}`);
  }

  return response.json();
}

async function getUnbilledEntries(token: string) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const since = thirtyDaysAgo.toISOString().split("T")[0];

  // Clio v4 time entries are accessed via /activities.json (type=TimeEntry)
  // URLSearchParams percent-encodes { } in the fields selector
  // In Clio v4, rate is nested under activity_description, not a top-level field
  const qs = new URLSearchParams({
    type:     "TimeEntry",
    billed:   "false",
    date_min: since,
    fields:   "id,quantity_in_hours,note,activity_description{rate},matter{id,display_number,description}",
    limit:    "200",
  });
  const data = await clioGet(`/activities.json?${qs}`, token);
  return data.data ?? [];
}

async function getAttorneyInfo(token: string) {
  // Clio v4 requires .json suffix
  const data = await clioGet("/users/who_am_i.json?fields=name,email,rate", token);
  return data.data;
}

// ── Email composer ─────────────────────────────────────────────────────────

function composeEmail(
  entries: any[],
  attorney: any,
  unsubscribeUrl: string,
): { subject: string; text: string } {
  const defaultRate = attorney?.rate ?? 250;
  const today      = new Date();
  const weekEnding = today.toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  if (entries.length === 0) {
    return {
      subject: "No unbilled time entries this week",
      text: [
        `LawStack Unbilled Time Tracker`,
        `Week ending ${weekEnding}`,
        `${"─".repeat(40)}`,
        ``,
        `No unbilled time entries found in the past 30 days.`,
        ``,
        `Either everything has been invoiced (well done) or`,
        `there's no recent time recorded in Clio.`,
        ``,
        `${"─".repeat(40)}`,
        `Unsubscribe: ${unsubscribeUrl}`,
        `lawstack.co`,
      ].join("\n"),
    };
  }

  // Group entries by matter
  const byMatter: Record<string, {
    name: string;
    entries: Array<{ hours: number; rate: number; note: string; value: number }>;
  }> = {};

  let totalValue = 0;

  for (const entry of entries) {
    const matterId   = entry.matter?.id ?? "no-matter";
    const matterName = entry.matter?.description
      ?? entry.matter?.display_number
      ?? "No matter assigned";

    if (!byMatter[matterId]) {
      byMatter[matterId] = { name: matterName, entries: [] };
    }

    const hours = entry.quantity_in_hours ?? 0;           // Clio v4: decimal hours
    const rate  = entry.activity_description?.rate ?? defaultRate;
    const value = Math.round(hours * rate);
    totalValue += value;

    byMatter[matterId].entries.push({
      hours,
      rate,
      note:  entry.note ?? "(no description)",
      value,
    });
  }

  const lines: string[] = [
    `LawStack Unbilled Time Tracker`,
    `Week ending ${weekEnding}`,
    `${"─".repeat(40)}`,
    ``,
    `UNBILLED TIME ENTRIES`,
    ``,
  ];

  for (const matter of Object.values(byMatter)) {
    lines.push(matter.name);
    for (const e of matter.entries) {
      const hoursStr = e.hours.toFixed(1).padStart(5);
      const noteStr  = e.note.slice(0, 50);
      const valueStr = `$${e.value.toLocaleString()}`;
      lines.push(`  ${hoursStr} hrs · ${noteStr.padEnd(52)} ${valueStr}`);
    }
    lines.push("");
  }

  const totalHours = entries.reduce(
    (sum: number, e: any) => sum + (e.quantity_in_hours ?? 0), 0
  );

  lines.push(`${"─".repeat(40)}`);
  lines.push(
    `${entries.length} ${entries.length === 1 ? "entry" : "entries"} · ` +
    `${totalHours.toFixed(1)} hrs · ` +
    `Est. value: $${totalValue.toLocaleString()}`
  );
  lines.push(``);
  lines.push(`Invoice these in Clio → https://app.clio.com`);
  lines.push(``);
  lines.push(`${"─".repeat(40)}`);
  lines.push(`Also from LawStack: Deadline Reminder — never miss a filing.`);
  lines.push(`Free forever → https://lawstack.co/apps/deadline-reminder`);
  lines.push(``);
  lines.push(`Unsubscribe: ${unsubscribeUrl}`);
  lines.push(`lawstack.co`);

  const subject = `You have ${entries.length} uninvoiced ${entries.length === 1 ? "entry" : "entries"} — est. $${totalValue.toLocaleString()}`;

  return { subject, text: lines.join("\n") };
}

// ── Send via Resend ────────────────────────────────────────────────────────

async function sendEmail(to: string, subject: string, text: string, firmId: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization:  `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:    "LawStack <reminders@lawstack.co>",
      to:      [to],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Resend failed for ${firmId}: ${err}`);
  }

  return response.json();
}

// ── Main handler ───────────────────────────────────────────────────────────

serve(async (req) => {
  // Shared secret check — CRON_SECRET must match Authorization header
  const cronSecret = Deno.env.get("CRON_SECRET");
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // NOTE: tool_name uses underscore to match what OAuth callback writes
  const { data: integrations, error } = await supabase
    .from("integrations")
    .select("*")
    .eq("tool_name", "unbilled_time_tracker")
    .eq("status", "active");

  if (error) {
    console.error("Failed to fetch integrations:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log(`Processing ${integrations?.length ?? 0} active integrations`);

  const results = {
    processed: 0,
    sent: 0,
    errors: [] as string[],
  };

  for (const integration of integrations ?? []) {
    try {
      // 1. Get valid (possibly refreshed) token
      const token = await getValidToken(integration, supabase);

      // 2. Get attorney info for default billing rate
      const attorney = await getAttorneyInfo(token);

      // 3. Get unbilled entries from last 30 days
      const entries = await getUnbilledEntries(token);

      // 4. Build unsubscribe URL — points to the edge function directly
      const unsubscribeUrl =
        `${SUPABASE_URL}/functions/v1/unsubscribe-unbilled` +
        `?firm_id=${integration.firm_id}` +
        `&token=${btoa(integration.firm_id + integration.id)}`;

      // 5. Compose email
      const { subject, text } = composeEmail(entries, attorney, unsubscribeUrl);

      // 6. Resolve recipient email
      // NOTE: integrations has clio_user_email, not email
      const emailTo = attorney?.email ?? integration.clio_user_email;
      if (!emailTo) {
        throw new Error(`No email address for firm ${integration.firm_id}`);
      }

      await sendEmail(emailTo, subject, text, integration.firm_id);

      // 7. Log to digest_log
      await supabase.from("digest_log").insert({
        firm_id:    integration.firm_id,
        app_id:     "unbilled-time-tracker",
        sent_at:    new Date().toISOString(),
        items_count: entries.length,
        status:     "sent",
      });

      results.sent++;
      console.log(`Sent to firm ${integration.firm_id}: ${entries.length} entries → ${emailTo}`);

    } catch (err: any) {
      console.error(`Error for firm ${integration.firm_id}:`, err.message);
      results.errors.push(`${integration.firm_id}: ${err.message}`);

      await supabase.from("digest_log").insert({
        firm_id:    integration.firm_id,
        app_id:     "unbilled-time-tracker",
        sent_at:    new Date().toISOString(),
        items_count: 0,
        status:     "error",
        error_message: err.message,
      });
    }

    results.processed++;
  }

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
