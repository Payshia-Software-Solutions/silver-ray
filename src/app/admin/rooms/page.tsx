
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { PlusCircle, Hotel, CheckCircle2, MinusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Manage Rooms',
  description: 'Admin tools for room management.',
};

export default function ManageRoomsPage() {
  // Dummy data for stats - replace with API calls later
  const roomStats = [
    {
      title: 'Total Rooms',
      count: 75, // Dummy count
      description: 'All rooms in the hotel.',
      icon: Hotel,
      color: 'text-blue-500',
    },
    {
      title: 'Available Rooms',
      count: 23, // Dummy count
      description: 'Rooms ready for booking.',
      icon: CheckCircle2,
      color: 'text-green-500',
    },
    {
      title: 'Booked Rooms',
      count: 52, // Dummy count
      description: 'Currently occupied or reserved.',
      icon: MinusCircle,
      color: 'text-red-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">
            Room Management
          </h1>
          <p className="font-body text-muted-foreground">
            Add, edit, and manage room types, details, and availability.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Room
        </Button>
      </div>

      {/* Room Statistics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roomStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-body">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-headline">{stat.count}</div>
              <p className="text-xs text-muted-foreground font-body">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for room management content */}
      <div className="bg-card p-8 rounded-lg shadow-md min-h-[300px] flex items-center justify-center border">
        <p className="text-muted-foreground font-body">
          Room details, pricing, and availability management interface will be built here.
        </p>
      </div>
    </div>
  );
}
