
'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { IMAGE_BASE_URL } from '@/lib/config';
import type { RestaurantFromApi, RestaurantImage } from '@/types';
import { useState, useEffect } from 'react';
import { getRestaurantImagesByVenueId } from '@/services/api/dining';
import { Skeleton } from '@/components/ui/skeleton';

export interface VenueCardProps {
  venue: RestaurantFromApi;
}

export function VenueCard({ venue }: VenueCardProps) {
  const { id, venue_name, status, short_description, capacity } = venue;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageHint, setImageHint] = useState<string>('restaurant interior');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (!id) {
        setIsLoading(false);
        setImageUrl('https://placehold.co/600x400.png');
        return;
      }
      try {
        setIsLoading(true);
        const images: RestaurantImage[] = await getRestaurantImagesByVenueId(String(id));
        const primaryImage = images.find(img => String(img.is_primary) === '1') || images[0];
        
        if (primaryImage && primaryImage.image_url) {
          const finalUrl = primaryImage.image_url.startsWith('http')
            ? primaryImage.image_url
            : `${IMAGE_BASE_URL}${primaryImage.image_url.replace(/\\/g, '/').replace(/^\//, '')}`;
          setImageUrl(finalUrl);
          setImageHint(primaryImage.alt_text || 'restaurant interior');
        } else {
          setImageUrl('https://placehold.co/600x400.png');
        }
      } catch (error) {
        console.error(`Failed to fetch image for venue ${id}:`, error);
        setImageUrl('https://placehold.co/600x400.png'); // Fallback image
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  const tag = status === 'Active' ? 'Fine Dining' : 'Coming Soon';
  const viewMoreLink = `/dining/menu/${id}`;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card border-none">
      <CardHeader className="p-0 relative aspect-[4/3]">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-t-xl" />
        ) : (
          <NextImage
            src={imageUrl || 'https://placehold.co/600x400.png'}
            alt={`Image of ${venue_name}`}
            data-ai-hint={imageHint}
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
            <CardTitle className="font-headline text-xl ">{venue_name}</CardTitle>
            <Badge variant="outline" className="border-primary text-primary">{tag}</Badge>
        </div>
        <p className="font-body text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
          {short_description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Users className="w-4 h-4 mr-2 text-primary" />
          <span>Capacity: {capacity} guests</span>
        </div>
        <Button asChild variant="link" className="font-body text-sm text-primary hover:text-primary/80 p-0 justify-start h-auto group mt-auto">
          <Link href={viewMoreLink}>
            View More 
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
