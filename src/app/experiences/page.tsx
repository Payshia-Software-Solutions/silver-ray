
'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  MountainSnow,
  Clock,
  Utensils, 
  Leaf, 
  Waves, 
  Landmark, 
  Sparkles,
  Gem,
  ArrowRight,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import { getExperiences } from '@/services/api/experiences';
import type { ExperienceFromApi, ExperienceImage } from '@/types';
import { IMAGE_BASE_URL } from '@/lib/config';
import { AnimatedInView } from '@/components/shared/AnimatedInView';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


interface NearbyAttraction {
  id: string;
  imageUrl: string; 
  imageHint: string; 
  title: string;
  distance: string;
  icon?: LucideIcon;
}

const nearbyAttractions: NearbyAttraction[] = [
  { id: 'udawalawe', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/Udawalawe%202-optimized.webp', imageHint: 'elephants in Udawalawe national park', title: 'Udawalawe Safari', distance: '60 km from hotel', icon: Users },
  { id: 'sri-pada', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/Sri%20pada%202-optimized.webp', imageHint: 'Sri Pada Adams Peak mountain', title: 'Sri Pada (Adam\'s Peak)', distance: '45 km from hotel', icon: MountainSnow },
  { id: 'sinharaja', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/Sinharaja%202-optimized.webp', imageHint: 'Sinharaja forest reserve', title: 'Sinharaja Forest', distance: '35 km from hotel', icon: Leaf },
  { id: 'saman-dewalaya', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/saman%20dewalaya%202-optimized.webp', imageHint: 'Saman Devalaya temple', title: 'Saman Devalaya', distance: '5 km from hotel', icon: Landmark },
  { id: 'kirindi-ella', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/kirindi%20ella%202-optimized.webp', imageHint: 'Kirindi Ella waterfall', title: 'Kirindi Ella', distance: '20 km from hotel', icon: Waves },
  { id: 'horton-plains', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/horton%20plains%202-optimized.webp', imageHint: 'Horton Plains national park', title: 'Horton Plains', distance: '70 km from hotel', icon: MountainSnow },
  { id: 'bopath-ella', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/bopath%202-optimized.webp', imageHint: 'Bopath Ella waterfall', title: 'Bopath Ella', distance: '15 km from hotel', icon: Waves },
  { id: 'bambarakanda', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/Bambarakanda%202-optimized.webp', imageHint: 'Bambarakanda falls', title: 'Bambarakanda', distance: '50 km from hotel', icon: Waves },
];

function ExperiencesPage() {
    const [allExperiences, setAllExperiences] = useState<ExperienceFromApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(3);

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true, stopOnHover: true })
    );

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                setIsLoading(true);
                const experiencesData = await getExperiences();
                setAllExperiences(experiencesData);
            } catch (err: any) {
                console.error("Failed to fetch experiences:", err);
                setError("Failed to load experiences. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchExperiences();
    }, []);

  const handleLoadMore = () => {
    setVisibleCount(allExperiences.length);
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] md:h-[70vh] lg:h-[80vh] flex items-center justify-center text-center text-white">
        <NextImage
          src="https://content-provider.payshia.com/silver-ray/other/Experiences-optimized.webp"
          alt="People enjoying a serene sunset experience, possibly yoga or meditation"
          data-ai-hint="yoga sunset wellness"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-6 max-w-3xl">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
            Unforgettable Moments Await
          </h1>
          <p className="font-body text-lg sm:text-xl mb-8 max-w-xl mx-auto" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
            Discover a world of curated experiences designed to inspire, rejuvenate, and delight at Grand Silver Ray.
          </p>
          <Button asChild size="lg" className="font-body text-lg px-8 py-3 bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-primary transform hover:scale-105 transition-transform duration-300 rounded-full">
            <Link href="#curate-journey">Curate Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Sapphire Trails Section */}
      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <AnimatedInView>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                        <NextImage
                            src="https://sapphiretrails.lk/_next/image?url=https%3A%2F%2Fcontent-provider.payshia.com%2Fsapphire-trail%2Fimages%2Fimg35.webp&w=3840&q=75"
                            alt="A beautiful blue sapphire held by tweezers"
                            data-ai-hint="blue sapphire gem"
                            fill
                            className="object-cover"
                        />
                    </div>
                </AnimatedInView>
                <AnimatedInView delay={0.1}>
                    <div>
                        <Badge variant="outline" className="mb-3 text-sm border-primary text-primary">Signature Experience</Badge>
                        <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-4">Sapphire Trails</h2>
                        <p className="font-body text-lg text-muted-foreground mb-6">
                            Journey into the heart of Sabaragamuwa, the legendary land of gems. This exclusive tour takes you to a traditional gem mine where you can witness the entire process of unearthing Ceylon’s world-renowned blue sapphires.
                        </p>
                        <div className="flex items-center space-x-6 mb-8 text-sm">
                            <div className="flex items-center text-muted-foreground"><Gem className="w-5 h-5 mr-2 text-primary" /> Gemology & Culture</div>
                            <div className="flex items-center text-muted-foreground"><Clock className="w-5 h-5 mr-2 text-primary" /> 4 Hour Tour</div>
                        </div>
                        <Button asChild size="lg" className="font-body text-lg group">
                            <Link href="/experiences/book/sapphire-trails">
                                Discover the Trail
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </AnimatedInView>
            </div>
        </div>
      </section>

      {/* Explore Nearby Attractions Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">Explore Nearby Attractions</h2>
           {/* Mobile List View */}
          <div className="max-w-lg mx-auto grid grid-cols-1 gap-y-6 md:hidden">
            {nearbyAttractions.map((attraction) => (
              <Link 
                href={`/contact?subject=Inquiry about ${attraction.title}`} 
                key={`mobile-${attraction.id}`} 
                className="flex items-center space-x-4 group p-3 -m-3 rounded-lg hover:bg-secondary/40 transition-colors"
              >
                {attraction.icon && <attraction.icon className="w-10 h-10 text-primary flex-shrink-0" />}
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{attraction.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{attraction.distance}</p>
                </div>
              </Link>
            ))}
          </div>
           {/* Desktop Card View */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-x-6 gap-y-10 items-start">
            {nearbyAttractions.map((attraction, index) => (
              <AnimatedInView key={attraction.id} delay={index * 0.05} className="flex flex-col items-center text-center group h-full">
                {attraction.icon && <attraction.icon className="w-8 h-8 text-primary mb-2 transition-colors group-hover:text-primary/80" />}
                <h3 className="font-headline text-lg font-semibold text-foreground mb-0.5 transition-colors group-hover:text-primary">
                  {attraction.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground mb-4">{attraction.distance}</p>
                <Link 
                  href={`/contact?subject=Inquiry about ${attraction.title}`} 
                  className="block w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative w-full h-full">
                    <NextImage
                      src={attraction.imageUrl}
                      alt={attraction.title}
                      data-ai-hint={attraction.imageHint}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                </Link>
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// You must export default from a page file
export default ExperiencesPage;

    

    

