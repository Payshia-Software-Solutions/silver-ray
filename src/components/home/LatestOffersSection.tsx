
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  link: string;
}

const offers: Offer[] = [
  {
    id: 'honeymoon-bliss',
    title: 'Honeymoon Bliss',
    description: 'Celebrate your love with a romantic suite, private dinner, and exclusive amenities.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'romantic suite champagne',
    link: '/booking?offer=honeymoon-bliss',
  },
  {
    id: 'weekend-getaway',
    title: 'Weekend Getaway',
    description: 'Rejuvenate with a two-night stay, complimentary breakfast, and spa treatment.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'luxury pool cocktail',
    link: '/booking?offer=weekend-getaway',
  },
  {
    id: 'gourmet-escape',
    title: 'Gourmet Escape',
    description: 'Indulge in a culinary adventure with a tasting menu and wine pairing experience.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'fine dining buffet',
    link: '/booking?offer=gourmet-escape',
  },
];

export function LatestOffersSection() {
  return (
    <section className="py-16 lg:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Latest Offers & Packages
          </h2>
          <p className="font-body text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Treat yourself to our exclusive packages and unlock memorable escapes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col bg-card text-card-foreground rounded-lg">
              <CardHeader className="p-0 relative aspect-[16/10]">
                <NextImage
                  src={offer.imageUrl}
                  alt={offer.title}
                  data-ai-hint={offer.imageHint}
                  fill
                  className="object-cover"
                />
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow">
                <CardTitle className="font-headline text-xl text-primary mb-2">{offer.title}</CardTitle>
                <p className="font-body text-sm text-muted-foreground mb-6 flex-grow line-clamp-3">
                  {offer.description}
                </p>
                <Button asChild variant="secondary" className="w-full mt-auto font-body group bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href={offer.link}>
                    View Offer
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
