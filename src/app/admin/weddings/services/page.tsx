
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manage Wedding Services',
  description: 'Admin tools for wedding service management at Grand Silver Ray.',
};

export default function ManageWeddingServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">
            Wedding Service Management
          </h1>
          <p className="font-body text-muted-foreground">
            Administer additional wedding services, vendors, and customization options.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      <div className="bg-card p-8 rounded-lg shadow-md min-h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground font-body">
          Wedding service options, pricing, and vendor coordination interface will be built here.
        </p>
      </div>
    </div>
  );
}
