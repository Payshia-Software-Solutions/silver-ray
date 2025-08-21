
import type { Room } from '@/types';

const API_BASE_URL = 'http://localhost:3001';

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

// Function to transform API data into the frontend Room type
function transformApiRoomToRoom(apiRoom: ApiRoom): Room {
    // A simple mock transformation for amenities as the API returns IDs
    const mockAmenities = ['WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar'];

    return {
        id: String(apiRoom.id),
        name: apiRoom.descriptive_title,
        description: apiRoom.short_description,
        longDescription: apiRoom.short_description, // Using short_description as long is not available
        pricePerNight: parseFloat(apiRoom.price_per_night),
        imageUrl: apiRoom.image_url,
        imageHint: 'hotel room interior',
        images: [apiRoom.image_url],
        amenities: mockAmenities,
        capacity: apiRoom.adults_capacity,
        beds: apiRoom.adults_capacity > 2 ? '2 Queen Beds' : '1 King Bed',
        size: `${apiRoom.room_width} sqm`,
        category: 'Deluxe', // Mocked as it's not in the response
        rating: 4.5, // Mocked
        viewType: 'City View', // Mocked
    };
}


export async function getRoomsByCompany(companyId: string): Promise<Room[]> {
  const endpoint = `${API_BASE_URL}/Silver_server/rooms/company/${companyId}`;
  
  try {
    const response = await fetch(endpoint, {
      signal: AbortSignal.timeout(5000), 
    });

    if (!response.ok) {
      // Don't log error here, just return empty to allow fallback
      return [];
    }

    const data = await response.json();
    if (!data.success || !Array.isArray(data.data)) {
        console.error("Invalid data format received from the server.");
        return [];
    }
    
    return data.data.map(transformApiRoomToRoom);

  } catch (error) {
    // Fail silently on network error to allow the frontend to use fallback data
    // This is useful when the backend server is not running during development.
    return [];
  }
}
