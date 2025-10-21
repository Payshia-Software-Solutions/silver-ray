
"use client";

import NextImage from 'next/image';

interface MenuHeroProps {
  venueName: string;
  venueDescription?: string;
  heroImageUrl: string;
  heroImageHint: string;
}

export function MenuHero({ venueName, venueDescription, heroImageUrl, heroImageHint }: MenuHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[350px] md:min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
      <NextImage
        src={heroImageUrl}
        alt={`${venueName} interior or signature dish`}
        data-ai-hint={heroImageHint}
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-6 max-w-3xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight shadow-text">
          {venueName}
        </h1>
        {venueDescription && (
          <p className="font-body text-lg sm:text-xl max-w-xl mx-auto shadow-text">
            {venueDescription}
          </p>
        )}
      </div>
      <style jsx global>{`
        .shadow-text {
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </section>
  );
}
