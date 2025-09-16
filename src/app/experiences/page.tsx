
'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  HeartPulse, // Wellness & Spa
  MountainSnow, // Adventure & Nature, Sunrise Peak
  Palette, // Cultural Immersion, Heritage Museum
  ChefHat, // Culinary Classes
  ToyBrick, // Kids Activities
  Clock,
  Users, // Using Users for price per person icon as per design
  CalendarCheck,
  MapPin,
  Utensils, // Food Enthusiasm?, Local Market new
  Leaf, // Emerald Forest
  Waves, // Crystal Falls new
  Landmark, // Ancient Temple new
  Sparkles,
  ChevronDown
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { getExperiences, getExperienceImages } from '@/services/api/experiences';
import type { ExperienceFromApi, ExperienceImage, FeaturedExperience } from '@/types';
import { IMAGE_BASE_URL } from '@/lib/config';


interface ExperienceCategory {
  id: string;
  icon: LucideIcon;
  title:string;
  description: string;
  imageHint: string;
}

interface CurateRecommendation {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

interface NearbyAttraction {
  id: string;
  imageUrl: string; 
  imageHint: string; 
  title: string;
  distance: string;
  icon?: LucideIcon;
}

const experienceCategories: ExperienceCategory[] = [
  { id: 'wellness', icon: HeartPulse, title: 'Wellness & Spa', description: 'Revive mind and body with soothing spa rituals and holistic wellness journeys.', imageHint: 'spa massage therapy' },
  { id: 'adventure', icon: MountainSnow, title: 'Adventure & Nature', description: 'Explore breathtaking landscapes with guided hikes and outdoor adventures.', imageHint: 'mountain hiking landscape' },
  { id: 'cultural', icon: Palette, title: 'Cultural Immersion', description: 'Connect with local heritage through authentic arts, crafts, and traditions.', imageHint: 'traditional art crafts' },
  { id: 'culinary', icon: ChefHat, title: 'Culinary Classes', description: 'Master local flavors with hands-on cooking classes guided by expert chefs.', imageHint: 'cooking class food' },
  { id: 'kids', icon: ToyBrick, title: "Kids' Activities", description: 'Keep young guests entertained with creative and educational fun programs.', imageHint: 'children playing games' },
];

const curateRecommendations: CurateRecommendation[] = [
  { id: 'wellness-rec', icon: Sparkles, title: 'Love Wellness?', description: 'Try our Signature Spa Ritual and Sunrise Yoga Session for total mindfulness.', link: '/contact?subject=Wellness Package Inquiry', linkText: 'Explore Wellness' },
  { id: 'foodie-rec', icon: Utensils, title: 'Food Enthusiasm?', description: 'Join the Traditional Sri Lankan Cooking Class and taste your creations.', link: '/contact?subject=Culinary Experience Inquiry', linkText: 'Discover Culinary Arts' },
];

const nearbyAttractions: NearbyAttraction[] = [
  { id: 'crystal-falls', imageUrl: 'https://images.unsplash.com/photo-1519582149095-fe7d19b2a3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d2F0ZXJmYWxsJTIwbmF0dXJlfGVufDB8fHx8MTc0OTE0NTQzMXww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'waterfall nature', title: 'Crystal Falls', distance: '2.1 km from hotel', icon: Waves },
  { id: 'emerald-forest', imageUrl: 'https://images.unsplash.com/photo-1640354065652-64832d9ba672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxmb3Jlc3QlMjByZXNlcnZlJTIwdHJhaWx8ZW58MHx8fHwxNzQ5MTQ1NDMxfDA&ixlib-rb-4.1.0&q=80&w=1080', imageHint: 'forest reserve trail', title: 'Emerald Forest Reserve', distance: '4.3 km from hotel', icon: Leaf },
  { id: 'heritage-museum', imageUrl: 'https://images.unsplash.com/photo-1743881188980-4de44e2bba56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtdXNldW0lMjBoaXN0b3JpY2FsJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzQ5MTQ1NDMxfDA&ixlib-rb-4.1.0&q=80&w=1080', imageHint: 'museum historical building', title: 'Heritage Museum', distance: '1.8 km from hotel', icon: Palette },
  { id: 'sunrise-peak', imageUrl: 'https://images.unsplash.com/photo-1466854076813-4aa9ac0fc347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtb3VudGFpbiUyMHBlYWslMjBzdW5yaXNlfGVufDB8fHx8MTc0OTE0NTQzMXww&ixlib.rb-4.1.0&q=80&w=1080', imageHint: 'mountain peak sunrise', title: 'Sunrise Peak', distance: '6.7 km from hotel', icon: MountainSnow },
  { id: 'local-market', imageUrl: 'https://images.unsplash.com/photo-1533264533981-8aead62802fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMG1hcmtldCUyMHN0YWxsc3xlbnwwfHx8fDE3NDkxNDU0MzF8MA&ixlib.rb-4.1.0&q=80&w=1080', imageHint: 'local market stalls', title: 'Local Market', distance: '0.9 km from hotel', icon: Utensils },
  { id: 'ancient-temple', imageUrl: 'https://images.unsplash.com/photo-1730758070932-0ad2926af54c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YW5jaWVudCUyMHRlbXBsZSUyMHJ1aW5zfGVufDB8fHx8MTc0OTE0NTQzMXww&ixlib.rb-4.1.0&q=80&w=1080', imageHint: 'ancient temple ruins', title: 'Ancient Temple', distance: '3.0 km from hotel', icon: Landmark },
];

const FeaturedExperienceCard = ({ exp }: { exp: FeaturedExperience }) => (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card rounded-xl h-full border-none">
        <CardHeader className="p-0 relative aspect-video">
            <NextImage
            src={exp.imageUrl}
            alt={exp.title}
            data-ai-hint={exp.imageHint}
            fill
            className="object-cover"
            unoptimized
            />
        </CardHeader>
        <CardContent className="p-5 flex flex-col flex-grow">
            <CardTitle className="font-headline text-xl mb-2">{exp.title}</CardTitle>
            <CardDescription className="font-body text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
            {exp.description}
            </CardDescription>
            <div className="font-body text-xs text-muted-foreground space-y-1.5 mb-4 grid grid-cols-2">
                <div className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-primary" /> {exp.duration}</div>
                <div className="flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-primary" /> {exp.pricePerPerson}</div>
                <div className="flex items-center col-span-2"><CalendarCheck className="w-3.5 h-3.5 mr-1.5 text-primary" /> {exp.bookingDetails}</div>
            </div>
            <Button asChild className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11">
                <Link href={`/experiences/book/${exp.id}`}>Book This Experience</Link>
            </Button>
        </CardContent>
    </Card>
);

const ExperienceCategoryCard = ({ category }: { category: ExperienceCategory }) => (
  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card rounded-xl h-full border-none text-center p-6 items-center">
    <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mb-4 border-2 border-primary/20">
      <category.icon className="w-12 h-12 text-primary" />
    </div>
    <h3 className="font-headline text-xl font-semibold mb-2">{category.title}</h3>
    <p className="font-body text-sm text-muted-foreground flex-grow">{category.description}</p>
  </Card>
);


function ExperiencesPage() {
    const [featuredExperiences, setFeaturedExperiences] = useState<FeaturedExperience[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true, stopOnHover: true })
    );

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                setIsLoading(true);
                const [experiencesData, imagesData] = await Promise.all([
                    getExperiences(),
                    getExperienceImages(),
                ]);

