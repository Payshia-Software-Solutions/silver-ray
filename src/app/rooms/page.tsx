
import type { Metadata } from 'next';
import { RoomCard } from '@/components/shared/RoomCard';
import { getRoomsByCompany } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, AlertTriangle } from 'lucide-react';
import { RoomsPageHero } from '@/components/rooms/RoomsPageHero';
import { NotificationBanner } from '@/components/rooms/NotificationBanner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mockRooms } from '@/data/mockData';


export const metadata: Metadata = {
  title: 'Our Rooms & Suites',
  description: 'Explore our luxurious accommodations at Grand Silver Ray. Find the perfect room or suite for your stay.',
};

function RoomFilters() {
  return (
    <div className="my-8 p-4 md:p-6 bg-card rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="sm:col-span-2 lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Search Rooms</label>
          <div className="relative">
            <Input type="text" id="search" placeholder="e.g. Ocean View Suite" className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <div>
          <label htmlFor="room-type" className="block text-sm font-medium text-foreground mb-1">View</label>
          <Select>
            <SelectTrigger id="room-type">
              <SelectValue placeholder="All Views" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Views</SelectItem>
              <SelectItem value="city">City View</SelectItem>
              <SelectItem value="ocean">Ocean View</SelectItem>
              <SelectItem value="garden">Garden View</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-1">Occupancy</label>
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
        <Button className="w-full font-body bg-primary text-primary-foreground hover:bg-primary/90 lg:w-auto">Apply Filters</Button>
      </div>
    </div>
  );
}


export default async function RoomsPage() {
  let apiRooms = await getRoomsByCompany('COMP031');
  let displayRooms = apiRooms.length > 0 ? apiRooms : mockRooms;
  let showError = apiRooms.length === 0;

  return (
    <>
      <RoomsPageHero />
      <NotificationBanner />
      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <RoomFilters />
          {showError && (
             <Alert variant="destructive" className="max-w-2xl mx-auto my-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                Could not connect to the data service. Please ensure the backend is running. Using fallback data for now.
              </AlertDescription>
            </Alert>
          )}
          {displayRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayRooms.map((room) => (
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
    </>
  );
}
