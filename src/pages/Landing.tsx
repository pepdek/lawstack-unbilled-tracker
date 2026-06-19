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

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#115E59', minHeight: '100vh' }}>
      <NavBar />

      {/* Hero */}
      <section style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '96px 24px 80px',
        textAlign: 'center',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#14B8A6',
          marginBottom: 24,
        }}>
          The average solo attorney leaves $2,100 in unbilled work on the table every month.
        </p>

        <h1 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#FFFFFF',
          margin: '0 0 24px',
        }}>
          You're leaving money in Clio every week. We show you exactly how much.
        </h1>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 18,
          color: '#99F6E4',
          lineHeight: 1.65,
          margin: '0 0 40px',
        }}>
          Unbilled Time Tracker connects to your Clio account and sends you one email every Sunday: every uninvoiced time entry from the past 30 days and the dollar value you haven't captured. $49/month. 14-day free trial.
        </p>

        <button
          onClick={() => navigate('/subscribe')}
          style={{
            background: '#A3E635',
            color: '#1A1A1A',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            padding: '14px 32px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            transition: 'background 150ms ease, transform 150ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#8FCF1E';
            e.currentTarget.style.transform = 'scale(1.01)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#A3E635';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Get your first email free
        </button>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: 'rgba(153,246,228,0.50)',
          marginTop: 12,
        }}>
          14-day free trial. No credit card until day 15. Works with your existing Clio account.
        </p>
      </section>

      {/* How it works */}
      <section style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '0 24px 96px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          textAlign: 'center',
        }}>
          {[
            { num: '01', title: 'Connect Clio',    body: 'One OAuth button. 90 seconds.' },
            { num: '02', title: 'We find the gaps', body: "We scan every time entry you haven't invoiced in the last 30 days." },
            { num: '03', title: 'Sunday evening',   body: 'Your unbilled summary arrives at 6pm. You invoice Monday morning.' },
          ].map(({ num, title, body }) => (
            <div key={num}>
              <span style={{
                display: 'block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#14B8A6',
                marginBottom: 8,
              }}>{num}</span>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: 8,
              }}>{title}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#99F6E4',
                lineHeight: 1.65,
              }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Email preview */}
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          color: '#14B8A6',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 16,
        }}>
          What your email looks like
        </p>
        <div style={{ background: '#0F3D39', border: '1px solid rgba(153,246,228,0.15)', borderRadius: 8, padding: '28px 32px' }}>
          <pre style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: '#99F6E4',
            lineHeight: 1.8,
            whiteSpace: 'pre',
            margin: 0,
            overflowX: 'auto',
          }}>
            {EMAIL_PREVIEW}
          </pre>
        </div>
      </section>

      {/* Privacy note */}
      <section style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: '48px 24px 0',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: 'rgba(153,246,228,0.50)',
          lineHeight: 1.7,
        }}>
          Unbilled Time Tracker reads your Clio time entries and matter names only. We never access client communications, case facts, or confidential matter content. Read-only access, always.
        </p>
      </section>

      <CrossSellStrip toApp="deadline-reminder" />
      <AppFooter currentApp="unbilled-time-tracker" />
    </div>
  );
}
