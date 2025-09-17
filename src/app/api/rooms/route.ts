
// src/app/api/rooms/route.ts
import {NextResponse} from 'next/server';

const TARGET_URL = 'https://silverray-server.payshia.com/company/1/rooms';

/**
 * API route to fetch rooms data from the backend.
 * This acts as a proxy to avoid CORS issues and hide the direct backend URL from the client.
 */
export async function GET() {
  try {
    const response = await fetch(TARGET_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Forward the error response from the target server
      return new NextResponse(response.statusText, {status: response.status});
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
