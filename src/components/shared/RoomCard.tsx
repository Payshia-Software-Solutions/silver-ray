

'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Room, RoomImage } from '@/types';
import { Wifi, Coffee, Tv, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { API_BASE_URL, IMAGE_BASE_URL } from '@/lib/config';
import { useState, useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';

interface RoomCardProps {
  room: Room;
}

const generateSlug = (name: string) => {
    if (!name) return '';
    return name.trim().toLowerCase().replace(/ & /g, ' and ').replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export function RoomCard({ room }: RoomCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (!room.id) {
          setIsLoading(false);
          setImageUrl(null);
          return;
      };
      try {
        setIsLoading(true);
        // Using direct fetch with the correct URL structure
        const serverRoot = API_BASE_URL.split('/company/')[0];
        const response = await fetch(`${serverRoot}/room-images/company/1/room/${room.id}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`No images found for room ${room.id}.`);
                setImageUrl(null);
            } else {
                throw new Error(`API call failed with status: ${response.status}`);
            }
        } else {
            const images: RoomImage[] = await response.json();
            const primaryImage = images.find(img => String(img.is_primary) === "1") || images[0];
            
            if (primaryImage && primaryImage.image_url) {
              const finalUrl = primaryImage.image_url.startsWith('http') 
                ? primaryImage.image_url 
                : `${IMAGE_BASE_URL}${primaryImage.image_url.replace(/\\/g, '/').replace(/^\//, '')}`;
              setImageUrl(finalUrl);
            } else {
                setImageUrl(null);
            }
        }
      } catch (error) {
        console.error(`Failed to fetch image for room ${room.id}:`, error);
        setImageUrl(null); // Fallback to no image
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [room.id]);

  const amenities = {
      wifi: room.amenities?.includes('High-speed Wi-Fi') || room.amenities?.includes('WiFi'),
      tv: room.amenities?.includes('Smart TV'),
      coffee: room.amenities?.includes('Nespresso Machine'),
      users: true,
  };
  
  const slug = room.slug || generateSlug(room.descriptive_title);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-2xl bg-card border-none">
      <CardHeader className="p-0 relative aspect-[4/3]">
        {isLoading ? (
            <Skeleton className="w-full h-full rounded-t-2xl" />
        ) : imageUrl ? (
            <NextImage
                src={imageUrl}
                alt={`Image of ${room.descriptive_title}`}
                data-ai-hint={room.imageHint || `${room.category?.toLowerCase()} room scenic view`}
                fill
                className="object-cover rounded-t-2xl"
                unoptimized
            />
        ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground rounded-t-2xl">
              No Image
            </div>
        )}
      </CardHeader>
      <CardContent className="p-4 sm:p-6 flex-grow">
         <div className="flex justify-between items-start mb-2">
            <CardTitle className="font-headline text-lg sm:text-xl mr-2">{room.descriptive_title}</CardTitle>
            <Badge variant="secondary" className="text-xs px-3 py-1.5 h-fit whitespace-nowrap shrink-0 bg-muted text-muted-foreground rounded-full">
              LKR {parseFloat(room.price_per_night).toFixed(0)}+/night
            </Badge>
          </div>
          <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-2">{room.short_description}</p>
          <div className="flex space-x-4 text-primary text-muted-foreground">
            {amenities.wifi && <Wifi className="w-5 h-5" aria-label="WiFi included"/>}
            {amenities.tv && <Tv className="w-5 h-5" aria-label="Smart TV"/>}
            {amenities.coffee && <Coffee className="w-5 h-5" aria-label="Coffee Machine"/>}
            {amenities.users && <Users className="w-5 h-5" aria-label={`Capacity: ${room.adults_capacity} guests`}/>}
          </div>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 pt-0 mt-auto">
        <Button asChild className="w-full rounded-full font-body text-base py-3 h-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300 hover:scale-105">
          <Link href={`/rooms/${slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
