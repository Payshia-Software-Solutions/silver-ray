
import type { RoomFromApi, RoomImage } from '@/types';
import { API_BASE_URL } from '@/lib/config';
import { handleApiResponse, cleanImageUrl } from '@/lib/apiClient';

/**
 * Fetches all rooms from the back-end.
 * @returns A promise that resolves to an array of RoomFromApi objects.
 */
export async function getRooms(): Promise<RoomFromApi[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const rooms = await handleApiResponse<RoomFromApi[]>(response);
    return rooms.map(room => ({
        ...room,
        // The main room list doesn't seem to have its own image URL in the provided structure,
        // so we don't clean it here. It's constructed later from the room images.
    }));
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    throw error;
  }
}

/**
 * Fetches all rooms with their associated room types from the back-end.
 * @returns A promise that resolves to an array of RoomFromApi objects.
 */
export async function getRoomsWithTypes(): Promise<RoomFromApi[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms-with-types`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const rooms = await handleApiResponse<RoomFromApi[]>(response);
        return rooms;
    } catch (error) {
        console.error('Failed to fetch rooms with types:', error);
        throw error;
    }
}


/**
 * Fetches a single room by its ID from the back-end.
 * @param id The ID of the room to fetch.
 * @returns A promise that resolves to a RoomFromApi object.
 */
export async function getRoomById(id: string): Promise<RoomFromApi> {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const room = await handleApiResponse<RoomFromApi>(response);
    // The API returns an array with a single object for a single room request
    const singleRoom = Array.isArray(room) ? room[0] : room;

    return {
        ...singleRoom,
        room_images: cleanImageUrl(singleRoom.room_images),
    };

  } catch (error) {
    console.error(`Failed to fetch room with id ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches all room images for a given company.
 * @returns A promise that resolves to an array of RoomImage objects.
 */
export async function getRoomImages(): Promise<RoomImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/room-images`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const images = await handleApiResponse<RoomImage[]>(response);
    return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch room images for company:`, error);
    throw error;
  }
}

    
