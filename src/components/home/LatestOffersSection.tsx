
"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';


interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  link: string;
}

const offers: Offer[] = [
  {
    id: 'honeymoon-bliss',
    title: 'Honeymoon Bliss',
    description: 'Celebrate your love with a romantic suite, private dinner, and exclusive amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1471530090166-fbe1875839c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxyb21hbnRpYyUyMHN1aXRlJTIwY2hhbXBhZ25lfGVufDB8fHx8MTc0OTE5MTYyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'romantic suite champagne',
    link: '/booking?offer=honeymoon-bliss',
  },
  {
    id: 'weekend-getaway',
    title: 'Weekend Getaway',
    description: 'Rejuvenate with a two-night stay, complimentary breakfast, and spa treatment.',
    imageUrl: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxsdXh1cnklMjBwb29sJTIwY29ja3RhaWx8ZW58MHx8fHwxNzQ5MTkxNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'luxury pool cocktail',
    link: '/booking?offer=weekend-getaway',
  },
  {
    id: 'gourmet-escape',
    title: 'Gourmet Escape',
    description: 'Indulge in a culinary adventure with a tasting menu and wine pairing experience.',
    imageUrl: 'https://images.unsplash.com/photo-1533142146849-4620b8191531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZmluZSUyMGRpbmluZyUyMGJ1ZmZldHxlbnwwfHx8fDE3NDkxOTE2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'fine dining buffet',
    link: '/booking?offer=gourmet-escape',
  },
];

const OfferCard = ({ offer }: { offer: Offer }) => (
    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col bg-card text-card-foreground rounded-lg h-full">
        <CardHeader className="p-0 relative aspect-[16/10]">
        <NextImage
            src={offer.imageUrl}
            alt={offer.title}
            data-ai-hint={offer.imageHint}
            fill
            className="object-cover"
        />
        </CardHeader>
        <CardContent className="p-6 flex flex-col flex-grow">
        <CardTitle className="font-headline text-xl text-primary mb-2">{offer.title}</CardTitle>
        <p className="font-body text-sm text-muted-foreground mb-6 flex-grow line-clamp-3">
            {offer.description}
        </p>
        <Button asChild variant="secondary" className="w-full mt-auto font-body group bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href={offer.link}>
            View Offer
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
        </Button>
        </CardContent>
    </Card>
);

export function LatestOffersSection() {
    const plugin = React.useRef(
      Autoplay({ delay: 3500, stopOnInteraction: true, stopOnHover: true })
    );

  return (
    <section className="py-16 lg:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Latest Offers & Packages
          </h2>
          <p className="font-body text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Treat yourself to our exclusive packages and unlock memorable escapes.
          </p>
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
            <Carousel
            opts={{
              align: "start",
              loop: offers.length > 1,
            }}
            plugins={[plugin.current]}
            className="w-full max-w-sm mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4">
              {offers.map((offer) => (
                <CarouselItem key={offer.id} className="pl-4">
                  <div className="p-1 h-full">
                    <OfferCard offer={offer} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px]" />
            <CarouselNext className="absolute right-[-50px]" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
