
import type { GalleryApiImage } from '@/types';
import { API_BASE_URL } from '@/lib/config';
import { handleApiResponse, cleanImageUrl } from '@/lib/apiClient';

export async function getGalleryImages(): Promise<GalleryApiImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery-images`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await handleApiResponse<GalleryApiImage[] | GalleryApiImage>(response);
    const images = Array.isArray(data) ? data : [data];
    
    return images.map(image => ({
      ...image,
      image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
    throw error;
  }
}
