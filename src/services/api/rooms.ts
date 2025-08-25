
import { Room } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/Silver_server';

// This interface matches the structure of the objects in your API response
interface ApiRoom {
  room_id: string;
  descriptive_title: string;
  short_description: string;
  long_description: string;
  price_per_night: string;
  main_image_url: string;
  image_hint?: string;
  images: string[];
  amenities: string[];
  adult_capacity: string;
  child_capacity: string; // Assuming child capacity is also a string
  beds: string;
  room_width: string;
  room_height: string;
  category_name: 'Standard' | 'Deluxe' | 'Suite' | 'Villa';
  view_type: string;
  layout_image_url?: string;
  enhance_your_stay: string[];
}


const transformApiRoomToRoom = (apiRoom: ApiRoom): Room => {
  return {
    id: apiRoom.room_id,
    name: apiRoom.descriptive_title,
    description: apiRoom.short_description,
    longDescription: apiRoom.long_description,
    pricePerNight: parseFloat(apiRoom.price_per_night),
    imageUrl: apiRoom.main_image_url || 'https://placehold.co/600x400.png', // Fallback image
    imageHint: apiRoom.image_hint || 'hotel room interior',
    images: apiRoom.images,
    amenities: apiRoom.amenities,
    capacity: parseInt(apiRoom.adult_capacity, 10),
    beds: apiRoom.beds,
    size: `${parseFloat(apiRoom.room_width)}x${parseFloat(apiRoom.room_height)} sqm`,
    category: apiRoom.category_name,
    viewType: apiRoom.view_type,
    enhanceYourStay: apiRoom.enhance_your_stay,
    roomLayoutImageUrl: apiRoom.layout_image_url,
  };
};

export const getRoomsByCompany = async (companyId: string): Promise<Room[]> => {
  try {
    const fetchUrl = `${API_BASE_URL}/index.php/rooms/company/${companyId}`;
    console.log(`Fetching rooms from: ${fetchUrl}`);

    const response = await fetch(fetchUrl, { cache: 'no-store' });
    if (!response.ok) {
      console.error(`Failed to fetch rooms. Status: ${response.status}. URL: ${fetchUrl}`);
      return [];
    }
    const data = await response.json();

    // Assuming the API returns an object with a 'rooms' key which is an array
    if (data && Array.isArray(data.rooms)) {
      return data.rooms.map(transformApiRoomToRoom);
    } else {
        console.error("API response is not in the expected format (missing 'rooms' array):", data);
        return [];
    }

  } catch (error) {
    console.error("Error fetching or transforming room data:", error);
    return [];
  }
};
