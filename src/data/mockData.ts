import type { Room, Testimonial } from '@/types';

export const mockRooms: Room[] = [
  {
    id: 'deluxe-king',
    name: 'Deluxe King Room',
    description: 'Spacious room with a king-size bed and stunning city views.',
    longDescription: 'Our Deluxe King Room offers a luxurious retreat with a plush king-size bed, elegant furnishings, and panoramic city views. Enjoy modern amenities including a large flat-screen TV, minibar, and a spa-like bathroom. Perfect for couples or solo travelers seeking comfort and style.',
    pricePerNight: 250,
    imageUrl: 'https://placehold.co/600x400.png',
    images: [
      'https://placehold.co/1200x800.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    amenities: ['King Bed', 'City View', 'WiFi', 'Air Conditioning', 'Mini Bar', 'Flat-screen TV'],
    capacity: 2,
    beds: '1 King Bed',
    size: '40 sqm',
    category: 'Deluxe',
    rating: 4.8,
    features: ['City View', 'Work Desk']
  },
  {
    id: 'ocean-suite',
    name: 'Ocean View Suite',
    description: 'Expansive suite with a private balcony overlooking the ocean.',
    longDescription: 'Indulge in our Ocean View Suite, featuring a separate living area, a king-size bed, and a private balcony with breathtaking ocean views. This suite is equipped with premium amenities, a Nespresso machine, and a luxurious bathroom with a soaking tub. Ideal for a romantic getaway or an extended stay.',
    pricePerNight: 450,
    imageUrl: 'https://placehold.co/600x400.png',
    images: [
      'https://placehold.co/1200x800.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    amenities: ['King Bed', 'Ocean View', 'Private Balcony', 'WiFi', 'Air Conditioning', 'Nespresso Machine', 'Soaking Tub'],
    capacity: 3,
    beds: '1 King Bed + Sofa Bed',
    size: '75 sqm',
    category: 'Suite',
    rating: 4.9,
    features: ['Ocean View', 'Private Balcony', 'Living Area']
  },
  {
    id: 'family-room',
    name: 'Family Garden Room',
    description: 'Comfortable room with two queen beds, perfect for families.',
    longDescription: 'Our Family Garden Room is designed for comfort and convenience, offering two queen beds and easy access to our lush gardens. Amenities include a smart TV with streaming services, a spacious bathroom, and a small seating area. A great choice for families looking for a relaxing stay.',
    pricePerNight: 320,
    imageUrl: 'https://placehold.co/600x400.png',
    images: [
      'https://placehold.co/1200x800.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    amenities: ['2 Queen Beds', 'Garden Access', 'WiFi', 'Air Conditioning', 'Smart TV', 'Kids Welcome Kit'],
    capacity: 4,
    beds: '2 Queen Beds',
    size: '50 sqm',
    category: 'Standard',
    rating: 4.6,
    features: ['Garden Access', 'Family Friendly']
  },
   {
    id: 'presidential-villa',
    name: 'Presidential Villa',
    description: 'Ultimate luxury with a private pool and dedicated butler service.',
    longDescription: 'Experience unparalleled opulence in our Presidential Villa. This exclusive villa boasts multiple bedrooms, a spacious living and dining area, a fully equipped kitchen, a private infinity pool, and dedicated butler service. Every detail is curated for an extraordinary stay.',
    pricePerNight: 1500,
    imageUrl: 'https://placehold.co/600x400.png',
    images: [
      'https://placehold.co/1200x800.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    amenities: ['Multiple Bedrooms', 'Private Pool', 'Butler Service', 'Full Kitchen', 'Oceanfront', 'WiFi', 'Home Cinema'],
    capacity: 6,
    beds: '2 King Beds, 2 Twin Beds',
    size: '300 sqm',
    category: 'Villa',
    rating: 5.0,
    features: ['Private Pool', 'Butler Service', 'Oceanfront', 'Full Kitchen']
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    quote: "LuxeStay exceeded all our expectations! The service was impeccable, the rooms were stunning, and the views were breathtaking. We can't wait to come back.",
    name: 'Alice Johnson',
    location: 'New York, USA',
    avatarUrl: 'https://placehold.co/100x100.png',
    rating: 5,
  },
  {
    id: 't2',
    quote: 'A truly luxurious experience. From the moment we arrived, we felt pampered. The attention to detail is incredible. Highly recommend for a special occasion.',
    name: 'David & Sarah Miller',
    location: 'London, UK',
    avatarUrl: 'https://placehold.co/100x100.png',
    rating: 5,
  },
  {
    id: 't3',
    quote: 'Beautiful hotel with amazing amenities. The staff were friendly and always helpful. The food at the restaurant was also top-notch. A perfect getaway!',
    name: 'Maria Rodriguez',
    location: 'Madrid, Spain',
    avatarUrl: 'https://placehold.co/100x100.png',
    rating: 4,
  },
];
