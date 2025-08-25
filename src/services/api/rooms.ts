
import { Room } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/Silver_server';

// This interface matches the structure of the objects in your API response
interface ApiRoom {
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
    "room _images": string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
}


const transformApiRoomToRoom = (apiRoom: ApiRoom): Room => {
  return {
    id: String(apiRoom.id),
    name: apiRoom.descriptive_title,
    description: apiRoom.short_description,
    longDescription: apiRoom.short_description, // Using short description as long for now
    pricePerNight: parseFloat(apiRoom.price_per_night),
    imageUrl: `${API_BASE_URL}${apiRoom['room _images']}` || 'https://placehold.co/600x400.png', // Fallback image
    imageHint: 'hotel room interior',
    amenities: apiRoom.amenities_id.split(','), // Simple split, needs mapping in a real app
    capacity: apiRoom.adults_capacity,
    beds: '1 King Bed', // Mocked as it is not in the API response
    size: `${parseFloat(apiRoom.room_width)}x${parseFloat(apiRoom.room_height)} sqm`,
    category: 'Suite', // Mocked as it is not in the API response
  };
};

export const getRoomsByCompany = async (companyId: string): Promise<Room[]> => {
  try {
    const fetchUrl = `${API_BASE_URL}/rooms/company/${companyId}`;
    console.log(`Fetching rooms from: ${fetchUrl}`);

    const response = await fetch(fetchUrl, { cache: 'no-store' });
    
    if (!response.ok) {
      console.error(`Failed to fetch rooms. Status: ${response.status}. URL: ${fetchUrl}`);
      return [];
    }
    
    const data: ApiRoom[] = await response.json();

    if (Array.isArray(data)) {
      return data.map(transformApiRoomToRoom);
    } else {
        console.error("API response is not an array:", data);
        return [];
    }

  } catch (error) {
    console.error("Error fetching or transforming room data:", error);
    return [];
  }
};
