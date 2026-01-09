
"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Wifi, Rss, Projector, Lightbulb } from 'lucide-react';
import { AnimatedInView } from '../shared/AnimatedInView';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';

interface VenueHighlight {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  price: string;
  features: {
    icon: React.ElementType;
    text: string;
  }[];
  link: string;
}

const venueHighlights: VenueHighlight[] = [
  {
    id: 'cats-eye-01',
    name: "Cat's Eye 01",
    description: 'A magnificent hall with classic decor, perfect for grand weddings and corporate galas.',
    imageUrl: 'https://content-provider.payshia.com/silver-ray/other/Cats-eye-1-optimized.webp',
    imageHint: 'elegant banquet hall setup',
    price: 'LKR 6400 + 10%',
    features: [
      { icon: Users, text: 'Up to 230-300 guests' },
      { icon: Rss, text: 'Advanced AV System' },
      { icon: Lightbulb, text: 'RGB lights & moving heads' },
      { icon: Projector, text: 'Projector screens' },
      { icon: Wifi, text: 'Free Wi-Fi' },
    ],
    link: '/weddings/venues/cats-eye-01',
  },
  {
    id: 'cats-eye-02',
    name: "Cat's Eye 02",
    description: 'A versatile space with modern aesthetics, ideal for conferences and elegant receptions.',
    imageUrl: 'https://content-provider.payshia.com/silver-ray/other/Cats-eye-2-optimized.webp',
    imageHint: 'modern banquet hall reception',
    price: 'LKR 6400 + 10%',
    features: [
      { icon: Users, text: 'Up to 230-300 guests' },
      { icon: Rss, text: 'Advanced AV System' },
      { icon: Lightbulb, text: 'RGB lights & moving heads' },
      { icon: Projector, text: 'Projector screens' },
      { icon: Wifi, text: 'Free Wi-Fi' },
    ],
    link: '/weddings/venues/cats-eye-02',
  },
   {
    id: 'cats-eye-03',
    name: "Cat's Eye 03",
    description: 'An intimate setting with lush decor, perfect for smaller weddings, workshops, and private dinners.',
    imageUrl: 'https://content-provider.payshia.com/silver-ray/other/Cats-eye-3-optimized.webp',
    imageHint: 'intimate banquet setting',
    price: 'LKR 6400 + 10%',
    features: [
      { icon: Users, text: 'Up to 230-300 guests' },
      { icon: Rss, text: 'Advanced AV System' },
      { icon: Lightbulb, text: 'RGB lights & moving heads' },
      { icon: Projector, text: 'Projector screens' },
      { icon: Wifi, text: 'Free Wi-Fi' },
    ],
    link: '/weddings/venues/cats-eye-03',
  },
];

const VenueHighlightCard = ({ venue }: { venue: VenueHighlight }) => (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-2xl bg-card border-border">
      <CardHeader className="p-0 relative aspect-[16/10]">
        <NextImage
          src={venue.imageUrl}
          alt={venue.name}
          data-ai-hint={venue.imageHint}
          fill
          className="object-cover"
        />
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <CardTitle className="font-headline text-lg mb-1">{venue.name}</CardTitle>
        <p className="font-body text-xs text-muted-foreground mb-2 flex-grow line-clamp-2">
          {venue.description}
        </p>
        <div className="mb-3">
          <p className="font-body text-xs text-muted-foreground">Per Person</p>
          <p className="font-semibold text-base text-primary">{venue.price}</p>
        </div>
        <div className="space-y-1.5">
          {venue.features.map(feature => (
            <div key={feature.text} className="flex items-center text-xs text-muted-foreground">
                <feature.icon className="w-3.5 h-3.5 mr-2 text-primary" />
                <span>{feature.text}</span>
            </div>
          ))}
        </div>
        
      </CardContent>
    </Card>
);

export function BanquetsAndWeddingsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnHover: true })
  );

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Banquets <span className="font-body">&</span> Weddings
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Crafting unforgettable moments in our elegant and versatile event spaces.
          </p>
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
            <Carousel
                opts={{ align: "start", loop: false, dragFree: true }}
                plugins={[plugin.current]}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                {venueHighlights.map((venue, index) => (
                    <CarouselItem key={venue.id} className="pl-4 basis-[80%]">
                        <div className="p-1 h-full">
                            <VenueHighlightCard venue={venue} />
                        </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {venueHighlights.map((venue, index) => (
            <AnimatedInView key={venue.id} delay={index * 0.1}>
              <VenueHighlightCard venue={venue} />
            </AnimatedInView>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="font-body text-lg group">
            <Link href="/weddings">
              Explore All Venues & Packages
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
