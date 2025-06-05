import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedRoomsSection } from '@/components/home/FeaturedRoomsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CtaBanner } from '@/components/home/CtaBanner';

export const metadata: Metadata = {
  title: 'LuxeStay | Your Ultimate Luxury Hotel Experience',
  description: 'Discover unparalleled luxury and comfort at LuxeStay. Book your dream getaway today at the finest resort in Paradise City.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedRoomsSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
