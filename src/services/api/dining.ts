
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
    const data = await handleApiResponse<RestaurantFromApi[] | RestaurantFromApi>(response);
    
    // Ensure the data is always an array before mapping
    const restaurants = Array.isArray(data) ? data : [data];

    return restaurants.map(restaurant => ({
        ...restaurant,
        'restaurant _image': cleanImageUrl(restaurant['restaurant _image']),
    }));
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
    throw error;
  }
}

export async function getRestaurantById(id: string): Promise<RestaurantFromApi> {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurant/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const venue = await handleApiResponse<RestaurantFromApi>(response);
    const singleVenue = Array.isArray(venue) ? venue[0] : venue;
     return {
        ...singleVenue,
        'restaurant _image': cleanImageUrl(singleVenue['restaurant _image']),
    };
  } catch (error) {
    console.error(`Failed to fetch restaurant with id ${id}:`, error);
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

export async function getRestaurantImagesByVenueId(venueId: string): Promise<RestaurantImage[]> {
  try {
    // Correctly constructs the URL from the server root, not the company-specific base URL
    const serverRoot = API_BASE_URL.split('/company/')[0];
    const response = await fetch(`${serverRoot}/restaurant-images/company/1/restaurant/${venueId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 404) {
      return [];
    }
    const images = await handleApiResponse<RestaurantImage[]>(response);
     return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch images for venue ${venueId}:`, error);
    return [];
  }
}
