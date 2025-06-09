
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
import { ScrollArea } from '@/components/ui/scroll-area';
import type { WeddingPackage } from '@/data/weddingData';
import { useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const inclusionSchema = z.object({
  text: z.string().min(3, { message: 'Inclusion text must be at least 3 characters.' }),
});

const formSchema = z.object({
  name: z.string().min(3, { message: 'Package name must be at least 3 characters.' }),
  price: z.string().optional(),
  iconImageUrl: z.string().url({ message: 'Please enter a valid URL for the icon image.' }).optional().or(z.literal('')),
  imageHint: z.string().optional(), // For package icon's AI hint
  inclusions: z.array(inclusionSchema).optional(),
});

export type WeddingPackageFormData = z.infer<typeof formSchema>;

interface WeddingPackageFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: WeddingPackageFormData) => void;
  initialData?: WeddingPackage | null;
  mode: 'add' | 'edit';
}

export function WeddingPackageFormDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: WeddingPackageFormDialogProps) {
  const form = useForm<WeddingPackageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: '',
      iconImageUrl: '',
      imageHint: '',
      inclusions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "inclusions",
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          name: initialData.name,
          price: initialData.price || '',
          iconImageUrl: initialData.iconImageUrl || '',
          imageHint: initialData.imageHint || '',
          inclusions: initialData.inclusions?.map(inc => ({ text: inc.text })) || [],
        });
      } else {
        form.reset({
          name: '',
          price: '',
          iconImageUrl: '',
          imageHint: '',
          inclusions: [],
        });
      }
    }
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: WeddingPackageFormData) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) {
        form.reset({ name: '', price: '', iconImageUrl: '', imageHint: '', inclusions: [] });
      }
    }}>
      <DialogContent className="sm:max-w-lg"> {/* Increased max-width for more content */}
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Package' : 'Edit Package'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? "Fill in the details for the new wedding package."
              : "Make changes to the existing package details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <ScrollArea className="h-[calc(100vh-20rem)] sm:h-[calc(100vh-25rem)] md:h-[550px] pr-3">
              <div className="space-y-4 py-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Diamond Bliss Package" {...field} />
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
                        <Input placeholder="e.g., LKR 1,500,000" {...field} />
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
                        <Input placeholder="https://example.com/icon.png" {...field} />
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
                      <FormLabel>Icon Image AI Hint (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., wedding package icon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Inclusions Section */}
                <div>
                  <FormLabel className="text-base font-medium">Inclusions</FormLabel>
                  <div className="space-y-3 mt-2">
                    {fields.map((item, index) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name={`inclusions.${index}.text`}
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <FormControl>
                                <Input placeholder={`Inclusion ${index + 1} description`} {...field} />
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
                          aria-label="Remove inclusion"
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
                      Add Inclusion
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => {
                onOpenChange(false);
                form.reset({ name: '', price: '', iconImageUrl: '', imageHint: '', inclusions: [] });
              }}>
                Cancel
              </Button>
              <Button type="submit">{mode === 'add' ? 'Add Package' : 'Save Changes'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
