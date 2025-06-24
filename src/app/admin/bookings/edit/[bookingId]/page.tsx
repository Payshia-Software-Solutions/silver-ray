
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
import { useToast } from '@/components/ui/use-toast';
import { mockRooms } from '@/data/mockData';
import { useEffect, useState, useMemo } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { 
  CalendarIcon, 
  User, 
  Bed, 
  Wallet, 
  Info, 
  Clock, 
  AlertTriangle,
  Save,
  Send,
  Printer,
  LogIn,
  CheckCircle,
  XCircle,
  Trash2,
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Booking, BookingStatus, PaymentStatus, BookingSource } from '@/data/bookingData';
import { getBookingById } from "@/data/bookingData";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog';

// Schema for the form fields
const editBookingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('A valid email is required'),
  phone: z.string().optional(),
  address: z.string().optional(),
  specialRequests: z.string().optional(),
  
  roomType: z.string().min(1, 'Room type is required'),
  roomNumber: z.string().min(1, 'Room number is required'),
  checkInDate: z.date({ required_error: 'Check-in date is required.' }),
  checkOutDate: z.date({ required_error: 'Check-out date is required.' }),
  adults: z.coerce.number().min(1),
  children: z.coerce.number().min(0),
  
  discountCode: z.string().optional(),
  paymentStatus: z.enum(['Paid', 'Pending', 'Refunded']),
  status: z.enum(['Pending', 'Confirmed', 'Cancelled', 'Checked-in', 'Checked-out', 'No-Show']),
  bookingSource: z.enum(['Online', 'Phone', 'Walk-in', 'Agent']),
}).refine(data => data.checkOutDate > data.checkInDate, {
  message: 'Check-out date must be after check-in date.',
  path: ['checkOutDate'],
});

type EditBookingFormValues = z.infer<typeof editBookingSchema>;


// --- Right Sidebar Widgets ---

