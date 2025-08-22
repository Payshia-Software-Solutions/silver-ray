
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { mockTestimonials } from '@/data/mockData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Guest Reviews
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our delighted guests who made unforgettable memories at Silver Ray.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: mockTestimonials.length > 2, 
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4 py-4">
            {mockTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
