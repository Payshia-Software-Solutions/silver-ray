
'use client';

import NextImage from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedInView } from '../shared/AnimatedInView';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const allWeddingImages = [
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6722.jpg',
    alt: 'Elegant wedding reception table setup with flowers',
    hint: 'wedding table flowers',
    className: 'md:col-span-2 md:row-span-2' // Main image
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6752.jpg',
    alt: 'Outdoor wedding ceremony arch with floral decorations',
    hint: 'wedding ceremony arch',
    className: ''
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6718.jpg',
    alt: 'Beautifully decorated wedding cake',
    hint: 'wedding cake flowers',
    className: ''
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6750.jpg',
    alt: 'Bride and groom walking down the aisle',
    hint: 'bride groom aisle',
    className: ''
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6716.jpg',
    alt: 'Close-up of a wedding bouquet',
    hint: 'wedding bouquet flowers',
    className: ''
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6747.jpg',
    alt: 'Wedding couple during a traditional ceremony',
    hint: 'wedding couple ceremony',
    className: ''
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6748.jpg',
    alt: 'A detailed shot of wedding decorations',
    hint: 'wedding decorations detail',
    className: 'md:col-span-2'
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6755.jpg',
    alt: 'Guests celebrating at a wedding reception',
    hint: 'wedding reception guests',
    className: ''
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

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4">
            {allWeddingImages.map((image, index) => (
                <AnimatedInView key={index} delay={index * 0.05} className={`group relative overflow-hidden rounded-xl shadow-lg ${image.className}`}>
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
            <Button asChild size="lg" variant="outline" className="font-body text-lg group rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Link href="/gallery">
                    View Full Gallery
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
