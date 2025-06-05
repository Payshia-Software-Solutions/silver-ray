
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export interface VenueProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  viewMoreLink: string;
}

export function VenueCard({ name, description, imageUrl, imageHint, viewMoreLink }: VenueProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card">
      <CardHeader className="p-0 relative aspect-[4/3]">
        <NextImage
          src={imageUrl}
          alt={`Image of ${name}`}
          data-ai-hint={imageHint}
          fill
          className="object-cover"
        />
         <div className="absolute top-3 left-3 bg-black/50 text-white px-2 py-1 text-xs rounded">
            Grand Silver Ray
        </div>
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <CardTitle className="font-headline text-2xl mb-2">{name}</CardTitle>
        <p className="font-body text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
          {description}
        </p>
        <Button asChild variant="ghost" className="font-body text-sm text-primary hover:text-primary/80 p-0 justify-start h-auto group mt-auto">
          <Link href={viewMoreLink}>
            View More 
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
