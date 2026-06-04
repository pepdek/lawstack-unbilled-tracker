import { Check } from 'lucide-react';
import { getClioAuthUrl } from '../lib/clio';

export default function Connect() {
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
      }}>
        <div style={{
          textAlign: 'center',
          fontFamily: "'IBM Plex Serif', serif",
          fontSize: 18,
          color: 'var(--color-navy)',
          marginBottom: 32,
        }}>
          LawStack
        </div>

        <h2 style={{
          textAlign: 'center',
          fontSize: 24,
          color: 'var(--color-navy)',
          margin: 0,
        }}>
          Connect your Clio account
        </h2>

        <p style={{
          textAlign: 'center',
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 15,
          color: 'var(--color-gray-500)',
          lineHeight: 1.6,
          marginTop: 12,
        }}>
          Unbilled Time Tracker reads your uninvoiced time entries and matter names. We never modify your data or access client matter content.
        </p>

        <div style={{ marginTop: 24, marginBottom: 32 }}>
          {[
            'Read uninvoiced time entries',
            'Read open matter names',
            'Read-only access — we never write to Clio',
          ].map((item) => (
            <div key={item} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}>
              <Check size={16} color="var(--color-green)" strokeWidth={2.5} />
              <span style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                color: 'var(--color-gray-900)',
              }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => { window.location.href = getClioAuthUrl(); }}
          style={{
            width: '100%',
            background: 'var(--color-blue)',
            color: 'var(--color-white)',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            padding: '14px 28px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            transition: 'background 150ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-blue-hover)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-blue)')}
        >
          Connect Clio →
        </button>

        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 13,
          color: 'var(--color-gray-500)',
          textAlign: 'center',
          marginTop: 16,
        }}>
          You'll be taken to Clio to authorize. Takes about 90 seconds.
        </p>
      </div>
    </div>
  );
}
