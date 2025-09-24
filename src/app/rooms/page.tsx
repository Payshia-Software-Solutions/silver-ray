
'use client';

import { useState, useEffect } from 'react';
import { RoomCard } from '@/components/shared/RoomCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { RoomsPageHero } from '@/components/rooms/RoomsPageHero';
import { NotificationBanner } from '@/components/rooms/NotificationBanner';
import type { Room, RoomFromApi } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { getRooms } from '@/services/api/rooms';


function DesktopRoomFilters() {
  return (
    <div className="hidden md:block my-8 p-4 bg-card rounded-lg shadow-md border">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground/80">Filter by:</span>
                <Select>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ocean">Ocean View</SelectItem>
                        <SelectItem value="city">City View</SelectItem>
                        <SelectItem value="garden">Garden View</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Occupancy" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4+ Guests</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Amenities" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pool">Private Pool</SelectItem>
                        <SelectItem value="balcony">Balcony</SelectItem>
                        <SelectItem value="kitchen">Kitchen</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">$200-$400</SelectItem>
                        <SelectItem value="medium">$400-$800</SelectItem>
                        <SelectItem value="high">$800+</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground/80">Sort by:</span>
                <Select defaultValue="recommended">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="size">Size</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
  );
}


function MobileRoomFilters() {
  return (
    <div className="my-8 md:hidden">
      <Accordion type="single" collapsible className="w-full bg-card rounded-lg shadow-sm border px-4">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="hover:no-underline font-semibold text-foreground/80">
             <div className='flex items-center gap-2'>
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters & Sort</span>
             </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 items-end pt-4">
                <div className="col-span-2 space-y-1.5">
                    <Label>Sort by</Label>
                    <Select defaultValue="recommended">
                        <SelectTrigger>
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recommended">Recommended</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="size">Size</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1.5">
                    <Label>View</Label>
                     <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ocean">Ocean</SelectItem>
                            <SelectItem value="city">City</SelectItem>
                            <SelectItem value="garden">Garden</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-1.5">
                    <Label>Occupancy</Label>
                    <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-1.5">
                    <Label>Price</Label>
                    <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">$200-$400</SelectItem>
                            <SelectItem value="medium">$400-$800</SelectItem>
                            <SelectItem value="high">$800+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-1.5">
                    <Label>Amenities</Label>
                    <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pool">Pool</SelectItem>
                            <SelectItem value="balcony">Balcony</SelectItem>
                            <SelectItem value="kitchen">Kitchen</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        setIsLoading(true);
        const roomsData: RoomFromApi[] = await getRooms();
        
        const mappedRooms: Room[] = roomsData.map(apiRoom => {
            const roomSize = (parseFloat(apiRoom.room_width) * parseFloat(apiRoom.room_height) / 10.764).toFixed(0);
            return {
              ...apiRoom,
              id: String(apiRoom.id), // Ensure id is a string
              name: apiRoom.descriptive_title,
              description: apiRoom.short_description,
              pricePerNight: parseFloat(apiRoom.price_per_night),
              capacity: apiRoom.adults_capacity,
              imageUrl: '', // This is handled by RoomCard internally
              amenities: apiRoom.amenities_id?.split(',').map(a => a.trim()) || [],
              beds: '1 King Bed', // Placeholder, adjust if API provides this
              size: `${roomSize} sqft`,
              category: apiRoom.room_type?.type_name as any || 'Standard',
            };
        });

        setRooms(mappedRooms);
      } catch (err: any) {
        console.error('Failed to fetch room data:', err);
        setError(err.message || 'Failed to load rooms. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomsData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(rooms.length);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg shadow animate-pulse">
              <div className="aspect-[4/3] bg-muted rounded-t-lg"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (error) {
      return <p className="text-center font-body text-lg text-destructive">{error}</p>;
    }
    if (rooms.length === 0) {
      return (
        <p className="text-center font-body text-lg text-muted-foreground">
          No rooms available at the moment.
        </p>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.slice(0, visibleCount).map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    );
  };
  
  return (
    <>
      <RoomsPageHero />
      <NotificationBanner />
      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <DesktopRoomFilters />
          <MobileRoomFilters />
          
          {renderContent()}

          {!isLoading && !error && visibleCount < rooms.length && (
            <div className="text-center mt-12">
              <Button variant="outline" className="rounded-full px-6 py-3 h-auto" onClick={handleLoadMore}>
                Load More <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

