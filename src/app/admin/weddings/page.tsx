
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wedding Management | Grand Silver Ray Admin',
  description: 'Admin tools for managing wedding packages, venues, and inquiries at Grand Silver Ray.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function ManageWeddingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">
            Wedding Management
          </h1>
          <p className="font-body text-muted-foreground">
            Oversee wedding packages, venues, services, and inquiries.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Package
        </Button>
      </div>

      {/* Placeholder for wedding management content */}
      <div className="bg-card p-8 rounded-lg shadow-md min-h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground font-body">
          Wedding packages, venues, and inquiries management interface will be built here.
        </p>
      </div>
    </div>
  );
}
