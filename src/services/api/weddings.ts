
import type { WeddingPackageFromApi, WeddingImage } from '@/types';
import { API_BASE_URL, COMPANY_ID } from '@/lib/config';
import { handleApiResponse, cleanImageUrl } from '@/lib/apiClient';


export async function getWeddingPackages(): Promise<WeddingPackageFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/weddingpackages/company/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const packages = await handleApiResponse<WeddingPackageFromApi[]>(response);
    return packages.map(pkg => ({
        ...pkg,
        weddinng_image: cleanImageUrl(pkg.weddinng_image),
    }));
  } catch (error) {
    console.error('Failed to fetch wedding packages:', error);
    throw error;
  }
}

export async function getWeddingImages(): Promise<WeddingImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/company/wedding-images/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const images = await handleApiResponse<WeddingImage[]>(response);
    return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch wedding images for company ${COMPANY_ID}:`, error);
    throw error;
  }
}
