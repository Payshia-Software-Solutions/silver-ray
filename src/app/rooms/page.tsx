import type { Metadata } from 'next';
import { RoomCard } from '@/components/shared/RoomCard';
import { mockRooms } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, BedDouble, Users, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Rooms & Suites',
  description: 'Explore our luxurious accommodations at LuxeStay. Find the perfect room or suite for your stay.',
};

// This would be a client component if we add real filtering logic
function RoomFilters() {
  return (
    <div className="mb-12 p-6 bg-secondary/30 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Search Rooms</label>
          <div className="relative">
            <Input type="text" id="search" placeholder="e.g. Ocean View Suite" className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <div>
          <label htmlFor="room-type" className="block text-sm font-medium text-foreground mb-1">Room Type</label>
          <Select>
            <SelectTrigger id="room-type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-1">Guests</label>
           <Select>
            <SelectTrigger id="guests">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full lg:w-auto font-body">Apply Filters</Button>
      </div>
    </div>
  );
}


export default function RoomsPage() {
  const rooms = mockRooms; // In a real app, fetch this data

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
            Our Accommodations
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your perfect sanctuary. Each room and suite at LuxeStay offers a unique blend of luxury, comfort, and style, designed to make your stay unforgettable.
          </p>
        </div>

        <RoomFilters />

        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <p className="text-center font-body text-lg text-muted-foreground">
            No rooms available matching your criteria. Please try different filters.
          </p>
        )}
      </div>
    </div>
  );
}
