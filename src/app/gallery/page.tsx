
'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getGalleryImages } from '@/services/api/gallery';
import type { GalleryApiImage } from '@/types';
import { IMAGE_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/ui/skeleton';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryApiImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const galleryImages = await getGalleryImages();
        setImages(galleryImages);
      } catch (err) {
        setError('Failed to load gallery images. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          {/* Mobile Carousel Skeletons */}
          <div className="md:hidden">
            <Carousel className="w-full max-w-sm mx-auto">
              <CarouselContent>
                {[...Array(3)].map((_, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="relative aspect-square">
                        <Skeleton className="w-full h-full rounded-lg" />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          {/* Desktop Grid Skeletons */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <Skeleton key={index} className="w-full h-64 rounded-lg" />
            ))}
          </div>
        </>
      );
    }

    if (error) {
      return <p className="text-center text-destructive">{error}</p>;
    }

    if (images.length === 0) {
        return <p className="text-center text-muted-foreground">No images found in the gallery.</p>
    }

    return (
      <>
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={image.id || index}>
                  <Card>
                    <CardContent className="relative aspect-square">
                      <NextImage
                        src={`${IMAGE_BASE_URL}${image.image_url}`}
                        alt={image.alt_text || 'Gallery image'}
                        data-ai-hint={image.alt_text || 'hotel scenery'}
                        fill
                        className="object-cover rounded-lg"
                        unoptimized
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div key={image.id || index} className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <NextImage
                src={`${IMAGE_BASE_URL}${image.image_url}`}
                alt={image.alt_text || 'Gallery image'}
                data-ai-hint={image.alt_text || 'hotel scenery'}
                fill
                className="object-cover cursor-pointer transform hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
          ))}
        </div>
      </>
    );
  };

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

      {renderContent()}

       <div className="text-center mt-16">
          <p className="font-body text-lg text-muted-foreground">We invite you to experience the Grand Silver Ray in person.</p>
      </div>
    </div>
  );
}
