/**
 * @fileoverview This file contains the functions for making API calls to the PHP back-end.
 * It uses the native fetch API for all requests.
 */

import type { RoomFromApi, RoomImage } from '@/types';
import { API_BASE_URL, COMPANY_ID } from '@/lib/config';

// Helper to clean up image URLs by removing leading/trailing slashes and backslashes
function cleanImageUrl(url: string | null | undefined): string {
    if (!url) return '';
    return url.replace(/\\/g, '').replace(/^\/+|\/+$/g, '');
}

/**
 * A helper function to handle the response from the fetch API.
 * It checks for errors and parses the JSON response.
 * @param response The Response object from a fetch call.
 * @returns A promise that resolves with the JSON data.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!response.ok) {
    // If the response is not ok, it might contain a server-side error message.
    // We throw this as an error to be caught by the calling function.
    throw new Error(`API request failed with status ${response.status}: ${text}`);
  }
  
  // Find the start of the actual JSON content
  const firstBracket = text.indexOf('[');
  const firstBrace = text.indexOf('{');
  
  let startIndex = -1;

  if (firstBracket === -1 && firstBrace === -1) {
    // Neither bracket nor brace found, response is likely empty or not JSON
    if (text.trim() === '') return [] as T;
    throw new Error(`Invalid JSON response: ${text}`);
  } else if (firstBracket === -1) {
    startIndex = firstBrace;
  } else if (firstBrace === -1) {
    startIndex = firstBracket;
  } else {
    startIndex = Math.min(firstBracket, firstBrace);
  }
  
  const jsonText = text.substring(startIndex);
  
  try {
    if (jsonText.trim() === '') {
      return [] as T;
    }
    const data = JSON.parse(jsonText);
    if (Array.isArray(data)) {
        return data as T;
    } else if (typeof data === 'object' && data !== null) {
        return [data] as unknown as T;
    }
    return [] as T;
  } catch (error) {
    console.error("Failed to parse JSON:", jsonText);
    throw new Error("Invalid JSON response from server.");
  }
}

/**
 * Fetches all rooms from the back-end.
 * @returns A promise that resolves to an array of RoomFromApi objects.
 */
export async function getRooms(): Promise<RoomFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/company/rooms/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const rooms = await handleResponse<RoomFromApi[]>(response);
    return rooms.map(room => ({
        ...room,
        image_url: cleanImageUrl(room.image_url),
    }));
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    // In a real app, you might want to handle this more gracefully
    throw error;
  }
}

/**
 * Fetches all room images for a given company.
 * @returns A promise that resolves to an array of RoomImage objects.
 */
export async function getRoomImages(): Promise<RoomImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/company/room-images/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const images = await handleResponse<RoomImage[]>(response);
    return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch room images for company ${COMPANY_ID}:`, error);
    throw error;
  }
}
