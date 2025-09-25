
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarDays, Phone, Mail, User } from 'lucide-react';

export function ReservationSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-card p-8 sm:p-10 md:p-12 rounded-xl shadow-2xl border border-border">
          <div className="text-center mb-8">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Reserve Your Table</h2>
            <p className="font-body text-muted-foreground">
              Secure your gourmet experience at Silver Ray Hotel. Call us or reserve online for an unforgettable dining journey.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild variant="default" className="flex-1 py-6 text-base rounded-lg">
              <a href="tel:+94771234567">
                <Phone className="mr-2 h-5 w-5" /> +94 77 123 4567
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1 py-6 text-base rounded-lg border-primary text-primary hover:bg-primary/10">
              <Link href="/booking?type=dining">
                <CalendarDays className="mr-2 h-5 w-5" /> Reserve Online
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input type="text" placeholder="Name" className="h-12 text-base bg-background border-input" />
              <Input type="email" placeholder="Email" className="h-12 text-base bg-background border-input" />
              <Input type="text" placeholder="mm/dd/yyyy" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} className="h-12 text-base bg-background border-input" />
          </div>
          
          <Button size="lg" className="w-full py-6 text-lg rounded-lg" asChild>
            <Link href="/booking?type=dining_confirm">Book Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
