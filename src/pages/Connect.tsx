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
    if (!pendingId || !sessionId) {
      window.location.replace('/subscribe');
      return;
    }

    if (pendingId) sessionStorage.setItem('ls_pending_id', pendingId);
    if (sessionId) sessionStorage.setItem('ls_stripe_session', sessionId);

    const state = btoa(JSON.stringify({ pending_id: pendingId, session_id: sessionId }));
    const clioUrl = getClioAuthUrl(state);

    const timer = setTimeout(() => {
      window.location.href = clioUrl;
    }, 800);

    return () => clearTimeout(timer);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <AppIcon />
        </div>

        <div style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          border: '3px solid #14B8A6',
          borderTopColor: 'transparent',
          margin: '0 auto 24px',
          animation: 'spin 0.8s linear infinite',
        }} />

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        <h2 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 24,
          fontWeight: 400,
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          margin: '0 0 12px',
        }}>
          Payment confirmed.
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          color: '#99F6E4',
          lineHeight: 1.65,
          margin: 0,
        }}>
          Connecting your Clio account…
        </p>
      </div>
    </div>
  );
}
