import { useNavigate } from 'react-router-dom';

const EMAIL_PREVIEW = `Subject: You have 6 uninvoiced entries — est. $2,340

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LawStack Unbilled Time Tracker
Week ending Jan 19, 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You have 6 uninvoiced time entries
totaling an estimated $2,340.

Smith v. Jones
  • Jan 13 — 1.5h — $375
  • Jan 15 — 2.0h — $500

Estate of Williams
  • Jan 14 — 0.8h — $200
  • Jan 16 — 1.2h — $300

Rodriguez custody
  • Jan 17 — 1.5h — $375
  • Jan 18 — 2.3h — $590

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total estimated unbilled: $2,340

Review and invoice →
https://app.clio.com/nc/#/activities
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav style={{
        background: 'var(--color-navy)',
        height: 56,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: "'IBM Plex Serif', serif",
          fontSize: 18,
          fontWeight: 500,
          color: 'var(--color-white)',
        }}>LawStack</span>
      </nav>

      {/* Hero */}
      <div style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--color-yellow)',
          background: 'var(--color-yellow-bg)',
          padding: '10px 16px',
          borderRadius: 6,
          marginBottom: 24,
          display: 'inline-block',
        }}>
          The average solo attorney leaves $2,100 in unbilled work on the table every month.
        </div>

        <h1 style={{
          fontSize: 42,
          fontWeight: 500,
          lineHeight: 1.15,
          color: 'var(--color-navy)',
          margin: 0,
        }}>
          You're leaving money in Clio every week. We show you exactly how much.
        </h1>

        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 15,
          color: 'var(--color-gray-500)',
          marginTop: 16,
          lineHeight: 1.6,
        }}>
          Unbilled Time Tracker connects to your Clio account and sends you one email every Sunday: every uninvoiced time entry from the past 30 days and the dollar value you haven't captured. $49/month. 14-day free trial.
        </p>

        <button
          onClick={() => navigate('/connect')}
          style={{
            marginTop: 32,
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
          Start your free trial →
        </button>

        <p style={{
          marginTop: 12,
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 13,
          color: 'var(--color-gray-500)',
        }}>
          14-day free trial. No credit card until day 15. Works with your existing Clio account.
        </p>
      </div>

      {/* How it works */}
      <div style={{
        maxWidth: 800,
        margin: '0 auto 0',
        padding: '0 24px 80px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          textAlign: 'center',
        }}>
          {[
            { num: '1', title: 'Connect Clio', body: 'One OAuth button. 90 seconds.' },
            { num: '2', title: 'We find the gaps', body: 'We scan every time entry you haven\'t invoiced in the last 30 days.' },
            { num: '3', title: 'Sunday evening', body: 'Your unbilled summary arrives at 6pm. You invoice Monday morning.' },
          ].map(({ num, title, body }) => (
            <div key={num}>
              <div style={{
                fontFamily: "'IBM Plex Serif', serif",
                fontSize: 28,
                color: 'var(--color-navy)',
                marginBottom: 12,
              }}>{num}</div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--color-gray-900)',
                marginBottom: 8,
              }}>{title}</div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                color: 'var(--color-gray-500)',
                lineHeight: 1.6,
              }}>{body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Email preview */}
      <div style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          color: 'var(--color-gray-500)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 16,
        }}>
          WHAT YOUR EMAIL LOOKS LIKE
        </div>
        <div style={{
          background: '#1a2332',
          borderRadius: 8,
          padding: '28px 32px',
        }}>
          <pre style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            color: '#94A3B8',
            lineHeight: 1.8,
            whiteSpace: 'pre',
            margin: 0,
            overflowX: 'auto',
          }}>
            {EMAIL_PREVIEW}
          </pre>
        </div>
      </div>

      {/* Privacy note */}
      <div style={{
        maxWidth: 560,
        margin: '48px auto 0',
        padding: '0 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 13,
          color: 'var(--color-gray-500)',
          lineHeight: 1.7,
        }}>
          Unbilled Time Tracker reads your Clio time entries and matter names only. We never access client communications, case facts, or confidential matter content. Read-only access, always.
        </p>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: 80,
        padding: 24,
        borderTop: '1px solid var(--color-gray-100)',
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 12,
        color: 'var(--color-gray-500)',
        textAlign: 'center',
      }}>
        LawStack · lawstack.co · hello@lawstack.co
      </footer>
    </div>
  );
}
