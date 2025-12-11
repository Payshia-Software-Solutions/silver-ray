"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { cn } from '@/lib/utils';

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
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    const plugin = React.useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true, stopOnHover: true })
    );

    React.useEffect(() => {
        if (!api) {
          return
        }
    
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())
    
        api.on("select", () => {
          setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const scrollTo = (index: number) => {
        api?.scrollTo(index);
    }

  return (
    <section className="relative h-[calc(100vh-5rem)] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] text-center text-white overflow-hidden">
        <Carousel
            setApi={setApi}
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
                    <CarouselItem key={index} className="relative w-full h-[calc(100vh-5rem)] min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
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
      
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="p-6 max-w-3xl">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight shadow-text">
            Celebrate Your Unforgettable Moments
          </h1>
          <p className="font-body text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto shadow-text">
            From intimate gatherings to grand celebrations, our elegant venues and dedicated team ensure a memorable occasion.
          </p>
          <div className="space-x-4 pointer-events-auto">
            <Button asChild size="lg" className="font-body text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300">
              <Link href="/weddings/venues">See Venues</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-body text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-transform duration-300">
              <Link href="/dining">See Menu</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Custom Dot Navigation */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all duration-300",
              current === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx global>{`
        .shadow-text {
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
}
