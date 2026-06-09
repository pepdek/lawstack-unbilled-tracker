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
    const { firm_id, email } = await req.json();

    if (!firm_id || !email) {
      return new Response(
        JSON.stringify({ error: "firm_id and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const priceId = Deno.env.get("STRIPE_PRICE_ID");
    const appUrl = Deno.env.get("APP_URL") ?? "https://unbilled.lawstack.co";

    if (!stripeSecretKey || !priceId) {
      console.error("Missing Stripe env vars — STRIPE_SECRET_KEY:", !!stripeSecretKey, "STRIPE_PRICE_ID:", !!priceId);
      return new Response(
        JSON.stringify({ error: "Stripe not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "subscription",
        "payment_method_types[0]": "card",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "subscription_data[trial_period_days]": "14",
        "customer_email": email,
        "client_reference_id": firm_id,
        "success_url": `${appUrl}/confirmed?firm_id=${firm_id}&session_id={CHECKOUT_SESSION_ID}`,
        "cancel_url": `${appUrl}/subscribe?firm_id=${firm_id}&email=${encodeURIComponent(email)}`,
        "metadata[firm_id]": firm_id,
        "metadata[app_name]": "unbilled-time-tracker",
      }),
    });

    const session = await response.json();

    if (!response.ok) {
      console.error("Stripe API error:", JSON.stringify(session));
      return new Response(
        JSON.stringify({ error: session.error?.message ?? "Stripe session failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
