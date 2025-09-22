
import type { EventFromApi, EventImage } from '@/types';
import { API_BASE_URL } from '@/lib/config';
import { handleApiResponse, cleanImageUrl } from '@/lib/apiClient';


export async function getEvents(): Promise<EventFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleApiResponse<EventFromApi[]>(response);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
}

export async function getEventImages(): Promise<EventImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/event-images`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const images = await handleApiResponse<EventImage[]>(response);
    return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch event images:`, error);
    throw error;
  }
}

export async function getEventImagesByEventId(eventId: string): Promise<EventImage[]> {
  try {
    // The base URL is 'https://silverray-server.payshia.com/company/1'
    // We need to construct the URL relative to the server root.
    const serverRoot = API_BASE_URL.split('/company/')[0];
    const response = await fetch(`${serverRoot}/event-images/company/1/event/${eventId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const images = await handleApiResponse<EventImage[]>(response);
     return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch images for event ${eventId}:`, error);
    throw error;
  }
}

