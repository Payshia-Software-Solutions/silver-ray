
import type { WeddingPackage } from '@/types';
import { Gift, CheckCircle } from 'lucide-react'; // Assuming Gift and CheckCircle are used

// --- Wedding Package Fetching and Transformation ---

const API_BASE_URL = 'http://localhost/Silver_server'; // Define or import your base URL

interface ApiWeddingPackage {
    id: number;
    package_name: string;
    price: string;
    short_description: string;
    inclusions?: string | null;
    image_urls?: string | null;
}

function transformApiWeddingPackage(apiPackage: ApiWeddingPackage): WeddingPackage {
    const imageUrl = (apiPackage.image_urls?.split(',')[0] || 'https://placehold.co/600x400.png').trim();

    return {
        id: String(apiPackage.id),
        name: apiPackage.package_name,
        price: `LKR ${Number(apiPackage.price).toLocaleString()}`,
        shortDescription: apiPackage.short_description,
        icon: Gift, // Default icon - make sure Gift is imported
        imageHint: `Image for ${apiPackage.package_name}`,
        inclusions: apiPackage.inclusions ? apiPackage.inclusions.split(',').map(inc => ({ icon: CheckCircle, text: inc.trim() })) : [], // Make sure CheckCircle is imported
        heroImage: imageUrl,
        iconImageUrl: imageUrl,
    };
}

export async function getWeddingPackages(): Promise<WeddingPackage[]> {
    const fetchUrl = `${API_BASE_URL}/index.php/weddingpackage`;
    try {
        const response = await fetch(fetchUrl, { cache: 'no-store' });
        if (!response.ok) {
            console.error(`Failed to fetch wedding packages. Status: ${response.status}. URL: ${fetchUrl}`);
            return [];
        }
        const apiPackages: ApiWeddingPackage[] = await response.json();
        if (!Array.isArray(apiPackages)) {
            console.error("Fetched wedding package data is not an array:", apiPackages);
            return [];
        }
        return apiPackages.map(transformApiWeddingPackage);
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch failed')) {
            console.error(`Network error: Could not connect to the API server for wedding packages at ${fetchUrl}`);
        } else {
            console.error(`An unexpected error occurred while fetching wedding packages from ${fetchUrl}:`, error);
        }
        return [];
    }
}
