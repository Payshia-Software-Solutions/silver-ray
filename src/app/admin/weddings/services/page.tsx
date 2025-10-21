
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2, Sparkles } from 'lucide-react';
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
import { initialManageableWeddingServices, type ManageableWeddingService, DefaultServiceIcon } from '@/data/weddingData';
import { WeddingServiceFormDialog, type WeddingServiceFormData } from '@/components/admin/weddings/WeddingServiceFormDialog';
import { useToast } from '@/components/ui/use-toast';
import NextImage from 'next/image';


export default function ManageWeddingServicesPage() {
  const [services, setServices] = useState<ManageableWeddingService[]>([]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<ManageableWeddingService | null>(null);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const { toast } = useToast();

  useEffect(() => {
    setServices(initialManageableWeddingServices);
  }, []);

  const truncateDescription = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleAddService = () => {
    setCurrentService(null);
    setDialogMode('add');
    setIsFormDialogOpen(true);
  };

  const handleEditService = (service: ManageableWeddingService) => {
    setCurrentService(service);
    setDialogMode('edit');
    setIsFormDialogOpen(true);
  };

  const handleDeleteService = (service: ManageableWeddingService) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentService) {
      setServices(services.filter((s) => s.id !== currentService.id));
      toast({
        title: 'Service Deleted',
        description: `"${currentService.name}" has been successfully deleted.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setCurrentService(null);
  };

  const handleFormSubmit = (data: WeddingServiceFormData) => {
    if (dialogMode === 'add') {
      const newService: ManageableWeddingService = {
        id: `service-${Date.now()}`,
        name: data.name,
        description: data.description,
        price: data.price || undefined,
        iconImageUrl: data.iconImageUrl || undefined,
        imageHint: data.imageHint || undefined,
        defaultIcon: DefaultServiceIcon, // Assign a default Lucide icon
      };
      setServices([...services, newService]);
      toast({
        title: 'Service Added',
        description: `"${newService.name}" has been successfully added.`,
      });
    } else if (dialogMode === 'edit' && currentService) {
      const updatedService: ManageableWeddingService = {
        ...currentService,
        name: data.name,
        description: data.description,
        price: data.price || currentService.price,
        iconImageUrl: data.iconImageUrl || currentService.iconImageUrl,
        imageHint: data.imageHint || currentService.imageHint,
      };
      setServices(services.map((s) => (s.id === currentService.id ? updatedService : s)));
      toast({
        title: 'Service Updated',
        description: `"${updatedService.name}" has been successfully updated.`,
      });
    }
    setIsFormDialogOpen(false);
    setCurrentService(null);
  };

  return (
    <TooltipProvider>
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
          <Button onClick={handleAddService}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </div>

        <div className="bg-card p-0 rounded-lg shadow-md overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 hidden sm:table-cell">Icon</TableHead>
                <TableHead className="w-[200px] sm:w-[250px]">Service Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden sm:table-cell">Price</TableHead>
                <TableHead className="w-[100px] sm:w-[150px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => {
                const IconComp = service.defaultIcon || Sparkles;
                return (
                  <TableRow key={service.id}>
                    <TableCell className="hidden sm:table-cell">
                      {service.iconImageUrl ? (
                        <div className="w-8 h-8 rounded-sm overflow-hidden relative border">
                          <NextImage src={service.iconImageUrl} alt={service.name} data-ai-hint={service.imageHint || 'service icon'} layout="fill" objectFit="cover" />
                        </div>
                      ) : (
                        <IconComp className="h-5 w-5 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                      {truncateDescription(service.description)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">
                      {service.price || 'N/A'}
                    </TableCell>
                    <TableCell className="text-right space-x-1 sm:space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEditService(service)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit Service</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Service</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDeleteService(service)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Service</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Service</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {services.length === 0 && (
            <div className="text-center p-8 text-muted-foreground font-body">
              No services found. Click "Add New Service" to get started.
            </div>
          )}
        </div>
      </div>

      <WeddingServiceFormDialog
        isOpen={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSubmit={handleFormSubmit}
        initialData={dialogMode === 'edit' ? currentService : null}
        mode={dialogMode}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service
              "{currentService?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCurrentService(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
