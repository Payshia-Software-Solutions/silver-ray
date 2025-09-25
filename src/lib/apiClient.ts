// src/lib/apiClient.ts
import axios from 'axios';
import { API_BASE_URL } from './config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * A robust function to clean up image URLs received from the backend.
 * It replaces all backslashes with forward slashes and removes any leading slashes.
 * @param url The raw image URL string from the API.
 * @returns A cleaned-up URL path ready to be appended to a base URL.
 */
export function cleanImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  // 1. Replace all backslashes with forward slashes
  // 2. Remove a leading slash if it exists, to prevent double slashes when joining with base URL
  return url.replace(/\\/g, '/').replace(/^\//, '');
}


/**
 * A helper function to handle the response from an API call.
 * It checks for errors and parses the JSON response.
 * @param response The Response object from a fetch call.
 * @returns A promise that resolves with the JSON data.
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }
  
  const text = await response.text();
  // If the response body is empty, return an empty array for list calls 
  // or handle as appropriate, instead of trying to parse it.
  if (!text) {
      return [] as T;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse JSON:", text);
    throw new Error("Invalid JSON response from server.");
  }
}


export default apiClient;
