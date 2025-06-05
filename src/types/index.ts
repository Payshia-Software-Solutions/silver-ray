export interface Room {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  pricePerNight: number;
  imageUrl: string;
  images: string[];
  amenities: string[];
  capacity: number; // e.g., 2 adults, 1 child
  beds: string; // e.g., "1 King Bed" or "2 Queen Beds"
  size: string; // e.g., "45 sqm"
  category: 'Standard' | 'Deluxe' | 'Suite' | 'Villa';
  rating?: number; // 1-5 stars
  features?: string[]; // e.g., "Ocean View", "Balcony"
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location?: string;
  avatarUrl?: string;
  rating: number; // 1-5
}
