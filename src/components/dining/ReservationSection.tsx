
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarDays, Phone, User } from 'lucide-react';

export function ReservationSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-card p-8 sm:p-10 md:p-12 rounded-xl shadow-2xl border border-border">
          <div className="text-center mb-8">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Reserve Your Table</h2>
            <p className="font-body text-muted-foreground">
              Secure your gourmet experience at Silver Ray Hotel. Call us or book online for an unforgettable dining journey.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild variant="outline" className="flex-1 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <a href="tel:+1234567890">
                <Phone className="mr-2 h-5 w-5" /> +123 456 7890
              </a>
            </Button>
            <Button asChild className="flex-1 py-6 text-lg">
              <Link href="/booking?type=dining">
                <CalendarDays className="mr-2 h-5 w-5" /> Reserve Online
              </Link>
            </Button>
          </div>

          {/* Visual Mockup of Form Fields */}
          <div className="space-y-6 mb-8">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="text" placeholder="Name" className="pl-10 h-12 text-base bg-secondary/30 border-border focus:bg-background" disabled readOnly />
            </div>
            <div className="relative">
               {/* Using a generic email icon as there's no specific 'Email' in lucide, Mail can be used */}
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <Input type="email" placeholder="Email" className="pl-10 h-12 text-base bg-secondary/30 border-border focus:bg-background" disabled readOnly />
            </div>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="text" placeholder="MM/DD/YYYY" className="pl-10 h-12 text-base bg-secondary/30 border-border focus:bg-background" disabled readOnly />
            </div>
          </div>
          
          <Button size="lg" className="w-full py-6 text-lg">
            <Link href="/booking?type=dining_confirm">Book Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
