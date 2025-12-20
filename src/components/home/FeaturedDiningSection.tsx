
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { VenueCard } from '@/components/dining/VenueCard';
import { getRestaurants } from '@/services/api/dining';
import type { RestaurantFromApi } from '@/types';
import { AnimatedInView } from '@/components/shared/AnimatedInView';
import { ChevronRight } from 'lucide-react';

export function FeaturedDiningSection() {
  const [venues, setVenues] = useState<RestaurantFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setIsLoading(true);
        const allVenues = await getRestaurants();
        setVenues(allVenues.slice(0, 3)); // Show up to 3 featured venues
      } catch (err) {
        console.error('Failed to fetch dining venues:', err);
        setError('Could not load dining options at this time.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg shadow animate-pulse">
              <div className="aspect-[4/3] bg-muted rounded-t-lg"></div>
              <div className="p-6 space-y-3">
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

    if (venues.length === 0) {
      return null; // Don't show the section if there are no venues
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {venues.map((venue, index) => (
          <AnimatedInView key={venue.id} delay={index * 0.1}>
            <VenueCard venue={venue} />
          </AnimatedInView>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            A Culinary Journey
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            From lavish buffets to rooftop cocktails, each venue offers a unique ambiance to delight every palate.
          </p>
        </div>

        <div className="mb-12">{renderContent()}</div>

        {venues.length > 0 && (
          <div className="text-center">
            <Button asChild size="lg" className="font-body text-lg group">
              <Link href="/dining">
                Explore All Dining
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
