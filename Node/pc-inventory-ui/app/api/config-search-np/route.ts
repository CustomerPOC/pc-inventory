import { NextRequest, NextResponse } from 'next/server';
import { makeApiRequest } from '@/functions/apiRequest/makeApiRequest'; // Adjust the import path as needed

export async function GET(request: NextRequest) {
   const nextPageToken = request.nextUrl.searchParams.get('pageToken');

  const { data, error } = await makeApiRequest({
    method: 'POST',
    endpoint: '/search/config/page',
    body: {
      limit: 0,
      withResourceJson: true,
      pageToken: nextPageToken
    },
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}