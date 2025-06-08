
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manage Wedding Packages',
  description: 'Admin tools for wedding package management at Grand Silver Ray.',
};

export default function ManageWeddingPackagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">
            Wedding Package Management
          </h1>
          <p className="font-body text-muted-foreground">
            Create, update, and manage wedding packages and their inclusions.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Package
        </Button>
      </div>

      <div className="bg-card p-8 rounded-lg shadow-md min-h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground font-body">
          Wedding package details, pricing, and included services management interface will be built here.
        </p>
      </div>
    </div>
  );
}
