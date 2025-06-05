import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Room } from '@/types';
import { BedDouble, Users, Tag, TrendingUp } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="p-0 relative h-60">
        <NextImage
          src={room.imageUrl}
          alt={`Image of ${room.name}`}
          data-ai-hint={`${room.category.toLowerCase()} room interior`}
          fill
          className="object-cover"
        />
         {room.features?.includes('Ocean View') && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-semibold rounded">
            Ocean View
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2">{room.name}</CardTitle>
        <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-3">{room.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-foreground/80">
            <BedDouble className="w-4 h-4 mr-2 text-primary" />
            <span>{room.beds}</span>
          </div>
          <div className="flex items-center text-foreground/80">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span>Up to {room.capacity} guests</span>
          </div>
           <div className="flex items-center text-foreground/80">
            <Tag className="w-4 h-4 mr-2 text-primary" />
            <span>From ${room.pricePerNight}/night</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full font-body transition-transform duration-300 hover:scale-105">
          <Link href={`/rooms/${room.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
