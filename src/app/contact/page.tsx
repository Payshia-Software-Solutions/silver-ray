"use client";

import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import NextImage from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

// Metadata export will be ignored in client components,
// but we can leave it for now or move to layout if needed.
// For this fix, keeping it simple.
// export const metadata: Metadata = {
//   title: 'Contact Us',
//   description: 'Get in touch with LuxeStay. We are here to assist you with your inquiries and bookings.',
// };

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="relative h-64 md:h-80 flex items-center justify-center text-center text-white overflow-hidden">
        <NextImage
          src="https://placehold.co/1920x400.png"
          alt="Contact LuxeStay"
          data-ai-hint="abstract pattern"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-6">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold shadow-text">
            Get In Touch
          </h1>
          <p className="font-body text-lg sm:text-xl mt-2 shadow-text">
            We're here to help with any questions or special requests.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="bg-card p-6 sm:p-8 rounded-xl shadow-xl">
            <h2 className="font-headline text-2xl sm:text-3xl font-semibold mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
          
          <div className="bg-card p-6 sm:p-8 rounded-xl shadow-xl">
            <h2 className="font-headline text-2xl sm:text-3xl font-semibold mb-6">Contact Information</h2>
            <p className="font-body text-foreground/80 mb-8">
              Feel free to reach out to us through any of the following methods. Our team is available 24/7 to assist you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-headline text-lg font-medium">Our Address</h3>
                  <p className="font-body text-foreground/80">123 Luxury Lane, Paradise City, PC 12345</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-headline text-lg font-medium">Phone</h3>
                  <a href="tel:+1234567890" className="font-body text-foreground/80 hover:text-primary transition-colors">(123) 456-7890</a>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-headline text-lg font-medium">Email</h3>
                  <a href="mailto:info@luxestay.com" className="font-body text-foreground/80 hover:text-primary transition-colors">info@luxestay.com</a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
                 <h3 className="font-headline text-lg font-medium mb-3">Business Hours</h3>
                 <p className="font-body text-foreground/80">Front Desk: 24/7</p>
                 <p className="font-body text-foreground/80">Reservations: Mon - Sun, 8:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .shadow-text {
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
