
'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Tag } from 'lucide-react';
import { IMAGE_BASE_URL } from '@/lib/config';
import type { EventFromApi, EventImage } from '@/types';
import { useState, useEffect } from 'react';
import { getEventImagesByEventId } from '@/services/api/events';
import { Skeleton } from '../ui/skeleton';

export interface EventCardProps {
  event: EventFromApi;
}

export function EventCard({ event }: EventCardProps) {
  const { id, event_name, event_date, event_type } = event;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageHint, setImageHint] = useState<string>('event image');
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
        const images: EventImage[] = await getEventImagesByEventId(id);
        const primaryImage = images.find(img => String(img.is_primary) === "1") || images[0];
        
        if (primaryImage && primaryImage.image_url) {
          const finalUrl = primaryImage.image_url.startsWith('http')
            ? primaryImage.image_url
            : `${IMAGE_BASE_URL}${primaryImage.image_url.replace(/\\/g, '/').replace(/^\//, '')}`;
          setImageUrl(finalUrl);
          setImageHint(primaryImage.alt_text || 'event image');
        } else {
          setImageUrl('https://placehold.co/600x400.png');
        }
      } catch (error) {
        console.error(`Failed to fetch image for event ${id}:`, error);
        setImageUrl('https://placehold.co/600x400.png'); // Fallback image
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [id]);
  
  const formattedDate = new Date(event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card border-none">
      <CardHeader className="p-0 relative aspect-video">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-t-xl" />
        ) : (
          <NextImage
            src={imageUrl || 'https://placehold.co/600x400.png'}
            alt={event_name}
            data-ai-hint={imageHint}
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </CardHeader>
      <CardContent className="p-5 flex flex-col flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{event_name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
            <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1.5 text-primary"/>
                {formattedDate}
            </div>
            <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1.5 text-primary"/>
                {event_type}
            </div>
        </div>
        <Button asChild className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11">
          <Link href={`/contact?subject=Inquiry about ${event_name}`}>Inquire Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
