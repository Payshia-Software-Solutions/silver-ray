
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { getRestaurantById, getRestaurantImagesByVenueId } from '@/services/api/dining';
import type { RestaurantFromApi, RestaurantImage } from '@/types';
import { VenueDetailClient } from '@/components/dining/menu/VenueDetailClient';
import { Skeleton } from '@/components/ui/skeleton';


export default function RestaurantMenuPage() {
  const params = useParams();
  const venueId = params.venueId as string;

  const [venue, setVenue] = useState<RestaurantFromApi | null>(null);
  const [images, setImages] = useState<RestaurantImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!venueId) return;

    const fetchVenueData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [venueData, venueImages] = await Promise.all([
          getRestaurantById(venueId),
          getRestaurantImagesByVenueId(venueId)
        ]);

        if (!venueData) {
          notFound();
          return;
        }

        setVenue(venueData);
        setImages(venueImages);

      } catch (err) {
        console.error(err);
        setError("Failed to load venue details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenueData();
  }, [venueId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Skeleton className="h-8 w-1/3 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container text-center py-20 text-destructive">{error}</div>;
  }
  
  if (!venue) {
    return null; 
  }

  return <VenueDetailClient venue={venue} images={images} />;
}
