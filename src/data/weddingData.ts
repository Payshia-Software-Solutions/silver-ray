
import type { LucideIcon } from 'lucide-react';
import { Users, Image as ImageIcon, Sun, Mic, Disc, Speaker, Utensils, BedDouble, Flower2, Camera, Music, Gift, Wine, Trees, Waves, MapPin, ClipboardCheck, Hotel } from 'lucide-react';
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
}

export interface WeddingService {
  icon: LucideIcon;
  title: string;
  description: string;
}

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
    price: 'LKR 800,000',
    icon: Gift, 
    iconImageUrl: 'https://placehold.co/100x100/EADDCA/A57C57.png?text=CE', 
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
    iconImageUrl: 'https://placehold.co/100x100/F7D9E3/D170A2.png?text=RD', 
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
    iconImageUrl: 'https://placehold.co/100x100/D4AF37/8C6D2F.png?text=LA', 
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
    iconImageUrl: 'https://placehold.co/100x100/A2D2FF/5E86C1.png?text=IG', 
    imageHint: 'intimate wedding couple',
    inclusions: [
      { icon: Utensils, text: 'Cocktail Menu (50 guests)' },
      { icon: BedDouble, text: 'Deluxe Room (1 Night)' },
      { icon: Flower2, text: 'Elegant Minimalist Decor' },
      { icon: Music, text: 'Background Music System' },
    ],
  },
];

export const weddingServices: WeddingService[] = [
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
    icon: BedDouble, // Using BedDouble for guest accommodation
    title: 'Guest Accommodation',
    description: 'Luxurious rooms and suites for your guests, with special wedding rates and personalized amenities.',
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

