
'use client';

import { useState, useEffect, useMemo } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WeddingVenueCard } from '@/components/weddings/WeddingVenueCard';
import { WeddingPackageCard } from '@/components/weddings/WeddingPackageCard';
import { weddingVenues, weddingServices } from '@/data/weddingData';
import { TestimonialsCarousel } from '@/components/weddings/TestimonialsCarousel';
import type { WeddingPackageFromApi } from '@/types';
import { getWeddingPackages } from '@/services/api/weddings';
import { Gift, Download, Car, Bus, Phone } from 'lucide-react';
import { IMAGE_BASE_URL } from '@/lib/config';
import { AnimatedInView } from '@/components/shared/AnimatedInView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

const videoUrls = [
    'https://content-provider.payshia.com/silver-ray/other/wedding-1.mp4',
    'https://content-provider.payshia.com/silver-ray/other/wedding-2.mp4',
    'https://content-provider.payshia.com/silver-ray/other/wedding-3.mp4',
    'https://content-provider.payshia.com/silver-ray/other/wedding-4.mp4',
];

const pdfPackages = {
    grandSilverRay: [
        {
            title: "Grand Silver Ray Menu 01",
            description: "Details of our premier wedding menu for 2026.",
            pdfUrl: "https://content-provider.payshia.com/silver-ray/packages/GRAND%20SILVER%20RAY%20MENU%2001-2026.pdf"
        },
        {
            title: "Grand Silver Ray Menu 02",
            description: "An alternative premier menu for your special day.",
            pdfUrl: "https://content-provider.payshia.com/silver-ray/packages/GRAND%20SILVER%20RAY%20MENU%2002%20-2026.pdf"
        },
        {
            title: "Grand Silver Ray Menu 03",
            description: "A third option for our premier wedding menu selections.",
            pdfUrl: "https://content-provider.payshia.com/silver-ray/packages/GRAND%20SILVER%20RAY%20MENU%2003%20-2026.pdf"
        },
    ],
    silverRay: [
        {
            title: "Gold Menu 2026",
            description: "Explore the exquisite offerings in our Gold wedding package.",
            pdfUrl: "https://content-provider.payshia.com/silver-ray/packages/GOLD%20MENU%20-%202026.pdf"
        },
        {
            title: "Platinum Menu 2026",
            description: "Our most luxurious menu for an unforgettable celebration.",
            pdfUrl: "https://content-provider.payshia.com/silver-ray/packages/PLATINUM%20MENU%20-2026.pdf"
        },
        {
            title: "Silver Menu 2026",
            description: "An elegant and affordable option for your special day.",
            pdfUrl: "https://content-provider.payshia.com/silver-ray/packages/SILVER%20MENU-2026.pdf"
        },
        {
            title: "LKR 630,000 Package",
            description: "A comprehensive package for a beautiful wedding celebration.",
            pdfUrl: "https://content-provider.payshia.com/silver-ray/packages/Rs.630,000.00%20Package%20-2026.pdf"
        },
        {
            title: "LKR 750,000 Package",
            description: "An enhanced package with additional features and services.",
            pdfUrl: "https://content-provider.payshia.com/silver-ray/packages/750k-package.pdf"
        },
        {
            title: "LKR 850,000 Package",
            description: "Our premium package, designed for a truly grand affair.",
            pdfUrl: "https://content-provider.payshia.com/silver-ray/packages/850k-package.pdf"
        },
    ]
};


