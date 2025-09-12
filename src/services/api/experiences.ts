
import type { ExperienceFromApi, ExperienceImage } from '@/types';

const API_BASE_URL = 'http://localhost/Silver_server';

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

export async function getExperiences(companyId: string): Promise<ExperienceFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/experiences/company/${companyId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse<ExperienceFromApi[]>(response);
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
    throw error;
  }
}

export async function getExperienceImages(companyId: string): Promise<ExperienceImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/company/experience-images/${companyId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse<ExperienceImage[]>(response);
  } catch (error) {
    console.error(`Failed to fetch experience images for company ${companyId}:`, error);
    throw error;
  }
}
