
import type { RestaurantFromApi, RestaurantImage } from '@/types';
import { API_BASE_URL, COMPANY_ID } from '@/lib/config';

// Helper to clean up image URLs by removing leading/trailing slashes and backslashes
function cleanImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  // Replace backslashes with forward slashes and remove any leading slash
  return url.replace(/\\/g, '/').replace(/^\//, '');
}

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

export async function getRestaurants(): Promise<RestaurantFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurant/company/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const restaurants = await handleResponse<RestaurantFromApi[]>(response);
    return restaurants.map(restaurant => ({
        ...restaurant,
        'restaurant _image': cleanImageUrl(restaurant['restaurant _image']),
    }));
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
    throw error;
  }
}

export async function getRestaurantImages(): Promise<RestaurantImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/company/restaurant-images/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const images = await handleResponse<RestaurantImage[]>(response);
    return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch restaurant images for company ${COMPANY_ID}:`, error);
    throw error;
  }
}