                const imagesByExperienceId = (imagesData || []).reduce((acc, image) => {
                    if (!acc[image.experience_id]) {
                        acc[image.experience_id] = [];
                    }
                    acc[image.experience_id].push(image);
                    return acc;
                }, {} as Record<number, ExperienceImage[]>);

                const experiences: FeaturedExperience[] = (experiencesData || []).map(exp => {
                    const primaryImage = imagesByExperienceId[exp.id]?.find(img => img.is_primary === 1) || imagesByExperienceId[exp.id]?.[0];
                    const imageUrl = primaryImage ? `${IMAGE_BASE_URL}${primaryImage.image_url.replace(/\\/g, '')}` : 'https://placehold.co/600x400.png';
                    return {
                        id: String(exp.id),
                        title: exp.name,
                        description: exp.short_description,
                        imageUrl: imageUrl,
                        imageHint: primaryImage?.alt_text || 'experience image',
                        duration: exp.duration,
                        pricePerPerson: `LKR ${parseFloat(exp.Price).toLocaleString()}`,
                        bookingDetails: exp.advance_booking_required ? 'Advance Booking Required' : 'Walk-ins Welcome',
                    };
                });
                
                setFeaturedExperiences(experiences);
            } catch (err: any) {
                console.error("Failed to fetch experiences:", err);
                setError("Failed to load experiences. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchExperiences();
    }, []);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] md:h-[70vh] lg:h-[80vh] flex items-center justify-center text-center text-white">
        <NextImage
          src="https://placehold.co/1920x1080.png"
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

      {/* Choose Your Experience Section */}
        <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">Choose Your Experience</h2>
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent className="-ml-4">
                    {experienceCategories.map((category) => (
                      <CarouselItem key={category.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
                         <div className="p-1 h-full">
                            <ExperienceCategoryCard category={category} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex" />
                  <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>

      {/* Featured Experiences Section */}
      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">Featured Experiences</h2>
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-card rounded-lg shadow animate-pulse">
                    <div className="aspect-video bg-muted rounded-t-lg"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-10 bg-muted rounded-full mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {error && <p className="text-center font-body text-lg text-destructive">{error}</p>}
            {!isLoading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredExperiences.slice(0, 3).map((exp) => ( 
                    <FeaturedExperienceCard key={exp.id} exp={exp} />
                  ))}
                </div>
            )}
            {!isLoading && !error && featuredExperiences.length > 3 && (
                <div className="text-center mt-12">
                    <Button variant="outline" className="rounded-full text-base h-auto py-2 px-6 border-muted-foreground/50 text-muted-foreground hover:bg-muted/10 hover:text-foreground">
                        Load More
                        <ChevronDown className="w-4 h-4 ml-2"/>
                    </Button>
                </div>
            )}
        </div>
      </section>

      {/* Curate Your Journey Section */}
      <section id="curate-journey" className="py-16 lg:py-20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-4">Curate Your Journey</h2>
          <p className="font-body text-lg text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Tell us your preferences and we'll suggest perfect experiences.
          </p>
          <div className="flex flex-col items-start gap-y-4 mb-12 max-w-sm mx-auto">
            {experienceCategories.map((category) => (
              <div key={`check-${category.id}`} className="flex items-center space-x-3">
                <Checkbox id={`check-${category.id}`} className="w-5 h-5"/>
                <label htmlFor={`check-${category.id}`} className="font-body text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                   <category.icon className="w-5 h-5 text-primary" /> 
                  {category.title}
                </label>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {curateRecommendations.map((rec) => (
              <Card key={rec.id} className="bg-secondary/30 border-border shadow-md rounded-xl">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                     <rec.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-semibold mb-1">{rec.title}</h3>
                    <p className="font-body text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <Button asChild variant="link" className="p-0 h-auto text-primary">
                      <Link href={rec.link}>{rec.linkText}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Nearby Attractions Section */}
      <section className="py-16 lg:py-20 bg-secondary/20">
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
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 items-start">
            {nearbyAttractions.map((attraction) => (
              <div key={attraction.id} className="flex flex-col items-center text-center group">
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
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// You must export default from a page file
export default ExperiencesPage;
