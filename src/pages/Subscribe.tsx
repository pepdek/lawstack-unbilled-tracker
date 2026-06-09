import { useState } from 'react';
import { Check } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function Subscribe() {
  const [searchParams] = useSearchParams();
  const firmId = searchParams.get('firm_id') ?? '';
  const email  = searchParams.get('email')   ?? '';

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
          body: JSON.stringify({ firm_id: firmId, email }),
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        maxWidth: 420,
        width: '100%',
        background: 'var(--color-white)',
        border: '1px solid var(--color-gray-100)',
        borderRadius: 8,
        padding: 40,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'IBM Plex Serif', serif",
          fontSize: 18,
          color: 'var(--color-navy)',
          marginBottom: 32,
        }}>
          LawStack
        </div>

        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'var(--color-green-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}>
          <Check size={48} color="var(--color-green)" strokeWidth={2} />
        </div>

        <h2 style={{
          fontSize: 24,
          color: 'var(--color-navy)',
          margin: '16px 0 0',
        }}>
          Clio connected. Here's what happens next.
        </h2>

        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 15,
          color: 'var(--color-gray-500)',
          lineHeight: 1.6,
          marginTop: 12,
        }}>
          Every Sunday at 6pm, we'll scan your Clio account and send you one email: every time entry you haven't invoiced and the dollar value sitting uncaptured. Start your trial and your first report arrives this Sunday.
        </p>

        <div style={{ marginTop: 24, marginBottom: 8 }}>
          <span style={{
            fontFamily: "'IBM Plex Serif', serif",
            fontSize: 36,
            color: 'var(--color-navy)',
          }}>$49</span>
          <span style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 16,
            color: 'var(--color-gray-500)',
          }}>/month</span>
          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13,
            color: 'var(--color-gray-500)',
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
            background: loading ? 'var(--color-gray-300)' : 'var(--color-blue)',
            color: 'var(--color-white)',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            padding: '14px 28px',
            borderRadius: 6,
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: 24,
            transition: 'background 150ms',
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--color-blue-hover)'; }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--color-blue)'; }}
        >
          {loading ? 'Redirecting to Stripe…' : 'Start free trial →'}
        </button>

        {error && (
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13,
            color: 'var(--color-red)',
            marginTop: 12,
            lineHeight: 1.5,
          }}>
            {error} — or email <a href="mailto:hello@lawstack.co" style={{ color: 'var(--color-red)' }}>hello@lawstack.co</a>
          </p>
        )}

        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 13,
          color: 'var(--color-gray-500)',
          marginTop: 12,
        }}>
          Secure payment via Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
