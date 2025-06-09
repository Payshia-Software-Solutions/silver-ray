
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { WeddingVenue } from '@/data/weddingData';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Venue name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL for the image.' }).optional().or(z.literal('')),
  imageHint: z.string().optional(),
});

export type WeddingVenueFormData = z.infer<typeof formSchema>;

interface WeddingVenueFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: WeddingVenueFormData) => void;
  initialData?: WeddingVenue | null;
  mode: 'add' | 'edit';
}

export function WeddingVenueFormDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: WeddingVenueFormDialogProps) {
  const form = useForm<WeddingVenueFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      imageHint: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        imageUrl: initialData.imageUrl,
        imageHint: initialData.imageHint,
      });
    } else {
      form.reset({ // Reset to default if no initial data (e.g., for 'add' mode or when closing)
        name: '',
        description: '',
        imageUrl: '',
        imageHint: '',
      });
    }
  }, [initialData, form, isOpen]); // Rerun effect if initialData, form instance, or isOpen changes

  const handleSubmit = (data: WeddingVenueFormData) => {
    onSubmit(data);
    onOpenChange(false); // Close dialog on submit
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) { // Reset form when dialog is closed
          form.reset({
            name: '',
            description: '',
            imageUrl: '',
            imageHint: '',
          });
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Venue' : 'Edit Venue'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? "Fill in the details for the new wedding venue."
              : "Make changes to the existing venue details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Grand Ballroom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the venue..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image AI Hint (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ballroom wedding" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                  onOpenChange(false);
                  form.reset({ name: '', description: '', imageUrl: '', imageHint: '' });
              }}>
                Cancel
              </Button>
              <Button type="submit">{mode === 'add' ? 'Add Venue' : 'Save Changes'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
