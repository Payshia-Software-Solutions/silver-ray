
import NextImage from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface DishProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

export function DishCard({ name, description, imageUrl, imageHint }: DishProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card border-border">
      <CardHeader className="p-0 relative aspect-[4/3]">
        <NextImage
          src={imageUrl}
          alt={`Image of ${name}`}
          data-ai-hint={imageHint}
          fill
          className="object-cover"
        />
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow text-center">
        <CardTitle className="font-headline text-xl mb-2">{name}</CardTitle>
        <p className="font-body text-muted-foreground text-sm line-clamp-3">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
