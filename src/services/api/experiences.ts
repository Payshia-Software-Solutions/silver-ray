
import type { ExperienceFromApi, ExperienceImage } from '@/types';
import { API_BASE_URL, COMPANY_ID } from '@/lib/config';

// Helper to clean up image URLs by removing leading/trailing slashes and backslashes
function cleanImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  // This regex removes leading/trailing slashes and all backslashes
  return url.replace(/\\/g, '').replace(/^\/+|\/+$/g, '');
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

export async function getExperiences(): Promise<ExperienceFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/experiences/company/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const experiences = await handleResponse<ExperienceFromApi[]>(response);
    return experiences.map(exp => ({
        ...exp,
        experience_image: cleanImageUrl(exp.experience_image),
    }));
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
    throw error;
  }
}

export async function getExperienceImages(): Promise<ExperienceImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/company/experience-images/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const images = await handleResponse<ExperienceImage[]>(response);
    return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch experience images for company ${COMPANY_ID}:`, error);
    throw error;
  }
}
