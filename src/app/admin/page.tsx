
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, BedDouble, Briefcase, CalendarHeart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Overview of hotel management.',
};

export default function AdminDashboardPage() {
  const managementSections = [
    {
      title: 'Wedding Management',
      description: 'Manage wedding packages, venues, and inquiries.',
      href: '/admin/weddings',
      icon: CalendarHeart,
    },
    {
      title: 'Room Management',
      description: 'Oversee room types, availability, and pricing.',
      href: '/admin/rooms',
      icon: BedDouble,
    },
    {
      title: 'Booking Management',
      description: 'View and manage guest reservations and bookings.',
      href: '/admin/bookings',
      icon: Briefcase,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-2">
          Admin Dashboard
        </h1>
        <p className="font-body text-lg text-muted-foreground">
          Welcome to the Grand Silver Ray Hotel management panel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementSections.map((section) => (
          <Card key={section.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold font-headline">
                {section.title}
              </CardTitle>
              <section.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="font-body text-sm mb-4">
                {section.description}
              </CardDescription>
              <Button asChild variant="outline" className="w-full">
                <Link href={section.href}>Go to {section.title.replace(' Management', '')}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for future stats or quick actions */}
      <div className="bg-card p-6 rounded-lg shadow">
        <h2 className="font-headline text-xl font-semibold mb-3">Quick Stats (Placeholder)</h2>
        <p className="font-body text-sm text-muted-foreground">
          Analytics and key metrics will be displayed here.
        </p>
      </div>
    </div>
  );
}
