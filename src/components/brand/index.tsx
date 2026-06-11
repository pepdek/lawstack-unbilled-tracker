// ─── Sentinel mark ───────────────────────────────────────────────────────────

interface LogoProps {
  variant?: 'light' | 'dark'
}

export function Logo({ variant = 'light' }: LogoProps) {
  const wordColor = variant === 'dark' ? '#FFFFFF' : '#0A0A09'
  return (
    <a href="https://lawstack.co"
      style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      {/* L letterform */}
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden="true">
        <text
          x="0" y="22"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="24"
          fill={wordColor}
        >L</text>
        {/* teal rule */}
        <rect x="0" y="23" width="18" height="2" rx="1" fill="#369EA1" />
      </svg>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: '17px',
        color: wordColor,
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}>LAWSTACK</span>
    </a>
  )
}

// ─── App icon — Unbilled Time Tracker (clock face) ────────────────────────────

export function AppIcon() {
  return (
    <div style={{
      width: 64,
      height: 64,
      borderRadius: 14,
      background: '#369EA1',
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
      background: '#FFFFFF',
      borderBottom: '0.5px solid #E8E8E6',
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
        <Logo variant="light" />
        <a href="mailto:hello@lawstack.co"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#6B6B69',
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
      background: '#0A0A09',
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
            <Logo variant="dark" />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#6B6B69',
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
                color: '#6B6B69',
                fontFamily: "'Inter', sans-serif",
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
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#A8A8A5',
              marginBottom: '16px',
              marginTop: 0,
            }}>Apps</p>
            {apps.map(app => (
              <div key={app.slug ?? app.name} style={{ lineHeight: 2 }}>
                {app.slug ? (
                  <a
                    href={`https://lawstack.co/apps/${app.slug}`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: app.slug === currentApp ? '#FFFFFF' : '#6B6B69',
                      textDecoration: 'none',
                      fontWeight: app.slug === currentApp ? 500 : 400,
                    }}>
                    {app.name}
                  </a>
                ) : (
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#A8A8A5',
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
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#A8A8A5',
              marginBottom: '16px',
              marginTop: 0,
            }}>Legal</p>
            {legal.map(item => (
              <div key={item.name} style={{ lineHeight: 2 }}>
                <a href={item.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#6B6B69',
                    textDecoration: 'none',
                  }}>
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #1A1A18', margin: '0 0 24px' }} />

        {/* Legal line */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '32px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#A8A8A5',
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
      borderTop: '1px solid #E8E8E6',
      padding: '40px 0',
      textAlign: 'center',
      maxWidth: '680px',
      margin: '0 auto',
    }}>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: '#6B6B69',
        margin: '0 0 8px',
      }}>
        {content.text}
      </p>
      <a href={content.href}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '14px',
          color: '#369EA1',
          textDecoration: 'none',
        }}>
        {content.cta}
      </a>
    </div>
  )
}
