
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
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';


export const metadata: Metadata = {
  title: 'Our Rooms & Suites',
  description: 'Explore our luxurious accommodations at Grand Silver Ray. Find the perfect room or suite for your stay.',
};

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


export default async function RoomsPage() {
  const displayRooms: Room[] = mockRooms;
  
  return (
    <>
      <RoomsPageHero />
      <NotificationBanner />
      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <DesktopRoomFilters />
          <MobileRoomFilters />

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
