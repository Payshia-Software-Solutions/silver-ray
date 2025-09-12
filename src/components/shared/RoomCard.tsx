
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Room } from '@/types';
import { BedDouble, Users, Maximize, Wifi, Coffee, Tv } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  // Assuming amenities are strings. This can be improved if amenities are structured objects.
  const amenities = {
      wifi: room.amenities?.includes('High-speed Wi-Fi') || room.amenities?.includes('WiFi'),
      tv: room.amenities?.includes('Smart TV'),
      coffee: room.amenities?.includes('Nespresso Machine'),
      users: true, // Placeholder for guests
  };
  const API_BASE_URL = 'https://silverray-server.payshia.com';

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-2xl bg-card border-none">
      <CardHeader className="p-0 relative aspect-[4/3]">
        <NextImage
          src={room.imageUrl ? `${API_BASE_URL}${room.imageUrl}` : 'https://placehold.co/600x400.png'}
          alt={`Image of ${room.descriptive_title}`}
          data-ai-hint={room.imageHint || `${room.category?.toLowerCase()} room scenic view`}
          fill
          className="object-cover rounded-t-2xl"
          unoptimized // Useful for localhost images without config
        />
      </CardHeader>
      <CardContent className="p-4 sm:p-6 flex-grow">
         <div className="flex justify-between items-start mb-2">
            <CardTitle className="font-headline text-lg sm:text-xl mr-2">{room.descriptive_title}</CardTitle>
            <Badge variant="secondary" className="text-xs px-3 py-1.5 h-fit whitespace-nowrap shrink-0 bg-muted text-muted-foreground rounded-full">
              ${parseFloat(room.price_per_night).toFixed(0)}+/night
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
          <Link href={`/rooms/${room.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
