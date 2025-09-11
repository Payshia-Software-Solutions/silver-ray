
import type { LucideIcon } from 'lucide-react';

export interface RoomFromApi {
  id: number;
  room_number: string;
  descriptive_title: string;
  current_status: 'Available' | 'Booked' | 'Under Maintenance';
  price_per_night: string;
  currency: string;
  room_type_id: number;
  short_description: string;
  adults_capacity: number;
  children_capacity: number;
  room_width: string;
  room_height: string;
  amenities_id: string; // Comma-separated string of amenity IDs
  image_url: string;
  company_id: string;
  created_by: string;
  updated_by: string | null;
  is_active: number;
}

export interface Room extends RoomFromApi {
  imageUrl: string;
  imageHint?: string;
  images?: RoomImage[];
  amenities: string[];
  capacity: number;
  beds: string;
  size: string;
  category: 'Standard' | 'Deluxe' | 'Suite' | 'Villa';
  rating?: number;
  features?: string[];
  viewType?: string;
  enhanceYourStay?: string[];
  roomLayoutImageUrl?: string;
  longDescription?: string;
}


export interface RoomImage {
  id: number;
  room_id: number;
  company_id: string;
  image_name: string;
  image_url: string;
  file_size: number;
  alt_text: string;
  is_primary: number;
  display_order: number;
  uploaded_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  is_active: number;
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

export interface WeddingPackageInclusion {
  icon: LucideIcon;
  text: string;
}
export interface WeddingPackage {
  id: string;
  name: string;
  price?: string;
  icon: LucideIcon;
  iconImageUrl?: string;
  imageHint: string;
  inclusions: WeddingPackageInclusion[];
  shortDescription?: string;
  heroImage?: string;
  heroImageHint?: string;
}
