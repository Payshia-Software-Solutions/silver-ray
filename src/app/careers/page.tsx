
import type { Metadata } from 'next';
import { CareersPageClient } from '@/components/careers/CareersPageClient';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Grand Silver Ray team. Explore current job openings in hospitality and start your career with us in Ratnapura.',
  openGraph: {
    title: 'Join Our Team | Careers at Grand Silver Ray',
    description: 'Explore rewarding career opportunities in the hospitality industry at Grand Silver Ray.',
    images: ['https://content-provider.payshia.com/silver-ray/other/careers-694939b72a089-optimized.webp'],
  },
};

export default function CareersPage() {
  const jobOpenings = [
    { id: 'concierge', title: 'Concierge' },
    { id: 'restaurant-supervisor', title: 'Restaurant Supervisor' },
    { id: 'stores-assistant', title: 'Stores Assistant' },
  ];
  const jobTitles = jobOpenings.map(j => j.title);

  return <CareersPageClient jobTitles={jobTitles} />;
}
