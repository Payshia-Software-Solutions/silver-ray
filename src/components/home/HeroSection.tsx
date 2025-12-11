
"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const carouselImages = [
    {
        src: "https://content-provider.payshia.com/silver-ray/gallery-images/1/leadingpagecover-68da3641c35a4.jpg",
        alt: "Elegant hotel suite with a beautiful view",
        hint: "hotel suite view"
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

  return (
    <section className="relative h-[calc(100vh-5rem)] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {carouselImages.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="relative w-full h-[calc(100vh-5rem)] min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
                            <NextImage
                                src={image.src}
                                alt={image.alt}
                                data-ai-hint={image.hint}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                unoptimized
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
      
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 p-6 max-w-3xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight shadow-text">
          Experience Unparalleled Luxury
        </h1>
        <p className="font-body text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto shadow-text">
          Discover a sanctuary of elegance and comfort, where impeccable service and breathtaking views create an unforgettable escape.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="font-body text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300">
            <Link href="/booking">Book Your Stay</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-body text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-transform duration-300">
            <Link href="/rooms">Explore Rooms</Link>
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
