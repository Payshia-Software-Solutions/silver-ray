
import type { ExperienceDetail } from '@/types';
import { Clock, CalendarDays, Users, ListChecks, XCircle, ShoppingBag, MapPin } from 'lucide-react';

export const allExperienceDetails: ExperienceDetail[] = [
  {
    id: 'cultural-dance',
    pageTitle: 'Book Your Cultural Dance Performance',
    heroImageUrl: 'https://placehold.co/1920x500.png', // Specific hero for this page
    heroImageHint: 'cultural dance performance stage',
    overviewTitle: 'Cultural Dance Performance - Overview',
    overviewContent: "Experience the magic of our region's traditional dance heritage. Dressed in authentic, vibrant costumes, talented local artists perform a range of cultural dances accompanied by live, rhythmic music. The performance takes place in our grand hotel lobby and lasts approximately 90 minutes, offering an immersive journey into the stories, customs, and celebrations that define our community. Perfect for guests of all ages, this experience promises a memorable evening of artistry, passion, and cultural connection.",
    highlightsContent: "Highlights include an introduction to the cultural significance of each dance, opportunities for audience participation, and the chance to interact with performers after the show. Don't miss this unique encounter with the region's soulful traditions!",
    details: [
      { icon: Clock, label: 'Duration', value: '90 minutes' },
      { icon: CalendarDays, label: 'Availability', value: 'Weekly (Fridays & Saturdays)' },
      { icon: Users, label: 'Participants', value: 'Minimum 2, Maximum 10' },
      { icon: ListChecks, label: 'Inclusions', value: 'Performance, Live Music, Refreshments' },
      { icon: XCircle, label: 'Exclusions', value: 'Personal expenses, Gratuities' },
      { icon: ShoppingBag, label: 'What to Bring', value: 'Camera, Comfortable Attire' },
      { icon: MapPin, label: 'Meeting Point', value: 'Hotel Lobby' },
    ],
    galleryImages: [
      { src: 'https://placehold.co/300x200.png', alt: 'Cultural Dance Performers', hint: 'dancers colorful costumes' },
      { src: 'https://placehold.co/300x200.png', alt: 'Hotel Lobby Performance Setup', hint: 'hotel lobby event' },
      { src: 'https://placehold.co/300x200.png', alt: 'Audience enjoying the show', hint: 'audience event' },
    ],
    defaultAdults: 2,
    pricePerAdult: 0, // As it's complimentary
  },
  // Add other experiences here, for example:
  {
    id: 'tea-tour',
    pageTitle: 'Book Your Tea Factory Tour',
    heroImageUrl: 'https://placehold.co/1920x500.png',
    heroImageHint: 'tea plantation landscape',
    overviewTitle: 'Tea Factory Tour - Overview',
    overviewContent: "Delve into the world of Ceylon tea with a guided tour of a historic tea factory. Learn about the journey of the tea leaf from plant to cup, witness traditional processing methods, and enjoy a tasting session of exquisite local teas. This immersive experience offers a fascinating glimpse into Sri Lanka's rich tea heritage.",
    highlightsContent: "Highlights include a walk through lush tea fields (weather permitting), a detailed explanation of tea manufacturing stages (withering, rolling, fermentation, drying, sorting), and a guided tea tasting session. You'll also have the opportunity to purchase fresh factory-direct teas.",
    details: [
      { icon: Clock, label: 'Duration', value: 'Approx. 2 hours' },
      { icon: CalendarDays, label: 'Availability', value: 'Daily, morning & afternoon sessions' },
      { icon: Users, label: 'Participants', value: 'Minimum 2, Maximum 12' },
      { icon: ListChecks, label: 'Inclusions', value: 'Guided tour, Tea tasting, Factory entry' },
      { icon: XCircle, label: 'Exclusions', value: 'Transportation to factory, Personal purchases' },
      { icon: ShoppingBag, label: 'What to Bring', value: 'Comfortable shoes, Sun hat, Camera' },
      { icon: MapPin, label: 'Meeting Point', value: 'Tea Factory Reception' },
    ],
    galleryImages: [
      { src: 'https://placehold.co/300x200.png', alt: 'Tea pickers in a field', hint: 'tea picking workers' },
      { src: 'https://placehold.co/300x200.png', alt: 'Tea processing machinery', hint: 'tea factory machines' },
      { src: 'https://placehold.co/300x200.png', alt: 'Tea tasting setup', hint: 'tea cups tasting' },
    ],
    defaultAdults: 2,
    pricePerAdult: 3500,
  }
  // ... other experiences
];

export const getExperienceDetailById = (id: string): ExperienceDetail | undefined => {
  return allExperienceDetails.find(exp => exp.id === id);
};

    