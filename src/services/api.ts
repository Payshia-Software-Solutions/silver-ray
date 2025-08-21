
import type { Room } from '@/types';

const API_BASE_URL = 'http://localhost';

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
      return [];
    }

    const data = await response.json();
    if (!data.success || !Array.isArray(data.data)) {
        console.error("Invalid data format received from the server.");
        return [];
    }
    
    return data.data.map(transformApiRoomToRoom);

  } catch (error) {
    // Fail silently on purpose to allow fallback to mock data if the backend is not running.
    return [];
  }
}
