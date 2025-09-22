
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarDays, Phone, User, Mail } from 'lucide-react';

export function ReservationSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-card p-8 sm:p-10 md:p-12 rounded-xl shadow-2xl border-none">
          <div className="text-center mb-8">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Reserve Your Table</h2>
            <p className="font-body text-muted-foreground">
              Experience exceptional dining with advance reservations.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild variant="default" className="flex-1 py-6 text-base rounded-full">
              <a href="tel:+1234567890">
                <Phone className="mr-2 h-5 w-5" /> Call for a reservation
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1 py-6 text-base rounded-full">
              <Link href="/booking?type=dining">
                Reserve Online
              </Link>
            </Button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="text" placeholder="Full Name" className="pl-12 h-12 text-base bg-secondary/30 border-border focus:bg-background rounded-full" />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="email" placeholder="Email Address" className="pl-12 h-12 text-base bg-secondary/30 border-border focus:bg-background rounded-full" />
            </div>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="text" placeholder="mm/dd/yyyy" className="pl-12 h-12 text-base bg-secondary/30 border-border focus:bg-background rounded-full" />
            </div>
          </div>
          
          <Button size="lg" className="w-full py-6 text-lg rounded-full" asChild>
            <Link href="/booking?type=dining_confirm">Book Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
