
import type { Metadata } from 'next';
import NextImage from 'next/image';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore the beauty of Grand Silver Ray through our photo gallery.',
};

const galleryImages = [
  { src: "https://placehold.co/600x400.png", alt: "Hotel Exterior", hint: "hotel architecture" },
  { src: "https://placehold.co/600x400.png", alt: "Luxury Suite Interior", hint: "luxury bedroom" },
  { src: "https://placehold.co/600x400.png", alt: "Poolside View", hint: "resort pool" },
  { src: "https://placehold.co/600x400.png", alt: "Restaurant Ambiance", hint: "fine dining" },
  { src: "https://placehold.co/600x400.png", alt: "Beachfront Scenery", hint: "beach sunset" },
  { src: "https://placehold.co/600x400.png", alt: "Spa Serenity", hint: "spa massage" },
  { src: "https://placehold.co/600x400.png", alt: "Lobby Grandeur", hint: "hotel lobby" },
  { src: "https://placehold.co/600x400.png", alt: "Event Hall", hint: "event setup" },
];

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
          Grand Silver Ray Gallery
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          A glimpse into the elegance and luxury that awaits you. Explore our stunning property and amenities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryImages.map((image, index) => (
          <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <NextImage
              src={image.src}
              alt={image.alt}
              data-ai-hint={image.hint}
              fill
              className="object-cover cursor-pointer transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
       <div className="text-center mt-16">
          <p className="font-body text-lg text-muted-foreground">We invite you to experience the Grand Silver Ray in person.</p>
      </div>
    </div>
  );
}
