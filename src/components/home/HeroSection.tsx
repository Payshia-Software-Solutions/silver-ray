
"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';


const heroImages = [
  {
    src: "https://content-provider.payshia.com/silver-ray/gallery-images/1/leadingpagecover-68da3641c35a4.jpg",
    alt: "Elegant wedding reception",
    hint: "wedding reception elegant"
  },
  {
    src: "https://content-provider.payshia.com/silver-ray/other/EXTERIOR-2.webp",
    alt: "Exterior view of the Grand Silver Ray hotel",
    hint: "hotel exterior building"
  }
];

export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnHover: true })
  );

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);


  return (
    <section className="relative h-[calc(100vh-5rem)] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[plugin.current]}
        className="absolute inset-0 w-full h-full"
      >
        <CarouselContent className='h-full'>
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className='h-full'>
              <div className="relative w-full h-full">
                <NextImage
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.hint}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "rounded-full transition-all duration-300",
              index === current ? 'w-1 h-6 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 max-w-3xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight shadow-text">
          Host Your Perfect Event
        </h1>
        <p className="font-body text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto shadow-text">
          From grand banquets to intimate weddings, our versatile spaces and dedicated team ensure a memorable celebration.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="font-body text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300">
            <Link href="/contact?subject=Event+Inquiry">Inquire Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-body text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-transform duration-300">
            <Link href="/weddings">Explore Venues</Link>
          </Button>
        </div>
      </div>
      <style jsx global>{`
        .shadow-text {
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
}
