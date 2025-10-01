
"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function DiningHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] md:min-h-[500px] lg:min-h-[550px] flex items-center justify-center text-center text-white overflow-hidden">
      <NextImage
        src="https://content-provider.payshia.com/silver-ray/gallery-images/1/dinning5-68dd361dd4771.jpg"
        alt="A collage of fine dining food and wine"
        data-ai-hint="food wine fine dining"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-6 max-w-4xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight shadow-text">
          A Culinary Journey Awaits
        </h1>
        <p className="font-body text-lg sm:text-xl mb-8 max-w-2xl mx-auto shadow-text">
          Discover unforgettable flavors and exquisite settings at Silver Ray Hotel's celebrated restaurants and bars.
        </p>
        <Button 
          asChild 
          size="lg" 
          className="font-body text-lg px-8 py-3 bg-primary/80 backdrop-blur-sm border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary transform hover:scale-105 transition-transform duration-300 rounded-lg"
        >
          <Link href="/contact?subject=Dining Reservation Experience">
            Reserve Your Experience
          </Link>
        </Button>
      </div>
      <style jsx global>{`
        .shadow-text {
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </section>
  );
}
