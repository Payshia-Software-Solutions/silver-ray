
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Booking, BookingStatus } from '@/data/bookingData';
import { mockRooms } from '@/data/mockData';
import { useEffect } from 'react';
import { CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

const bookingFormSchema = z.object({
  guestFirstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  guestLastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  guestEmail: z.string().email({ message: 'Please enter a valid email.' }),
  guestPhone: z.string().optional(),
  roomId: z.string().min(1, { message: 'Please select a room.' }),
  checkInDate: z.date({ required_error: "Check-in date is required." }),
  checkOutDate: z.date({ required_error: "Check-out date is required." }),
  numGuests: z.coerce.number().min(1, { message: 'At least 1 guest is required.' }),
  status: z.enum(['Pending', 'Confirmed', 'Cancelled', 'Checked-in', 'Checked-out', 'No-Show']),
  totalPrice: z.coerce.number().min(0, { message: 'Total price must be a non-negative number.' }),
  specialRequests: z.string().optional(),
}).refine(data => data.checkOutDate > data.checkInDate, {
  message: "Check-out date must be after check-in date.",
  path: ["checkOutDate"],
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

interface BookingFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: BookingFormData) => void;
  initialData?: Booking | null;
  mode: 'add' | 'edit';
}

const bookingStatuses: BookingStatus[] = ['Pending', 'Confirmed', 'Cancelled', 'Checked-in', 'Checked-out', 'No-Show'];

export function BookingFormDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: BookingFormDialogProps) {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guestFirstName: '',
      guestLastName: '',
      guestEmail: '',
      guestPhone: '',
      roomId: '',
      numGuests: 1,
      status: 'Pending',
      totalPrice: 0,
      specialRequests: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          ...initialData,
          checkInDate: typeof initialData.checkInDate === 'string' ? parseISO(initialData.checkInDate) : initialData.checkInDate,
          checkOutDate: typeof initialData.checkOutDate === 'string' ? parseISO(initialData.checkOutDate) : initialData.checkOutDate,
        });
      } else {
        form.reset({
          guestFirstName: '', guestLastName: '', guestEmail: '', guestPhone: '',
          roomId: '', numGuests: 1, status: 'Pending', totalPrice: 0, specialRequests: '',
          checkInDate: undefined, checkOutDate: undefined,
        });
      }
    }
  }, [initialData, form, isOpen]);

  const handleSubmit = (data: BookingFormData) => {
    onSubmit(data);
  };
  
  const handleDialogClose = () => {
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Booking' : 'Edit Booking'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? "Fill in the details for the new booking." : "Make changes to the booking."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <ScrollArea className="h-[calc(100vh-20rem)] sm:h-[calc(100vh-25rem)] md:h-[600px] pr-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-1">
                <FormField
                  control={form.control}
                  name="guestFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest First Name</FormLabel>
                      <FormControl><Input placeholder="John" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guestLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest Last Name</FormLabel>
                      <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guestEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest Email</FormLabel>
                      <FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guestPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest Phone (Optional)</FormLabel>
                      <FormControl><Input type="tel" placeholder="123-456-7890" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a room" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {mockRooms.map(room => (
                            <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numGuests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl><Input type="number" placeholder="2" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-in Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkOutDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-out Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < (form.getValues("checkInDate") || new Date(new Date().setHours(0,0,0,0)))} initialFocus/>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {bookingStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Price (LKR)</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 50000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Special Requests (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., dietary needs, high floor preference" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
              <Button type="submit">{mode === 'add' ? 'Add Booking' : 'Save Changes'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
