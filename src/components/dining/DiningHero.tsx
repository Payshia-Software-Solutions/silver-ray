
"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function DiningHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] md:min-h-[500px] lg:min-h-[550px] flex items-center justify-center text-center text-white overflow-hidden">
      <NextImage
        src="https://placehold.co/1920x700.png"
        alt="A collage of fine dining food and wine"
        data-ai-hint="fine dining food wine"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-6 max-w-3xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight shadow-text">
          A Culinary Journey Awaits
        </h1>
        <p className="font-body text-lg sm:text-xl mb-8 max-w-xl mx-auto shadow-text">
          Discover unforgettable flavors and exquisite settings at Grand Silver Ray Hotel's celebrated restaurants and bars.
        </p>
        <Button 
          asChild 
          size="lg" 
          className="font-body text-lg px-8 py-3 bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-primary transform hover:scale-105 transition-transform duration-300 rounded-lg"
        >
          <Link href="/contact?subject=Dining Reservation Experience">
            Reserve Your Experience
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
      <style jsx global>{`
        .shadow-text {
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </section>
  );
}
