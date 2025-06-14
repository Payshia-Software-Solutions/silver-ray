
'use client';

// import type { Metadata } from 'next'; // Metadata cannot be used in client components
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2, ListChecks } from 'lucide-react'; // Added ListChecks
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { weddingVenues as initialWeddingVenues, type WeddingVenue } from '@/data/weddingData';
import { WeddingVenueFormDialog } from '@/components/admin/weddings/WeddingVenueFormDialog';
import { useToast } from '@/components/ui/use-toast';
import type { WeddingVenueFormData } from '@/components/admin/weddings/WeddingVenueFormDialog';


export default function ManageWeddingVenuesPage() {
  const [venues, setVenues] = useState<WeddingVenue[]>([]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentVenue, setCurrentVenue] = useState<WeddingVenue | null>(null);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const { toast } = useToast();

  useEffect(() => {
    setVenues(initialWeddingVenues);
  }, []);

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleAddVenue = () => {
    setCurrentVenue(null);
    setDialogMode('add');
    setIsFormDialogOpen(true);
  };

  const handleEditVenue = (venue: WeddingVenue) => {
    setCurrentVenue(venue);
    setDialogMode('edit');
    setIsFormDialogOpen(true);
  };

  const handleDeleteVenue = (venue: WeddingVenue) => {
    setCurrentVenue(venue);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentVenue) {
      setVenues(venues.filter((v) => v.id !== currentVenue.id));
      toast({
        title: 'Venue Deleted',
        description: `"${currentVenue.name}" has been successfully deleted.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setCurrentVenue(null);
  };

  const handleFormSubmit = (data: WeddingVenueFormData) => {
    const newFeatures = data.features 
      ? data.features.map(f => ({ icon: ListChecks, text: f.text })) 
      : [];

    if (dialogMode === 'add') {
      const newVenue: WeddingVenue = {
        id: `venue-${Date.now()}`, 
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl || 'https://placehold.co/600x400.png',
        imageHint: data.imageHint || 'venue image',
        features: newFeatures,
      };
      setVenues([...venues, newVenue]);
      toast({
        title: 'Venue Added',
        description: `"${newVenue.name}" has been successfully added.`,
      });
    } else if (dialogMode === 'edit' && currentVenue) {
      const updatedVenue: WeddingVenue = {
        ...currentVenue,
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl || currentVenue.imageUrl,
        imageHint: data.imageHint || currentVenue.imageHint,
        features: newFeatures.length > 0 ? newFeatures : currentVenue.features, // Update features or keep existing if none submitted
      };
      setVenues(venues.map((v) => (v.id === currentVenue.id ? updatedVenue : v)));
      toast({
        title: 'Venue Updated',
        description: `"${updatedVenue.name}" has been successfully updated.`,
      });
    }
    setIsFormDialogOpen(false);
    setCurrentVenue(null);
  };

  return (
    <TooltipProvider>
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
          <Button onClick={handleAddVenue}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Venue
          </Button>
        </div>

        <div className="bg-card p-0 rounded-lg shadow-md overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] sm:w-[250px]">Venue Name</TableHead>
                <TableHead className="hidden sm:table-cell">Description</TableHead>
                <TableHead className="w-[100px] sm:w-[150px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {venues.map((venue) => (
                <TableRow key={venue.id}>
                  <TableCell className="font-medium">{venue.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">
                    {truncateDescription(venue.description)}
                  </TableCell>
                  <TableCell className="text-right space-x-1 sm:space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEditVenue(venue)}>
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
                        <Button variant="outline" size="icon" className="h-8 w-8 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDeleteVenue(venue)}>
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
          {venues.length === 0 && (
            <div className="text-center p-8 text-muted-foreground font-body">
              No venues found. Click "Add New Venue" to get started.
            </div>
          )}
        </div>
      </div>

      <WeddingVenueFormDialog
        isOpen={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSubmit={handleFormSubmit}
        initialData={dialogMode === 'edit' ? currentVenue : null}
        mode={dialogMode}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the venue
              "{currentVenue?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCurrentVenue(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
