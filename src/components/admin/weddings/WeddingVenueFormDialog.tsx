
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { PlusCircle, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const featureSchema = z.object({
  text: z.string().min(3, { message: 'Feature text must be at least 3 characters.' }),
});

const formSchema = z.object({
  name: z.string().min(3, { message: 'Venue name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL for the image.' }).optional().or(z.literal('')),
  imageHint: z.string().optional(),
  features: z.array(featureSchema).optional(),
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
      features: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          name: initialData.name,
          description: initialData.description,
          imageUrl: initialData.imageUrl,
          imageHint: initialData.imageHint,
          features: initialData.features?.map(f => ({ text: f.text })) || [],
        });
      } else {
        form.reset({
          name: '',
          description: '',
          imageUrl: '',
          imageHint: '',
          features: [],
        });
      }
    }
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: WeddingVenueFormData) => {
    onSubmit(data);
    onOpenChange(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) { 
          form.reset({
            name: '',
            description: '',
            imageUrl: '',
            imageHint: '',
            features: [],
          });
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Venue' : 'Edit Venue'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? "Fill in the details for the new wedding venue."
              : "Make changes to the existing venue details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <ScrollArea className="h-[calc(100vh-20rem)] sm:h-[calc(100vh-25rem)] md:h-[500px] pr-3"> {/* Adjusted height */}
              <div className="space-y-4 py-1"> {/* Added py-1 for internal padding */}
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

                {/* Features Section */}
                <div>
                  <FormLabel className="text-base font-medium">Features</FormLabel>
                  <div className="space-y-3 mt-2">
                    {fields.map((item, index) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name={`features.${index}.text`}
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <FormControl>
                                <Input placeholder={`Feature ${index + 1}`} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="text-destructive hover:text-destructive"
                          aria-label="Remove feature"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ text: "" })}
                      className="mt-2"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Feature
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => {
                  onOpenChange(false);
                  form.reset({ name: '', description: '', imageUrl: '', imageHint: '', features: [] });
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
