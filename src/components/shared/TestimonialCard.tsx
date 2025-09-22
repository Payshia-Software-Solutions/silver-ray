
import NextImage from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/types';
import { Heart } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-card rounded-xl shadow-lg h-full flex flex-col">
      <CardContent className="p-6 md:p-8 flex items-start space-x-6">
        {testimonial.avatarUrl && (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20 p-1 bg-background">
            <NextImage
              src={testimonial.avatarUrl}
              alt={testimonial.name}
              data-ai-hint="person avatar"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
        )}
        <div className="flex-grow">
            <blockquote className="font-body text-sm text-foreground/80 mb-3 italic">
            "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center space-x-2">
                <p className="font-headline text-base font-semibold text-foreground/90">- {testimonial.name}</p>
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
