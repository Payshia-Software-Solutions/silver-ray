
import type { EventFromApi, EventImage } from '@/types';
import { API_BASE_URL, COMPANY_ID } from '@/lib/config';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }
  
  const text = await response.text();
  if (!text) {
      return [] as T;
  }

  try {
    const data = JSON.parse(text);
    if (Array.isArray(data)) {
        return data as T;
    } else if (typeof data === 'object' && data !== null) {
        return [data] as unknown as T;
    }
    return [] as T;
  } catch (error) {
    console.error("Failed to parse JSON:", text);
    throw new Error("Invalid JSON response from server.");
  }
}

export async function getEvents(): Promise<EventFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/events/company/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse<EventFromApi[]>(response);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
}

export async function getEventImages(): Promise<EventImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/company/event-images/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse<EventImage[]>(response);
  } catch (error) {
    console.error(`Failed to fetch event images for company ${COMPANY_ID}:`, error);
    throw error;
  }
}
