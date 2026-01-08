
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RoomCardProps {
  room: Room;
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
        setImageUrl(null); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [room.id]);

  const keyAmenities = [
    { icon: Wifi, label: 'Wi-Fi' },
    { icon: Tv, label: 'Smart TV' },
    { icon: Coffee, label: 'Coffee Bar' },
  ];

  const guestCapacity = 3; // Set guest capacity to 3 as requested
  const guestAmenity = { icon: Users, label: `${guestCapacity} Guests` };

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
      <CardContent className="p-6 flex-grow flex flex-col">
         <div className="flex justify-between items-start mb-2">
            <CardTitle className="font-headline text-2xl mr-2">{room.descriptive_title}</CardTitle>
            <Badge variant="secondary" className="text-sm px-3 py-1.5 h-fit whitespace-nowrap shrink-0 bg-muted text-muted-foreground rounded-full">
              LKR {parseFloat(room.price_per_night).toFixed(0)}+/night
            </Badge>
          </div>
          
          <p className="font-body text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
            {room.short_description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-2 text-muted-foreground">
                  <guestAmenity.icon className="w-5 h-5" />
                  <span className="text-sm">{guestAmenity.label}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Up to {guestCapacity} guests</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center space-x-3">
              {keyAmenities.map((amenity, index) => (
                  <TooltipProvider key={index}>
                      <Tooltip>
                          <TooltipTrigger>
                              <amenity.icon className="w-5 h-5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>{amenity.label}</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <Button asChild className="w-full rounded-full font-body text-base py-3 h-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300 hover:scale-105">
                <Link href={`/rooms/${room.slug}`}>View Details</Link>
            </Button>
          </div>
      </CardContent>
    </Card>
  );
}
