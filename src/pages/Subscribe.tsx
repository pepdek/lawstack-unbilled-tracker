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
      background: '#115E59',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        maxWidth: 420,
        width: '100%',
        background: '#0F3D39',
        border: '1px solid rgba(153,246,228,0.15)',
        borderRadius: 12,
        padding: 40,
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <AppIcon />
        </div>

        <h2 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 28,
          fontWeight: 400,
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '0 0 12px',
        }}>
          Start your free trial.
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          color: '#99F6E4',
          lineHeight: 1.65,
          margin: 0,
        }}>
          Every Sunday at 6pm, we'll scan your Clio account and send you one email: every time entry you haven't invoiced and the dollar value sitting uncaptured.
        </p>

        <div style={{ margin: '24px 0 8px' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 40,
            color: '#FFFFFF',
            lineHeight: 1,
          }}>$49</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: 'rgba(153,246,228,0.50)',
            marginLeft: 4,
          }}>/month</span>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: 'rgba(153,246,228,0.50)',
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
            background: loading ? 'rgba(153,246,228,0.15)' : '#A3E635',
            color: loading ? '#99F6E4' : '#1A1A1A',
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            padding: '14px 28px',
            borderRadius: 8,
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: 24,
            transition: 'background 150ms ease, transform 150ms ease',
          }}
          onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#8FCF1E'; e.currentTarget.style.transform = 'scale(1.01)'; } }}
          onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#A3E635'; e.currentTarget.style.transform = 'scale(1)'; } }}
        >
          {loading ? 'Redirecting to Stripe…' : 'Get your first email free'}
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
          color: 'rgba(153,246,228,0.50)',
          marginTop: 12,
        }}>
          Secure payment via Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
