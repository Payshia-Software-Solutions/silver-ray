
import { Room  } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const transformApiRoomToRoom = (apiRoom: any): Room => {
  return {
    id: apiRoom.id,
    name: apiRoom.name,
    description: apiRoom.description,
    longDescription: apiRoom.longDescription,
    pricePerNight: apiRoom.pricePerNight,
    imageUrl: apiRoom.imageUrl,
    imageHint: apiRoom.imageHint,
    images: apiRoom.images,
    amenities: apiRoom.amenities,
    capacity: apiRoom.capacity,
    beds: apiRoom.beds,
    size: apiRoom.size,
    category: apiRoom.category,
    viewType: apiRoom.viewType,
  };
};

export const getRoomsByCompany = async (companyId: string): Promise<Room[]> => {
  // Dummy data for now. Replace with actual API call.
  return []; // Return empty array initially
};

