import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getClioAuthUrl } from '../lib/clio';

export default function Connect() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const pendingId = searchParams.get('pending_id') ?? '';
    const sessionId = searchParams.get('session_id') ?? '';

    if (pendingId) sessionStorage.setItem('ls_pending_id', pendingId);
    if (sessionId) sessionStorage.setItem('ls_stripe_session', sessionId);

    const state = btoa(JSON.stringify({ pending_id: pendingId, session_id: sessionId }));
    const clioUrl = getClioAuthUrl(state);

    // Small delay so the user sees the message before the redirect
    const timer = setTimeout(() => {
      window.location.href = clioUrl;
    }, 800);

    return () => clearTimeout(timer);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

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
          fontFamily: "'IBM Plex Serif', serif",
          fontSize: 18,
          color: 'var(--color-navy)',
          marginBottom: 32,
        }}>
          LawStack
        </div>

        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '3px solid var(--color-blue)',
          borderTopColor: 'transparent',
          margin: '0 auto 24px',
          animation: 'spin 0.8s linear infinite',
        }} />

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>

        <h2 style={{
          fontSize: 20,
          color: 'var(--color-navy)',
          margin: '0 0 12px',
        }}>
          Payment confirmed.
        </h2>

        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 15,
          color: 'var(--color-gray-500)',
          lineHeight: 1.6,
          margin: 0,
        }}>
          Connecting your Clio account…
        </p>
      </div>
    </div>
  );
}
