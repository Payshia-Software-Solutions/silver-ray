
'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
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
  const { id, venue_name, status, short_description } = venue;
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

  const viewMoreLink = `/dining/menu/${id}`;

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'bg-green-100 text-green-700 border-green-300';
        case 'seasonal':
            return 'bg-blue-100 text-blue-700 border-blue-300';
        case 'coming soon':
            return 'bg-yellow-100 text-yellow-700 border-yellow-300';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  }

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card border-border">
      <CardHeader className="p-0 relative aspect-video">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-t-xl" />
        ) : (
          <>
            <NextImage
              src={imageUrl || 'https://placehold.co/600x400.png'}
              alt={`Image of ${venue_name}`}
              data-ai-hint={imageHint}
              fill
              className="object-cover"
              unoptimized
            />
            {status && status.toLowerCase() !== 'active' && (
                <Badge className={`absolute top-3 right-3 text-xs ${getStatusBadgeVariant(status)}`}>
                    {status}
                </Badge>
            )}
          </>
        )}
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow text-center">
        <CardTitle className="font-headline text-2xl mb-2">{venue_name}</CardTitle>
        <p className="font-body text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
          {short_description}
        </p>
        <Button asChild variant="outline" className="font-body text-sm text-primary border-primary hover:bg-primary/10 hover:text-primary p-0 justify-center h-auto group mt-auto w-fit mx-auto px-4 py-2 rounded-lg">
          <Link href={viewMoreLink}>
            View Menu
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
