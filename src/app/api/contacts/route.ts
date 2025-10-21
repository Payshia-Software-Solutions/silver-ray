
// src/app/api/contacts/route.ts
import {NextResponse} from 'next/server';

const TARGET_URL = 'https://silverray-server.payshia.com/company/1/contacts';

/**
 * API route to forward contact form submissions to the backend.
 * This acts as a proxy to avoid CORS issues.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(TARGET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Forward the error response from the target server
      const errorData = await response.text();
      return new NextResponse(errorData || response.statusText, {status: response.status});
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
