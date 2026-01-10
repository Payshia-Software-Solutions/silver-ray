
import type { Metadata } from 'next';
import { RoomsPageContent } from '@/components/rooms/RoomsPageContent';

export const metadata: Metadata = {
  title: 'Rooms & Suites',
  description: 'Explore the luxurious rooms and suites at Grand Silver Ray. Each space is designed for comfort and elegance, offering stunning views and premium amenities for your stay in Ratnapura.',
  openGraph: {
    title: 'Our Luxurious Rooms & Suites | Grand Silver Ray',
    description: 'Find your perfect sanctuary. Browse our collection of rooms and suites designed for ultimate comfort.',
    images: ['https://content-provider.payshia.com/silver-ray/gallery-images/1/Roomcover-68dd4bf5ca125.jpg'],
  },
};

export default function RoomsPage() {
    return <RoomsPageContent />;
}
