
"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-5rem)] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
      <NextImage
        src="https://content-provider.payshia.com/silver-ray/gallery-images/1/leadingpagecover-68da3641c35a4.jpg"
        alt="Elegant wedding reception"
        data-ai-hint="wedding reception elegant"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
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
