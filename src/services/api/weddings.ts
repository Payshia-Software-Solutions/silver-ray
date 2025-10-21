
import type { WeddingPackageFromApi, WeddingImage } from '@/types';
import { API_BASE_URL, IMAGE_BASE_URL } from '@/lib/config';
import { handleApiResponse, cleanImageUrl } from '@/lib/apiClient';


export async function getWeddingPackages(): Promise<WeddingPackageFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/weddingpackages`, {
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
    // Return an empty array in case of an error to prevent build failures
    return [];
  }
}

export async function getWeddingPackageById(id: string): Promise<WeddingPackageFromApi | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/weddingpackages/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 404) {
        return null;
    }
    const pkg = await handleApiResponse<WeddingPackageFromApi>(response);
    const singlePackage = Array.isArray(pkg) ? pkg[0] : pkg;
    return {
        ...singlePackage,
        weddinng_image: cleanImageUrl(singlePackage.weddinng_image),
    };
  } catch (error) {
    console.error(`Failed to fetch wedding package with id ${id}:`, error);
    throw error;
  }
}


export async function getWeddingImages(): Promise<WeddingImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/wedding-images`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const images = await handleApiResponse<WeddingImage[]>(response);
    return images.map(image => ({
        ...image,
        image_url: `${IMAGE_BASE_URL}${cleanImageUrl(image.image_url)}`,
    }));
  } catch (error) {
    console.error(`Failed to fetch wedding images for company:`, error);
    throw error;
  }
}

export async function getWeddingImagesByPackageId(packageId: string): Promise<WeddingImage[]> {
  try {
    const serverRoot = API_BASE_URL.split('/company/')[0];
    const response = await fetch(`${serverRoot}/wedding-images/company/1/wedding/${packageId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 404) {
      return [];
    }
    const images = await handleApiResponse<WeddingImage[]>(response);
     return images.map(image => ({
        ...image,
        image_url: `${IMAGE_BASE_URL}${cleanImageUrl(image.image_url)}`,
    }));
  } catch (error) {
    console.error(`Failed to fetch images for wedding package ${packageId}:`, error);
    return [];
  }
}
