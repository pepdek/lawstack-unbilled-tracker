// ─── Eye marks ───────────────────────────────────────────────────────────────

const EyeMark = () => (
  <svg viewBox="0 0 32 20" width="38" height="24"
    style={{ flexShrink: 0 }} aria-hidden="true">
    <defs>
      <linearGradient id="ls-nav-g"
        x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#1E3A5F" />
        <stop offset="55%"  stopColor="#3730A3" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
    </defs>
    <ellipse cx="16" cy="10" rx="15" ry="8.5"
      fill="url(#ls-nav-g)" />
    <circle cx="14.5" cy="10" r="5.2"
      fill="#0F1B2D" />
    <circle cx="14.5" cy="10" r="3.2"
      fill="url(#ls-nav-g)" />
    <circle cx="16" cy="8.8" r="1.1"
      fill="rgba(255,255,255,0.55)" />
  </svg>
)

const EyeMarkFooter = () => (
  <svg viewBox="0 0 32 20" width="38" height="24"
    style={{ flexShrink: 0 }} aria-hidden="true">
    <defs>
      <linearGradient id="ls-ft-g"
        x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#1E3A5F" />
        <stop offset="55%"  stopColor="#3730A3" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
    </defs>
    <ellipse cx="16" cy="10" rx="15" ry="8.5"
      fill="url(#ls-ft-g)" />
    <circle cx="14.5" cy="10" r="5.2"
      fill="#0F1B2D" />
    <circle cx="14.5" cy="10" r="3.2"
      fill="url(#ls-ft-g)" />
    <circle cx="16" cy="8.8" r="1.1"
      fill="rgba(255,255,255,0.55)" />
  </svg>
)

// ─── NavBar ───────────────────────────────────────────────────────────────────

export function NavBar() {
  return (
    <nav style={{
      background: '#0F1B2D',
      padding: '14px 0',
      width: '100%',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a href="https://lawstack.co"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}>
          <EyeMark />
          <span style={{
            fontFamily: "'Space Grotesk', 'IBM Plex Sans', sans-serif",
            fontWeight: 700,
            fontSize: '20px',
            color: 'white',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}>LawStack</span>
        </a>
        <a href="mailto:hello@lawstack.co"
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '13px',
            color: '#9CA3AF',
            textDecoration: 'none',
          }}>
          hello@lawstack.co
        </a>
      </div>
    </nav>
  )
}

// ─── AppFooter ────────────────────────────────────────────────────────────────

interface AppFooterProps {
  currentApp: string
}

const apps = [
  { name: 'Deadline Reminder',      slug: 'deadline-reminder' },
  { name: 'Unbilled Time Tracker',  slug: 'unbilled-time-tracker' },
  { name: 'New Client Checklist',   slug: null },
  { name: 'Matter Close Checklist', slug: null },
  { name: 'Invoice Reminder',       slug: null },
  { name: 'Client Review Request',  slug: null },
  { name: 'Trust Account Alert',    slug: null },
]

const legal = [
  { name: 'Terms of Service', href: 'https://lawstack.co/legal/terms' },
  { name: 'Privacy Policy',   href: 'https://lawstack.co/legal/privacy' },
  { name: 'Data & Security',  href: 'https://lawstack.co/legal/data' },
  { name: 'Cookie Policy',    href: 'https://lawstack.co/legal/cookies' },
  { name: 'Support',          href: 'https://lawstack.co/support' },
]

export function AppFooter({ currentApp }: AppFooterProps) {
  return (
    <footer style={{
      background: '#0F1B2D',
      paddingTop: '64px',
      marginTop: '80px',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 40px',
      }}>

        {/* Three columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '35% 30% 30%',
          gap: '40px',
          paddingBottom: '40px',
        }}>

          {/* Brand column */}
          <div>
            <a href="https://lawstack.co"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
              }}>
              <EyeMarkFooter />
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '20px',
                color: 'white',
                letterSpacing: '-0.04em',
              }}>LawStack</span>
            </a>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '13px',
              color: '#6B7280',
              marginTop: '12px',
              lineHeight: 1.6,
            }}>
              Practice automation for solo attorneys on Clio.
            </p>
            <a href="https://linkedin.com/company/thelawstack"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '16px',
                textDecoration: 'none',
                color: '#6B7280',
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '13px',
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Apps column */}
          <div>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#4B5563',
              marginBottom: '16px',
              marginTop: 0,
            }}>Apps</p>
            {apps.map(app => (
              <div key={app.slug ?? app.name} style={{ lineHeight: 2 }}>
                {app.slug ? (
                  <a
                    href={`https://lawstack.co/apps/${app.slug}`}
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '13px',
                      color: app.slug === currentApp ? 'white' : '#9CA3AF',
                      textDecoration: 'none',
                      fontWeight: app.slug === currentApp ? 500 : 400,
                    }}>
                    {app.name}
                  </a>
                ) : (
                  <span style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '13px',
                    color: '#4B5563',
                    cursor: 'default',
                  }}>
                    {app.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Legal column */}
          <div>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#4B5563',
              marginBottom: '16px',
              marginTop: 0,
            }}>Legal</p>
            {legal.map(item => (
              <div key={item.name} style={{ lineHeight: 2 }}>
                <a href={item.href}
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: '13px',
                    color: '#9CA3AF',
                    textDecoration: 'none',
                  }}>
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #1F2937', margin: '0 0 24px' }} />

        {/* Legal line */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '32px',
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '12px',
          color: '#4B5563',
        }}>
          <span>© 2026 LawStack Inc. All rights reserved.</span>
          <span>LawStack is not a law firm and does not provide legal advice.</span>
        </div>

      </div>
    </footer>
  )
}

// ─── CrossSellStrip ───────────────────────────────────────────────────────────

interface CrossSellStripProps {
  toApp: 'deadline-reminder' | 'unbilled-time-tracker'
}

const crossSellContent = {
  'deadline-reminder': {
    text: "Also from LawStack: Deadline Reminder — every deadline across your open Clio matters, every Monday morning.",
    cta: 'Install free →',
    href: 'https://deadline.lawstack.co',
  },
  'unbilled-time-tracker': {
    text: "Also from LawStack: Unbilled Time Tracker — see exactly what you haven't invoiced this week.",
    cta: 'Start free trial →',
    href: 'https://unbilled.lawstack.co',
  },
}

export function CrossSellStrip({ toApp }: CrossSellStripProps) {
  const content = crossSellContent[toApp]
  return (
    <div style={{
      borderTop: '1px solid #E5E7EB',
      padding: '40px 0',
      textAlign: 'center',
      maxWidth: '680px',
      margin: '0 auto',
    }}>
      <p style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: '14px',
        color: '#6B7280',
        margin: '0 0 8px',
      }}>
        {content.text}
      </p>
      <a href={content.href}
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 500,
          fontSize: '14px',
          color: '#3730A3',
          textDecoration: 'none',
        }}>
        {content.cta}
      </a>
    </div>
  )
}
