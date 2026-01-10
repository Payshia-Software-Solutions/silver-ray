
import type { Metadata } from 'next';
import { WeddingPageContent } from '@/components/weddings/WeddingPageContent';

export const metadata: Metadata = {
  title: 'Weddings',
  description: 'Discover the perfect wedding venues and packages at Grand Silver Ray in Ratnapura. From elegant ballrooms to intimate garden settings, we make your dream wedding a reality.',
  openGraph: {
    title: 'Your Dream Wedding at Grand Silver Ray',
    description: 'Explore stunning venues, comprehensive packages, and exceptional services for your unforgettable day.',
    images: ['https://content-provider.payshia.com/silver-ray/gallery-images/1/weddingcover-68dd4bf6634a3.jpg'],
  },
};

export default function WeddingsPage() {
  return <WeddingPageContent />;
}
