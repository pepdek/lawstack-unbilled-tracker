export async function redirectToCheckout(firmId: string, email: string): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firm_id: firmId, email }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.url) {
    console.error('Checkout error:', data);
    alert('Something went wrong starting your trial. Please try again or email hello@lawstack.co.');
    return;
  }

  window.location.href = data.url;
}
