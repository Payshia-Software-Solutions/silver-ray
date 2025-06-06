
import type { LucideIcon } from 'lucide-react';
import { Users, Image as ImageIcon, Sun, Mic, Disc, Speaker, Utensils, BedDouble, Flower2, Camera, Music, Gift, Wine, Trees, Waves, MapPin } from 'lucide-react';

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
}

export const weddingVenues: WeddingVenue[] = [
  {
    id: 'grand-ballroom',
    name: 'The Grand Ballroom',
    description: 'An opulent space with soaring ceilings, sparkling chandeliers, and a versatile layout. Perfect for lavish celebrations and formal receptions.',
    imageUrl: 'https://placehold.co/600x400.png',
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
    imageUrl: 'https://placehold.co/600x400.png',
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
    imageUrl: 'https://placehold.co/600x400.png',
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
    price: 'LKR 800,000',
    icon: Gift, // Placeholder icon
    iconImageUrl: 'https://placehold.co/100x100/EADDCA/A57C57.png?text=CE', // Placeholder, initials CE
    imageHint: 'classic wedding gift',
    inclusions: [
      { icon: Utensils, text: 'Buffet Catering (100 guests)' },
      { icon: BedDouble, text: 'Bridal Suite (1 Night)' },
      { icon: Flower2, text: 'Standard Floral Decorations' },
      { icon: Camera, text: '4-Hour Photography' },
    ],
  },
  {
    id: 'romantic-dream',
    name: 'Romantic Dream Package',
    price: 'LKR 1,200,000',
    icon: Flower2,
    iconImageUrl: 'https://placehold.co/100x100/F7D9E3/D170A2.png?text=RD', // Placeholder, initials RD
    imageHint: 'romantic wedding flowers',
    inclusions: [
      { icon: Utensils, text: 'Plated Dinner (80 guests)' },
      { icon: BedDouble, text: 'Honeymoon Suite (1 Night)' },
      { icon: Flower2, text: 'Premium Floral Arrangements' },
      { icon: Music, text: 'Live Band or DJ (3 hours)' },
    ],
  },
  {
    id: 'luxury-affair',
    name: 'Luxury Affair Package',
    price: 'LKR 2,000,000',
    icon: Wine,
    iconImageUrl: 'https://placehold.co/100x100/D4AF37/8C6D2F.png?text=LA', // Placeholder, initials LA
    imageHint: 'luxury wedding champagne',
    inclusions: [
      { icon: Utensils, text: 'Gourmet Menu (150 guests)' },
      { icon: BedDouble, text: 'Presidential Suite (2 Nights)' },
      { icon: Flower2, text: 'Custom Designer Decor' },
      { icon: Camera, text: 'Full-Day Videography & Photography' },
    ],
  },
  {
    id: 'intimate-gathering',
    name: 'Intimate Gathering Package',
    price: 'LKR 500,000',
    icon: Users,
    iconImageUrl: 'https://placehold.co/100x100/A2D2FF/5E86C1.png?text=IG', // Placeholder, initials IG
    imageHint: 'intimate wedding couple',
    inclusions: [
      { icon: Utensils, text: 'Cocktail Menu (50 guests)' },
      { icon: BedDouble, text: 'Deluxe Room (1 Night)' },
      { icon: Flower2, text: 'Elegant Minimalist Decor' },
      { icon: Music, text: 'Background Music System' },
    ],
  },
];
