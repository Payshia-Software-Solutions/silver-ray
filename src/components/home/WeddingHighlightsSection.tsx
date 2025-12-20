
'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';
import { AnimatedInView } from '../shared/AnimatedInView';

const weddingImages = [
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6722.jpg',
    alt: 'Elegant wedding reception table setup with flowers',
    hint: 'wedding table flowers',
    className: 'md:col-span-2'
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6752.jpg',
    alt: 'Outdoor wedding ceremony arch with floral decorations',
    hint: 'wedding ceremony arch',
    className: ''
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6750.jpg',
    alt: 'Bride and groom walking down the aisle',
    hint: 'bride groom aisle',
    className: ''
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6718.jpg',
    alt: 'Beautifully decorated wedding cake',
    hint: 'wedding cake flowers',
    className: ''
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6716.jpg',
    alt: 'Close-up of a wedding bouquet',
    hint: 'wedding bouquet flowers',
    className: 'md:col-span-2'
  },
];

export function WeddingHighlightsSection() {

  return (
    <section className="py-16 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Wedding Highlights
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                A glimpse into the magical moments we help create.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weddingImages.map((image, index) => (
                <AnimatedInView key={index} delay={index * 0.1} className={`group relative overflow-hidden rounded-xl shadow-lg h-64 md:h-auto aspect-[4/3] ${image.className}`}>
                    <NextImage
                        src={image.src}
                        alt={image.alt}
                        data-ai-hint={image.hint}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </AnimatedInView>
            ))}
        </div>
        
        <div className="text-center mt-12">
            <Button asChild size="lg" className="font-body text-lg">
                <Link href="/gallery">View Full Gallery</Link>
            </Button>
        </div>

      </div>
    </section>
  );
}
