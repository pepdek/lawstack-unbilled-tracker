export async function redirectToCheckout(firmId: string, email: string): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firm_id: firmId, email }),
    }
  );
  const { url } = await response.json();
  window.location.href = url;
}
