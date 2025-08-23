
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RoomCard } from '@/components/shared/RoomCard';
import { mockRooms } from '@/data/mockData';
import { ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';

export function FeaturedRoomsSection() {
  const featuredRooms = mockRooms.slice(0, 3); // Display first 3 rooms
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnHover: true })
  );

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
            <CarouselPrevious className="absolute left-[-50px] bg-background/70 text-foreground" />
            <CarouselNext className="absolute right-[-50px] bg-background/70 text-foreground" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

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
