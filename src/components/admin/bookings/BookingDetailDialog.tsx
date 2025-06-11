
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Booking } from '@/data/bookingData';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { CalendarDays, User, Users, BedDouble, Hash, DollarSign, Edit, MessageSquare, Phone, Mail } from 'lucide-react';

interface BookingDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  booking: Booking | null;
}

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
  <div className="flex items-start py-2 border-b border-border/50 last:border-b-0">
    <Icon className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <p className="text-sm text-foreground font-semibold">{value || 'N/A'}</p>
    </div>
  </div>
);

export function BookingDetailDialog({ isOpen, onOpenChange, booking }: BookingDetailDialogProps) {
  if (!booking) return null;

  const getStatusVariant = (status: Booking['status']): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'Confirmed': return 'default'; // Greenish (assuming primary is not red/yellow)
      case 'Pending': return 'secondary'; // Yellowish
      case 'Cancelled': return 'destructive'; // Reddish
      case 'Checked-in': return 'outline'; // Bluish or distinct
      case 'Checked-out': return 'outline'; // Grayish
      case 'No-Show': return 'destructive';
      default: return 'secondary';
    }
  };
  const getStatusClassName = (status: Booking['status']): string => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700 border-green-300';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-300';
      case 'Checked-in': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Checked-out': return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'No-Show': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Hash className="w-6 h-6 text-primary mr-2" />
            Booking Details: #{booking.id}
          </DialogTitle>
          <DialogDescription>
            Viewing comprehensive details for booking ID {booking.id}.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-20rem)] sm:h-[calc(100vh-25rem)] md:h-[500px] pr-3">
          <div className="space-y-1 py-1">
            <DetailItem icon={User} label="Guest Name" value={`${booking.guestFirstName} ${booking.guestLastName}`} />
            <DetailItem icon={Mail} label="Guest Email" value={booking.guestEmail} />
            <DetailItem icon={Phone} label="Guest Phone" value={booking.guestPhone} />
            <DetailItem icon={BedDouble} label="Room" value={booking.roomName} />
             <DetailItem icon={Users} label="Number of Guests" value={booking.numGuests} />
            <DetailItem icon={CalendarDays} label="Check-in Date" value={format(booking.checkInDate, "PPP")} />
            <DetailItem icon={CalendarDays} label="Check-out Date" value={format(booking.checkOutDate, "PPP")} />
            <div className="flex items-start py-2 border-b border-border/50">
                 <Edit className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                    <p className="text-xs text-muted-foreground font-medium">Status</p>
                    <Badge variant={getStatusVariant(booking.status)} className={getStatusClassName(booking.status)}>{booking.status}</Badge>
                </div>
            </div>
            <DetailItem icon={DollarSign} label="Total Price" value={`LKR ${booking.totalPrice.toLocaleString()}`} />
            <DetailItem icon={MessageSquare} label="Special Requests" value={booking.specialRequests} />
            <DetailItem icon={CalendarDays} label="Booking Created" value={format(booking.createdAt, "PPP p")} />
            <DetailItem icon={CalendarDays} label="Last Updated" value={format(booking.updatedAt, "PPP p")} />
          </div>
        </ScrollArea>
        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
