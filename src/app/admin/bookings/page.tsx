
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, Eye, Trash2, CalendarDays, CheckCircle, Clock, DollarSign, Bell, User, Pencil } from 'lucide-react';
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
import { mockBookings, type Booking, type BookingStatus, type PaymentStatus } from '@/data/bookingData'; 
import { BookingDetailDialog } from '@/components/admin/bookings/BookingDetailDialog';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';


const StatCard = ({ title, value, icon: Icon, iconBgColor }: { title: string, value: string, icon: React.ElementType, iconBgColor: string }) => (
    <Card className="shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
            <div>
                <p className="text-sm text-muted-foreground font-body">{title}</p>
                <p className="text-2xl font-bold font-headline">{value}</p>
            </div>
            <div className={`p-3 rounded-lg ${iconBgColor}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
        </CardContent>
    </Card>
);


export default function ManageBookingsPage() {
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCancelAlertOpen, setIsCancelAlertOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const processedBookings = mockBookings.map(b => ({
      ...b,
      checkInDate: new Date(b.checkInDate),
      checkOutDate: new Date(b.checkOutDate),
      createdAt: new Date(b.createdAt),
      updatedAt: new Date(b.updatedAt),
    }));
    setBookingsList(processedBookings);
  }, []);

  const filteredBookings = useMemo(() => {
    if (!searchTerm) return bookingsList;
    return bookingsList.filter(booking => 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${booking.guestFirstName} ${booking.guestLastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bookingsList, searchTerm]);

  const getStatusBadgeInfo = (status: BookingStatus | PaymentStatus): { className: string } => {
    switch (status) {
      case 'Confirmed': return { className: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'Paid': return { className: 'bg-green-100 text-green-700 border-green-200' };
      case 'Pending': return { className: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
      case 'Cancelled': return { className: 'bg-red-100 text-red-700 border-red-200' };
      case 'Checked-in': return { className: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
      case 'Checked-out': return { className: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'No-Show': return { className: 'bg-orange-100 text-orange-700 border-orange-200' };
      case 'Refunded': return { className: 'bg-gray-100 text-gray-700 border-gray-200' };
      default: return { className: 'bg-gray-100 text-gray-700 border-gray-200' };
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailOpen(true);
  };

  const handleCancelBookingPrompt = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsCancelAlertOpen(true);
  };

  const confirmCancelBooking = () => {
    if (selectedBooking) {
      setBookingsList(bookingsList.map(b => 
        b.id === selectedBooking.id ? { ...b, status: 'Cancelled', paymentStatus: 'Refunded', updatedAt: new Date() } : b
      ));
      toast({
        title: 'Booking Cancelled',
        description: `Booking ID "${selectedBooking.id}" has been cancelled.`,
      });
    }
    setIsCancelAlertOpen(false);
    setSelectedBooking(null);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
              <h1 className="font-headline text-3xl font-bold">
                Booking Management <span className="text-muted-foreground/80">(Rooms & Suites)</span>
              </h1>
              <p className="font-body text-muted-foreground">
                Manage Bookings
              </p>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="text-muted-foreground cursor-pointer hover:text-primary" />
            <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png?text=SA" />
                <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-sm">User Saman</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Bookings" value="1,247" icon={CalendarDays} iconBgColor="bg-blue-500" />
            <StatCard title="Checked In" value="89" icon={CheckCircle} iconBgColor="bg-green-500" />
            <StatCard title="Pending" value="23" icon={Clock} iconBgColor="bg-yellow-500" />
            <StatCard title="Revenue" value="LKR. 45,890" icon={DollarSign} iconBgColor="bg-orange-500" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-auto grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search by guest name, booking ID..."
                className="pl-10 w-full sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Input type="text" placeholder="mm/dd/yyyy" className="w-full sm:w-auto" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type='text'}/>
            <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 whitespace-nowrap">
              <Link href="/admin/bookings/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Booking
              </Link>
            </Button>
        </div>


        <div className="bg-card rounded-lg shadow overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                    <TableCell className="font-medium">#{booking.id}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={booking.guestAvatar} alt={`${booking.guestFirstName} ${booking.guestLastName}`} />
                                <AvatarFallback>{booking.guestFirstName[0]}{booking.guestLastName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{`${booking.guestFirstName} ${booking.guestLastName}`}</div>
                                <div className="text-xs text-muted-foreground">{booking.guestEmail}</div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="font-medium">{booking.roomName}</div>
                        <div className="text-xs text-muted-foreground">{booking.roomNumber}</div>
                    </TableCell>
                    <TableCell>{format(new Date(booking.checkInDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{format(new Date(booking.checkOutDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{booking.numGuests} Adult{booking.numGuests > 1 ? 's' : ''}</TableCell>
                    <TableCell>LKR. {booking.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeInfo(booking.paymentStatus).className}>
                        {booking.paymentStatus}
                      </Badge>
                    </TableCell>
                     <TableCell>
                      <Badge variant="outline" className={getStatusBadgeInfo(booking.status).className}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleViewDetails(booking)}>
                            <Eye className="h-4 w-4" /> <span className="sr-only">View</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>View Details</p></TooltipContent>
                      </Tooltip>
                       <Tooltip>
                        <TooltipTrigger asChild>
                           <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <Link href={`/admin/bookings/edit/${booking.id}`}>
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit Booking</span>
                              </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Edit Booking</p></TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive" 
                            onClick={() => handleCancelBookingPrompt(booking)}
                            disabled={booking.status === 'Cancelled' || booking.status === 'Checked-out'}
                          >
                            <Trash2 className="h-4 w-4" /> <span className="sr-only">Cancel/Delete</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Cancel Booking</p></TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredBookings.length === 0 && (
            <div className="text-center p-8 text-muted-foreground font-body">
              {searchTerm ? 'No bookings match your search.' : 'No bookings found.'}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
          <div>
            Showing 1 to {Math.min(10, filteredBookings.length)} of {bookingsList.length} bookings
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-primary/20 text-primary border-primary">1</Button>
             {bookingsList.length > 10 && <Button variant="outline" size="sm">2</Button> }
            <Button variant="outline" size="sm" disabled={bookingsList.length <= 10}>Next</Button>
          </div>
        </div>
      </div>

      <BookingDetailDialog
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        booking={selectedBooking}
      />

      <AlertDialog open={isCancelAlertOpen} onOpenChange={setIsCancelAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel booking ID "{selectedBooking?.id}"? This will mark the booking as cancelled and cannot be undone easily.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedBooking(null)}>Keep Booking</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancelBooking} className="bg-destructive hover:bg-destructive/90">
              Confirm Cancellation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
