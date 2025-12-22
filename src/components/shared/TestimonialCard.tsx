import NextImage from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/types';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';


interface TestimonialCardProps {
  testimonial: Testimonial;
  isModalVersion?: boolean;
}

const renderStars = (rating: number) => {
    return (
        <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
            <Star
            key={i}
            className={cn(
                'w-4 h-4',
                i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'
            )}
            />
        ))}
        </div>
    );
};


export function TestimonialCard({ testimonial, isModalVersion = false }: TestimonialCardProps) {
  if (isModalVersion) {
     return (
        <Card className="bg-secondary/30 border-border/50">
            <CardContent className="p-4 flex items-start space-x-4">
                 {testimonial.avatarUrl && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20 p-0.5 bg-background">
                    <NextImage
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    data-ai-hint="person avatar"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    />
                </div>
                )}
                <div className="flex-grow">
                     <blockquote className="font-body text-sm text-foreground/80 mb-2 italic">
                        "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                       <div>
                         <p className="font-headline text-base font-semibold text-foreground/90">- {testimonial.name}</p>
                         {testimonial.location && <p className="text-xs text-muted-foreground">{testimonial.location}</p>}
                       </div>
                       {renderStars(testimonial.rating)}
                    </div>
                </div>
            </CardContent>
        </Card>
     );
  }


  return (
    <Card className="bg-card rounded-xl shadow-lg h-full flex flex-col p-6 text-center items-center justify-center border-none">
       {testimonial.avatarUrl && (
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20 p-1 bg-background mb-4">
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
      <CardContent className="p-0 flex flex-col items-center">
        <blockquote className="font-body text-sm text-foreground/80 mb-4 italic">
          "{testimonial.quote}"
        </blockquote>
        <div className="flex flex-col items-center">
             <p className="font-headline text-base font-semibold text-foreground/90">- {testimonial.name}</p>
             {renderStars(testimonial.rating)}
        </div>
      </CardContent>
    </Card>
  );
}
