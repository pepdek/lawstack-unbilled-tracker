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

/* ── Shared SVG eye mark ─────────────────────────────────────────── */
function EyeMark({ gradientId }: { gradientId: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 20"
      width="38"
      height="24"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1E3A5F" />
          <stop offset="55%"  stopColor="#3730A3" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
      <ellipse cx="16" cy="10" rx="15" ry="8.5" fill={`url(#${gradientId})`} />
      <circle  cx="14.5" cy="10" r="5.2" fill="#0F1B2D" />
      <circle  cx="14.5" cy="10" r="3.2" fill={`url(#${gradientId})`} />
      <circle  cx="16"   cy="8.8" r="1.1" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

/* ── Nav logo ────────────────────────────────────────────────────── */
function NavLogo() {
  return (
    <a
      href="https://lawstack.co"
      style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
    >
      <EyeMark gradientId="ng" />
      <span style={{
        fontFamily: "'Space Grotesk', 'IBM Plex Sans', sans-serif",
        fontWeight: 700,
        fontSize: 20,
        color: 'white',
        letterSpacing: '-0.04em',
        lineHeight: 1,
      }}>LawStack</span>
    </a>
  );
}

/* ── Full footer ─────────────────────────────────────────────────── */
function Footer() {
  const colLabel: React.CSSProperties = {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 16,
  };
  const linkBase: React.CSSProperties = {
    display: 'block',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 14,
    textDecoration: 'none',
    marginBottom: 10,
    transition: 'color 150ms',
  };

  return (
    <footer style={{ background: '#0F1B2D', padding: '64px 0 40px', marginTop: 0 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>

        {/* Three columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 48,
        }}>

          {/* Col 1 — Brand */}
          <div>
            <a
              href="https://lawstack.co"
              style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
            >
              <EyeMark gradientId="fg2" />
              <span style={{
                fontFamily: "'Space Grotesk', 'IBM Plex Sans', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: 'white',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}>LawStack</span>
            </a>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 13,
              color: '#6B7280',
              marginTop: 12,
              lineHeight: 1.6,
            }}>
              Practice automation for solo attorneys on Clio.
            </p>
            <a
              href="https://linkedin.com/company/thelawstack"
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, textDecoration: 'none', color: '#6B7280' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13 }}>LinkedIn</span>
            </a>
          </div>

          {/* Col 2 — Apps */}
          <div>
            <div style={colLabel}>Apps</div>
            <a
              href="https://lawstack.co/apps/deadline-reminder"
              style={{ ...linkBase, color: '#9CA3AF' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
            >Deadline Reminder</a>
            <a
              href="https://lawstack.co/apps/unbilled-time-tracker"
              style={{ ...linkBase, color: 'white' }}
            >Unbilled Time Tracker</a>
            {['New Client Checklist', 'Matter Close Checklist', 'Invoice Reminder', 'Client Review Request', 'Trust Account Alert'].map(name => (
              <span key={name} style={{
                ...linkBase,
                color: '#4B5563',
                cursor: 'default',
              }}>{name}</span>
            ))}
          </div>

          {/* Col 3 — Legal */}
          <div>
            <div style={colLabel}>Legal</div>
            {[
              { label: 'Terms of Service',  href: 'https://lawstack.co/legal/terms' },
              { label: 'Privacy Policy',    href: 'https://lawstack.co/legal/privacy' },
              { label: 'Data & Security',   href: 'https://lawstack.co/legal/data' },
              { label: 'Cookie Policy',     href: 'https://lawstack.co/legal/cookies' },
              { label: 'Support',           href: 'https://lawstack.co/support' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{ ...linkBase, color: '#9CA3AF' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
              >{label}</a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #1F2937', margin: '40px 0 24px' }} />

        {/* Legal line */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 12,
          color: '#4B5563',
        }}>
          <span>© 2026 LawStack Inc. All rights reserved.</span>
          <span>LawStack is not a law firm and does not provide legal advice.</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      {/* CHANGE 1 — Nav with eye mark + wordmark */}
      <nav style={{
        background: 'var(--color-navy)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <NavLogo />
      </nav>

      {/* Hero */}
      <div style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        {/* Orange banner — unchanged */}
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

        {/* CHANGE 2 — Gradient pill CTA */}
        <button
          onClick={() => navigate('/connect')}
          style={{
            marginTop: 32,
            background: 'linear-gradient(135deg, #1E3A5F 0%, #3730A3 60%, #6D28D9 100%)',
            color: 'white',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            padding: '16px 36px',
            borderRadius: 9999,
            border: 'none',
            cursor: 'pointer',
            transition: 'opacity 150ms ease',
            opacity: 1,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
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

      {/* CHANGE 3 — How it works: plain typographic numbers */}
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
            { num: '1', title: 'Connect Clio',    body: 'One OAuth button. 90 seconds.' },
            { num: '2', title: 'We find the gaps', body: "We scan every time entry you haven't invoiced in the last 30 days." },
            { num: '3', title: 'Sunday evening',   body: 'Your unbilled summary arrives at 6pm. You invoice Monday morning.' },
          ].map(({ num, title, body }) => (
            <div key={num}>
              <span style={{
                display: 'block',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 13,
                color: '#9CA3AF',
                marginBottom: 6,
              }}>{num}</span>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: '#0F1B2D',
                marginBottom: 8,
              }}>{title}</div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                color: '#6B7280',
                lineHeight: 1.6,
              }}>{body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Email preview — unchanged */}
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

      {/* Privacy note — unchanged */}
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

      {/* CHANGE 5 — Cross-sell strip */}
      <div style={{
        borderTop: '1px solid #E5E7EB',
        padding: '40px 0',
        marginTop: 48,
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 14,
          color: '#6B7280',
          maxWidth: 480,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Also from LawStack: Deadline Reminder — every deadline across your open Clio matters, every Monday morning.{' '}
          <a
            href="https://deadline.lawstack.co"
            style={{
              color: '#3730A3',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Install free →
          </a>
        </p>
      </div>

      {/* CHANGE 4 — Full LawStack footer */}
      <Footer />
    </div>
  );
}
