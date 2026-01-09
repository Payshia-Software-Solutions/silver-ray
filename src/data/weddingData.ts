
import type { LucideIcon } from 'lucide-react';
import { Users, Image as ImageIcon, Sun, Mic, Disc, Speaker, Utensils, BedDouble, Flower2, Camera, Music, Gift, Wine, Trees, Waves, MapPin, ClipboardCheck, Hotel, Sparkles, ListChecks, Wrench, CheckCircle, Leaf, Guitar, Cake, Wifi, Rss, Projector, Lightbulb, Car, Bus } from 'lucide-react';
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
  brand: 'Grand Silver Ray' | 'Silver Ray';
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
  brand: 'Grand Silver Ray' | 'Silver Ray';
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
    icon: Cake,
    title: 'Cake Structures',
    description: 'Beautiful and elaborate structures to showcase your wedding cake and create a stunning centerpiece.',
  },
  {
    icon: ClipboardCheck,
    title: 'Reservation Representatives',
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
    id: 'cats-eye-01',
    name: "Cat's Eye 01",
    description: 'A magnificent hall with classic decor, perfect for grand weddings and corporate galas.',
    imageUrl: 'http://content-provider.payshia.com/silver-ray/other/BANQUET-1.webp',
    imageHint: 'elegant banquet hall setup',
    features: [
      { icon: Users, text: 'Up to 230-300 guests' },
      { icon: Rss, text: 'Advanced AV System' },
      { icon: Lightbulb, text: 'RGB lights & moving heads' },
      { icon: Projector, text: 'Projector screens' },
      { icon: Wifi, text: 'Free Wi-Fi' },
    ],
    brand: 'Grand Silver Ray',
  },
  {
    id: 'cats-eye-02',
    name: "Cat's Eye 02",
    description: 'A versatile space with modern aesthetics, ideal for conferences and elegant receptions.',
    imageUrl: 'http://content-provider.payshia.com/silver-ray/other/BANQUET-2.webp',
    imageHint: 'modern banquet hall reception',
    features: [
      { icon: Users, text: 'Up to 230-300 guests' },
      { icon: Rss, text: 'Advanced AV System' },
      { icon: Lightbulb, text: 'RGB lights & moving heads' },
      { icon: Projector, text: 'Projector screens' },
      { icon: Wifi, text: 'Free Wi-Fi' },
    ],
    brand: 'Grand Silver Ray',
  },
   {
    id: 'cats-eye-03',
    name: "Cat's Eye 03",
    description: 'An intimate setting with lush decor, perfect for smaller weddings, workshops, and private dinners.',
    imageUrl: 'http://content-provider.payshia.com/silver-ray/other/BANQUET-3.webp',
    imageHint: 'intimate banquet setting',
    features: [
      { icon: Users, text: 'Up to 230-300 guests' },
      { icon: Rss, text: 'Advanced AV System' },
      { icon: Lightbulb, text: 'RGB lights & moving heads' },
      { icon: Projector, text: 'Projector screens' },
      { icon: Wifi, text: 'Free Wi-Fi' },
    ],
    brand: 'Grand Silver Ray',
  },
  {
    id: 'blue-sapphire',
    name: "Blue Sapphire",
    description: 'A modern and sleek hall, the Blue Sapphire offers a contemporary setting for stylish weddings.',
    imageUrl: 'https://content-provider.payshia.com/silver-ray/other/Blue%20Sappire.jpg',
    imageHint: 'modern blue wedding hall',
    features: [
      { icon: Users, text: 'Up to 250 guests' },
      { icon: Rss, text: 'Sound system' },
      { icon: Projector, text: 'Projector screen' },
      { icon: Wifi, text: 'Free Wi-Fi' },
    ],
    brand: 'Silver Ray',
  },
  {
    id: 'pink-sapphire',
    name: "Pink Sapphire",
    description: 'Bathed in warm light, the Pink Sapphire hall provides a bright and cheerful atmosphere for daytime events.',
    imageUrl: 'https://content-provider.payshia.com/silver-ray/other/Pink%20Sapphire.jpg',
    imageHint: 'bright pink wedding hall',
    features: [
      { icon: Users, text: 'Up to 250 guests' },
      { icon: Rss, text: 'Sound system' },
      { icon: Projector, text: 'Projector screen' },
      { icon: Wifi, text: 'Free Wi-Fi' },
    ],
    brand: 'Silver Ray',
  },
];

export const weddingPackages: WeddingPackage[] = [
  {
    id: 'gsr-menu-1',
    brand: 'Grand Silver Ray',
    name: 'Grand Silver Ray Menu 01',
    shortDescription: 'Details of our premier wedding menu for 2026.',
    price: 'LKR 800,000',
    icon: Gift,
    iconImageUrl: '',
    imageHint: 'classic wedding gift',
    inclusions: [],
  },
  {
    id: 'gsr-menu-2',
    brand: 'Grand Silver Ray',
    name: 'Grand Silver Ray Menu 02',
    shortDescription: 'An alternative premier menu for your special day.',
    price: 'LKR 1,200,000',
    icon: Gift,
    iconImageUrl: '',
    imageHint: 'classic wedding gift',
    inclusions: [],
  },
    {
    id: 'gsr-menu-3',
    brand: 'Grand Silver Ray',
    name: 'Grand Silver Ray Menu 03',
    shortDescription: 'A third option for our premier wedding menu selections.',
    price: 'LKR 1,200,000',
    icon: Gift,
    iconImageUrl: '',
    imageHint: 'classic wedding gift',
    inclusions: [],
  },
  {
    id: 'sr-gold',
    brand: 'Silver Ray',
    name: 'Gold Menu 2026',
    shortDescription: 'Explore the exquisite offerings in our Gold wedding package.',
    price: 'LKR 2,000,000',
    icon: Wine,
    iconImageUrl: '',
    imageHint: 'luxury wedding champagne',
    inclusions: [
      { icon: Utensils, text: 'Gourmet Menu & Live Stations' },
      { icon: Camera, text: 'Full-Day Videography & Photo' },
      { icon: Music, text: 'Premium DJ and Live Band' },
      { icon: BedDouble, text: 'Presidential Suite (2 Nights)' },
    ],
  },
  {
    id: 'sr-platinum',
    brand: 'Silver Ray',
    name: 'Platinum Menu 2026',
    shortDescription: 'Our most luxurious menu for an unforgettable celebration.',
    price: 'LKR 2,000,000',
    icon: Wine,
    iconImageUrl: '',
    imageHint: 'luxury wedding champagne',
    inclusions: [
      { icon: Utensils, text: 'Gourmet Menu & Live Stations' },
      { icon: Camera, text: 'Full-Day Videography & Photo' },
      { icon: Music, text: 'Premium DJ and Live Band' },
      { icon: BedDouble, text: 'Presidential Suite (2 Nights)' },
    ],
  },
  {
    id: 'sr-silver',
    brand: 'Silver Ray',
    name: 'Silver Menu 2026',
    shortDescription: 'An elegant and affordable option for your special day.',
    price: 'LKR 2,000,000',
    icon: Wine,
    iconImageUrl: '',
    imageHint: 'luxury wedding champagne',
    inclusions: [
      { icon: Utensils, text: 'Gourmet Menu & Live Stations' },
      { icon: Camera, text: 'Full-Day Videography & Photo' },
      { icon: Music, text: 'Premium DJ and Live Band' },
      { icon: BedDouble, text: 'Presidential Suite (2 Nights)' },
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
