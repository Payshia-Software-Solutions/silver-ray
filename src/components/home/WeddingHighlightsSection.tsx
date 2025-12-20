
'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';
import { AnimatedInView } from '../shared/AnimatedInView';

const weddingImages = [
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6722.jpg',
    alt: 'Elegant wedding reception table setup with flowers',
    hint: 'wedding table flowers',
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6752.jpg',
    alt: 'Outdoor wedding ceremony arch with floral decorations',
    hint: 'wedding ceremony arch',
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6750.jpg',
    alt: 'Bride and groom walking down the aisle',
    hint: 'bride groom aisle',
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6718.jpg',
    alt: 'Beautifully decorated wedding cake',
    hint: 'wedding cake flowers',
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6716.jpg',
    alt: 'Close-up of a wedding bouquet',
    hint: 'wedding bouquet flowers',
  },
];

export function WeddingHighlightsSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] md:h-[70vh] text-white">
        <Carousel
            opts={{ loop: true }}
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="h-full">
            {weddingImages.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                    <div className="relative w-full h-full">
                        <NextImage
                            src={image.src}
                            alt={image.alt}
                            data-ai-hint={image.hint}
                            fill
                            className="object-cover"
                        />
                    </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-white/30 text-white border-white/50 hover:bg-white/50" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-white/30 text-white border-white/50 hover:bg-white/50" />
        </Carousel>
        
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
            <AnimatedInView className="max-w-2xl p-6">
                <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                    Timeless Weddings, Perfectly Planned
                </h2>
                <p className="font-body text-lg text-slate-200 mb-8" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Discover our breathtaking venues and bespoke services that turn your dream wedding into a reality.
                </p>
                <Button asChild size="lg" className="font-body text-lg">
                    <Link href="/weddings">Explore Weddings</Link>
                </Button>
            </AnimatedInView>
        </div>
    </section>
  );
}
