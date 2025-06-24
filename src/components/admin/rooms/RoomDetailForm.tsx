
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import type { Room } from '@/data/mockData';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Info, Users, DollarSign, CheckSquare, Image as ImageIcon, Plus, Minus } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const amenitiesList = [
    { id: 'king_bed', label: 'King-size Bed' },
    { id: 'rain_shower', label: 'Rain Shower' },
    { id: 'luxury_linens', label: 'Luxury Linens' },
    { id: 'wifi', label: 'High-speed Wi-Fi' },
    { id: 'nespresso', label: 'Nespresso Machine' },
    { id: 'climate_control', label: 'Climate Control' },
    { id: 'smart_tv', label: '55" Smart TV' },
    { id: 'balcony', label: 'Private Balcony' },
    { id: 'in_room_safe', label: 'In-room Safe' },
    { id: 'mini_bar', label: 'Mini Bar' },
    { id: 'work_desk', label: 'Work Desk' },
    { id: 'room_service', label: 'Room Service' },
];

const roomFormSchema = z.object({
  roomNumber: z.string().min(1, 'Room number is required.'),
  roomType: z.string().min(1, 'Please select a room type.'),
  descriptiveTitle: z.string().min(5, 'Descriptive title is required.'),
  shortDescription: z.string().min(10, 'Short description is required.'),
  adults: z.coerce.number().min(1),
  children: z.coerce.number().min(0),
  roomSizeWidth: z.coerce.number().min(1),
  roomSizeHeight: z.coerce.number().min(1),
  pricePerNight: z.coerce.number().min(1, 'Price must be greater than 0.'),
  status: z.enum(['Available', 'Booked', 'Under Maintenance', 'Unavailable']),
  amenities: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one amenity.',
  }),
});

type RoomDetailFormValues = z.infer<typeof roomFormSchema>;

interface RoomDetailFormProps {
  mode: 'add' | 'edit';
  initialData?: Room | null;
  onDelete?: () => void;
}

export function RoomDetailForm({ mode, initialData, onDelete }: RoomDetailFormProps) {
  const router = useRouter();

  const form = useForm<RoomDetailFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      roomNumber: '',
      roomType: '',
      descriptiveTitle: '',
      shortDescription: '',
      adults: 1,
      children: 0,
      roomSizeWidth: 450,
      roomSizeHeight: 450,
      pricePerNight: 25000,
      status: 'Available',
      amenities: [],
    },
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      // In a real app, you would map initialData to form values more carefully
      form.reset({
        roomNumber: initialData.id.split('-').pop() || '',
        roomType: initialData.category,
        descriptiveTitle: initialData.name,
        shortDescription: initialData.description,
        adults: initialData.capacity,
        children: 0, // Mock data doesn't have children capacity
        pricePerNight: initialData.pricePerNight,
        status: 'Available', // Mock data doesn't have this status
        amenities: initialData.amenities.map(a => a.toLowerCase().replace(/ /g, '_')), // Simple conversion
      });
    }
  }, [mode, initialData, form]);

  const onSubmit = (data: RoomDetailFormValues) => {
    console.log(data);
    toast({
      title: mode === 'add' ? 'Room Created' : 'Room Updated',
      description: `Room ${data.descriptiveTitle} has been successfully ${mode === 'add' ? 'created' : 'updated'}.`,
    });
    router.push('/admin/rooms');
  };

    const NumberStepper = ({ name, label }: { name: "adults" | "children", label: string }) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <div className="flex items-center space-x-2">
                        <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => form.setValue(name, Math.max(0, field.value - 1))}><Minus className="h-4 w-4" /></Button>
                        <Input {...field} type="number" className="w-12 text-center h-8" readOnly />
                        <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => form.setValue(name, field.value + 1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2 text-primary" /> Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="roomNumber" render={({ field }) => (<FormItem><FormLabel>Room Number</FormLabel><FormControl><Input placeholder="e.g., 105" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="roomType" render={({ field }) => (<FormItem><FormLabel>Room Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select Room Type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Standard">Standard</SelectItem><SelectItem value="Deluxe">Deluxe</SelectItem><SelectItem value="Suite">Suite</SelectItem><SelectItem value="Villa">Villa</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="descriptiveTitle" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Descriptive Title</FormLabel><FormControl><Input placeholder="e.g., Mountain View King Suite" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="shortDescription" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Short Description</FormLabel><FormControl><Textarea placeholder="Brief overview of the room..." {...field} /></FormControl><FormMessage /></FormItem>)} />
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle className="flex items-center"><Users className="w-5 h-5 mr-2 text-primary" /> Capacity & Dimensions</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <NumberStepper name="adults" label="Adults" />
                <NumberStepper name="children" label="Children" />
                <div className="md:col-span-2">
                    <FormLabel>Room Size</FormLabel>
                    <div className="flex items-center space-x-2">
                        <FormField control={form.control} name="roomSizeWidth" render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input type="number" placeholder="width" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <span className="text-muted-foreground">x</span>
                        <FormField control={form.control} name="roomSizeHeight" render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input type="number" placeholder="height" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center"><DollarSign className="w-5 h-5 mr-2 text-primary" /> Pricing & Status</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="pricePerNight" render={({ field }) => (<FormItem><FormLabel>Price per Night</FormLabel><div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">LKR</span><FormControl><Input type="number" className="pl-12" placeholder="25000" {...field} /></FormControl></div><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="status" render={({ field }) => (<FormItem><FormLabel>Current Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Available">Available</SelectItem><SelectItem value="Booked">Booked</SelectItem><SelectItem value="Under Maintenance">Under Maintenance</SelectItem><SelectItem value="Unavailable">Unavailable</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader><CardTitle className="flex items-center"><CheckSquare className="w-5 h-5 mr-2 text-primary" /> Key Amenities</CardTitle></CardHeader>
            <CardContent>
                 <FormField
                    control={form.control}
                    name="amenities"
                    render={() => (
                        <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {amenitiesList.map((item) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="amenities"
                                render={({ field }) => {
                                return (
                                    <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                    <FormControl>
                                        <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                            return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== item.id
                                                )
                                            )
                                        }}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {item.label}
                                    </FormLabel>
                                    </FormItem>
                                )
                                }}
                            />
                            ))}
                        </div>
                        <FormMessage className="pt-4" />
                        </FormItem>
                    )}
                    />
            </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center"><ImageIcon className="w-5 h-5 mr-2 text-primary" /> Room Images</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer">
                    <Plus className="w-8 h-8" />
                    <span className="text-sm mt-1">Add Image</span>
                </div>
            ))}
          </CardContent>
        </Card>

        <div className="bg-card p-4 rounded-lg shadow-sm flex justify-end items-center gap-4">
            {mode === 'edit' && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button type="button" variant="destructive" className="mr-auto">Delete Room</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Are you sure you want to delete this room?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone and will permanently remove the room from the system.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">Confirm Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            <Button type="button" variant="outline" onClick={() => router.push('/admin/rooms')}>Cancel</Button>
            <Button type="submit">
                {mode === 'add' ? 'Create New Room' : 'Save Changes'}
            </Button>
        </div>
      </form>
    </Form>
  );
}

