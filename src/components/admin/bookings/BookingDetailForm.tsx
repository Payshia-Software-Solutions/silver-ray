
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/components/ui/use-toast';
import { mockRooms } from '@/data/mockData';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon, User, Bed, Wallet, BarChart, Plus, Minus, CheckCircle, Info } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Booking, BookingStatus, PaymentStatus, PaymentMethod, BookingSource } from '@/data/bookingData';

const bookingFormSchema = z.object({
  guestFirstName: z.string().min(2, 'First name is required'),
  guestLastName: z.string().min(2, 'Last name is required'),
  guestEmail: z.string().email('A valid email is required'),
  guestPhone: z.string().optional(),
  address: z.string().optional(),
  specialRequests: z.string().optional(),
  
  roomId: z.string().min(1, 'Please select a room'),
  checkInDate: z.date({ required_error: 'Check-in date is required.' }),
  checkOutDate: z.date({ required_error: 'Check-out date is required.' }),
  numGuests: z.coerce.number().min(1),
  children: z.coerce.number().min(0),
  
  totalPrice: z.coerce.number().min(0),
  discountCode: z.string().optional(),
  paymentStatus: z.enum(['Pending', 'Paid', 'Refunded']),
  amountPaid: z.coerce.number().min(0),
  paymentMethod: z.enum(['Credit Card', 'Bank Transfer', 'Cash', 'Online']).optional(),

  status: z.enum(['Pending', 'Confirmed', 'Cancelled', 'Checked-in', 'Checked-out', 'No-Show']),
  bookingSource: z.enum(['Online', 'Phone', 'Walk-in', 'Agent']).optional(),
}).refine(data => data.checkOutDate > data.checkInDate, {
  message: 'Check-out date must be after check-in date.',
  path: ['checkOutDate'],
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingDetailFormProps {
  mode: 'add' | 'edit';
  initialData?: Booking | null;
}

const FormSection = ({ title, description, icon: Icon, children }: { title: string, description?: string, icon: React.ElementType, children: React.ReactNode }) => (
    <div className="flex gap-6 items-start">
        <div className="hidden sm:flex flex-col items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full border border-primary/20">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="bg-border h-full w-px"></div>
        </div>
        <div className="flex-1">
            <h3 className="font-headline text-lg font-semibold">{title}</h3>
            {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
            {children}
        </div>
    </div>
);

const NumberStepper = ({ name, label, control }: { name: "numGuests" | "children", label: string, control: any }) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <div className="flex items-center space-x-2">
                    <Button type="button" variant="outline" size="icon" className="h-9 w-9" onClick={() => field.onChange(Math.max(name === 'numGuests' ? 1 : 0, field.value - 1))}><Minus className="h-4 w-4" /></Button>
                    <Input {...field} type="number" className="w-14 text-center h-9" readOnly />
                    <Button type="button" variant="outline" size="icon" className="h-9 w-9" onClick={() => field.onChange(field.value + 1)}><Plus className="h-4 w-4" /></Button>
                </div>
                <FormMessage />
            </FormItem>
        )}
    />
);


