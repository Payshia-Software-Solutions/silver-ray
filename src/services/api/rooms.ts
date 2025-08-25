
import type { Room } from '@/types';

// Define the structure of the raw room data from the API
interface RawRoomData {
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


// Function to transform raw API data into the frontend Room type
const transformRoomData = (rawRoom: RawRoomData): Room => {
  return {
    id: String(rawRoom.id),
    name: rawRoom.descriptive_title,
    description: rawRoom.short_description,
    pricePerNight: parseFloat(rawRoom.price_per_night),
    imageUrl: `http://localhost/Silver_server${rawRoom['room _images']}`, // Assuming base URL is needed
    imageHint: `${rawRoom.descriptive_title.toLowerCase()} interior`,
    capacity: rawRoom.adults_capacity,
    beds: `${rawRoom.adults_capacity > 1 ? rawRoom.adults_capacity : '1'} Adult(s)`, // Example transformation
    size: `${rawRoom.room_width}x${rawRoom.room_height} m`,
    category: 'Standard', // This might need to be mapped from room_type_id
    amenities: rawRoom.amenities_id.split(','), // Simple split, might need more complex mapping
    // Add default values for other required fields
    longDescription: rawRoom.short_description,
    rating: 4.5,
  };
};

// Function to fetch rooms and transform the data
export const getRoomsByCompany = async (companyId: string): Promise<Room[]> => {
  const fetchUrl = `http://localhost/rooms/company/${companyId}`;
  
  try {
    console.log(`Fetching rooms from: ${fetchUrl}`);
    const response = await fetch(fetchUrl, { cache: 'no-store' });
    
    if (!response.ok) {
      console.error(`Failed to fetch rooms. Status: ${response.status}. URL: ${fetchUrl}`);
      return [];
    }
    
    const data = await response.json();

    if (data && Array.isArray(data.rooms)) {
        return data.rooms.map(transformRoomData);
    } else {
        console.error('API response is not in the expected format:', data);
        return [];
    }
  } catch (error) {
    console.error('Error fetching or transforming room data:', error);
    return [];
  }
};
