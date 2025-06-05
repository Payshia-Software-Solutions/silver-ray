import NextImage from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/types';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden h-full flex flex-col bg-card">
      <CardContent className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex mb-2">
            {Array(5).fill(0).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`}
              />
            ))}
          </div>
          <blockquote className="font-body text-base italic text-foreground/90 mb-6">
            "{testimonial.quote}"
          </blockquote>
        </div>
        <div className="flex items-center mt-auto">
          {testimonial.avatarUrl && (
            <NextImage
              src={testimonial.avatarUrl}
              alt={testimonial.name}
              data-ai-hint="person avatar"
              width={48}
              height={48}
              className="rounded-full mr-4"
            />
          )}
          <div>
            <p className="font-headline text-lg font-semibold">{testimonial.name}</p>
            {testimonial.location && (
              <p className="font-body text-sm text-muted-foreground">{testimonial.location}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
