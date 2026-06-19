// ─── Logo (Sentinel mark) ─────────────────────────────────────────────────────

export function Logo() {
  return (
    <a href="https://lawstack.co"
      style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <svg width="20" height="26" viewBox="0 0 20 26" fill="none" aria-hidden="true">
        <text x="0" y="22"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          fontSize="24"
          fill="#FFFFFF">L</text>
        <rect x="0" y="24" width="18" height="2" rx="1" fill="#14B8A6" />
      </svg>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: 15,
        color: '#FFFFFF',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>LAWSTACK</span>
    </a>
  )
}

// ─── App icon — Unbilled Time Tracker (clock) ─────────────────────────────────

export function AppIcon() {
  return (
    <div style={{
      width: 64,
      height: 64,
      borderRadius: 12,
      background: '#14B8A6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg viewBox="0 0 34 34" width="34" height="34" fill="none">
        <circle cx="17" cy="17" r="10" stroke="#fff" strokeWidth="2" fill="none"/>
        <path d="M17 10v7l4.5 2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="11" y1="8.5" x2="13" y2="10.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="23" y1="8.5" x2="21" y2="10.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

export function NavBar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: 56,
      background: '#0F3D39',
      borderBottom: '1px solid rgba(153,246,228,0.15)',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 900,
        width: '100%',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Logo />
        <a href="mailto:hello@lawstack.co"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: 'rgba(153,246,228,0.50)',
            textDecoration: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#99F6E4')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(153,246,228,0.50)')}
        >
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
      background: '#0F3D39',
      borderTop: '1px solid rgba(153,246,228,0.15)',
      paddingTop: 64,
      marginTop: 96,
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '35% 30% 30%',
          gap: 40,
          paddingBottom: 40,
        }}>
          {/* Brand */}
          <div>
            <Logo />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: 'rgba(153,246,228,0.50)',
              marginTop: 12,
              lineHeight: 1.65,
            }}>
              Practice automation for solo attorneys on Clio.
            </p>
            <a href="https://linkedin.com/company/thelawstack"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 16,
                textDecoration: 'none',
                color: 'rgba(153,246,228,0.50)',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(153,246,228,0.50)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Apps */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(153,246,228,0.50)',
              marginBottom: 16,
            }}>Apps</p>
            {apps.map(app => (
              <div key={app.slug ?? app.name} style={{ lineHeight: 2 }}>
                {app.slug ? (
                  <a href={`https://lawstack.co/apps/${app.slug}`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: app.slug === currentApp ? '#FFFFFF' : 'rgba(153,246,228,0.50)',
                      textDecoration: 'none',
                      fontWeight: app.slug === currentApp ? 500 : 400,
                    }}>
                    {app.name}
                  </a>
                ) : (
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: 'rgba(153,246,228,0.15)',
                  }}>{app.name}</span>
                )}
              </div>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(153,246,228,0.50)',
              marginBottom: 16,
            }}>Legal</p>
            {legal.map(item => (
              <div key={item.name} style={{ lineHeight: 2 }}>
                <a href={item.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: 'rgba(153,246,228,0.50)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(153,246,228,0.50)')}
                >
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(153,246,228,0.15)', margin: '0 0 24px' }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          paddingBottom: 32,
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: 'rgba(153,246,228,0.50)',
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
    cta: 'Start free →',
    href: 'https://unbilled.lawstack.co',
  },
}

export function CrossSellStrip({ toApp }: CrossSellStripProps) {
  const content = crossSellContent[toApp]
  return (
    <div style={{
      borderTop: '1px solid rgba(153,246,228,0.15)',
      padding: '40px 24px',
      textAlign: 'center',
      maxWidth: 680,
      margin: '0 auto',
    }}>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        color: 'rgba(153,246,228,0.50)',
        margin: '0 0 8px',
      }}>
        {content.text}
      </p>
      <a href={content.href}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 14,
          color: '#14B8A6',
          textDecoration: 'none',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#0D9488')}
        onMouseLeave={e => (e.currentTarget.style.color = '#14B8A6')}
      >
        {content.cta}
      </a>
    </div>
  )
}
