
import type { Room, mockRooms } from '@/data/mockData';

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Checked-in' | 'Checked-out' | 'No-Show';
export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded';
export type PaymentMethod = 'Credit Card' | 'Bank Transfer' | 'Cash' | 'Online';
export type BookingSource = 'Online' | 'Phone' | 'Walk-in' | 'Agent';


export interface Booking {
  id: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone?: string;
  guestAvatar?: string;
  address?: string;
  
  roomId: string;
  roomName: string;
  roomNumber: string;

  checkInDate: Date;
  checkOutDate: Date;
  numGuests: number;
  children: number;

  status: BookingStatus;
  
  totalPrice: number;
  amountPaid: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  discountCode?: string;

  specialRequests?: string;
  bookingSource?: BookingSource;

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
    address: '123 Main St, Anytown, USA',
    roomId: 'deluxe-king',
    roomName: 'Deluxe Suite',
    roomNumber: 'Room 205',
    checkInDate: new Date(2025, 5, 15),
    checkOutDate: new Date(2025, 5, 18),
    numGuests: 2,
    children: 0,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    totalPrice: 24500,
    amountPaid: 24500,
    specialRequests: 'Late check-in around 10 PM.',
    bookingSource: 'Online',
    createdAt: new Date(new Date().setDate(today.getDate() - 5)),
    updatedAt: new Date(new Date().setDate(today.getDate() - 1)),
  },
  {
    id: 'BK002',
    guestFirstName: 'Emily',
    guestLastName: 'Davis',
    guestEmail: 'emily.davis@example.com',
    guestAvatar: 'https://placehold.co/40x40.png?text=ED',
    address: '456 Oak Ave, Anytown, USA',
    roomId: 'ocean-suite',
    roomName: 'Standard Room',
    roomNumber: 'Room 102',
    checkInDate: new Date(2025, 7, 20),
    checkOutDate: new Date(2025, 7, 22),
    numGuests: 1,
    children: 0,
    status: 'Pending',
    paymentStatus: 'Pending',
    paymentMethod: 'Online',
    totalPrice: 24500,
    amountPaid: 0,
    bookingSource: 'Phone',
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
    address: '789 Pine Ln, Anytown, USA',
    roomId: 'family-room',
    roomName: 'Family Garden Room',
    roomNumber: 'Room 110',
    checkInDate: new Date(new Date().setDate(today.getDate() + 10)),
    checkOutDate: new Date(new Date().setDate(today.getDate() + 14)),
    numGuests: 2,
    children: 2,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Bank Transfer',
    totalPrice: 32000,
    amountPaid: 32000,
    specialRequests: 'Need a crib for an infant.',
    bookingSource: 'Walk-in',
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
    children: 0,
    status: 'Checked-out',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    totalPrice: 150000,
    amountPaid: 150000,
    bookingSource: 'Agent',
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
    children: 1,
    status: 'Checked-in',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    totalPrice: 25000,
    amountPaid: 25000,
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
    children: 0,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    paymentMethod: 'Online',
    totalPrice: 45000,
    amountPaid: 45000,
    specialRequests: 'Anniversary celebration.',
    bookingSource: 'Online',
    createdAt: new Date(new Date().setDate(today.getDate() - 4)),
    updatedAt: new Date(new Date().setDate(today.getDate() - 1)),
  },
];

export const getBookingById = (id: string): Booking | undefined => {
  return mockBookings.find(b => b.id === id);
};
