
import type { LucideIcon } from 'lucide-react';
import { Users, Image as ImageIcon, Sun, Mic, Disc, Speaker, Utensils, BedDouble, Flower2, Camera, Music, Gift, Wine, Trees, Waves, MapPin, ClipboardCheck, Hotel, Sparkles, ListChecks, Wrench, CheckCircle, Leaf, Guitar, Cake } from 'lucide-react';
import type { Testimonial } from '@/types';


export interface WeddingFeature {
  icon: LucideIcon;
  text: string;
}

export interface WeddingVenue {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  features: WeddingFeature[];
}

export interface WeddingPackageInclusion {
  icon: LucideIcon;
  text: string;
}
export interface WeddingPackage {
  id: string;
  name: string;
  price?: string;
  icon: LucideIcon; // Fallback if iconImageUrl is not provided
  iconImageUrl?: string; // Optional: if you have specific images for package icons
  imageHint: string;
  inclusions: WeddingPackageInclusion[];
  shortDescription?: string; // Added for overview section
  heroImage?: string; // Optional: specific hero image for package page
  heroImageHint?: string; // Hint for hero image
}

// This is the existing structure for the public wedding page
export interface WeddingServiceDisplayInfo {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const weddingServices: WeddingServiceDisplayInfo[] = [
  {
    icon: Utensils,
    title: 'Custom Catering',
    description: 'Exquisite menus tailored to your taste, from lavish buffets to fine dining, crafted by our acclaimed chefs.',
  },
  {
    icon: Flower2,
    title: 'Elegant Decor',
    description: 'From floral arrangements to lighting, our creative team brings your vision to life with bespoke decor solutions.',
  },
  {
    icon: ClipboardCheck,
    title: 'Event Planning',
    description: 'Our experienced event planners ensure every detail is perfect, from the initial consultation to your big day.',
  },
  {
    icon: BedDouble,
    title: 'Guest Accommodation',
    description: 'Luxurious rooms and suites for your guests, with special wedding rates and personalized amenities.',
  },
];


// New structure for manageable wedding services in the admin panel
export interface ManageableWeddingService {
  id: string;
  name: string;
  description: string;
  price?: string;
  iconImageUrl?: string;
  imageHint?: string;
  defaultIcon?: LucideIcon; // For display in table if no image
}

export const initialManageableWeddingServices: ManageableWeddingService[] = [
  {
    id: 'service-catering-premium',
    name: 'Premium Catering Package',
    description: 'Full-service catering including a 5-course meal, dessert bar, and premium beverages for up to 150 guests.',
    price: 'LKR 750,000',
    iconImageUrl: 'https://placehold.co/100x100/FFE0B2/A1887F.png?text=CT',
    imageHint: 'catering food setup',
    defaultIcon: Utensils,
  },
  {
    id: 'service-decor-luxury',
    name: 'Luxury Floral & Decor',
    description: 'Bespoke floral arrangements, themed venue decoration, ambient lighting, and custom centerpieces.',
    price: 'LKR 400,000',
    iconImageUrl: 'https://placehold.co/100x100/C8E6C9/66BB6A.png?text=DC',
    imageHint: 'floral wedding decor',
    defaultIcon: Flower2,
  },
  {
    id: 'service-photo-video-full',
    name: 'Full Day Photo & Video',
    description: 'Comprehensive photography and videography coverage from preparations to the end of the reception, including drone shots.',
    price: 'LKR 300,000',
    defaultIcon: Camera,
  },
  {
    id: 'service-music-dj-live',
    name: 'DJ & Live Music Combo',
    description: 'Professional DJ services for the reception and a live acoustic band for the ceremony and cocktail hour.',
    price: 'LKR 200,000',
    imageHint: 'dj music setup',
    defaultIcon: Music,
  },
];


export const weddingVenues: WeddingVenue[] = [
  {
    id: 'grand-ballroom',
    name: 'The Grand Ballroom',
    description: 'An opulent space with soaring ceilings, sparkling chandeliers, and a versatile layout. Perfect for lavish celebrations and formal receptions.',
    imageUrl: 'https://images.unsplash.com/photo-1517456363055-5d162a453d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxncmFuZCUyMGJhbGxyb29tJTIwd2VkZGluZ3xlbnwwfHx8fDE3NDkxOTI0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'grand ballroom wedding',
    features: [
      { icon: Users, text: 'Capacity: 300 guests' },
      { icon: Disc, text: 'Spacious Dance Floor' },
      { icon: Mic, text: 'AV Equipment Ready' },
      { icon: Sun, text: 'Adjustable Lighting' },
    ],
  },
  {
    id: 'garden-terrace',
    name: 'The Garden Terrace',
    description: 'Exchange vows amidst lush greenery and blooming florals. Our open-air terrace offers an intimate and romantic setting under the stars.',
    imageUrl: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxnYXJkZW4lMjB3ZWRkaW5nJTIwdGVycmFjZXxlbnwwfHx8fDE3NDkxOTI0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'garden wedding terrace',
    features: [
      { icon: Users, text: 'Capacity: 100 guests' },
      { icon: Trees, text: 'Outdoor Setting' },
      { icon: Sun, text: 'Natural Light / Fairy Lights' },
      { icon: Speaker, text: 'PA System Available' },
    ],
  },
  {
    id: 'emerald-lounge',
    name: 'Emerald Lounge',
    description: 'A chic, contemporary space ideal for smaller gatherings, cocktail hours, or pre-wedding events. Features stylish decor and a relaxed ambiance.',
    imageUrl: 'https://images.unsplash.com/photo-1618107071432-a6579169dfc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsb3VuZ2UlMjB3ZWRkaW5nJTIwcmVjZXB0aW9ufGVufDB8fHx8MTc0OTE5MjQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'lounge wedding reception',
    features: [
      { icon: Users, text: 'Capacity: 60 guests' },
      { icon: Wine, text: 'Built-in Bar Area' },
      { icon: Music, text: 'Lounge Seating' },
      { icon: ImageIcon, text: 'Modern Decor' },
    ],
  },
];

export const weddingPackages: WeddingPackage[] = [
  {
    id: 'classic-elegance',
    name: 'Classic Elegance Package',
    shortDescription: 'Experience a timeless wedding celebration with our Classic Elegance package. Every detail is meticulously crafted to create an unforgettable day that reflects your unique love story.',
    price: 'LKR 800,000',
    icon: Gift,
    iconImageUrl: 'https://placehold.co/100x100/EADDCA/A57C57.png?text=CE',
    heroImage: 'https://placehold.co/1920x700/EADDCA/A57C57.png?text=Classic+Elegance',
    heroImageHint: 'elegant wedding setup',
    imageHint: 'classic wedding gift',
    inclusions: [
      { icon: Utensils, text: 'Buffet Catering (100 guests)' },
      { icon: Utensils, text: 'Welcome drinks for guests' },
      { icon: Flower2, text: 'Standard Floral Decorations for Venue' },
      { icon: Flower2, text: 'Bridal Bouquet & Groom Boutonniere' },
      { icon: Camera, text: '4-Hour Photography Coverage' },
      { icon: Camera, text: 'Online Photo Gallery' },
      { icon: Music, text: 'Background Music System for Ceremony' },
      { icon: BedDouble, text: 'Bridal Suite (1 Night)' },
      { icon: ClipboardCheck, text: 'Dedicated Wedding Coordinator' },
      { icon: Sparkles, text: 'Standard Ceremony Setup' },
    ],
  },
  {
    id: 'romantic-dream',
    name: 'Romantic Dream Package',
    shortDescription: 'Our Romantic Dream package offers an enchanting experience. Focus on romance with premium services and beautiful settings.',
    price: 'LKR 1,200,000',
    icon: Flower2,
    iconImageUrl: 'https://placehold.co/100x100/F7D9E3/D170A2.png?text=RD',
    heroImage: 'https://placehold.co/1920x700/F7D9E3/D170A2.png?text=Romantic+Dream',
    heroImageHint: 'romantic wedding decor',
    imageHint: 'romantic wedding flowers',
    inclusions: [
      { icon: Utensils, text: 'Plated Dinner (80 guests)' },
      { icon: Utensils, text: 'Custom Wedding Cake' },
      { icon: Flower2, text: 'Premium Floral Arrangements' },
      { icon: Flower2, text: 'Ceremony Arch & Aisle Decor' },
      { icon: Camera, text: '6-Hour Photography & Basic Videography' },
      { icon: Music, text: 'Live Band or DJ (3 hours)' },
      { icon: Music, text: 'Professional Sound System' },
      { icon: BedDouble, text: 'Honeymoon Suite (1 Night with breakfast)' },
      { icon: BedDouble, text: 'Special turndown service' },
      { icon: ClipboardCheck, text: 'Full Wedding Planning Assistance' },
      { icon: Sparkles, text: 'Enhanced Ceremony Setup with Draping' },
    ],
  },
  {
    id: 'luxury-affair',
    name: 'Luxury Affair Package',
    shortDescription: 'Indulge in the ultimate luxury wedding. This all-inclusive package provides top-tier services and an unforgettable experience.',
    price: 'LKR 2,000,000',
    icon: Wine,
    iconImageUrl: 'https://placehold.co/100x100/D4AF37/8C6D2F.png?text=LA',
    heroImage: 'https://placehold.co/1920x700/D4AF37/8C6D2F.png?text=Luxury+Affair',
    heroImageHint: 'luxury wedding reception',
    imageHint: 'luxury wedding champagne',
    inclusions: [
      { icon: Utensils, text: 'Gourmet Menu & Live Cooking Stations (150 guests)' },
      { icon: Utensils, text: 'Champagne Toast & Premium Bar Service' },
      { icon: Flower2, text: 'Custom Designer Decor & Theming' },
      { icon: Flower2, text: 'Luxury Centerpieces and Linens' },
      { icon: Camera, text: 'Full-Day Videography & Photography (2 photographers)' },
      { icon: Camera, text: 'Drone Coverage & Cinematic Wedding Film' },
      { icon: Music, text: 'Premium DJ, Live Band, and MC Services' },
      { icon: Music, text: 'Advanced Lighting and Effects' },
      { icon: BedDouble, text: 'Presidential Suite (2 Nights with all meals)' },
      { icon: BedDouble, text: 'Guest Accommodation Discounts (10 rooms)' },
      { icon: ClipboardCheck, text: 'End-to-End Wedding Management' },
      { icon: Sparkles, text: 'Grand Ceremony Setup with Custom Stage' },
    ],
  },
  {
    id: 'intimate-gathering',
    name: 'Intimate Gathering Package',
    shortDescription: 'Perfect for smaller weddings, our Intimate Gathering package ensures a beautiful and personal celebration.',
    price: 'LKR 500,000',
    icon: Users,
    iconImageUrl: 'https://placehold.co/100x100/A2D2FF/5E86C1.png?text=IG',
    heroImage: 'https://placehold.co/1920x700/A2D2FF/5E86C1.png?text=Intimate+Gathering',
    heroImageHint: 'intimate wedding dinner',
    imageHint: 'intimate wedding couple',
    inclusions: [
      { icon: Utensils, text: 'Cocktail Menu & Canapés (50 guests)' },
      { icon: Utensils, text: 'Sparkling Wine for Toasting' },
      { icon: Flower2, text: 'Elegant Minimalist Decor' },
      { icon: Flower2, text: 'Bridal Bouquet and Groom Boutonniere' },
      { icon: Camera, text: '3-Hour Photography Session' },
      { icon: Music, text: 'Curated Background Music System' },
      { icon: BedDouble, text: 'Deluxe Room (1 Night)' },
      { icon: ClipboardCheck, text: 'On-the-day Wedding Coordinator' },
      { icon: Sparkles, text: 'Simple & Elegant Ceremony Setup' },
    ],
  },
];


export const weddingTestimonials: Testimonial[] = [
  {
    id: 'wt1',
    quote: "We couldn't have imagined a more magical setting for our big day. The team at Silver Ray made every moment seamless and special. The venue was breathtaking, the food delicious, and the service flawless!",
    name: 'Nimali & Suraj P.',
    location: 'Colombo, Sri Lanka',
    avatarUrl: 'https://placehold.co/100x100.png?text=NS',
    rating: 5,
  },
  {
    id: 'wt2',
    quote: "The Garden Terrace was the perfect backdrop for our sunset vows. The service, flowers, and attention to detail were beyond our expectations. Thank you, Silver Ray, for making our dream wedding come true!",
    name: 'Karen & Mark D.',
    location: 'Sydney, Australia',
    avatarUrl: 'https://placehold.co/100x100.png?text=KM',
    rating: 5,
  },
];

export { Wrench as DefaultServiceIcon, CheckCircle };

export const getWeddingPackageById = (id: string): WeddingPackage | undefined => {
  return weddingPackages.find(pkg => pkg.id === id);
};

export interface WeddingAddon {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
  price: string;
}

export const premiumWeddingAddons: WeddingAddon[] = [
  {
    id: 'addon-florals',
    icon: Leaf,
    name: 'Premiere Florals',
    description: 'Bespoke bouquets & venue decor.',
    price: 'LKR 75,000',
  },
  {
    id: 'addon-live-music',
    icon: Guitar,
    name: 'Live Musician',
    description: 'Solo artist or string quartet.',
    price: 'LKR 60,000',
  },
  {
    id: 'addon-custom-cake',
    icon: Cake,
    name: 'Custom Wedding Cake',
    description: 'Multi-tiered designer wedding cake.',
    price: 'LKR 40,000',
  },
  {
    id: 'addon-photo-booth',
    icon: Camera,
    name: 'Photo Booth',
    description: 'Fun props & instant prints for guests.',
    price: 'LKR 35,000',
  },
];
