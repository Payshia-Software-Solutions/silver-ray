
import type { ExperienceFromApi, ExperienceImage } from '@/types';
import { API_BASE_URL } from '@/lib/config';
import { handleApiResponse, cleanImageUrl } from '@/lib/apiClient';

export async function getExperiences(): Promise<ExperienceFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/experiences`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const experiences = await handleApiResponse<ExperienceFromApi[]>(response);
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
    const response = await fetch(`${API_BASE_URL}/experience-images`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const images = await handleApiResponse<ExperienceImage[]>(response);
    return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch experience images for company:`, error);
    throw error;
  }
}
