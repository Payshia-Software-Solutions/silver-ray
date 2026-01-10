
import type { Metadata } from 'next';
import { GalleryPageContent } from '@/components/gallery/GalleryPageContent';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore the stunning photo gallery of Grand Silver Ray. A glimpse into the elegance, luxury, and breathtaking views that await you at our hotel in Ratnapura.',
  openGraph: {
    title: 'Grand Silver Ray Photo Gallery',
    description: 'Browse images of our luxurious rooms, elegant event halls, exquisite dining, and scenic surroundings.',
    images: ['https://content-provider.payshia.com/silver-ray/gallery-images/1/weddingcover-68dd4bf6634a3.jpg'],
  },
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
