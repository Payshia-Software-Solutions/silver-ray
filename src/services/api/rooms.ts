

import type { RoomFromApi, RoomImage } from '@/types';
import { API_BASE_URL } from '@/lib/config';
import { handleApiResponse, cleanImageUrl } from '@/lib/apiClient';

/**
 * Fetches all rooms from the back-end.
 * @returns A promise that resolves to an array of RoomFromApi objects.
 */
export async function getRooms(): Promise<RoomFromApi[]> {
  try {
    const serverRoot = API_BASE_URL.split('/company/')[0];
    const response = await fetch(`${serverRoot}/rooms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const rooms = await handleApiResponse<RoomFromApi[]>(response);
    return rooms;
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
 * @returns A promise that resolves to a RoomFromApi object or null if not found.
 */
export async function getRoomById(id: string): Promise<RoomFromApi | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`);
    if (response.status === 404) {
      return null;
    }
    const room = await handleApiResponse<RoomFromApi>(response);
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
 * Fetches a single room by its slug from the back-end.
 * @param slug The slug of the room to fetch.
 * @returns A promise that resolves to a RoomFromApi object or null if not found.
 */
export async function getRoomBySlug(slug: string): Promise<RoomFromApi | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/${slug}`);
    if (response.status === 404) {
      return null;
    }
    const room = await handleApiResponse<RoomFromApi>(response);
    // The API might return an array even for a single slug lookup
    const singleRoom = Array.isArray(room) ? room[0] : room;

    if (!singleRoom) {
      return null;
    }

    return {
        ...singleRoom,
        room_images: cleanImageUrl(singleRoom.room_images),
    };

  } catch (error) {
    console.error(`Failed to fetch room with slug ${slug}:`, error);
    // Return null instead of throwing an error to allow the page to handle the "not found" state.
    return null;
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
    console.error(`Failed to fetch room images:`, error);
    throw error;
  }
}

/**
 * Fetches all images for a specific room.
 * @param roomId The ID of the room.
 * @returns A promise that resolves to an array of RoomImage objects.
 */
export async function getRoomImagesByRoomId(roomId: string): Promise<RoomImage[]> {
  try {
    const serverRoot = API_BASE_URL.split('/company/')[0];
    const response = await fetch(`${serverRoot}/room-images/company/1/room/${roomId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 404) {
      return [];
    }
    const images = await handleApiResponse<RoomImage[]>(response);
     return images.map(image => ({
        ...image,
        image_url: cleanImageUrl(image.image_url),
    }));
  } catch (error) {
    console.error(`Failed to fetch images for room ${roomId}:`, error);
    return [];
  }
}
