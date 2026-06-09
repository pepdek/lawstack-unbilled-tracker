import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  const url    = new URL(req.url);
  const firmId = url.searchParams.get("firm_id");
  const token  = url.searchParams.get("token");

  if (!firmId || !token) {
    return new Response("Invalid unsubscribe link", { status: 400 });
  }

  const { data: integration, error } = await supabase
    .from("integrations")
    .select("id, firm_id, status")
    .eq("firm_id", firmId)
    .eq("tool_name", "unbilled_time_tracker")
    .single();

  if (error || !integration) {
    return new Response("Subscription not found", { status: 404 });
  }

  // Verify token matches what send-unbilled-reminder generated
  const expectedToken = btoa(integration.firm_id + integration.id);
  if (token !== expectedToken) {
    return new Response("Invalid unsubscribe token", { status: 403 });
  }

  if (integration.status === "unsubscribed") {
    return new Response(unsubscribedHtml("already"), {
      headers: { "Content-Type": "text/html" },
    });
  }

  await supabase
    .from("integrations")
    .update({ status: "unsubscribed" })
    .eq("id", integration.id);

  return new Response(unsubscribedHtml("success"), {
    headers: { "Content-Type": "text/html" },
  });
});

function unsubscribedHtml(state: "success" | "already") {
  const message = state === "success"
    ? "You've been unsubscribed from Unbilled Time Tracker emails."
    : "You were already unsubscribed.";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed — LawStack</title>
  <style>
    body { font-family: -apple-system, sans-serif; background: #fafafa;
           display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; }
    .card { background: white; border: 1px solid #e8e8f0; border-radius: 12px;
            padding: 40px 48px; max-width: 480px; text-align: center; }
    h1 { font-size: 20px; color: #0a2540; margin: 0 0 12px; }
    p  { font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0 0 24px; }
    a  { color: #9B59FF; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Unsubscribed</h1>
    <p>${message} You will not receive any further emails from Unbilled Time Tracker.</p>
    <p>Your Clio connection has not been affected. You can reinstall at any time.</p>
    <a href="https://lawstack.co">← Back to LawStack</a>
  </div>
</body>
</html>`;
}
