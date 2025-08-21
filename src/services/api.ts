
import type { Room, WeddingPackage } from '@/types';
import { Gift, Flower2, Wine, Users } from 'lucide-react';

const API_BASE_URL = 'http://localhost';

// --- Room Fetching Logic ---

interface ApiRoom {
    id: number;
    room_number: string;
    room_type_id: number;
    amenities_id: string;
    company_id: string;
    descriptive_title: string;
    short_description: string;
    adults_capacity: number;
    children_capacity: number;
    room_width: string;
    room_height: string;
    price_per_night: string;
    currency: string;
    current_status: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
}

function transformApiRoomToRoom(apiRoom: ApiRoom): Room {
    const imageUrl = apiRoom.image_url.startsWith('http') 
        ? apiRoom.image_url 
        : `${API_BASE_URL}${apiRoom.image_url}`;

    return {
        id: String(apiRoom.id),
        name: apiRoom.descriptive_title,
        description: apiRoom.short_description,
        longDescription: apiRoom.short_description,
        pricePerNight: parseFloat(apiRoom.price_per_night),
        imageUrl: imageUrl,
        imageHint: 'hotel room interior',
        images: [imageUrl],
        amenities: ['WiFi', 'Air Conditioning', 'Flat-screen TV'],
        capacity: apiRoom.adults_capacity,
        beds: apiRoom.adults_capacity > 2 ? '2 Queen Beds' : '1 King Bed',
        size: `${apiRoom.room_width} sqm`,
        category: 'Deluxe',
        rating: 4.5,
        viewType: 'City View',
    };
}

export async function getRoomsByCompany(companyId: string): Promise<Room[]> {
  const endpoint = `${API_BASE_URL}/Silver_server/rooms/company/${companyId}`;
  
  try {
    const response = await fetch(endpoint, {
      signal: AbortSignal.timeout(5000), 
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (!data.success || !Array.isArray(data.data)) {
        console.error("Invalid room data format received from the server.");
        return [];
    }
    
    return data.data.map(transformApiRoomToRoom);

  } catch (error) {
    return [];
  }
}


// --- Wedding Package Fetching Logic ---

interface ApiWeddingPackage {
    id: number;
    package_name: string;
    hall_id: string;
    company_id: string;
    status: string;
    short_description: string;
    detailed_description: string;
    price: string;
    max_guests: number;
    inclusions: string | null; // Assuming inclusions might be a JSON string or null
    image_urls: string | null; // Assuming image_urls might be a JSON string or null
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
}

function transformApiWeddingPackage(pkg: ApiWeddingPackage): WeddingPackage {
    // Simple logic to assign an icon based on package name
    let icon = Gift;
    if (pkg.package_name.toLowerCase().includes('romantic')) icon = Flower2;
    if (pkg.package_name.toLowerCase().includes('luxury')) icon = Wine;
    if (pkg.package_name.toLowerCase().includes('intimate')) icon = Users;
    
    return {
        id: String(pkg.id),
        name: pkg.package_name,
        price: `LKR ${parseFloat(pkg.price).toLocaleString()}`,
        shortDescription: pkg.short_description,
        icon: icon,
        imageHint: 'wedding package icon',
        // Since inclusions are null in sample, we provide a default
        inclusions: [
            { icon: Utensils, text: 'Custom Catering' },
            { icon: Flower2, text: 'Elegant Decor' },
        ],
    };
}


export async function getWeddingPackages(): Promise<WeddingPackage[]> {
  const endpoint = `${API_BASE_URL}/Silver_server/weddingpackages`;

  try {
    const response = await fetch(endpoint, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (!data.success || !Array.isArray(data.data)) {
      console.error("Invalid wedding package data format received from the server.");
      return [];
    }

    return data.data.map(transformApiWeddingPackage);

  } catch (error) {
    return [];
  }
}
