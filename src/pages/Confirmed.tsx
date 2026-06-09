import { Check } from 'lucide-react';

export default function Confirmed() {
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
          fontSize: 24,
          color: 'var(--color-navy)',
          margin: '16px 0 0',
        }}>
          You're connected.
        </h2>

        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 15,
          color: 'var(--color-gray-500)',
          lineHeight: 1.6,
          marginTop: 12,
        }}>
          Unbilled Time Tracker is now watching your Clio account.
          Every Sunday at 6pm, you'll receive one email listing every
          uninvoiced time entry from the past 30 days — and the dollar
          value sitting uncaptured. Your first report arrives this Sunday.
        </p>

        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 13,
          color: 'var(--color-gray-500)',
          marginTop: 20,
          lineHeight: 1.6,
        }}>
          Questions? Reply to any LawStack email or contact{' '}
          <a href="mailto:pep@lawstack.co" style={{ color: 'var(--color-gray-500)' }}>
            pep@lawstack.co
          </a>
        </p>
      </div>
    </div>
  );
}
