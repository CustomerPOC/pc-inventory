import {  NextResponse } from 'next/server';

const api         = '/login';
const url         = process.env.NEXT_PUBLIC_PRISMACLOUD_URL;
const endpoint    = url + api;
const username    = process.env.PRISMACLOUD_USERNAME;
const password    = process.env.PRISMACLOUD_PASSWORD;

export async function GET() {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    });

    const data = await res.json();
    return NextResponse.json({ token: data.token });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' });
  }

}