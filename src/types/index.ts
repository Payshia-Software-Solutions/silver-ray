
import type { LucideIcon } from 'lucide-react';

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
  viewType?: string; // e.g., "Oceanfront and the lush green mountains"
  enhanceYourStay?: string[]; // e.g., ["Close to the Spa", "Ideal for Honeymooners"]
  roomLayoutImageUrl?: string; // URL for the floor plan image
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location?: string;
  avatarUrl?: string;
  rating: number; // 1-5
}

export interface DietaryIndicator {
  type: 'vegetarian' | 'vegan' | 'gluten-free' | 'spicy' | 'nuts';
  label: string;
  color: string; // Tailwind color class e.g., 'bg-green-500'
}

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: string; // e.g., "LKR 2,500"
  imageUrl: string;
  imageHint: string;
  dietaryIndicators?: DietaryIndicator[];
  isChefSpecial?: boolean;
  tags?: string[]; // e.g., "Popular", "New" - could be displayed as badges
}

export interface MenuCategoryType {
  id: string;
  name: string; // e.g., "Breakfast", "Starters / Appetizers"
  items: MenuItemType[];
}

export interface RestaurantMenuType {
  venueId: string; // Corresponds to VenueProps.id from dining page
  venueName: string;
  venueDescription?: string;
  heroImageUrl: string;
  heroImageHint: string;
  categories: MenuCategoryType[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface GalleryImageItem {
  src: string;
  alt: string;
  hint: string;
}

export interface ExperienceDetailItem {
  icon: LucideIcon;
  label: string;
  value: string;
}
export interface ExperienceDetail {
  id: string; // Should match an ID from featuredExperiences
  pageTitle: string; // e.g., "Book Your Cultural Dance Performance"
  heroImageUrl: string;
  heroImageHint: string;
  overviewTitle: string;
  overviewContent: string;
  highlightsContent: string;
  details: ExperienceDetailItem[];
  galleryImages: GalleryImageItem[];
  // Fields for the form defaults, if any specific to experience
  defaultAdults?: number;
  defaultChildren?: number;
  pricePerAdult?: number; // Optional: for dynamic pricing display
  pricePerChild?: number; // Optional: for dynamic pricing display
}

    