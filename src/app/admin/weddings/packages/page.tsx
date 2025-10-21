
'use client';

// import type { Metadata } from 'next'; // Metadata cannot be used in client components
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2, CheckCircle } from 'lucide-react';
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
import { weddingPackages as initialWeddingPackages, type WeddingPackage } from '@/data/weddingData';
import { WeddingPackageFormDialog } from '@/components/admin/weddings/WeddingPackageFormDialog';
import { useToast } from '@/components/ui/use-toast';
import type { WeddingPackageFormData } from '@/components/admin/weddings/WeddingPackageFormDialog';
import { Package as DefaultPackageIcon } from 'lucide-react';


// export const metadata: Metadata = { // Cannot be used in client component
//   title: 'Manage Wedding Packages',
//   description: 'Admin tools for wedding package management at Grand Silver Ray.',
// };

export default function ManageWeddingPackagesPage() {
  const [packages, setPackages] = useState<WeddingPackage[]>([]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<WeddingPackage | null>(null);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const { toast } = useToast();

  useEffect(() => {
    setPackages(initialWeddingPackages);
  }, []);

  const handleAddPackage = () => {
    setCurrentPackage(null);
    setDialogMode('add');
    setIsFormDialogOpen(true);
  };

  const handleEditPackage = (pkg: WeddingPackage) => {
    setCurrentPackage(pkg);
    setDialogMode('edit');
    setIsFormDialogOpen(true);
  };

  const handleDeletePackage = (pkg: WeddingPackage) => {
    setCurrentPackage(pkg);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentPackage) {
      setPackages(packages.filter((p) => p.id !== currentPackage.id));
      toast({
        title: 'Package Deleted',
        description: `"${currentPackage.name}" has been successfully deleted.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setCurrentPackage(null);
  };

  const handleFormSubmit = (data: WeddingPackageFormData) => {
    const newInclusions = data.inclusions
      ? data.inclusions.map(inc => ({ icon: CheckCircle, text: inc.text }))
      : [];

    if (dialogMode === 'add') {
      const newPackage: WeddingPackage = {
        id: `pkg-${Date.now()}`,
        name: data.name,
        price: data.price,
        icon: DefaultPackageIcon, // Default icon
        iconImageUrl: data.iconImageUrl || undefined,
        imageHint: data.imageHint || 'package icon',
        inclusions: newInclusions,
      };
      setPackages([...packages, newPackage]);
      toast({
        title: 'Package Added',
        description: `"${newPackage.name}" has been successfully added.`,
      });
    } else if (dialogMode === 'edit' && currentPackage) {
      const updatedPackage: WeddingPackage = {
        ...currentPackage,
        name: data.name,
        price: data.price,
        iconImageUrl: data.iconImageUrl || currentPackage.iconImageUrl,
        imageHint: data.imageHint || currentPackage.imageHint,
        inclusions: newInclusions.length > 0 ? newInclusions : currentPackage.inclusions,
      };
      setPackages(packages.map((p) => (p.id === currentPackage.id ? updatedPackage : p)));
      toast({
        title: 'Package Updated',
        description: `"${updatedPackage.name}" has been successfully updated.`,
      });
    }
    setIsFormDialogOpen(false);
    setCurrentPackage(null);
  };

  return (
    <TooltipProvider>
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
          <Button onClick={handleAddPackage}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Package
          </Button>
        </div>

        <div className="bg-card p-0 rounded-lg shadow-md overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] sm:w-[300px]">Package Name</TableHead>
                <TableHead className="hidden sm:table-cell">Price</TableHead>
                <TableHead className="w-[100px] sm:w-[150px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">
                    {pkg.price || 'N/A'}
                  </TableCell>
                  <TableCell className="text-right space-x-1 sm:space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEditPackage(pkg)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit Package</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Package</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDeletePackage(pkg)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete Package</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Package</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {packages.length === 0 && (
            <div className="text-center p-8 text-muted-foreground font-body">
              No packages found. Click "Add New Package" to get started.
            </div>
          )}
        </div>
      </div>

      <WeddingPackageFormDialog
        isOpen={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSubmit={handleFormSubmit}
        initialData={dialogMode === 'edit' ? currentPackage : null}
        mode={dialogMode}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the package
              "{currentPackage?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCurrentPackage(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
