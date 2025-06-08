
import type { Metadata } from 'next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manage Bookings',
  description: 'Admin tools for booking management.',
};

export default function ManageBookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h1 className="font-headline text-3xl font-bold">
              Booking Management
            </h1>
            <p className="font-body text-muted-foreground">
              View, confirm, and manage guest reservations.
            </p>
        </div>
        <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
      </div>

      {/* Placeholder for booking management content */}
      <div className="bg-card p-8 rounded-lg shadow-md min-h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground font-body">
          Guest booking list, details, and management tools will be built here.
        </p>
      </div>
    </div>
  );
}
