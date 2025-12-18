
"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Disc, Trees } from 'lucide-react';
import { AnimatedInView } from '../shared/AnimatedInView';

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
    id: 'crystal-hall',
    name: 'The Crystal Hall',
    description: 'A magnificent hall with classic decor, perfect for grand weddings and corporate galas.',
    imageUrl: 'http://content-provider.payshia.com/silver-ray/other/BANQUET-1.webp',
    imageHint: 'elegant banquet hall setup',
    price: 'LKR 3100 + 10%',
    features: [
      { icon: Users, text: 'Up to 500 guests' },
      { icon: Disc, text: 'Advanced AV System' },
    ],
    link: '/weddings/venues/crystal-hall',
  },
  {
    id: 'sapphire-hall',
    name: 'The Sapphire Hall',
    description: 'A versatile space with modern aesthetics, ideal for conferences and elegant receptions.',
    imageUrl: 'http://content-provider.payshia.com/silver-ray/other/BANQUET-2.webp',
    imageHint: 'modern banquet hall reception',
    price: 'LKR 3100 + 10%',
    features: [
      { icon: Users, text: 'Up to 250 guests' },
      { icon: Trees, text: 'Adjustable Lighting' },
    ],
    link: '/weddings/venues/sapphire-hall',
  },
   {
    id: 'emerald-hall',
    name: 'The Emerald Hall',
    description: 'An intimate setting with lush decor, perfect for smaller weddings, workshops, and private dinners.',
    imageUrl: 'http://content-provider.payshia.com/silver-ray/other/BANQUET-3.webp',
    imageHint: 'intimate banquet setting',
    price: 'LKR 3100 + 10%',
    features: [
      { icon: Users, text: 'Up to 150 guests' },
      { icon: Disc, text: 'Cozy Ambiance' },
    ],
    link: '/weddings/venues/emerald-hall',
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
      <CardContent className="p-6 flex flex-col flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{venue.name}</CardTitle>
        <p className="font-body text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
          {venue.description}
        </p>
        <div className="mb-4">
          <p className="font-body text-xs text-muted-foreground">Per Person</p>
          <p className="font-semibold text-lg text-primary">{venue.price}</p>
        </div>
        <div className="space-y-2 mb-4">
          {venue.features.map(feature => (
            <div key={feature.text} className="flex items-center text-sm text-muted-foreground">
                <feature.icon className="w-4 h-4 mr-2 text-primary" />
                <span>{feature.text}</span>
            </div>
          ))}
        </div>
        <Button asChild variant="link" className="font-body text-sm text-primary p-0 justify-start h-auto group mt-auto">
          <Link href={venue.link}>
            Learn More
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
);

export function BanquetsAndWeddingsSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Banquets & Weddings
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Crafting unforgettable moments in our elegant and versatile event spaces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {venueHighlights.map((venue, index) => (
            <AnimatedInView key={venue.id} delay={index * 0.1}>
              <VenueHighlightCard venue={venue} />
            </AnimatedInView>
          ))}
        </div>

        <div className="text-center">
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
