
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, Eye, Edit, Trash2, CalendarX2 } from 'lucide-react';
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
import { mockBookings, type Booking, type BookingStatus } from '@/data/bookingData'; 
import { mockRooms } from '@/data/mockData';
import { BookingFormDialog, type BookingFormData } from '@/components/admin/bookings/BookingFormDialog';
import { BookingDetailDialog } from '@/components/admin/bookings/BookingDetailDialog';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

export default function ManageBookingsPage() {
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCancelAlertOpen, setIsCancelAlertOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Ensure dates are Date objects
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

  const getStatusBadgeInfo = (status: BookingStatus): { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string; } => {
    switch (status) {
      case 'Confirmed': return { variant: 'default', className: 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' };
      case 'Pending': return { variant: 'secondary', className: 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200' };
      case 'Cancelled': return { variant: 'destructive', className: 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200' };
      case 'Checked-in': return { variant: 'outline', className: 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200' };
      case 'Checked-out': return { variant: 'outline', className: 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200' };
      case 'No-Show': return { variant: 'destructive', className: 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200' };
      default: return { variant: 'secondary', className: 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200' };
    }
  };
  
  const handleAddBooking = () => {
    setSelectedBooking(null);
    setDialogMode('add');
    setIsFormOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setDialogMode('edit');
    setIsFormOpen(true);
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
        b.id === selectedBooking.id ? { ...b, status: 'Cancelled', updatedAt: new Date() } : b
      ));
      toast({
        title: 'Booking Cancelled',
        description: `Booking ID "${selectedBooking.id}" has been cancelled.`,
      });
    }
    setIsCancelAlertOpen(false);
    setSelectedBooking(null);
  };

  const handleFormSubmit = (data: BookingFormData) => {
    const room = mockRooms.find(r => r.id === data.roomId);
    if (!room) {
        toast({ title: 'Error', description: 'Selected room not found.', variant: 'destructive'});
        return;
    }

    if (dialogMode === 'add') {
      const newBooking: Booking = {
        id: `BK${Date.now().toString().slice(-4)}`, // Simple ID generation
        ...data,
        roomName: room.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setBookingsList(prev => [...prev, newBooking]);
      toast({ title: 'Booking Added', description: `New booking for ${data.guestFirstName} ${data.guestLastName} created.` });
    } else if (dialogMode === 'edit' && selectedBooking) {
      const updatedBooking: Booking = {
        ...selectedBooking,
        ...data,
        roomName: room.name,
        updatedAt: new Date(),
      };
      setBookingsList(bookingsList.map(b => (b.id === selectedBooking.id ? updatedBooking : b)));
      toast({ title: 'Booking Updated', description: `Booking ID "${selectedBooking.id}" updated.` });
    }
    setIsFormOpen(false);
    setSelectedBooking(null);
  };


  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
              <h1 className="font-headline text-3xl font-bold">
                Booking Management
              </h1>
              <p className="font-body text-muted-foreground">
                View, confirm, and manage guest reservations.
              </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-auto grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search by ID, guest, room, status..."
                className="pl-8 w-full sm:w-[250px] md:w-[200px] lg:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button onClick={handleAddBooking} className="w-full sm:w-auto whitespace-nowrap">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Booking
            </Button>
          </div>
        </div>

        <div className="bg-card p-0 rounded-lg shadow-md overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead className="hidden lg:table-cell">Check-in</TableHead>
                <TableHead className="hidden lg:table-cell">Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell text-right">Total (LKR)</TableHead>
                <TableHead className="text-right w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => {
                const statusInfo = getStatusBadgeInfo(booking.status);
                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                        <div>{`${booking.guestFirstName} ${booking.guestLastName}`}</div>
                        <div className="text-xs text-muted-foreground">{booking.guestEmail}</div>
                    </TableCell>
                    <TableCell>{booking.roomName}</TableCell>
                    <TableCell className="hidden lg:table-cell">{format(new Date(booking.checkInDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="hidden lg:table-cell">{format(new Date(booking.checkOutDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant={statusInfo.variant} className={statusInfo.className}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-right">{booking.totalPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right space-x-0.5">
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
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleEditBooking(booking)} 
                            disabled={booking.status === 'Checked-out' || booking.status === 'Cancelled'}>
                            <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Edit Booking</p></TooltipContent>
                      </Tooltip>
                       <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive/70 hover:text-destructive" 
                            onClick={() => handleCancelBookingPrompt(booking)}
                            disabled={booking.status === 'Cancelled' || booking.status === 'Checked-out'}
                          >
                            <CalendarX2 className="h-4 w-4" /> <span className="sr-only">Cancel</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Cancel Booking</p></TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredBookings.length === 0 && (
            <div className="text-center p-8 text-muted-foreground font-body">
              {searchTerm ? 'No bookings match your search.' : 'No bookings found. Click "Add New Booking" to get started.'}
            </div>
          )}
        </div>
         {/* Pagination Placeholder */}
        <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
          <div>
            Showing 1 to {Math.min(10, filteredBookings.length)} of {bookingsList.length} bookings
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-primary/20 text-primary border-primary">1</Button>
             {bookingsList.length > 10 && <Button variant="outline" size="sm" disabled>2</Button> }
            <Button variant="outline" size="sm" disabled={bookingsList.length <= 10}>Next</Button>
          </div>
        </div>
      </div>

      <BookingFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedBooking}
        mode={dialogMode}
      />

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
              Are you sure you want to cancel booking ID "{selectedBooking?.id}" for {selectedBooking?.guestFirstName} {selectedBooking?.guestLastName}? This action cannot be undone easily.
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
