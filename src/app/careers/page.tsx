
import type { Metadata } from 'next';
import { CareersPageClient } from '@/components/careers/CareersPageClient';
import React from 'react';
import { DollarSign, BarChart, Smile, Heart, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Grand Silver Ray team. Explore current job openings in hospitality and start your career with us in Ratnapura.',
  openGraph: {
    title: 'Join Our Team | Careers at Grand Silver Ray',
    description: 'Explore rewarding career opportunities in the hospitality industry at Grand Silver Ray.',
    images: ['https://content-provider.payshia.com/silver-ray/other/careers-694939b72a089-optimized.webp'],
  },
};

const jobOpenings = [
    { 
        id: 'concierge', 
        title: 'Concierge',
        description: 'Be the first point of contact for our guests, providing exceptional service and local recommendations to ensure a memorable stay.'
    },
    { 
        id: 'restaurant-supervisor', 
        title: 'Restaurant Supervisor',
        description: 'Oversee daily restaurant operations, lead the service team, and ensure guests enjoy an outstanding dining experience.'
    },
    { 
        id: 'stores-assistant', 
        title: 'Stores Assistant',
        description: 'Manage inventory, receive and organize supplies, and maintain stock levels to support smooth hotel operations.'
    },
];

const companyValues = [
    {
        icon: DollarSign,
        title: "Competitive Salary",
        description: "We offer attractive compensation packages that recognize your skills and contributions."
    },
    {
        icon: BarChart,
        title: "Professional Growth",
        description: "Opportunities for training, development, and career advancement within our growing organization."
    },
    {
        icon: Smile,
        title: "Vibrant Team Culture",
        description: "Join a supportive and dynamic team that values collaboration, respect, and a passion for hospitality."
    },
    {
        icon: Heart,
        title: "Health & Wellness",
        description: "We prioritize the well-being of our staff with comprehensive benefits and a healthy work environment."
    }
];


export default function CareersPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CareersPageClient jobOpenings={jobOpenings} companyValues={companyValues} />
    </React.Suspense>
  );
}
