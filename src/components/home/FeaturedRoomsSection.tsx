import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RoomCard } from '@/components/shared/RoomCard';
import { mockRooms } from '@/data/mockData';
import { ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export function FeaturedRoomsSection() {
  const featuredRooms = mockRooms.slice(0, 3); // Display first 3 rooms

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
              loop: featuredRooms.length > 2, // Loop if more than 2 rooms to make sense for a carousel
            }}
            className="w-full max-w-md mx-auto" // Adjust width as needed
          >
            <CarouselContent className="-ml-4">
              {featuredRooms.map((room) => (
                <CarouselItem key={room.id} className="pl-4 basis-full sm:basis-4/5">
                  <div className="p-1 h-full">
                    <RoomCard room={room} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Add CarouselPrevious and CarouselNext if buttons are desired on mobile */}
            {/* 
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
            */}
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
