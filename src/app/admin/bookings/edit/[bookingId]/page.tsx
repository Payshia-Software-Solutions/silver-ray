
'use client';

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { BookingDetailForm } from "@/components/admin/bookings/BookingDetailForm";
import { getBookingById } from "@/data/bookingData";
import { notFound } from 'next/navigation';
import { useEffect, useState } from "react";
import type { Booking } from "@/data/bookingData";

export default function EditBookingPage({ params }: { params: { bookingId: string } }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bookingData = getBookingById(params.bookingId);
    if (bookingData) {
      setBooking(bookingData);
    }
    setIsLoading(false);
  }, [params.bookingId]);

  const breadcrumbItems = [
    { label: 'Booking Management', href: '/admin/bookings' },
    { label: 'Edit Booking' },
    { label: booking ? `#${booking.id}` : 'Loading...' }
  ];

  if (isLoading) {
    return <div>Loading booking details...</div>; // Or a proper skeleton loader
  }

  if (!booking) {
    // In a real app, you might show a not-found page
    return notFound();
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={breadcrumbItems} />
      <BookingDetailForm mode="edit" initialData={booking} />
    </div>
  );
}
