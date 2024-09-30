import { fetchToken } from "@/functions/auth/fetchToken";
import { error } from "console";
import {  NextResponse } from 'next/server';

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  body?: any;
  queryParams?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

const MAX_RETRIES = 15;
const RETRY_DELAY = 2000; // 2 seconds

export async function makeApiRequest<T>(options: RequestOptions): Promise<ApiResponse<T>> {
  const { method, endpoint, body, queryParams } = options;
  const baseUrl = process.env.NEXT_PUBLIC_PRISMACLOUD_URL;
  const url     = baseUrl + endpoint
  let retries   = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      const token = await fetchToken();
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-Redlock-Auth': token
        },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (response.ok) {
        const data = await response.json();
        return { data, error: null };
      }
  
      if (response.status === 401) {
        // Token might be expired, fetch a new one and retry
        await fetchToken(); // Assuming fetchToken has a force refresh option
        retries++;
        continue;
      }
  
      if (response.status === 429) {
        // Rate limited, wait and retry
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retries + 1)));
        retries++;
        continue;
      }
  
      // For other error statuses, throw an error to be caught below
      throw new Error(`HTTP error! status: ${response.status}`);
  
    } catch (error) {
      if (retries === MAX_RETRIES - 1) {
        return { data: null, error: error instanceof Error ? error.message : 'Unknown error occurred' };
      }
      retries++;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * retries));
    }
  }

  return { data: null, error: 'Max retries reached' };

}