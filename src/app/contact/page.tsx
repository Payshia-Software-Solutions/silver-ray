
"use client";

import NextImage from 'next/image';
import { ContactForm } from '@/components/contact/ContactForm';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Plane, CarFront, Car } from 'lucide-react';

// Metadata export will be ignored in client components.
// If metadata is crucial, consider moving this page to a server component structure
// or defining metadata in a parent layout.

export default function ContactPage() {
  return (
    <div className="bg-secondary/20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[300px] md:h-[60vh] lg:h-[350px] flex items-center justify-center text-center text-white">
        <NextImage
          src="https://content-provider.payshia.com/silver-ray/gallery-images/1/contact-68dd6a5542ad8.jpg"
          alt="Grand Silver Ray Hotel Entrance"
          data-ai-hint="hotel entrance lobby"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-6 max-w-3xl">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-3 leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.6)'}}>
            Get In Touch
          </h1>
          <p className="font-body text-lg sm:text-xl max-w-xl mx-auto" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
            We're here to help you with bookings, directions, and more.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* Contact Form Card (Left) */}
          <div className="lg:col-span-3 bg-card p-6 sm:p-8 rounded-xl shadow-xl">
            <h2 className="font-headline text-2xl text-primary font-semibold mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
          
          {/* Contact Information & How to Reach Us Card (Right) */}
          <div className="lg:col-span-2 bg-card p-6 sm:p-8 rounded-xl shadow-xl">
            <div className="mb-8">
              <h2 className="font-headline text-xl text-primary font-semibold mb-5">Contact Information</h2>
              <div className="space-y-4 font-body text-sm">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground/80 text-xs">Reservations</p>
                    <a href="tel:+94452274764" className="text-foreground hover:text-primary transition-colors">+94 452 274 764</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground/80 text-xs">Email</p>
                    <a href="mailto:reservation@silverray.lk" className="text-foreground hover:text-primary transition-colors">reservation@silverray.lk</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                     <p className="text-muted-foreground/80 text-xs">Address</p>
                    <a href="https://maps.app.goo.gl/ehkeav9SFuz4xQqUA" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      Grand Silver Ray, Lellopitiya Dipitigala, Ratnapura, Sri Lanka.
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border/30 flex space-x-4">
                <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
                <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
              </div>
            </div>

            <div>
              <h2 className="font-headline text-xl text-primary font-semibold mb-5">How to Reach Us</h2>
              <div className="space-y-5 font-body text-sm">
                <div className="flex items-start">
                  <Plane className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-0.5">Airport Transfers</h3>
                    <p className="text-muted-foreground/80">We offer airport pickup/drop upon request. Contact us at least 24h in advance to schedule.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CarFront className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" /> 
                  <div>
                    <h3 className="font-medium text-foreground mb-0.5">Local Taxi Services</h3>
                    <p className="text-muted-foreground/80">Taxis are readily available at the airport and downtown. Ask the driver for "Silver Ray Hotel".</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Car className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-0.5">Driving Directions</h3>
                    <p className="text-muted-foreground/80">Located in Lellopitiya, Ratnapura. Private parking available on premises.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
