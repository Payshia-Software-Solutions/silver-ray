
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
import type { ManageableWeddingService } from '@/data/weddingData';
import { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Service name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.string().optional(),
  iconImageUrl: z.string().url({ message: 'Please enter a valid URL for the icon image.' }).optional().or(z.literal('')),
  imageHint: z.string().optional(),
});

export type WeddingServiceFormData = z.infer<typeof formSchema>;

interface WeddingServiceFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: WeddingServiceFormData) => void;
  initialData?: ManageableWeddingService | null;
  mode: 'add' | 'edit';
}

export function WeddingServiceFormDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: WeddingServiceFormDialogProps) {
  const form = useForm<WeddingServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      iconImageUrl: '',
      imageHint: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          name: initialData.name,
          description: initialData.description,
          price: initialData.price || '',
          iconImageUrl: initialData.iconImageUrl || '',
          imageHint: initialData.imageHint || '',
        });
      } else {
        form.reset({
          name: '',
          description: '',
          price: '',
          iconImageUrl: '',
          imageHint: '',
        });
      }
    }
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: WeddingServiceFormData) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) {
        form.reset({ name: '', description: '', price: '', iconImageUrl: '', imageHint: '' });
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Service' : 'Edit Service'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? "Fill in the details for the new wedding service."
              : "Make changes to the existing service details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <ScrollArea className="h-[calc(100vh-20rem)] sm:h-[calc(100vh-25rem)] md:h-[450px] pr-3">
              <div className="space-y-4 py-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Premium Photography" {...field} />
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
                          placeholder="Describe the service..."
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., LKR 150,000 or 'Per consultation'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="iconImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/service-icon.png" {...field} />
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
                      <FormLabel>Icon AI Hint (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., photography camera icon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => {
                onOpenChange(false);
                form.reset({ name: '', description: '', price: '', iconImageUrl: '', imageHint: '' });
              }}>
                Cancel
              </Button>
              <Button type="submit">{mode === 'add' ? 'Add Service' : 'Save Changes'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
