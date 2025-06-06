
import NextImage from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { WeddingVenue } from '@/data/weddingData';
import { ArrowRight } from 'lucide-react';

interface WeddingVenueCardProps {
  venue: WeddingVenue;
}

export function WeddingVenueCard({ venue }: WeddingVenueCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card">
      <CardHeader className="p-0 relative aspect-[4/3]">
        <NextImage
          src={venue.imageUrl}
          alt={venue.name}
          data-ai-hint={venue.imageHint}
          fill
          className="object-cover"
        />
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{venue.name}</CardTitle>
        <p className="font-body text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
          {venue.description}
        </p>
        <ul className="font-body text-xs text-muted-foreground space-y-1.5 mb-4">
          {venue.features.slice(0, 4).map((feature, index) => ( // Show max 4 features
            <li key={index} className="flex items-center">
              <feature.icon className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
              {feature.text}
            </li>
          ))}
        </ul>
        <Button asChild variant="link" className="font-body text-sm text-primary hover:text-primary/80 p-0 justify-start h-auto group mt-auto">
          <Link href={`/weddings/venues/${venue.id}`}>
            More Details
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