const BookingStatusWidget = ({ form, booking }: { form: any, booking: Booking }) => {
  const nights = useMemo(() => {
    const checkInDate = form.getValues('checkInDate');
    const checkOutDate = form.getValues('checkOutDate');
    if (checkInDate && checkOutDate) {
      return differenceInDays(new Date(checkOutDate), new Date(checkInDate));
    }
    return 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('checkInDate'), form.watch('checkOutDate')]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base"><Info className="w-4 h-4 mr-2" /> Booking Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField control={form.control} name="status" render={({ field }) => (<FormItem><FormLabel>Current Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent>{(['Pending', 'Confirmed', 'Cancelled', 'Checked-in', 'Checked-out', 'No-Show'] as BookingStatus[]).map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="bookingSource" render={({ field }) => (<FormItem><FormLabel>Booking Source</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger></FormControl><SelectContent>{(['Online', 'Phone', 'Walk-in', 'Agent'] as BookingSource[]).map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
        <div className="text-sm text-muted-foreground space-y-1 pt-2 border-t">
          <p>Booking ID: <span className="font-medium text-foreground">#{booking.id}</span></p>
          <p>Created: <span className="font-medium text-foreground">{format(new Date(booking.createdAt), 'MMM d, yyyy')}</span></p>
          <p>Nights: <span className="font-medium text-foreground">{nights}</span></p>
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityLogWidget = () => {
    const activities = [
        { time: 'May 8, 2025 - 2:30 PM', text: 'Booking created by Admin John'},
        { time: 'May 8, 2025 - 2:35 PM', text: 'Status changed to Confirmed'},
        { time: 'May 10, 2025 - 10:15 AM', text: 'Payment of LKR 20,000 recorded'},
        { time: 'May 10, 2025 - 10:16 AM', text: 'Email confirmation sent'},
    ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base"><Clock className="w-4 h-4 mr-2" /> Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-4">
            <div className="absolute left-6 top-1 bottom-1 w-0.5 bg-border -translate-x-1/2"></div>
             {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 mb-4 last:mb-0">
                    <div className="relative z-10 flex-shrink-0">
                        <div className="h-4 w-4 rounded-full bg-primary/20 border-2 border-primary mt-1"></div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

const DangerZoneWidget = () => (
  <Card className="bg-red-50 border-red-200">
    <CardHeader>
      <CardTitle className="flex items-center text-base text-red-700"><AlertTriangle className="w-4 h-4 mr-2" /> Danger Zone</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <Button variant="destructive" className="w-full">
        <XCircle className="mr-2 h-4 w-4" /> Cancel Booking
      </Button>
      <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800">
        <Trash2 className="mr-2 h-4 w-4" /> Delete Booking
      </Button>
    </CardContent>
  </Card>
);


// --- Main Page Component ---
export default function EditBookingPage({ params }: { params: { bookingId: string } }) {
  const { toast } = useToast();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const form = useForm<EditBookingFormValues>({
    resolver: zodResolver(editBookingSchema),
    defaultValues: {},
  });

  useEffect(() => {
    const bookingData = getBookingById(params.bookingId);
    if (bookingData) {
      setBooking(bookingData);
      form.reset({
        fullName: `${bookingData.guestFirstName} ${bookingData.guestLastName}`,
        email: bookingData.guestEmail,
        phone: bookingData.guestPhone,
        address: bookingData.address,
        specialRequests: bookingData.specialRequests,
        roomType: bookingData.roomId,
        roomNumber: bookingData.roomNumber,
        checkInDate: new Date(bookingData.checkInDate),
        checkOutDate: new Date(bookingData.checkOutDate),
        adults: bookingData.numGuests,
        children: bookingData.children,
        discountCode: bookingData.discountCode,
        paymentStatus: bookingData.paymentStatus,
        status: bookingData.status,
        bookingSource: bookingData.bookingSource || 'Online',
      });
    } else {
      notFound();
    }
  }, [params.bookingId, form]);

  const onSubmit = (data: EditBookingFormValues) => {
    toast({
      title: "Booking Updated",
      description: `Booking for ${data.fullName} has been successfully updated.`,
    });
    console.log(data);
    // In a real app, you would navigate back or show a success state
  };
  
  if (!booking) {
    return <div>Loading...</div>;
  }

  const breadcrumbItems = [
    { label: 'Booking Management', href: '/admin/bookings' },
    { label: `#${booking.id}` }
  ];

  const subtotal = 45000;
  const discount = -9000;
  const taxes = 3600;
  const totalAmount = subtotal + discount + taxes;
  const amountPaid = 20000;
  const balanceDue = totalAmount - amountPaid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="button" onClick={() => setIsConfirmOpen(true)}><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
            </div>
        </div>
        
        {/* Top Action Bar */}
        <div className="bg-card p-3 rounded-lg border flex items-center justify-end gap-2">
            <Button className="bg-green-600 hover:bg-green-700">Record Payment</Button>
            <Button variant="outline"><Send className="mr-2 h-4 w-4" /> Send Email</Button>
            <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print Invoice</Button>
            <Button variant="secondary" className="bg-amber-400 text-amber-900 hover:bg-amber-500">
                <LogIn className="mr-2 h-4 w-4" /> Check In
            </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
                 {/* Guest Information */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center"><User className="w-5 h-5 mr-2 text-primary" /> Guest Information</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="specialRequests" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Special Requests</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                </Card>

                 {/* Room & Stay Details */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center"><Bed className="w-5 h-5 mr-2 text-primary" /> Room & Stay Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="roomType" render={({ field }) => (<FormItem><FormLabel>Room Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a room" /></SelectTrigger></FormControl><SelectContent>{mockRooms.map(room => (<SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="roomNumber" render={({ field }) => (<FormItem><FormLabel>Room Number</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a room number" /></SelectTrigger></FormControl><SelectContent><SelectItem value="101">101</SelectItem><SelectItem value="102">102</SelectItem><SelectItem value="205">205</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="checkInDate" render={({ field }) => (<FormItem className="flex flex-col"><FormLabel>Check-in Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "yyyy-MM-dd") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="checkOutDate" render={({ field }) => (<FormItem className="flex flex-col"><FormLabel>Check-out Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "yyyy-MM-dd") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="adults" render={({ field }) => (<FormItem><FormLabel>Adults</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="children" render={({ field }) => (<FormItem><FormLabel>Children</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                        <div className="bg-green-50 p-3 rounded-md border border-green-200 flex items-center text-green-800">
                            <CheckCircle className="w-5 h-5 mr-2"/>
                            <p className="text-sm font-medium">Room available for selected dates</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing & Payment Details */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center"><Wallet className="w-5 h-5 mr-2 text-primary" /> Pricing & Payment Details</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <FormField control={form.control} name="discountCode" render={({ field }) => (<FormItem><FormLabel>Discount Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="paymentStatus" render={({ field }) => (<FormItem><FormLabel>Payment Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent>{(['Pending', 'Paid', 'Refunded'] as PaymentStatus[]).map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                        </div>
                        <div className="space-y-2 border-t pt-4 mb-6">
                            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal (3 nights)</span><span>LKR {subtotal.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Discount (20%)</span><span className="text-red-600">LKR {discount.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Taxes & Fees</span><span>LKR {taxes.toLocaleString()}</span></div>
                            <div className="flex justify-between font-bold text-base border-t pt-2 mt-2!"><span >Total Amount</span><span>LKR {totalAmount.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Amount Paid</span><span>LKR {amountPaid.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm text-red-600 font-medium"><span >Balance Due</span><span>LKR {balanceDue.toLocaleString()}</span></div>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">Payment History</h4>
                            <div className="border rounded-lg">
                                <div className="flex justify-between items-center p-3">
                                    <div>
                                        <p className="font-semibold">LKR 20,000</p>
                                        <p className="text-xs text-muted-foreground">Credit Card</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">Dec 10, 2024</p>
                                        <span className="text-xs font-semibold text-green-600">Completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
                <BookingStatusWidget form={form} booking={booking} />
                <ActivityLogWidget />
                <DangerZoneWidget />
            </div>
        </div>
      </form>
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={form.handleSubmit(onSubmit)}
        title="Do you want to Update this Booking?"
        confirmText="Save Changes"
        cancelText="Cancel"
        variant="default"
      />
    </Form>
  );
}
