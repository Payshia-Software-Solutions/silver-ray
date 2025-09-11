
import type { LucideIcon } from 'lucide-react';

export interface Room {
  id: number;
  descriptive_title: string;
  short_description: string;
  price_per_night: string;
  imageUrl: string; // This will be populated from the images endpoint
  imageHint?: string; 
  images?: RoomImage[];
  amenities: string[]; // This might need adjustment based on the new API response
  adults_capacity: number; 
  children_capacity: number;
  beds: string; // Not in the new room object, might need to derive it
  size: string; // Not in the new room object, might need to derive it from width/height
  category: 'Standard' | 'Deluxe' | 'Suite' | 'Villa'; // This will be derived from room_type_id
  rating?: number; 
  features?: string[]; 
  viewType?: string; 
  enhanceYourStay?: string[]; 
  roomLayoutImageUrl?: string;
  
  // Fields from API
  room_number: string;
  room_type_id: number;
  amenities_id: string; // Assuming this is a comma-separated string of IDs
  company_id: string;
  room_width: string;
  room_height: string;
  currency: string;
  current_status: string;
  room_images: string; // Original image path, may not be used directly
  longDescription?: string; // Add if available
  capacity?: number;
}


export interface RoomImage {
  id: number;
  room_id: number;
  image_url: string;
  alt_text: string;
  is_primary: number;
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
    
