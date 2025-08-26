
import type { Room } from '@/types';
import { mockRooms } from '@/data/mockData';

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
  const imageUrl = apiRoom['room _images']
    ? `http://localhost/Silver_server${apiRoom['room _images']}`.replace(/\\/g, '/')
    : 'https://placehold.co/1200x800.png'; // Fallback image

  return {
    id: String(apiRoom.id),
    name: apiRoom.descriptive_title,
    description: apiRoom.short_description,
    longDescription: apiRoom.short_description, 
    pricePerNight: parseFloat(apiRoom.price_per_night),
    imageUrl: imageUrl,
    imageHint: 'hotel room interior', // Generic hint
    images: [imageUrl],
    amenities: apiRoom.amenities_id ? apiRoom.amenities_id.split(',') : [],
    capacity: apiRoom.adults_capacity || 2,
    beds: `${apiRoom.adults_capacity > 1 ? '1 King Bed' : '1 Queen Bed'}`,
    size: `${apiRoom.room_width} sqm`,
    category: 'Deluxe', // Example static category
    viewType: 'City View', // Example static view type
  };
}

export async function getRoomsByCompany(companyId: string): Promise<{ rooms: Room[], error: string | null }> {
  const fetchUrl = `http://localhost/Silver_server/company/rooms/${companyId}`;
  
  try {
    const response = await fetch(fetchUrl, { cache: 'no-store' });
    
    if (!response.ok) {
      console.error(`Failed to fetch rooms. Status: ${response.status}. URL: ${fetchUrl}`);
      // Return mock data on failure to prevent the app from crashing
      return { 
        rooms: mockRooms, 
        error: "Could not connect to the data service. Please ensure the backend is running and the URL is correct." 
      };
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
        console.error("API did not return an array. Data:", data);
        return { rooms: mockRooms, error: "Received unexpected data format from the server." };
    }

    const transformedRooms = data.map(transformApiRoomToFrontendRoom);
    return { rooms: transformedRooms, error: null };

  } catch (error) {
    console.error(`An error occurred while fetching rooms:`, error);
    return { 
      rooms: mockRooms, 
      error: "Could not connect to the data service. Please ensure the backend is running and the URL is correct."
    };
  }
}
