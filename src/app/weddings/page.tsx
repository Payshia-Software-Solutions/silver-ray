
import type { Metadata } from 'next';
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WeddingVenueCard } from '@/components/weddings/WeddingVenueCard';
import { WeddingPackageCard } from '@/components/weddings/WeddingPackageCard';
import { weddingVenues, weddingPackages, weddingServices, weddingTestimonials } from '@/data/weddingData';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { Utensils, Flower2, ClipboardCheck, BedDouble as GuestAccommodationIcon } from 'lucide-react'; // Renamed BedDouble to avoid conflict

export const metadata: Metadata = {
  title: 'Weddings at Grand Silver Ray',
  description: 'Host your dream wedding at Grand Silver Ray. Discover our stunning venues and bespoke wedding packages.',
};

function WeddingHero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] md:min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      <NextImage
        src="https://placehold.co/1920x700.png"
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
        <Button asChild size="lg" className="font-body text-lg px-8 py-3 bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-primary transform hover:scale-105 transition-transform duration-300 rounded-md">
          <Link href="/contact?subject=Wedding+Proposal+Inquiry">Request a Proposal</Link>
        </Button>
      </div>
    </section>
  );
}

export default function WeddingsPage() {
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
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Our Wedding Package Collections</h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our exquisite packages – each crafted to suit your vision, guest count, and style. All packages can be personalized to create your perfect day.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {weddingPackages.map((pkg) => (
              <WeddingPackageCard key={pkg.id} packageItem={pkg} />
            ))}
          </div>
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

      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Love Stories at Silver Ray</h2>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
              Hear from couples who celebrated their special day with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {weddingTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary/">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-4 text-primary-foreground/90">
            Ready to Begin Your Forever?
          </h2>
          <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Let our expert team help you craft the wedding of your dreams. Share your vision, and we'll bring it to life.
          </p>
          <Button asChild size="lg" className="font-body text-lg px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-transform duration-300 rounded-md">
            <Link href="/contact?subject=Wedding+Consultation+Inquiry">Contact Our Wedding Team</Link>
          </Button>
        </div>
      </section>
   
    </div>
  );
}
