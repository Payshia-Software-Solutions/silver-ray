
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
  features: {
    icon: React.ElementType;
    text: string;
  }[];
  link: string;
}

const venueHighlights: VenueHighlight[] = [
  {
    id: 'grand-ballroom',
    name: 'The Grand Ballroom',
    description: 'An opulent space with soaring ceilings and sparkling chandeliers, perfect for lavish celebrations.',
    imageUrl: 'https://images.unsplash.com/photo-1517456363055-5d162a453d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxncmFuZCUyMGJhbGxyb29tJTIwd2VkZGluZ3xlbnwwfHx8fDE3NDkxOTI0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'grand ballroom wedding',
    features: [
      { icon: Users, text: 'Up to 300 guests' },
      { icon: Disc, text: 'Spacious Dance Floor' },
    ],
    link: '/weddings/venues/grand-ballroom',
  },
  {
    id: 'garden-terrace',
    name: 'The Garden Terrace',
    description: 'Exchange vows amidst lush greenery in an intimate and romantic open-air setting under the stars.',
    imageUrl: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxnYXJkZW4lMjB3ZWRkaW5nJTIwdGVycmFjZXxlbnwwfHx8fDE3NDkxOTI0MjN8MA&ixlib-rb-4.1.0&q=80&w=1080',
    imageHint: 'garden wedding terrace',
    features: [
      { icon: Users, text: 'Up to 100 guests' },
      { icon: Trees, text: 'Outdoor Setting' },
    ],
    link: '/weddings/venues/garden-terrace',
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
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
