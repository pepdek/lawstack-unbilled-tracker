import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const email    = body.email    ?? null;   // optional — Stripe collects it if absent
    const app_name = body.app_name ?? "unbilled-time-tracker";

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const priceId         = Deno.env.get("STRIPE_PRICE_ID");
    const appUrl          = Deno.env.get("UNBILLED_APP_URL") ?? "https://unbilled.lawstack.co";

    if (!stripeSecretKey || !priceId) {
      console.error("Missing Stripe env vars — STRIPE_SECRET_KEY:", !!stripeSecretKey, "STRIPE_PRICE_ID:", !!priceId);
      return new Response(
        JSON.stringify({ error: "Stripe not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate a pending session ID to thread through the OAuth flow
    const pendingId = crypto.randomUUID();

    const params: Record<string, string> = {
      "mode": "subscription",
      "payment_method_types[0]": "card",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      "subscription_data[trial_period_days]": "14",
      "client_reference_id": pendingId,
      "success_url": `${appUrl}/connect?pending_id=${pendingId}&session_id={CHECKOUT_SESSION_ID}`,
      "cancel_url": `${appUrl}/subscribe`,
      "metadata[pending_id]": pendingId,
      "metadata[app_name]": app_name,
    };

    if (email) {
      params["customer_email"] = email;
    }

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(params),
    });

    const session = await response.json();

    if (!response.ok) {
      console.error("Stripe API error:", JSON.stringify(session));
      return new Response(
        JSON.stringify({ error: session.error?.message ?? "Stripe session failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Checkout session created: ${session.id} pending_id: ${pendingId}`);

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "unexpected error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
