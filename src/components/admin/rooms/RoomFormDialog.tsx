
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Room } from '@/data/mockData';
import { useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const itemSchema = z.object({
  text: z.string().min(3, { message: 'Must be at least 3 characters.' }),
});

const roomFormSchema = z.object({
  name: z.string().min(3, { message: 'Room name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Short description must be at least 10 characters.' }),
  longDescription: z.string().min(20, { message: 'Long description must be at least 20 characters.' }),
  pricePerNight: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, { message: 'Price must be a valid non-negative number.'}),
  imageUrl: z.string().url({ message: 'Please enter a valid URL for the main image.' }).optional().or(z.literal('')),
  imageHint: z.string().optional(),
  capacity: z.string().refine(val => !isNaN(parseInt(val)) && parseInt(val) > 0, { message: 'Capacity must be a positive number.'}),
  beds: z.string().min(1, { message: 'Bed configuration is required.' }),
  size: z.string().min(1, { message: 'Room size is required.' }),
  category: z.enum(['Standard', 'Deluxe', 'Suite', 'Villa']),
  viewType: z.string().optional(),
  roomLayoutImageUrl: z.string().url({ message: 'Please enter a valid URL for the layout image.' }).optional().or(z.literal('')),
  amenities: z.array(itemSchema).optional(),
  enhanceYourStay: z.array(itemSchema).optional(),
});

export type RoomFormData = z.infer<typeof roomFormSchema>;

interface RoomFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: RoomFormData) => void;
  initialData?: Room | null;
  mode: 'add' | 'edit';
}

export function RoomFormDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: RoomFormDialogProps) {
  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: '',
      description: '',
      longDescription: '',
      pricePerNight: '0',
      imageUrl: '',
      imageHint: '',
      capacity: '1',
      beds: '',
      size: '',
      category: 'Standard',
      viewType: '',
      roomLayoutImageUrl: '',
      amenities: [],
      enhanceYourStay: [],
    },
  });

  const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({
    control: form.control,
    name: "amenities",
  });

  const { fields: enhanceFields, append: appendEnhance, remove: removeEnhance } = useFieldArray({
    control: form.control,
    name: "enhanceYourStay",
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          name: initialData.name,
          description: initialData.description,
          longDescription: initialData.longDescription,
          pricePerNight: String(initialData.pricePerNight),
          imageUrl: initialData.imageUrl,
          imageHint: initialData.imageHint || '',
          capacity: String(initialData.capacity),
          beds: initialData.beds,
          size: initialData.size,
          category: initialData.category,
          viewType: initialData.viewType || '',
          roomLayoutImageUrl: initialData.roomLayoutImageUrl || '',
          amenities: initialData.amenities?.map(a => ({ text: a })) || [],
          enhanceYourStay: initialData.enhanceYourStay?.map(e => ({ text: e })) || [],
        });
      } else {
        form.reset({
          name: '', description: '', longDescription: '', pricePerNight: '0', imageUrl: '', imageHint: '',
          capacity: '1', beds: '', size: '', category: 'Standard', viewType: '', roomLayoutImageUrl: '',
          amenities: [], enhanceYourStay: [],
        });
      }
    }
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: RoomFormData) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleDialogClose = () => {
    onOpenChange(false);
    form.reset({
        name: '', description: '', longDescription: '', pricePerNight: '0', imageUrl: '', imageHint: '',
        capacity: '1', beds: '', size: '', category: 'Standard', viewType: '', roomLayoutImageUrl: '',
        amenities: [], enhanceYourStay: [],
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-2xl"> {/* Increased width for more fields */}
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Room' : 'Edit Room'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? "Fill in the details for the new room."
              : "Make changes to the existing room details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <ScrollArea className="h-[calc(100vh-20rem)] sm:h-[calc(100vh-25rem)] md:h-[600px] pr-3">
              <div className="space-y-4 py-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Room Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Deluxe King Room" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Short Description (for cards)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Briefly describe the room..." {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Long Description (for detail page)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Provide a detailed description..." {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pricePerNight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Per Night ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 250" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Deluxe">Deluxe</SelectItem>
                          <SelectItem value="Suite">Suite</SelectItem>
                          <SelectItem value="Villa">Villa</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity (Guests)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="beds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beds</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 1 King Bed" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 40 sqm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="viewType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>View Type (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Ocean View, City View" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Main Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/room-image.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageHint"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Main Image AI Hint (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., luxury hotel room interior" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomLayoutImageUrl"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Room Layout Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/layout.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amenities Section */}
                <div className="md:col-span-2 space-y-3">
                  <FormLabel className="text-base font-medium">Amenities</FormLabel>
                  {amenityFields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name={`amenities.${index}.text`}
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormControl>
                              <Input placeholder={`Amenity ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeAmenity(index)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendAmenity({ text: "" })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Amenity
                  </Button>
                </div>

                {/* Enhance Your Stay Section */}
                <div className="md:col-span-2 space-y-3">
                  <FormLabel className="text-base font-medium">Enhance Your Stay Items</FormLabel>
                  {enhanceFields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name={`enhanceYourStay.${index}.text`}
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormControl>
                              <Input placeholder={`Enhancement ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeEnhance(index)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendEnhance({ text: "" })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Enhancement
                  </Button>
                </div>

              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit">{mode === 'add' ? 'Add Room' : 'Save Changes'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
