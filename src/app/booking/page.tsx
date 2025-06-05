import type { Metadata } from 'next';
import { BookingForm } from '@/components/booking/BookingForm';

export const metadata: Metadata = {
  title: 'Book Your Stay',
  description: 'Reserve your room at LuxeStay. Easy and secure online booking.',
};

export default function BookingPage() {
  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              Reserve Your Stay
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              We're excited to welcome you to LuxeStay. Please fill out the form below to complete your booking.
            </p>
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
