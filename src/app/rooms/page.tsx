
import type { Metadata } from 'next';
import { RoomCard } from '@/components/shared/RoomCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { RoomsPageHero } from '@/components/rooms/RoomsPageHero';
import { NotificationBanner } from '@/components/rooms/NotificationBanner';
import { mockRooms } from '@/data/mockData';
import type { Room } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Our Rooms & Suites',
  description: 'Explore our luxurious accommodations at Grand Silver Ray. Find the perfect room or suite for your stay.',
};

function RoomFilters() {
  return (
    <div className="my-8">
      <Accordion type="single" collapsible className="w-full bg-card rounded-lg shadow-sm border px-4">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="hover:no-underline font-semibold text-foreground/80">
             <div className='flex items-center gap-2'>
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters & Sort</span>
             </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end pt-4">
               <p className='text-muted-foreground'>Filter controls would be here.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}


export default async function RoomsPage() {
  const displayRooms: Room[] = mockRooms;
  
  return (
    <>
      <RoomsPageHero />
      <NotificationBanner />
      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <RoomFilters />

          {displayRooms.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
          ) : (
            <p className="text-center font-body text-lg text-muted-foreground">
              No rooms available.
            </p>
          )}

           <div className="text-center mt-12">
            <Button variant="outline" className="rounded-full px-6 py-3 h-auto">
              Load More <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}
