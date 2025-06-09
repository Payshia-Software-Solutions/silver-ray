
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedRoomsSection } from '@/components/home/FeaturedRoomsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { LatestOffersSection } from '@/components/home/LatestOffersSection';

export const metadata: Metadata = {
  title: 'Grand Silver Ray | Your Ultimate Luxury Hotel Experience',
  description: 'Discover unparalleled luxury and comfort at Grand Silver Ray. Book your dream getaway today at the finest resort in Paradise City.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedRoomsSection />
      <TestimonialsSection />
      <LatestOffersSection />
    </>
  );
}

