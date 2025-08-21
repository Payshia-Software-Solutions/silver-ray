
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
        longDescription: apiRoom.short_description, // Using short_description as long is not available in the provided sample
        pricePerNight: parseFloat(apiRoom.price_per_night),
        imageUrl: apiRoom.image_url.startsWith('/') 
            ? `${API_BASE_URL}${apiRoom.image_url}` 
            : apiRoom.image_url,
        imageHint: 'hotel room interior',
        images: apiRoom.image_url.startsWith('/') ? [`${API_BASE_URL}${apiRoom.image_url}`] : [apiRoom.image_url],
        amenities: mockAmenities, // Using mock amenities as API returns IDs
        capacity: apiRoom.adults_capacity,
        beds: apiRoom.adults_capacity > 2 ? '2 Queen Beds' : '1 King Bed', // Mocked based on capacity
        size: `${apiRoom.room_width} sqm`, // Assuming width is the size
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
      console.error(`API request failed with status: ${response.status}`);
      return []; // Return empty array on failure
    }

    const data = await response.json();
    if (!data.success || !Array.isArray(data.data)) {
        console.error("Invalid data format received from the server.");
        return []; // Return empty array on invalid format
    }
    
    // Transform each room from the API response
    return data.data.map(transformApiRoomToRoom);

  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
        console.error("Network error: Could not connect to the API server at", API_BASE_URL);
    } else {
        console.error("An unexpected error occurred while fetching rooms:", error);
    }
    return []; // Return empty array on any fetch-related error
  }
}
