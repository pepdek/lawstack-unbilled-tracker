import { useState } from 'react';
import { AppIcon } from '@/components/brand';

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleStartTrial = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ app_name: 'unbilled-time-tracker' }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to create checkout session');
      window.location.href = data.url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        maxWidth: 420,
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <AppIcon />
        </div>

        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 24,
          fontWeight: 700,
          color: '#0A0A09',
          margin: '0 0 12px',
        }}>
          Start your free trial.
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          color: '#6B6B69',
          lineHeight: 1.6,
          marginTop: 0,
        }}>
          Every Sunday at 6pm, we'll scan your Clio account and send you one email: every time entry you haven't invoiced and the dollar value sitting uncaptured.
        </p>

        <div style={{ marginTop: 24, marginBottom: 8 }}>
          <span style={{
            fontFamily: "'Geist Mono', monospace",
            fontWeight: 600,
            fontSize: 36,
            color: '#0A0A09',
          }}>$49</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: '#6B6B69',
          }}>/month</span>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: '#6B6B69',
            marginTop: 4,
          }}>
            14-day free trial — no charge until day 15
          </div>
        </div>

        <button
          onClick={handleStartTrial}
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#A8A8A5' : '#369EA1',
            color: '#0A0A09',
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            padding: '13px 28px',
            borderRadius: 6,
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: 24,
            transition: 'background 120ms ease-out',
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#2B7E81'; }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#369EA1'; }}
        >
          {loading ? 'Redirecting to Stripe…' : 'Start free trial →'}
        </button>

        {error && (
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: 'var(--color-red)',
            marginTop: 12,
            lineHeight: 1.5,
          }}>
            {error} — or email <a href="mailto:hello@lawstack.co" style={{ color: 'var(--color-red)' }}>hello@lawstack.co</a>
          </p>
        )}

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#6B6B69',
          marginTop: 12,
        }}>
          Secure payment via Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
