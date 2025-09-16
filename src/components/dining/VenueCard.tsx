
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { IMAGE_BASE_URL } from '@/lib/config';


export interface VenueProps {
  id: string;
  name: string;
  tag: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  viewMoreLink: string;
}

export function VenueCard({ name, tag, description, imageUrl, imageHint, viewMoreLink }: VenueProps) {
  const finalImageUrl = `${IMAGE_BASE_URL}${imageUrl}`;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card border-none">
      <CardHeader className="p-0 relative aspect-[4/3]">
        <NextImage
          src={finalImageUrl}
          alt={`Image of ${name}`}
          data-ai-hint={imageHint}
          fill
          className="object-cover"
          unoptimized
        />
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
            <CardTitle className="font-headline text-xl ">{name}</CardTitle>
            <Badge variant="outline" className="border-primary text-primary">{tag}</Badge>
        </div>
        <p className="font-body text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
          {description}
        </p>
        <Button asChild variant="link" className="font-body text-sm text-primary hover:text-primary/80 p-0 justify-start h-auto group mt-auto">
          <Link href={viewMoreLink}>
            View More 
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
