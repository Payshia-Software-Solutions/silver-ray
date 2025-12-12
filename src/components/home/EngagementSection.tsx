
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Box, Pin } from 'lucide-react';
import { AnimatedInView } from '../shared/AnimatedInView';

export function EngagementSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Experience Our Venues, Near or Far
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you're planning from across the globe or just around the corner, we have the perfect way for you to explore our stunning event spaces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatedInView delay={0.1}>
            <Card className="bg-card text-card-foreground rounded-2xl shadow-xl h-full flex flex-col p-8 text-center items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Box className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-headline text-2xl font-bold mb-3">Explore in Augmented Reality</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                For our international clients. Step into our venues from anywhere in the world with our immersive AR Vision experience.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto group">
                <Link href="#ar-vision">
                  Launch AR Vision
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </Card>
          </AnimatedInView>

          <AnimatedInView delay={0.2}>
            <Card className="bg-card text-card-foreground rounded-2xl shadow-xl h-full flex flex-col p-8 text-center items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Pin className="w-10 h-10 text-primary" />
                </div>
              <h3 className="font-headline text-2xl font-bold mb-3">Schedule a Personal Tour</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                For our local clients. Visit us in person to see the elegance and charm of our venues and discuss your event with our specialists.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto group" variant="outline">
                <Link href="/contact?subject=Venue Tour Appointment">
                  Book an Appointment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </Card>
          </AnimatedInView>
        </div>
      </div>
    </section>
  );
}
