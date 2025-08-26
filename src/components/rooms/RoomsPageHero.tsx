
"use client";

import NextImage from 'next/image';

export function RoomsPageHero() {
  return (
    <section className="relative h-[40vh] min-h-[300px] md:min-h-[350px] lg:min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
      <NextImage
        src="https://placehold.co/1920x500.png" 
        alt="Comfortable hotel room interior"
        data-ai-hint="hotel room luxury"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-6 max-w-3xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-3 leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.6)'}}>
          Our Rooms & Suites
        </h1>
        <p className="font-body text-lg sm:text-xl" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
          Discover your perfect space for relaxation and comfort.
        </p>
      </div>
    </section>
  );
}
