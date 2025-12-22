'use client';

import { useState } from 'react';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { mockTestimonials } from '@/data/mockData';
import { AnimatedInView } from '../shared/AnimatedInView';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Plus } from 'lucide-react';

export function TestimonialsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show first 3 testimonials on the main page
  const featuredTestimonials = mockTestimonials.slice(0, 3);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTestimonials.map((testimonial, index) => (
            <AnimatedInView key={testimonial.id} delay={index * 0.1}>
              <TestimonialCard testimonial={testimonial} />
            </AnimatedInView>
          ))}
        </div>

        <div className="text-center mt-12">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg">
                <Plus className="w-4 h-4 mr-2" /> Show All Reviews
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>All Guest Reviews</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-6">
                <div className="space-y-6 py-4">
                  {mockTestimonials.map((testimonial) => (
                    <TestimonialCard key={`modal-${testimonial.id}`} testimonial={testimonial} isModalVersion={true} />
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
