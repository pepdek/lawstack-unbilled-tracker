import { Check } from 'lucide-react';

export default function Confirmed() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        maxWidth: 420,
        width: '100%',
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
          fontFamily: "'Inter', sans-serif",
          fontSize: 24,
          fontWeight: 700,
          color: '#0A0A09',
          margin: '16px 0 0',
        }}>
          You're connected.
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          color: '#6B6B69',
          lineHeight: 1.6,
          marginTop: 12,
        }}>
          Unbilled Time Tracker is now watching your Clio account.
          Every Sunday at 6pm, you'll receive one email listing every
          uninvoiced time entry from the past 30 days — and the dollar
          value sitting uncaptured. Your first report arrives this Sunday.
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#6B6B69',
          marginTop: 20,
          lineHeight: 1.6,
        }}>
          Questions? Reply to any LawStack email or contact{' '}
          <a href="mailto:pep@lawstack.co" style={{ color: '#6B6B69' }}>
            pep@lawstack.co
          </a>
        </p>
      </div>
    </div>
  );
}
