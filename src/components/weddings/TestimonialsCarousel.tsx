
'use client';

import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { weddingTestimonials } from '@/data/weddingData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';

export function TestimonialsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnHover: true })
  );

  return (
    <section className="py-16 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Love Stories at Silver Ray</h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Hear from couples who celebrated their special day with us.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: weddingTestimonials.length > 1,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-xs sm:max-w-xl md:max-w-2xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4 py-4">
            {weddingTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4">
                <div className="p-1 h-full">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
