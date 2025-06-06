
import NextImage from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/types';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-card rounded-xl shadow-lg text-center h-full flex flex-col">
      <CardContent className="p-6 md:p-8 flex flex-col items-center flex-grow">
        {testimonial.avatarUrl && (
          <div className="relative w-16 h-16 mb-4">
            <NextImage
              src={testimonial.avatarUrl}
              alt={testimonial.name}
              data-ai-hint="person avatar"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
        )}
        <div className="flex mb-3">
          {Array(5).fill(0).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30 fill-muted-foreground/20'}`}
            />
          ))}
        </div>
        <blockquote className="font-body text-sm italic text-foreground/80 mb-4 flex-grow">
          "{testimonial.quote}"
        </blockquote>
        <p className="font-headline text-base font-semibold text-foreground/90 mt-auto">- {testimonial.name}</p>
      </CardContent>
    </Card>
  );
}
