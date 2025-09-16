
import type { RestaurantFromApi, RestaurantImage } from '@/types';
import { API_BASE_URL } from '@/lib/config';
import { handleApiResponse, cleanImageUrl } from '@/lib/apiClient';

export async function getRestaurants(): Promise<RestaurantFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurant`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const restaurants = await handleApiResponse<RestaurantFromApi[]>(response);
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
    const response = await fetch(`${API_BASE_URL}/restaurant-images`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const images = await handleApiResponse<RestaurantImage[]>(response);
    return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch restaurant images for company:`, error);
    throw error;
  }
}
