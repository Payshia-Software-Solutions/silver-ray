
import { Room  } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/Silver_server';

const transformApiRoomToRoom = (apiRoom: any): Room => {
  const imageUrl = (apiRoom.image_url && !apiRoom.image_url.startsWith('http'))
    ? `http://localhost/Silver_server${apiRoom.image_url}`
    : apiRoom.image_url || 'https://placehold.co/600x400.png';

  return {
    id: String(apiRoom.id || apiRoom.room_number),
    name: apiRoom.descriptive_title,
    description: apiRoom.short_description,
    longDescription: apiRoom.detailed_description || apiRoom.short_description,
    pricePerNight: parseFloat(apiRoom.price_per_night),
    imageUrl: imageUrl,
    imageHint: 'hotel room interior', // Default hint
    images: apiRoom.image_urls ? apiRoom.image_urls.split(',').map((url: string) => url.trim()) : [imageUrl],
    amenities: apiRoom.amenities_id ? apiRoom.amenities_id.split(',').map((amenity: string) => amenity.trim()) : [],
    capacity: parseInt(apiRoom.adults_capacity, 10) || 1,
    beds: `${apiRoom.beds || '1 King'}`, // Placeholder if not provided
    size: `${apiRoom.room_width} sqm`, // Assuming width is the primary size metric
    category: 'Suite', // Placeholder, you might want to map room_type_id
    viewType: apiRoom.view || 'City View', // Placeholder
  };
};


export const getRoomsByCompany = async (companyId: string): Promise<Room[]> => {
  const fetchUrl = `${API_BASE_URL}/rooms`;
  try {
    const response = await fetch(fetchUrl, { cache: 'no-store' });
    if (!response.ok) {
      console.error(`Failed to fetch rooms. Status: ${response.status}. URL: ${fetchUrl}`);
      return [];
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        console.error("Fetched room data is not an array:", data);
        return [];
    }
    return data.map(transformApiRoomToRoom);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
        console.error(`Network error: Could not connect to the API server for rooms. Ensure the backend is running and accessible at ${fetchUrl}`);
    } else {
        console.error(`An unexpected error occurred while fetching rooms from ${fetchUrl}:`, error);
    }
    return [];
  }
};


