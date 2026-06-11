import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getClioAuthUrl } from '../lib/clio';
import { AppIcon } from '@/components/brand';

export default function Connect() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const pendingId = searchParams.get('pending_id') ?? '';
    const sessionId = searchParams.get('session_id') ?? '';

    // Guard: both params must come from Stripe's success_url.
    // Direct navigation or a manually typed URL won't have them.
    if (!pendingId || !sessionId) {
      window.location.replace('/subscribe');
      return;
    }

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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <AppIcon />
        </div>

        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '3px solid #369EA1',
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
          fontFamily: "'Inter', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: '#0A0A09',
          margin: '0 0 12px',
        }}>
          Payment confirmed.
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          color: '#6B6B69',
          lineHeight: 1.6,
          margin: 0,
        }}>
          Connecting your Clio account…
        </p>
      </div>
    </div>
  );
}