export function WeddingPageContent() {
  const [packages, setPackages] = useState<WeddingPackageFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const grandSilverRayVenues = useMemo(() => weddingVenues.filter(v => v.brand === 'Grand Silver Ray'), []);
  const silverRayVenues = useMemo(() => weddingVenues.filter(v => v.brand === 'Silver Ray'), []);

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

          {/* Grand Silver Ray Venues */}
          <div className="mb-16">
            <h3 className="font-headline text-2xl sm:text-3xl font-semibold mb-2 text-center">Grand Silver Ray</h3>
            <p className="text-center text-muted-foreground mb-8">Per Person LKR 6400 + 10%</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {grandSilverRayVenues.map((venue, index) => (
                <AnimatedInView key={venue.id} delay={index * 0.1}>
                  <WeddingVenueCard venue={venue} />
                </AnimatedInView>
              ))}
            </div>
          </div>

          {/* Silver Ray Venues */}
          <div>
            <h3 className="font-headline text-2xl sm:text-3xl font-semibold mb-2 text-center">Silver Ray</h3>
            <p className="text-center text-muted-foreground mb-8">Per Person LKR 3100 + 10%</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {silverRayVenues.map((venue, index) => (
                <AnimatedInView key={venue.id} delay={index * 0.1}>
                  <WeddingVenueCard venue={venue} />
                </AnimatedInView>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="text-center mb-12 container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Wedding Moments</h2>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
                See the magic of weddings at Grand Silver Ray.
            </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
            {videoUrls.map((url, index) => (
                <AnimatedInView key={index} delay={index * 0.1}>
                    <div className="overflow-hidden group relative">
                        <video autoPlay loop muted playsInline width="100%" className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105">
                            <source src={url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </AnimatedInView>
            ))}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Download Our Wedding Packages</h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our detailed wedding packages to find the perfect fit for your celebration. Each PDF provides comprehensive information on menus, services, and pricing.
            </p>
          </div>
          
          <div className="mb-16">
            <h3 className="font-headline text-2xl sm:text-3xl font-semibold mb-8 text-center">Grand Silver Ray</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pdfPackages.grandSilverRay.map((pkg) => (
                <AnimatedInView key={pkg.title} delay={0.1}>
                    <Card className="bg-card text-card-foreground rounded-xl shadow-lg h-full flex flex-col p-6">
                    <CardHeader className="p-0">
                        <CardTitle className="font-headline text-xl mb-2">{pkg.title}</CardTitle>
                        <CardDescription className="text-sm">{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow mt-4">
                        <Button asChild className="w-full group">
                        <a href={pkg.pdfUrl} target="_blank" rel="noopener noreferrer">
                            Download PDF
                            <Download className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                        </Button>
                    </CardContent>
                    </Card>
                </AnimatedInView>
                ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-headline text-2xl sm:text-3xl font-semibold mb-8 text-center">Silver Ray</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pdfPackages.silverRay.map((pkg) => (
                <AnimatedInView key={pkg.title} delay={0.1}>
                    <Card className="bg-card text-card-foreground rounded-xl shadow-lg h-full flex flex-col p-6">
                    <CardHeader className="p-0">
                        <CardTitle className="font-headline text-xl mb-2">{pkg.title}</CardTitle>
                        <CardDescription className="text-sm">{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow mt-4">
                        <Button asChild className="w-full group">
                        <a href={pkg.pdfUrl} target="_blank" rel="noopener noreferrer">
                            Download PDF
                            <Download className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                        </Button>
                    </CardContent>
                    </Card>
                </AnimatedInView>
                ))}
            </div>
          </div>

        </div>
      </section>

      {/*
      <section className="py-16 lg:py-24 bg-background">
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
              {packages.map((pkg, index) => (
                <AnimatedInView key={pkg.id} delay={index * 0.1}>
                  <WeddingPackageCard packageItem={pkg} />
                </AnimatedInView>
              ))}
            </div>
          )}
        </div>
      </section>
      */}

      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Our Wedding Services</h2>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
              Comprehensive services to make your wedding planning effortless and enjoyable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {weddingServices.map((service, index) => (
              <AnimatedInView key={service.title} delay={index * 0.1}>
                <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="p-4 bg-primary/10 rounded-full mb-4 inline-flex">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-headline text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Special Transportation Offers</h2>
                <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
                    Arrive in style and provide convenient transport for your guests with our exclusive wedding transportation services.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <AnimatedInView delay={0.1}>
                    <Card className="bg-card text-card-foreground rounded-xl shadow-lg h-full flex flex-col p-6 items-center text-center">
                        <div className="p-4 bg-primary/10 rounded-full mb-4 inline-flex">
                            <Car className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="font-headline text-2xl font-semibold mb-2">Wedding Car</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Make a grand entrance with our selection of luxury wedding cars, complete with professional chauffeurs to ensure a stylish and comfortable journey on your special day.
                        </p>
                    </Card>
                </AnimatedInView>
                <AnimatedInView delay={0.2}>
                    <Card className="bg-card text-card-foreground rounded-xl shadow-lg h-full flex flex-col p-6 items-center text-center">
                        <div className="p-4 bg-primary/10 rounded-full mb-4 inline-flex">
                            <Bus className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="font-headline text-2xl font-semibold mb-2">Bus Offer</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Ensure your guests travel with ease and comfort. We offer modern, spacious buses to transport your guests to and from the venue, making the logistics seamless for everyone.
                        </p>
                    </Card>
                </AnimatedInView>
            </div>
        </div>
      </section>

      <TestimonialsCarousel />

      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Ready to Begin Your Forever?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Let our expert team help you create the wedding of your dreams. Share your vision, and we'll bring it to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-body text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300">
                <a href="tel:+94719107700" className="flex items-center gap-2">
                    <Phone />
                    Call +94 71 910 7700
                </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-body text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300">
                <a href="tel:+94713626200" className="flex items-center gap-2">
                    <Phone />
                    Call +94 71 362 6200
                </a>
            </Button>
          </div>
        </div>
      </section>
   
    </div>
  );
}
