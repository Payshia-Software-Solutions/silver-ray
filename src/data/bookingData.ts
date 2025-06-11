
import type { Room, mockRooms } from '@/data/mockData'; // Assuming mockRooms is exported for room names

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Checked-in' | 'Checked-out' | 'No-Show';

export interface Booking {
  id: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone?: string;
  roomId: string;
  roomName: string; // Denormalized for easier display
  checkInDate: Date;
  checkOutDate: Date;
  numGuests: number;
  status: BookingStatus;
  totalPrice: number;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const dayAfterNextWeek = new Date(today);
dayAfterNextWeek.setDate(today.getDate() + 8);

export const mockBookings: Booking[] = [
  {
    id: 'BK001',
    guestFirstName: 'John',
    guestLastName: 'Doe',
    guestEmail: 'john.doe@example.com',
    guestPhone: '123-456-7890',
    roomId: 'deluxe-king',
    roomName: 'Deluxe King Room',
    checkInDate: today,
    checkOutDate: tomorrow,
    numGuests: 2,
    status: 'Confirmed',
    totalPrice: 250,
    specialRequests: 'Late check-in around 10 PM.',
    createdAt: new Date(today.setDate(today.getDate() - 5)),
    updatedAt: new Date(today.setDate(today.getDate() - 1)),
  },
  {
    id: 'BK002',
    guestFirstName: 'Alice',
    guestLastName: 'Smith',
    guestEmail: 'alice.smith@example.com',
    roomId: 'ocean-suite',
    roomName: 'Ocean View Suite',
    checkInDate: dayAfterTomorrow,
    checkOutDate: nextWeek,
    numGuests: 1,
    status: 'Pending',
    totalPrice: 450 * (nextWeek.getTime() - dayAfterTomorrow.getTime()) / (1000 * 3600 * 24), // price * nights
    createdAt: new Date(today.setDate(today.getDate() - 2)),
    updatedAt: new Date(today.setDate(today.getDate() - 2)),
  },
  {
    id: 'BK003',
    guestFirstName: 'Robert',
    guestLastName: 'Brown',
    guestEmail: 'robert.b@example.com',
    guestPhone: '555-123-4567',
    roomId: 'family-room',
    roomName: 'Family Garden Room',
    checkInDate: new Date(today.setDate(today.getDate() + 10)),
    checkOutDate: new Date(today.setDate(today.getDate() + 14)),
    numGuests: 4,
    status: 'Confirmed',
    totalPrice: 320 * 4,
    specialRequests: 'Need a crib for an infant.',
    createdAt: new Date(today.setDate(today.getDate() - 10)),
    updatedAt: new Date(today.setDate(today.getDate() - 3)),
  },
  {
    id: 'BK004',
    guestFirstName: 'Emily',
    guestLastName: 'Jones',
    guestEmail: 'emily.jones@example.com',
    roomId: 'presidential-villa',
    roomName: 'Presidential Villa',
    checkInDate: new Date(2024, 6, 1), // Example past date
    checkOutDate: new Date(2024, 6, 5),
    numGuests: 2,
    status: 'Checked-out',
    totalPrice: 1500 * 4,
    createdAt: new Date(2024, 5, 20),
    updatedAt: new Date(2024, 6, 5),
  },
  {
    id: 'BK005',
    guestFirstName: 'Michael',
    guestLastName: 'Wilson',
    guestEmail: 'michael.w@example.com',
    roomId: 'deluxe-king',
    roomName: 'Deluxe King Room',
    checkInDate: new Date(today.setDate(today.getDate() - 3)), // Ongoing stay
    checkOutDate: dayAfterTomorrow,
    numGuests: 2,
    status: 'Checked-in',
    totalPrice: 250 * ((dayAfterTomorrow.getTime() - (new Date(today.setDate(today.getDate() - 3))).getTime()) / (1000 * 3600 * 24)),
    createdAt: new Date(today.setDate(today.getDate() - 7)),
    updatedAt: new Date(today.setDate(today.getDate() - 3)),
  },
    {
    id: 'BK006',
    guestFirstName: 'Sarah',
    guestLastName: 'Davis',
    guestEmail: 'sarah.d@example.com',
    roomId: 'ocean-suite',
    roomName: 'Ocean View Suite',
    checkInDate: nextWeek,
    checkOutDate: dayAfterNextWeek,
    numGuests: 2,
    status: 'Cancelled',
    totalPrice: 450 * ((dayAfterNextWeek.getTime() - nextWeek.getTime()) / (1000 * 3600 * 24)),
    specialRequests: 'Anniversary celebration.',
    createdAt: new Date(today.setDate(today.getDate() - 4)),
    updatedAt: new Date(today.setDate(today.getDate() - 1)),
  },
];

export const getBookingById = (id: string): Booking | undefined => {
  return mockBookings.find(b => b.id === id);
};
