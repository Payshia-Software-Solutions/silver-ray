
'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WeddingVenueCard } from '@/components/weddings/WeddingVenueCard';
import { WeddingPackageCard } from '@/components/weddings/WeddingPackageCard';
import { weddingVenues, weddingServices } from '@/data/weddingData';
import { TestimonialsCarousel } from '@/components/weddings/TestimonialsCarousel';
import type { WeddingPackageFromApi } from '@/types';
import { getWeddingPackages } from '@/services/api/weddings';
import { Gift } from 'lucide-react';
import { IMAGE_BASE_URL } from '@/lib/config';

function WeddingHero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] md:min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      <NextImage
        src="https://content-provider.payshia.com/silver-ray/gallery-images/1/weddingcover-68dd4bf6634a3.jpg"
        alt="Elegant wedding ceremony setup"
        data-ai-hint="wedding ceremony setup"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-6 max-w-3xl">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.6)'}}>
          Celebrate Your Love Story
        </h1>
        <p className="font-body text-lg sm:text-xl mb-8 max-w-xl mx-auto" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
          Unforgettable weddings begin at Grand Silver Ray. Let us craft your perfect day.
        </p>
        <Button asChild size="lg" className="font-body text-lg px-8 py-3 bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-primary transform hover:scale-105 transition-transform duration-300 rounded-full">
          <Link href="/contact?subject=Wedding+Proposal+Inquiry">Request a Proposal</Link>
        </Button>
      </div>
    </section>
  );
}

export default function WeddingsPage() {
  const [packages, setPackages] = useState<WeddingPackageFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeddingData = async () => {
      try {
        setIsLoading(true);
        const packagesData = await getWeddingPackages();
        setPackages(packagesData);
      } catch (err: any) {
        console.error("Failed to fetch wedding data:", err);
        setError("Failed to load wedding packages. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeddingData();
  }, []);

  return (
    <div className="bg-background">
      <WeddingHero />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Our Wedding Venues</h2>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
              Choose from a selection of breathtaking spaces, each offering a unique backdrop for your special day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weddingVenues.map((venue) => (
              <WeddingVenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Our Wedding Package Collection</h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our exquisite packages – each crafted to suit your vision, guest count, and style. All packages can be personalized to create your perfect day.
            </p>
          </div>
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg shadow animate-pulse">
                  <div className="aspect-square bg-muted rounded-t-lg"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-muted rounded-full mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && <p className="text-center font-body text-lg text-destructive">{error}</p>}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg) => (
                <WeddingPackageCard key={pkg.id} packageItem={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Our Wedding Services</h2>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
              Comprehensive services to make your wedding planning effortless and enjoyable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {weddingServices.map((service) => (
              <div key={service.title} className="flex flex-col items-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-4 bg-primary/10 rounded-full mb-4 inline-flex">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold mb-2">{service.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Ready to Begin Your Forever?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Let our expert team help you create the wedding of your dreams. Share your vision, and we'll bring it to life.
          </p>
          <Button asChild size="lg" className="font-body text-lg px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-transform duration-300 rounded-full">
            <Link href="/contact?subject=Wedding+Consultation+Inquiry">Contact Our Wedding Team</Link>
          </Button>
        </div>
      </section>
   
    </div>
  );
}
