
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

export interface WeddingPackageFromApi {
    id: number;
    package_name: string;
    hall_id: string;
    company_id: string;
    status: string;
    short_description: string;
    detailed_description: string;
    price: string;
    max_guests: number;
    inclusions: string | null;
    weddinng_image: string | null;
    created_by: string;
    updated_by: string | null;
    created_at: string;
    updated_at: string;
}

export interface WeddingImage {
    id: number;
    wedding_id: number;
    company_id: string;
    image_name: string;
    image_url: string;
    file_size: number;
    alt_text: string;
    is_primary: number;
    display_order: number;
    uploaded_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    is_active: number;
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


export interface ExperienceFromApi {
    id: number;
    name: string;
    company_id: string;
    meeting_Point: string;
    short_description: string;
    detailed_description: string;
    duration: string;
    Price: string;
    pricing_basis: string;
    min_participants: number;
    max_participants: number;
    advance_booking_required: number;
    walk_in_available: number;
    day_of_week: string;
    is_available: number;
    schedule_note: string;
    status: string;
    experience_image: string | null;
    time_slot: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string | null;
}

export interface ExperienceImage {
    id: number;
    experience_id: number;
    company_id: string;
    image_name: string;
    image_url: string;
    file_size: number;
    alt_text: string;
    is_primary: number;
    display_order: number;
    uploaded_by: string;
    updated_by: string | null;
    created_at: string;
    updated_at: string;
    is_active: number;
}

export interface FeaturedExperience {
  id: string;
  imageUrl: string;
  imageHint: string;
  title: string;
  description: string;
  duration: string;
  pricePerPerson: string;
  bookingDetails: string;
}

export interface RestaurantFromApi {
    id: number;
    venue_name: string;
    short_description: string;
    detailed_description: string;
    capacity: string;
    operating_hours_id: string;
    feature_id: string;
    "restaurant _image": string | null;
    status: string;
    status_notes: string;
    company_id: string;
    created_by: string;
    updated_by: string | null;
    created_at: string;
    updated_at: string;
}

export interface RestaurantImage {
    id: number;
    restaurant_id: number;
    company_id: number;
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

export interface EventFromApi {
  id: string;
  event_name: string;
  event_type: string;
  event_date: string;
  start_time: string;
  end_time: string;
  hall_id: string;
  guest_count: string;
  booking_status: string;
  company_id: string;
  created_by: string;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventImage {
    id: string;
    event_id: string;
    company_id: string;
    image_name: string;
    image_url: string;
    file_size: string;
    alt_text: string;
    is_primary: string;
    display_order: string;
    uploaded_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    is_active: string;
}
