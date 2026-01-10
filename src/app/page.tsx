
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedRoomsSection } from '@/components/home/FeaturedRoomsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BanquetsAndWeddingsSection } from '@/components/home/BanquetsAndWeddingsSection';
import { EngagementSection } from '@/components/home/EngagementSection';
import { FeaturedDiningSection } from '@/components/home/FeaturedDiningSection';
import { WeddingHighlightsSection } from '@/components/home/WeddingHighlightsSection';
import { FaqSection } from '@/components/home/FaqSection';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Grand Silver Ray, the premier luxury hotel in Ratnapura. Specializing in elegant weddings, grand banquets, fine dining, and exquisite accommodations.',
  openGraph: {
    title: 'Grand Silver Ray | Luxury Hotel, Wedding & Banquet Hall in Ratnapura',
    description: 'Discover the perfect venue for your wedding, event, or luxury stay in the gem capital of Sri Lanka. Explore our banquet halls, dining, and rooms.',
    images: ['https://content-provider.payshia.com/silver-ray/other/IMG_6722-6947156a07530-optimized.webp'],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section id="next-section">
        <BanquetsAndWeddingsSection />
      </section>
      <WeddingHighlightsSection />
      <EngagementSection />
      <FeaturedDiningSection />
      <FeaturedRoomsSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
