
import type { Room } from '@/types';
import { mockRooms } from '@/data/mockData';

// The API base URL now points to our OWN frontend's proxy route.
const API_BASE_URL = '/api/rooms';

// This is the raw structure of the room object from your PHP backend
interface RawApiRoom {
    id: number;
    room_number: string;
    room_type_id: number;
    amenities_id: string;
    descriptive_title: string;
    company_id: number;
    short_description: string;
    adults_capacity: number;
    children_capacity: number;
    room_width: string;
    room_height: string;
    price_per_night: string;
    currency: string;
    current_status: string;
    'room _images'?: string; // Made optional to avoid errors if missing
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
}

// This function transforms a single raw room object into the format our frontend components expect
function transformApiRoomToFrontendRoom(apiRoom: RawApiRoom): Room {
  return {
    id: String(apiRoom.id),
    name: apiRoom.descriptive_title,
    description: apiRoom.short_description,
    longDescription: apiRoom.short_description, 
    pricePerNight: parseFloat(apiRoom.price_per_night),
    imageUrl: 'https://placehold.co/1200x800.png', // Using placeholder as requested
    imageHint: 'hotel room interior', // Generic hint
    images: ['https://placehold.co/1200x800.png'],
    amenities: [],
    capacity: apiRoom.adults_capacity || 2,
    beds: '1 King Bed',
    size: `${apiRoom.room_width} sqm`,
    category: 'Deluxe',
    viewType: 'City View',
  };
}

export async function getRoomsByCompany(companyId: string): Promise<{ rooms: Room[], error: string | null }> {
  // The fetch URL is now our internal proxy route.
  // The companyId is currently handled by the proxy, but we keep it here for future flexibility.
  const fetchUrl = `${API_BASE_URL}`; 
  
  try {
    // This fetch call goes to our own Next.js server, not directly to the PHP backend.
    const response = await fetch(fetchUrl, { cache: 'no-store' });
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = `Failed to fetch rooms via proxy. Status: ${response.status}. Message: ${errorData.message}`;
      console.error(errorMessage, errorData.details);
      return { 
        rooms: mockRooms, 
        error: `Could not connect to the data service (Status: ${response.status}). Using fallback data for now.` 
      };
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
        console.error("API proxy did not return an array. Data:", data);
        return { rooms: mockRooms, error: "Received unexpected data format from the server. Using fallback data for now." };
    }

    const transformedRooms = data.map(transformApiRoomToFrontendRoom);
    return { rooms: transformedRooms, error: null };

  } catch (error) {
    const errorMessage = `An error occurred while fetching rooms via proxy: ${error}`;
    console.error(errorMessage);
    return { 
      rooms: mockRooms, 
      error: "An error occurred while trying to connect to the data service via proxy. Please check the backend server and network connection. Using fallback data for now."
    };
  }
}
