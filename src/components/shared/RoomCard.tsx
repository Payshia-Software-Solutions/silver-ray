
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Room } from '@/types';
import { BedDouble, Users, Maximize, Wifi, Tag } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg bg-card">
      <CardHeader className="p-0 relative aspect-[4/3]">
        <NextImage
          src={room.imageUrl}
          alt={`Image of ${room.name}`}
          data-ai-hint={room.imageHint || `${room.category.toLowerCase()} room scenic view`}
          fill
          className="object-cover"
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-1">{room.name}</CardTitle>
        <p className="font-body text-muted-foreground text-xs mb-3 line-clamp-2">{room.longDescription || room.description}</p>
        
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-muted-foreground mb-3">
          <div className="flex items-center">
            <BedDouble className="w-3.5 h-3.5 mr-1.5 text-primary" />
            <span>{room.beds}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 mr-1.5 text-primary" />
            <span>{room.capacity} Guests</span>
          </div>
          <div className="flex items-center">
            <Maximize className="w-3.5 h-3.5 mr-1.5 text-primary" />
            <span>{room.size}</span>
          </div>
          {room.amenities.includes('WiFi') && (
            <div className="flex items-center">
              <Wifi className="w-3.5 h-3.5 mr-1.5 text-primary" />
              <span>WiFi</span>
            </div>
          )}
        </div>

        <div>
          <span className="font-body text-xs text-muted-foreground">Starting from</span>
          <p className="font-headline text-xl font-semibold text-foreground">${room.pricePerNight}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Button asChild className="w-full font-body text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300 hover:scale-105">
          <Link href={`/rooms/${room.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
