
// src/app/api/events/route.ts
import {NextResponse} from 'next/server';

const TARGET_URL = 'https://gotickets-server.payshia.com/events';

/**
 * API route to fetch events data from the GoTickets backend.
 * This acts as a proxy to avoid CORS issues.
 */
export async function GET() {
  try {
    const response = await fetch(TARGET_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Using cache: 'no-store' to ensure we always get the latest events
      cache: 'no-store', 
    });

    if (!response.ok) {
      // Forward the error response from the target server
      return new NextResponse(response.statusText, {status: response.status});
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error fetching events:', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
