
import type { WeddingPackage } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/Silver_server';

// This represents the structure of the package coming from your API
interface ApiWeddingPackage {
  id: string;
  name: string;
  price: string;
  short_description: string;
  hero_image: string;
  hero_image_hint: string;
  inclusions: { text: string }[]; // Assuming inclusions are just text
}

const transformApiPackageToWeddingPackage = (apiPackage: ApiWeddingPackage): WeddingPackage => {
  // In a real scenario, you'd map icons based on text, or the API would provide icon names.
  // For now, we'll use a default icon.
  const { CheckCircle } = require('lucide-react');

  return {
    id: apiPackage.id,
    name: apiPackage.name,
    price: apiPackage.price,
    shortDescription: apiPackage.short_description,
    heroImage: apiPackage.hero_image,
    heroImageHint: apiPackage.hero_image_hint,
    icon: CheckCircle, // Default icon
    imageHint: apiPackage.name.toLowerCase(), // Simple hint generation
    inclusions: apiPackage.inclusions.map(inc => ({
      icon: CheckCircle, // Default icon for all inclusions
      text: inc.text,
    })),
  };
};


export const getWeddingPackages = async (): Promise<WeddingPackage[]> => {
  try {
    const fetchUrl = `${API_BASE_URL}/index.php/weddingpackage`;
    const response = await fetch(fetchUrl, { cache: 'no-store' });
    if (!response.ok) {
        console.error(`Failed to fetch wedding packages. Status: ${response.status}. URL: ${fetchUrl}`);
        return [];
    }
    const apiPackages: ApiWeddingPackage[] = await response.json();
    
    // Check if the response is an array before mapping
    if (!Array.isArray(apiPackages)) {
      console.error('API response for wedding packages is not an array:', apiPackages);
      return [];
    }
    
    return apiPackages.map(transformApiPackageToWeddingPackage);
  } catch (error) {
    console.error('Error fetching wedding packages:', error);
    return [];
  }
};
