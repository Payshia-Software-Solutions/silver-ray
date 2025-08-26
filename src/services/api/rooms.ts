
import type { Room } from '@/types';
import { mockRooms } from '@/data/mockData';

const API_BASE_URL = 'http://localhost/Silver_server';

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
    'room _images': string; // Note the space in the key
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
    amenities: [], // Default empty array
    capacity: 2, // Default capacity
    beds: '1 King Bed', // Default bed config
    size: '40 sqm', // Default size
    category: 'Deluxe', // Default category
    viewType: 'City View', // Default view
  };
}

export async function getRoomsByCompany(companyId: string): Promise<{ rooms: Room[], error: string | null }> {
  const fetchUrl = `${API_BASE_URL}/company/rooms/${companyId}`;
  
  try {
    const response = await fetch(fetchUrl, { cache: 'no-store' });
    
    if (!response.ok) {
      const errorMessage = `Failed to fetch rooms. Status: ${response.status}. URL: ${fetchUrl}. Please ensure the backend is running and accessible.`;
      console.error(errorMessage);
      // Return mock data on failure to prevent the app from crashing
      return { 
        rooms: mockRooms, 
        error: `Could not connect to the data service (Status: ${response.status}). Using fallback data for now.` 
      };
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
        console.error("API did not return an array. Data:", data);
        return { rooms: mockRooms, error: "Received unexpected data format from the server. Using fallback data for now." };
    }

    const transformedRooms = data.map(transformApiRoomToFrontendRoom);
    return { rooms: transformedRooms, error: null };

  } catch (error) {
    const errorMessage = `An error occurred while fetching rooms: ${error}`;
    console.error(errorMessage);
    // Return mock data on exception
    return { 
      rooms: mockRooms, 
      error: "An error occurred while trying to connect to the data service. Please check the backend server and network connection. Using fallback data for now."
    };
  }
}
