import { useNavigate } from 'react-router-dom';
import { NavBar, CrossSellStrip, AppFooter } from '@/components/brand';

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

const ctaStyle: React.CSSProperties = {
  background: '#369EA1',
  borderRadius: '6px',
  padding: '13px 28px',
  color: '#0A0A09',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: '15px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 120ms ease-out',
  display: 'inline-block',
  textDecoration: 'none',
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />

      {/* Hero */}
      <div style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        {/* Orange banner */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
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
          fontWeight: 700,
          lineHeight: 1.15,
          color: '#0A0A09',
          margin: 0,
          fontFamily: "'Inter', sans-serif",
        }}>
          You're leaving money in Clio every week. We show you exactly how much.
        </h1>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          color: '#6B6B69',
          marginTop: 16,
          lineHeight: 1.6,
        }}>
          Unbilled Time Tracker connects to your Clio account and sends you one email every Sunday: every uninvoiced time entry from the past 30 days and the dollar value you haven't captured. $49/month. 14-day free trial.
        </p>

        <div style={{ marginTop: 32 }}>
          <button
            onClick={() => navigate('/subscribe')}
            style={ctaStyle}
            onMouseEnter={e => (e.currentTarget.style.background = '#2B7E81')}
            onMouseLeave={e => (e.currentTarget.style.background = '#369EA1')}
          >
            Start your free trial →
          </button>
        </div>

        <p style={{
          marginTop: 12,
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#6B6B69',
        }}>
          14-day free trial. No credit card until day 15. Works with your existing Clio account.
        </p>
      </div>

      {/* How it works */}
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '0 24px 80px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          textAlign: 'center',
        }}>
          {[
            { num: '1', title: 'Connect Clio',     body: 'One OAuth button. 90 seconds.' },
            { num: '2', title: 'We find the gaps',  body: "We scan every time entry you haven't invoiced in the last 30 days." },
            { num: '3', title: 'Sunday evening',    body: 'Your unbilled summary arrives at 6pm. You invoice Monday morning.' },
          ].map(({ num, title, body }) => (
            <div key={num}>
              <span style={{
                display: 'block',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: '#A8A8A5',
                marginBottom: 6,
              }}>{num}</span>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: '#0A0A09',
                marginBottom: 8,
              }}>{title}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#6B6B69',
                lineHeight: 1.6,
              }}>{body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Email preview */}
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          color: '#6B6B69',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 16,
        }}>
          WHAT YOUR EMAIL LOOKS LIKE
        </div>
        <div style={{ background: '#1a2332', borderRadius: 8, padding: '28px 32px' }}>
          <pre style={{
            fontFamily: "'Geist Mono', monospace",
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
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#6B6B69',
          lineHeight: 1.7,
        }}>
          Unbilled Time Tracker reads your Clio time entries and matter names only. We never access client communications, case facts, or confidential matter content. Read-only access, always.
        </p>
      </div>

      <CrossSellStrip toApp="deadline-reminder" />
      <AppFooter currentApp="unbilled-time-tracker" />
    </div>
  );
}
