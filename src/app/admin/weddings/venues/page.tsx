
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { weddingVenues, type WeddingVenue } from '@/data/weddingData'; // Adjusted path

export const metadata: Metadata = {
  title: 'Manage Wedding Venues',
  description: 'Admin tools for wedding venue management at Grand Silver Ray.',
};

export default function ManageWeddingVenuesPage() {
  const venues: WeddingVenue[] = weddingVenues; // Using mock data

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">
            Wedding Venue Management
          </h1>
          <p className="font-body text-muted-foreground">
            Add, edit, and manage wedding venues.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Venue
        </Button>
      </div>

      <div className="bg-card p-0 rounded-lg shadow-md overflow-hidden border">
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Venue Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {venues.map((venue) => (
                <TableRow key={venue.id}>
                  <TableCell className="font-medium">{venue.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {truncateDescription(venue.description)}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit Venue</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Venue</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete Venue</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Venue</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
        {venues.length === 0 && (
            <div className="text-center p-8 text-muted-foreground font-body">
                No venues found. Click "Add New Venue" to get started.
            </div>
        )}
      </div>
    </div>
  );
}
