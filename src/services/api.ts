import type { Room, WeddingPackage } from '@/types';

// --- Room Fetching and Transformation ---

const API_BASE_URL = 'http://localhost/Silver_server';

interface ApiRoom {
  id: number;
  room_number: string;
  room_type_id: number;
  descriptive_title: string;
  short_description: string;
  adults_capacity: number;
  price_per_night: string;
  image_url: string;
  beds?: string;
  size?: string;
  category?: 'Standard' | 'Deluxe' | 'Suite' | 'Villa';
  long_description?: string;
  view_type?: string;
  amenities_id?: string;
}

function transformApiRoomToRoom(apiRoom: ApiRoom): Room {
  const imageUrl = apiRoom.image_url 
    ? `${API_BASE_URL}${apiRoom.image_url.startsWith('/') ? '' : '/'}${apiRoom.image_url}` 
    : 'https://placehold.co/600x400.png';

  return {
    id: String(apiRoom.id),
    name: apiRoom.descriptive_title,
    description: apiRoom.short_description,
    longDescription: apiRoom.long_description || apiRoom.short_description,
    pricePerNight: parseFloat(apiRoom.price_per_night),
    imageUrl: imageUrl,
    imageHint: `Image of ${apiRoom.descriptive_title}`,
    capacity: apiRoom.adults_capacity,
    beds: apiRoom.beds || `${apiRoom.adults_capacity > 2 ? '2 Queen Beds' : '1 King Bed'}`,
    size: apiRoom.size || `${Math.floor(Math.random() * (50 - 30 + 1)) + 30} sqm`,
    category: apiRoom.category || 'Standard',
    viewType: apiRoom.view_type || 'City View',
    amenities: apiRoom.amenities_id ? apiRoom.amenities_id.split(',') : ['WiFi', 'Air Conditioning'],
    images: [imageUrl],
  };
}

export async function getRoomsByCompany(companyId: string): Promise<Room[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/company/${companyId}`, { cache: 'no-store' });
    if (!response.ok) {
      console.error("Failed to fetch rooms, status:", response.status);
      return [];
    }
    const apiRooms: ApiRoom[] = await response.json();
    if (!Array.isArray(apiRooms)) {
        console.error("Fetched data is not an array:", apiRooms);
        return [];
    }
    return apiRooms.map(transformApiRoomToRoom);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
        console.error("Network error: Could not connect to the API server at", API_BASE_URL);
    } else {
        console.error("An unexpected error occurred while fetching rooms:", error);
    }
    return [];
  }
}

// --- Wedding Package Fetching and Transformation ---

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
        icon: Gift, // Default icon
        imageHint: `Image for ${apiPackage.package_name}`,
        inclusions: apiPackage.inclusions ? apiPackage.inclusions.split(',').map(inc => ({ icon: CheckCircle, text: inc.trim() })) : [],
        heroImage: imageUrl,
        iconImageUrl: imageUrl,
    };
}

export async function getWeddingPackages(): Promise<WeddingPackage[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/weddingpackages`, { cache: 'no-store' });
        if (!response.ok) {
            console.error("Failed to fetch wedding packages, status:", response.status);
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
            console.error("Network error: Could not connect to the API server for wedding packages at", API_BASE_URL);
        } else {
            console.error("An unexpected error occurred while fetching wedding packages:", error);
        }
        return [];
    }
}
