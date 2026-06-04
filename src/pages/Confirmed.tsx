import { Check } from 'lucide-react';

export default function Confirmed() {
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
          You're all set.
        </h2>

        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 15,
          color: 'var(--color-gray-500)',
          lineHeight: 1.6,
          marginTop: 12,
        }}>
          Your first unbilled summary will arrive this Sunday at 6pm Pacific. Every week after that, automatically.
        </p>

        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 13,
          color: 'var(--color-gray-500)',
          marginTop: 20,
          lineHeight: 1.6,
        }}>
          A receipt from Stripe is on its way to your email. Your 14-day trial starts today.
        </p>

        <hr style={{
          border: 'none',
          borderTop: '1px solid var(--color-gray-100)',
          margin: '32px 0',
        }} />

        <div>
          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--color-gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 12,
          }}>
            ALSO FROM LAWSTACK
          </div>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            color: 'var(--color-gray-900)',
            marginBottom: 8,
          }}>
            New Client Checklist — automatic task list every time you open a new matter.
          </p>
          <a
            href="https://lawstack.co/apps/new-client-checklist"
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 14,
              color: 'var(--color-blue)',
              textDecoration: 'none',
            }}
          >
            Learn more → lawstack.co/apps/new-client-checklist
          </a>
        </div>
      </div>
    </div>
  );
}
