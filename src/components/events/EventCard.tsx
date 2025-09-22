
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Tag } from 'lucide-react';
import { IMAGE_BASE_URL } from '@/lib/config';

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  category: string;
}

export function EventCard({ id, title, date, imageUrl, imageHint, category }: EventCardProps) {
  const finalImageUrl = imageUrl && !imageUrl.startsWith('http') ? `${IMAGE_BASE_URL}/${imageUrl.replace(/\\/g, '/')}` : (imageUrl || 'https://placehold.co/600x400.png');
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card border-none">
      <CardHeader className="p-0 relative aspect-video">
        <NextImage
          src={finalImageUrl}
          alt={title}
          data-ai-hint={imageHint}
          fill
          className="object-cover"
          unoptimized
        />
      </CardHeader>
      <CardContent className="p-5 flex flex-col flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
            <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1.5 text-primary"/>
                {date}
            </div>
            <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1.5 text-primary"/>
                {category}
            </div>
        </div>
        <Button asChild className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11">
          <Link href={`/contact?subject=Inquiry about ${title}`}>Inquire Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
