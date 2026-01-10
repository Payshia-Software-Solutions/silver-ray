
import type { Metadata } from 'next';
import { EventsPageContent } from '@/components/events/EventsPageContent';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Discover upcoming events at Grand Silver Ray. From corporate meetings to grand celebrations, find the perfect venue and services for your next event in Ratnapura.',
  openGraph: {
    title: 'Host Your Next Event With Us | Grand Silver Ray',
    description: 'Explore our versatile event spaces and dedicated team to ensure a seamless and memorable occasion.',
    images: ['https://content-provider.payshia.com/silver-ray/other/events.webp'],
  },
};

export default function EventsPage() {
    return <EventsPageContent />;
}
