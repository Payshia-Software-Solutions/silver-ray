
import type { Room, mockRooms } from '@/data/mockData';

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Checked-in' | 'Checked-out' | 'No-Show';
export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded';

export interface Booking {
  id: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone?: string;
  guestAvatar?: string;
  roomId: string;
  roomName: string;
  roomNumber: string;
  checkInDate: Date;
  checkOutDate: Date;
  numGuests: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(today.getDate() + 2);
const nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);
const dayAfterNextWeek = new Date();
dayAfterNextWeek.setDate(today.getDate() + 8);

export const mockBookings: Booking[] = [
  {
    id: 'BK001',
    guestFirstName: 'John',
    guestLastName: 'Smith',
    guestEmail: 'john.smith@example.com',
    guestAvatar: 'https://placehold.co/40x40.png?text=JS',
    guestPhone: '123-456-7890',
    roomId: 'deluxe-king',
    roomName: 'Deluxe Suite',
    roomNumber: 'Room 205',
    checkInDate: new Date(2025, 5, 15),
    checkOutDate: new Date(2025, 5, 18),
    numGuests: 2,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    totalPrice: 24500,
    specialRequests: 'Late check-in around 10 PM.',
    createdAt: new Date(new Date().setDate(today.getDate() - 5)),
    updatedAt: new Date(new Date().setDate(today.getDate() - 1)),
  },
  {
    id: 'BK002',
    guestFirstName: 'Emily',
    guestLastName: 'Davis',
    guestEmail: 'emily.davis@example.com',
    guestAvatar: 'https://placehold.co/40x40.png?text=ED',
    roomId: 'ocean-suite',
    roomName: 'Standard Room',
    roomNumber: 'Room 102',
    checkInDate: new Date(2025, 7, 20),
    checkOutDate: new Date(2025, 7, 22),
    numGuests: 1,
    status: 'Pending',
    paymentStatus: 'Pending',
    totalPrice: 24500,
    createdAt: new Date(new Date().setDate(today.getDate() - 2)),
    updatedAt: new Date(new Date().setDate(today.getDate() - 2)),
  },
    {
    id: 'BK003',
    guestFirstName: 'Robert',
    guestLastName: 'Brown',
    guestEmail: 'robert.b@example.com',
    guestAvatar: 'https://placehold.co/40x40.png?text=RB',
    guestPhone: '555-123-4567',
    roomId: 'family-room',
    roomName: 'Family Garden Room',
    roomNumber: 'Room 110',
    checkInDate: new Date(new Date().setDate(today.getDate() + 10)),
    checkOutDate: new Date(new Date().setDate(today.getDate() + 14)),
    numGuests: 4,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    totalPrice: 32000,
    specialRequests: 'Need a crib for an infant.',
    createdAt: new Date(new Date().setDate(today.getDate() - 10)),
    updatedAt: new Date(new Date().setDate(today.getDate() - 3)),
  },
  {
    id: 'BK004',
    guestFirstName: 'Jessica',
    guestLastName: 'Wilson',
    guestEmail: 'jessica.w@example.com',
    guestAvatar: 'https://placehold.co/40x40.png?text=JW',
    roomId: 'presidential-villa',
    roomName: 'Presidential Villa',
    roomNumber: 'Villa 1',
    checkInDate: new Date(new Date().setDate(today.getDate() - 10)),
    checkOutDate: new Date(new Date().setDate(today.getDate() - 6)),
    numGuests: 2,
    status: 'Checked-out',
    paymentStatus: 'Paid',
    totalPrice: 150000,
    createdAt: new Date(new Date().setDate(today.getDate() - 20)),
    updatedAt: new Date(new Date().setDate(today.getDate() - 6)),
  },
  {
    id: 'BK005',
    guestFirstName: 'Michael',
    guestLastName: 'Johnson',
    guestEmail: 'michael.j@example.com',
    guestAvatar: 'https://placehold.co/40x40.png?text=MJ',
    roomId: 'deluxe-king',
    roomName: 'Deluxe King Room',
    roomNumber: 'Room 301',
    checkInDate: new Date(new Date().setDate(today.getDate() - 3)),
    checkOutDate: dayAfterTomorrow,
    numGuests: 2,
    status: 'Checked-in',
    paymentStatus: 'Paid',
    totalPrice: 25000,
    createdAt: new Date(new Date().setDate(today.getDate() - 7)),
    updatedAt: new Date(new Date().setDate(today.getDate() - 3)),
  },
    {
    id: 'BK006',
    guestFirstName: 'Sarah',
    guestLastName: 'Davis',
    guestEmail: 'sarah.davis@example.com',
    guestAvatar: 'https://placehold.co/40x40.png?text=SD',
    roomId: 'ocean-suite',
    roomName: 'Ocean View Suite',
    roomNumber: 'Room 405',
    checkInDate: nextWeek,
    checkOutDate: dayAfterNextWeek,
    numGuests: 2,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    totalPrice: 45000,
    specialRequests: 'Anniversary celebration.',
    createdAt: new Date(new Date().setDate(today.getDate() - 4)),
    updatedAt: new Date(new Date().setDate(today.getDate() - 1)),
  },
];

export const getBookingById = (id: string): Booking | undefined => {
  return mockBookings.find(b => b.id === id);
};
