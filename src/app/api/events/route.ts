
// src/app/api/events/route.ts
import {NextResponse} from 'next/server';

const TARGET_URL = 'https://gotickets-server.payshia.com/events';

/**
 * API route to fetch events data from the GoTickets backend.
 * This acts as a proxy to avoid CORS issues.
 * It can fetch all events or a single event if a 'slug' query param is provided.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // If a slug is provided, fetch the single event.
    // The external API seems to return an array even for a single slug.
    const url = slug ? `${TARGET_URL}/${slug}` : TARGET_URL;
    
    const response = await fetch(url, {
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
