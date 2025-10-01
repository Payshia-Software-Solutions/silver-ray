

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

export async function getEventById(id: string): Promise<EventFromApi | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 404) {
            return null;
        }
        const eventData = await handleApiResponse<EventFromApi | EventFromApi[]>(response);
        // The API might return an array with one item for a single ID
        return Array.isArray(eventData) ? eventData[0] : eventData;
    } catch (error) {
        console.error(`Failed to fetch event with id ${id}:`, error);
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
    const serverRoot = API_BASE_URL.split('/company/')[0];
    const response = await fetch(`${serverRoot}/event-images/company/1/event/${eventId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    // If the API returns 404, it means no images were found. Return an empty array.
    if (response.status === 404) {
      return [];
    }
    const images = await handleApiResponse<EventImage[]>(response);
     return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    // Also catch other errors and return an empty array to prevent crashes.
    console.error(`Failed to fetch images for event ${eventId}:`, error);
    return [];
  }
}



