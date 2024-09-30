import { NextRequest, NextResponse } from 'next/server';
import { makeApiRequest } from '@/functions/apiRequest/makeApiRequest'; // Adjust the import path as needed

export async function GET(request: NextRequest) {

  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

  const { data, error } = await makeApiRequest({
    method: 'POST',
    endpoint: '/search/api/v2/config',
    body: {
      limit: 0,
      withResourceJson: false,
      skipResult: false,
      startTime: oneDayAgo,
      sort: [
        {
            field: 'id',
            direction: 'asc'
        }
      ],
      query: "config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon EC2' AND api.name = 'aws-ec2-describe-instances' AND cloud.region = 'AWS Ohio'",
    },
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}