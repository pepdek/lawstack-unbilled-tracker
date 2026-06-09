import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// ── Manual Stripe signature verification (no SDK dependency) ───────────────
// Stripe signs with HMAC-SHA256. Secret is base64-encoded after the whsec_ prefix.

async function verifyStripeSignature(
  payload: string,
  signatureHeader: string,
  secret: string
): Promise<boolean> {
  const parts: Record<string, string[]> = {};
  for (const chunk of signatureHeader.split(",")) {
    const eq = chunk.indexOf("=");
    const k = chunk.slice(0, eq);
    const v = chunk.slice(eq + 1);
    if (!parts[k]) parts[k] = [];
    parts[k].push(v);
  }

  const timestamp  = parts["t"]?.[0];
  const signatures = parts["v1"] ?? [];
  if (!timestamp || signatures.length === 0) return false;

  const signedPayload = `${timestamp}.${payload}`;

  // Decode the secret: strip whsec_ prefix then base64-decode
  const rawSecret = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  const secretBytes = Uint8Array.from(atob(rawSecret), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "raw", secretBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );

  const mac = await crypto.subtle.sign(
    "HMAC", key, new TextEncoder().encode(signedPayload)
  );

  const expected = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return signatures.includes(expected);
}

// ── Handler ────────────────────────────────────────────────────────────────

serve(async (req) => {
  const signatureHeader = req.headers.get("stripe-signature");
  if (!signatureHeader) {
    return new Response("No stripe-signature header", { status: 400 });
  }

  const body   = await req.text();
  const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

  const valid = await verifyStripeSignature(body, signatureHeader, secret);
  if (!valid) {
    console.error("Webhook signature verification failed");
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  const event = JSON.parse(body);
  console.log(`Stripe event: ${event.type}`);

  switch (event.type) {

    case "checkout.session.completed": {
      const session          = event.data.object;
      const pendingId        = session.client_reference_id ?? session.metadata?.pending_id;
      const stripeCustomerId = session.customer;
      const stripeSubId      = session.subscription;

      if (pendingId) {
        const { error } = await supabase.from("app_subscriptions").upsert({
          app_id:                 "unbilled-time-tracker",
          stripe_subscription_id: stripeSubId,
          stripe_customer_id:     stripeCustomerId,
          stripe_session_id:      session.id,
          pending_id:             pendingId,
          status:                 "trialing",
          created_at:             new Date().toISOString(),
        }, { onConflict: "stripe_session_id" });

        if (error) console.error("app_subscriptions upsert failed:", error);
        else console.log(`checkout.session.completed: pending_id=${pendingId} sub=${stripeSubId}`);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await supabase
        .from("app_subscriptions")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", sub.id);

      const { data: appSub } = await supabase
        .from("app_subscriptions")
        .select("firm_id")
        .eq("stripe_subscription_id", sub.id)
        .maybeSingle();

      if (appSub?.firm_id) {
        await supabase
          .from("integrations")
          .update({ status: "canceled" })
          .eq("firm_id", appSub.firm_id)
          .eq("tool_name", "unbilled_time_tracker");
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      await supabase
        .from("app_subscriptions")
        .update({ status: "past_due" })
        .eq("stripe_subscription_id", invoice.subscription);
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object;
      await supabase
        .from("app_subscriptions")
        .update({ status: sub.status })
        .eq("stripe_subscription_id", sub.id);
      break;
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