export function BookingDetailForm({ mode, initialData }: BookingDetailFormProps) {
  const router = useRouter();
  const [numberOfNights, setNumberOfNights] = useState(0);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guestFirstName: '', guestLastName: '', guestEmail: '', guestPhone: '', address: '', specialRequests: '',
      roomId: '', numGuests: 1, children: 0,
      totalPrice: 0, discountCode: '', paymentStatus: 'Pending', amountPaid: 0,
      status: 'Pending',
    },
  });
  
  const checkInDate = form.watch('checkInDate');
  const checkOutDate = form.watch('checkOutDate');
  const totalPrice = form.watch('totalPrice');
  const amountPaid = form.watch('amountPaid');
  const balanceDue = useMemo(() => Math.max(0, totalPrice - amountPaid), [totalPrice, amountPaid]);


  useEffect(() => {
    if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
      setNumberOfNights(differenceInDays(checkOutDate, checkInDate));
    } else {
      setNumberOfNights(0);
    }
  }, [checkInDate, checkOutDate]);
  
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      form.reset({
        ...initialData,
        guestFirstName: initialData.guestFirstName,
        guestLastName: initialData.guestLastName,
        numGuests: initialData.numGuests,
        checkInDate: new Date(initialData.checkInDate),
        checkOutDate: new Date(initialData.checkOutDate),
      });
    }
  }, [mode, initialData, form]);

  const onSubmit = (data: BookingFormValues) => {
    toast({
      title: `Booking ${mode === 'add' ? 'Created' : 'Updated'}`,
      description: `Booking for ${data.guestFirstName} ${data.guestLastName} has been saved.`,
    });
    router.push('/admin/bookings');
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Create New Booking</CardTitle>
            <CardDescription>Fill in the details to create a new room or suite booking</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormSection title="Guest Information" icon={User}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="guestFirstName" render={({ field }) => (<FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="guestLastName" render={({ field }) => (<FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="guestEmail" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="guestPhone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+1 (555) 123-4567" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="address" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Ocean Drive, Seaview City" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="specialRequests" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Special Requests / Notes</FormLabel><FormControl><Textarea placeholder="Any special requests or notes about the guest" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                </FormSection>
                <FormSection title="Room & Stay Details" icon={Bed}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="roomId" render={({ field }) => (<FormItem><FormLabel>Room Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a room" /></SelectTrigger></FormControl><SelectContent>{mockRooms.map(room => (<SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                        <div></div> {/* Placeholder for alignment */}
                        <FormField control={form.control} name="checkInDate" render={({ field }) => (<FormItem className="flex flex-col"><FormLabel>Check-in Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="checkOutDate" render={({ field }) => (<FormItem className="flex flex-col"><FormLabel>Check-out Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date <= (form.getValues("checkInDate") || new Date(new Date().setHours(0,0,0,0)))} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                        <div className="flex gap-4">
                           <NumberStepper name="numGuests" label="Adults" control={form.control} />
                           <NumberStepper name="children" label="Children" control={form.control} />
                        </div>
                         <FormItem>
                            <FormLabel>Number of Nights</FormLabel>
                            <Input value={numberOfNights} readOnly className="w-24" />
                        </FormItem>
                    </div>
                    <div className="mt-4 bg-green-50 p-3 rounded-md border border-green-200 flex items-center text-green-800">
                        <CheckCircle className="w-5 h-5 mr-2"/>
                        <p className="text-sm font-medium">5 rooms available for selected dates</p>
                    </div>
                </FormSection>
                <FormSection title="Pricing & Payment" icon={Wallet}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="totalPrice" render={({ field }) => (<FormItem><FormLabel>Total Price</FormLabel><FormControl><Input type="number" placeholder="450.00" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="discountCode" render={({ field }) => (<FormItem><FormLabel>Discount Code</FormLabel><FormControl><Input placeholder="Enter discount code" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="amountPaid" render={({ field }) => (<FormItem><FormLabel>Amount Paid</FormLabel><FormControl><Input type="number" placeholder="0.00" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormItem>
                            <FormLabel>Balance Due</FormLabel>
                            <div className="p-2 h-10 flex items-center rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
                                LKR {balanceDue.toLocaleString()}
                            </div>
                        </FormItem>
                        <FormField control={form.control} name="paymentStatus" render={({ field }) => (<FormItem><FormLabel>Payment Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select Payment Status" /></SelectTrigger></FormControl><SelectContent>{(['Pending', 'Paid', 'Refunded'] as PaymentStatus[]).map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="paymentMethod" render={({ field }) => (<FormItem><FormLabel>Payment Method</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select Payment Method" /></SelectTrigger></FormControl><SelectContent>{(['Credit Card', 'Bank Transfer', 'Cash', 'Online'] as PaymentMethod[]).map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                     </div>
                </FormSection>
                 <FormSection title="Booking Status & Source" icon={BarChart}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="status" render={({ field }) => (<FormItem><FormLabel>Initial Booking Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select Booking Status" /></SelectTrigger></FormControl><SelectContent>{(['Pending', 'Confirmed', 'Cancelled', 'Checked-in', 'Checked-out', 'No-Show'] as BookingStatus[]).map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="bookingSource" render={({ field }) => (<FormItem><FormLabel>Booking Source</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select Booking Source" /></SelectTrigger></FormControl><SelectContent>{(['Online', 'Phone', 'Walk-in', 'Agent'] as BookingSource[]).map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                     </div>
                </FormSection>
                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit">{mode === 'add' ? 'Create Booking' : 'Save Changes'}</Button>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
