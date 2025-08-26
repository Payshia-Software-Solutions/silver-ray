
import { NextResponse } from 'next/server';

// This is the proxy route. It runs on the server, not the browser.
export async function GET(request: Request) {
  const API_BASE_URL = 'http://localhost/Silver_server';
  // The company ID is hardcoded as per the requirement. 
  // In a real app, this might be dynamic.
  const companyId = '1';
  const fetchUrl = `${API_BASE_URL}/company/rooms/${companyId}`;

  try {
    const response = await fetch(fetchUrl, {
      cache: 'no-store', // Ensures we always get the latest data from the backend
      headers: {
        // Forward any necessary headers, or add new ones like an API key
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // If the backend returns an error, forward it to our frontend
      const errorText = await response.text();
      return NextResponse.json(
        { message: `Error from backend: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    // This catches network errors, e.g., if the backend server is down.
    console.error('Proxy API route error:', error);
    return NextResponse.json(
      { message: 'Failed to connect to the backend server through the proxy.', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
