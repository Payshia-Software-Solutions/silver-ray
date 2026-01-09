
"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

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
    
    const handleScrollDown = () => {
      const nextSection = document.getElementById('next-section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    };


  return (
    <section className="relative h-[calc(100vh-5rem)] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-0 w-full h-full object-cover"
        >
            <source src="https://content-provider.payshia.com/silver-ray/other/hero-video-silver-ray.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 p-6 max-w-5xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight shadow-text">
          Celebrate Your <br /> Unforgettable Moments
        </h1>
        <p className="font-body text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto shadow-text">
          From intimate gatherings to grand celebrations, our elegant venues and dedicated team ensure a memorable occasion.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="font-body text-lg px-8 py-3 w-full sm:w-auto transform hover:scale-105 transition-transform duration-300">
            <Link href="/weddings">Venues and Packages</Link>
          </Button>
        </div>
      </div>
        
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={handleScrollDown}
        aria-label="Scroll to next section"
      >
          <div className="animate-bounce bg-white/20 p-2 w-10 h-10 ring-1 ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
              <ChevronDown className="w-6 h-6 text-white" />
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
