'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/events/EventCard';
import type { EventFromApi } from '@/types';
import { AnimatedInView } from '@/components/shared/AnimatedInView';
import { ChevronRight } from 'lucide-react';
import { getEvents } from '@/services/api/events';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';


export function FeaturedEventsSection() {
  const [events, setEvents] = useState<EventFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnHover: true })
  );

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      try {
        setIsLoading(true);
        const allEvents = await getEvents();
        // Take the first 3 events for the featured section
        setEvents(allEvents.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch featured events:', err);
        setError('Could not load upcoming events at this time.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetEvents();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card rounded-xl shadow-lg animate-pulse">
              <div className="aspect-video bg-muted rounded-t-xl"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-10 bg-muted rounded-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-destructive">{error}</p>;
    }

    if (events.length === 0) {
      return null; // Don't render the section if there are no events to show
    }

    return (
      <>
        {/* Mobile Carousel */}
        <div className="md:hidden">
            <Carousel
                opts={{ align: "start", loop: events.length > 1 }}
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.reset()}
            >
                <CarouselContent className="-ml-2">
                {events.map((event) => (
                    <CarouselItem key={event.id} className="pl-2 basis-[85%] sm:basis-1/2">
                        <div className="p-1 h-full">
                          <EventCard event={event} />
                        </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <AnimatedInView key={event.id} delay={index * 0.1}>
              <EventCard event={event} />
            </AnimatedInView>
          ))}
        </div>
      </>
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Upcoming Events
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us for unforgettable moments and exclusive gatherings at Grand Silver Ray.
          </p>
        </div>

        <div className="mb-12">
          {renderContent()}
        </div>
        
        {events.length > 0 && !error && (
            <div className="text-center">
                <Button asChild size="lg" className="font-body text-lg group">
                <Link href="/events">
                    View All Events
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}
