

'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Tag } from 'lucide-react';
import type { EventFromApi } from '@/types';
import { useState, useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';

export interface EventCardProps {
  event: EventFromApi;
}

export function EventCard({ event }: EventCardProps) {
  const { id, name, date, category, slug, imageUrl: rawImageUrl, accept_booking } = event;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const imageContentProviderBaseUrl = 'https://content-provider.gotickets.lk';

  useEffect(() => {
    setIsLoading(true);
    if (rawImageUrl) {
        const finalUrl = rawImageUrl.startsWith('http') 
            ? rawImageUrl 
            : `${imageContentProviderBaseUrl}${rawImageUrl}`;
        setImageUrl(finalUrl);
    } else {
        setImageUrl('https://placehold.co/600x400.png');
    }
    setIsLoading(false);
  }, [rawImageUrl]);
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const detailUrl = `https://gotickets.silverray.lk/events/${slug}`;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card border-none">
      <CardHeader className="p-0 relative aspect-video">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-t-xl" />
        ) : (
          <NextImage
            src={imageUrl || 'https://placehold.co/600x400.png'}
            alt={name}
            data-ai-hint="live event concert"
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </CardHeader>
      <CardContent className="p-5 flex flex-col flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
            <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1.5 text-primary"/>
                {formattedDate}
            </div>
            <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1.5 text-primary"/>
                {category}
            </div>
        </div>
        {accept_booking === "1" ? (
            <Button asChild className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11">
                <Link href={detailUrl} target="_blank" rel="noopener noreferrer">Book Now</Link>
            </Button>
        ) : (
             <Button disabled variant="outline" className="w-full mt-auto rounded-full h-11">
                Sold Out
            </Button>
        )}
      </CardContent>
    </Card>
  );
}
