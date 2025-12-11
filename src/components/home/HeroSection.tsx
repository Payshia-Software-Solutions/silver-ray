"use client";

import NextImage from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
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
    <section className="relative h-[calc(100vh-5rem)] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
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
                    <CarouselItem key={index} className="relative w-full h-full">
                        <NextImage
                            src={image.src}
                            alt={image.alt}
                            data-ai-hint={image.hint}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            unoptimized
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
      
      <div className="absolute inset-0 bg-black/40" />

    </section>
  );
}