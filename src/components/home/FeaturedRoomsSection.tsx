
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RoomCard } from '@/components/shared/RoomCard';
import { ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useState, useEffect } from 'react';
import type { Room, RoomImage, RoomFromApi } from '@/types';
import { getRooms, getRoomImages } from '@/services/api/rooms';
import { IMAGE_BASE_URL } from '@/lib/config';

export function FeaturedRoomsSection() {
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      try {
        setIsLoading(true);
        const [roomsData, imagesData] = await Promise.all([
          getRooms(),
          getRoomImages()
        ]);

        const imagesByRoomId = (imagesData || []).reduce((acc, image) => {
          if (!acc[image.room_id]) {
            acc[image.room_id] = [];
          }
          acc[image.room_id].push(image);
          return acc;
        }, {} as Record<number, RoomImage[]>);

        const roomsWithImages: Room[] = (roomsData as RoomFromApi[]).map(room => {
            const primaryImage = imagesByRoomId[room.id]?.find(img => String(img.is_primary) === "1") || imagesByRoomId[room.id]?.[0];
            const imageUrl = primaryImage ? primaryImage.image_url : room.room_images || '';
            return {
              ...room,
              imageUrl: imageUrl,
              images: imagesByRoomId[room.id] || [],
              amenities: [], 
              capacity: room.adults_capacity,
              beds: '1 King Bed',
              size: `${room.room_width}x${room.room_height} sqm`,
              category: 'Standard',
            };
        });

        setFeaturedRooms(roomsWithImages.slice(0, 3)); // Take first 3 for featured section
      } catch (err: any) {
        console.error('Failed to fetch featured rooms:', err);
        setError('Could not load featured rooms.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedRooms();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnHover: true })
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
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
       return <p className="text-center text-destructive">{error}</p>
    }

    return (
      <>
        {/* Mobile Carousel */}
        <div className="md:hidden mb-12">
          <Carousel
            opts={{
              align: "start",
              loop: featuredRooms.length > 1,
            }}
            plugins={[plugin.current]}
            className="w-full max-w-sm mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4">
              {featuredRooms.map((room) => (
                <CarouselItem key={room.id} className="pl-4">
                  <div className="p-1 h-full">
                    <RoomCard room={room} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </>
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Explore Our Exquisite Rooms
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Each of our rooms and suites is designed with your utmost comfort and luxury in mind, offering a serene escape.
          </p>
        </div>
        
        {renderContent()}

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="font-body text-lg group border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            <Link href="/rooms">
              View All Rooms
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
