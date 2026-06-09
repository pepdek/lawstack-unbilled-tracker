import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@13?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature failed:", err.message);
    return new Response(`Webhook error: ${err.message}`, { status: 400 });
  }

  console.log(`Stripe event: ${event.type}`);

  switch (event.type) {

    case "checkout.session.completed": {
      const session          = event.data.object as Stripe.Checkout.Session;
      // NOTE: client_reference_id = pendingId (generated in create-checkout-session)
      // firm_id is not available until OAuth completes — link via pending_id
      const pendingId        = session.client_reference_id ?? session.metadata?.pending_id;
      const stripeCustomerId = session.customer as string;
      const stripeSubId      = session.subscription as string;

      if (pendingId) {
        // Store subscription keyed by pending_id + stripe_session_id
        // firm_id will be backfilled when OAuth callback completes
        await supabase.from("app_subscriptions").upsert({
          app_id:                  "unbilled-time-tracker",
          stripe_subscription_id:  stripeSubId,
          stripe_customer_id:      stripeCustomerId,
          stripe_session_id:       session.id,
          pending_id:              pendingId,
          status:                  "trialing",
          created_at:              new Date().toISOString(),
        }, { onConflict: "stripe_session_id" });

        console.log(`checkout.session.completed: pending_id=${pendingId} sub=${stripeSubId}`);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;

      await supabase
        .from("app_subscriptions")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", sub.id);

      // Deactivate integration so emails stop
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
      const invoice = event.data.object as Stripe.Invoice;
      const subId   = invoice.subscription as string;
      await supabase
        .from("app_subscriptions")
        .update({ status: "past_due" })
        .eq("stripe_subscription_id", subId);
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
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
