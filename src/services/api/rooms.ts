/**
 * @fileoverview This file contains the functions for making API calls to the PHP back-end.
 * It uses the native fetch API for all requests.
 */

import type { RoomFromApi, RoomImage } from '@/types';

// The base URL of your PHP server's router script
const API_BASE_URL = 'http://localhost/Silver_server';

/**
 * A helper function to handle the response from the fetch API.
 * It checks for errors and parses the JSON response.
 * @param response The Response object from a fetch call.
 * @returns A promise that resolves with the JSON data.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    // If the response is not ok, it might contain a server-side error message.
    // We throw this as an error to be caught by the calling function.
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }
  
  const text = await response.text();
  // Handle cases where the response might be empty
  if (!text) {
      return [] as T;
  }

  try {
    const data = JSON.parse(text);
    // Ensure the data is always an array for consistency
    if (Array.isArray(data)) {
        return data as T;
    } else if (typeof data === 'object' && data !== null) {
        // If the backend returns a single object, wrap it in an array
        return [data] as T;
    }
    return [] as T;
  } catch (error) {
    console.error("Failed to parse JSON:", text);
    throw new Error("Invalid JSON response from server.");
  }
}

/**
 * Fetches all rooms from the back-end.
 * @returns A promise that resolves to an array of RoomFromApi objects.
 */
export async function getRooms(): Promise<RoomFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse<RoomFromApi[]>(response);
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    // In a real app, you might want to handle this more gracefully
    throw error;
  }
}

/**
 * Fetches all room images for a given company.
 * @param companyId The ID of the company.
 * @returns A promise that resolves to an array of RoomImage objects.
 */
export async function getRoomImages(companyId: string): Promise<RoomImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/company/room-images/${companyId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse<RoomImage[]>(response);
  } catch (error) {
    console.error(`Failed to fetch room images for company ${companyId}:`, error);
    throw error;
  }
}
