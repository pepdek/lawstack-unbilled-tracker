import { Check } from 'lucide-react';

export default function Confirmed() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#115E59',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        maxWidth: 420,
        width: '100%',
        background: '#0F3D39',
        border: '1px solid rgba(153,246,228,0.15)',
        borderRadius: 12,
        padding: 40,
        textAlign: 'center',
      }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 8,
          background: 'rgba(20,184,166,0.15)',
          border: '1px solid rgba(153,246,228,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <Check size={32} color="#14B8A6" strokeWidth={2} />
        </div>

        <h2 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 28,
          fontWeight: 400,
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '0 0 16px',
        }}>
          You're connected.
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          color: '#99F6E4',
          lineHeight: 1.65,
          margin: 0,
        }}>
          Unbilled Time Tracker is now watching your Clio account.
          Every Sunday at 6pm, you'll receive one email listing every
          uninvoiced time entry from the past 30 days — and the dollar
          value sitting uncaptured. Your first report arrives this Sunday.
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: 'rgba(153,246,228,0.50)',
          marginTop: 20,
          lineHeight: 1.65,
        }}>
          Questions? Reply to any LawStack email or contact{' '}
          <a href="mailto:pep@lawstack.co"
            style={{ color: '#14B8A6' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0D9488')}
            onMouseLeave={e => (e.currentTarget.style.color = '#14B8A6')}
          >
            pep@lawstack.co
          </a>
        </p>
      </div>
    </div>
  );
}
