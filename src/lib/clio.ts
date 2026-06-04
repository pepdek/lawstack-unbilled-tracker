const CLIO_CLIENT_ID = import.meta.env.VITE_CLIO_CLIENT_ID;
const CLIO_REDIRECT_URI = import.meta.env.VITE_CLIO_REDIRECT_URI;

export function getClioAuthUrl(): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIO_CLIENT_ID,
    redirect_uri: CLIO_REDIRECT_URI,
    scope: 'matters:read time_entries:read users:read',
  });
  return `https://app.clio.com/oauth/authorize?${params.toString()}`;
}
