
import axios from 'axios';
import type { Room } from '@/types';
import { weddingPackages, type WeddingPackage } from '@/data/weddingData';


// Define the structure of the raw room data from your PHP backend
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
  'room _images': string; // Note the space in the key from your example
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
    longDescription: rawRoom.short_description, // Assuming long is same as short for now
    pricePerNight: parseFloat(rawRoom.price_per_night),
    imageUrl: `http://localhost/Silver_server${rawRoom['room _images']}`,
    imageHint: `${rawRoom.descriptive_title.toLowerCase()} interior`,
    capacity: rawRoom.adults_capacity,
    beds: `${rawRoom.adults_capacity > 1 ? rawRoom.adults_capacity : '1'} Adult(s)`,
    size: `${rawRoom.room_width}x${rawRoom.room_height} m`,
    category: 'Deluxe', // This might need to be mapped from room_type_id
    amenities: rawRoom.amenities_id.split(','), // Simple split, might need more complex mapping
    rating: 4.5, // Default value
  };
};

// Function to fetch rooms from your PHP backend and transform the data
export const getRoomsByCompany = async (companyId: string): Promise<Room[]> => {
  const fetchUrl = `http://localhost/Silver_server/rooms/company/${companyId}`;
  
  try {
    console.log(`Fetching rooms from: ${fetchUrl}`);
    const response = await axios.get(fetchUrl);
    
    // Check if the request was successful and data exists
    if (response.status === 200 && response.data && Array.isArray(response.data.rooms)) {
        return response.data.rooms.map(transformRoomData);
    } else {
        console.error('API response is not in the expected format:', response.data);
        return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error fetching rooms: ${error.message}. URL: ${fetchUrl}`);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    // Re-throw the error to be caught by the page component for fallback handling
    throw error;
  }
};

// Mock function to simulate fetching wedding packages
export const getWeddingPackages = async (): Promise<WeddingPackage[]> => {
  console.log("Fetching wedding packages...");
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real scenario, this would be an API call like:
  // const response = await axios.get(`http://localhost/Silver_server/wedding-packages`);
  // return response.data.packages.map(transformWeddingPackageData);

  // For now, return mock data
  return weddingPackages;
};

