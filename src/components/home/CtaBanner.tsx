"use client";

import Link from 'next/link';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';

export function CtaBanner() {
  return (
    <section className="relative py-20 md:py-32 text-white bg-primary">
       <NextImage
        src="https://placehold.co/1920x600.png"
        alt="Abstract luxury background"
        data-ai-hint="luxury pattern"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
      />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 shadow-text">
          Your Unforgettable Getaway Awaits
        </h2>
        <p className="font-body text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto shadow-text">
          Indulge in world-class amenities, breathtaking views, and impeccable service. Create memories that will last a lifetime at LuxeStay.
        </p>
        <Button asChild size="lg" variant="secondary" className="font-body text-lg px-10 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-transform duration-300">
          <Link href="/booking">Book Your Dream Stay</Link>
        </Button>
      </div>
       <style jsx global>{`
        .shadow-text {
          text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
}
