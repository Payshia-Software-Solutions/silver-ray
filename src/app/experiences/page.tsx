
import type { Metadata } from 'next';
import { ExperiencesPageContent } from '@/components/experiences/ExperiencesPageContent';

export const metadata: Metadata = {
  title: 'Experiences',
  description: 'Discover a world of curated experiences at Grand Silver Ray. From cultural dance performances to sapphire mine tours, create unforgettable moments in Ratnapura.',
  openGraph: {
    title: 'Unforgettable Experiences Await | Grand Silver Ray',
    description: 'Explore curated journeys designed to inspire, rejuvenate, and delight during your stay with us.',
    images: ['https://content-provider.payshia.com/silver-ray/other/Experiences-optimized.webp'],
  },
};

export default function ExperiencesPage() {
    return <ExperiencesPageContent />;
}
