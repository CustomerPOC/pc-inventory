'use server';
const internalUrl = process.env.NEXT_PUBLIC_INTERNAL_URL;

// Internal API route to get token
export async function fetchToken() {
  const authEndpoint = internalUrl + '/api/retrieveToken';

  const res = await fetch(authEndpoint, {
    next: {
      revalidate: 550
    },
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.status == 401 ) {
    fetchToken();
  }

  if (res.status == 500 ) {
    fetchToken();
  } 

  const data = await res.json();
  return data.token;
}