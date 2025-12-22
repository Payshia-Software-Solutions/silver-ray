
'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
  ChevronDown,
  Gem,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React from 'react';
import { getExperiences, getExperienceImagesByExperienceId } from '@/services/api/experiences';
import type { ExperienceFromApi, ExperienceImage, FeaturedExperience } from '@/types';
import { IMAGE_BASE_URL } from '@/lib/config';
import { AnimatedInView } from '@/components/shared/AnimatedInView';
import { Badge } from '@/components/ui/badge';


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
  { id: 'udawalawe', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/Udawalawe%202-optimized.webp', imageHint: 'elephants in Udawalawe national park', title: 'Udawalawe Safari', distance: '60 km from hotel', icon: Users },
  { id: 'sri-pada', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/Sri%20pada%202-optimized.webp', imageHint: 'Sri Pada Adams Peak mountain', title: 'Sri Pada (Adam\'s Peak)', distance: '45 km from hotel', icon: MountainSnow },
  { id: 'sinharaja', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/Sinharaja%202-optimized.webp', imageHint: 'Sinharaja forest reserve', title: 'Sinharaja Forest', distance: '35 km from hotel', icon: Leaf },
  { id: 'saman-dewalaya', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/saman%20dewalaya%202-optimized.webp', imageHint: 'Saman Devalaya temple', title: 'Saman Devalaya', distance: '5 km from hotel', icon: Landmark },
  { id: 'kirindi-ella', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/kirindi%20ella%202-optimized.webp', imageHint: 'Kirindi Ella waterfall', title: 'Kirindi Ella', distance: '20 km from hotel', icon: Waves },
  { id: 'horton-plains', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/horton%20plains%202-optimized.webp', imageHint: 'Horton Plains national park', title: 'Horton Plains', distance: '70 km from hotel', icon: MountainSnow },
  { id: 'bopath-ella', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/bopath%202-optimized.webp', imageHint: 'Bopath Ella waterfall', title: 'Bopath Ella', distance: '15 km from hotel', icon: Waves },
  { id: 'bambarakanda', imageUrl: 'https://content-provider.payshia.com/silver-ray/experience-images/Bambarakanda%202-optimized.webp', imageHint: 'Bambarakanda falls', title: 'Bambarakanda', distance: '50 km from hotel', icon: Waves },
];

const sapphireTrailExperience: ExperienceFromApi = {
  id: 99,
  slug: 'sapphire-trails',
  name: 'Sapphire Trails',
  short_description: 'Journey into the heart of Sabaragamuwa and uncover the secrets of the world-renowned Ceylon sapphires.',
  detailed_description: 'Explore a traditional gem mine, learn about the mining process from local experts, and witness the journey of a sapphire from deep within the earth to a sparkling gem. This is a unique cultural and geological adventure.',
  duration: '4 Hours',
  Price: '5000',
  experience_image: 'https://images.unsplash.com/photo-1617063491873-1c71a3962b1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  advance_booking_required: 1,
  min_participants: 2,
  company_id: '1',
  meeting_Point: 'Hotel Lobby',
  pricing_basis: 'Per Person',
  max_participants: 8,
  walk_in_available: 0,
  day_of_week: 'Daily',
  is_available: 1,
  schedule_note: 'Morning and afternoon tours available. Includes transportation.',
  status: 'Active',
  time_slot: 'Morning, Afternoon',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  created_by: 'admin',
  updated_by: null,
};


const FeaturedExperienceCard = ({ exp }: { exp: ExperienceFromApi }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageHint, setImageHint] = useState<string>('experience image');
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            if (!exp.id || exp.id === 99) { // Handle static experience
                setIsImageLoading(false);
                setImageUrl(exp.experience_image || 'https://placehold.co/600x400.png');
                setImageHint(exp.slug === 'sapphire-trails' ? 'blue sapphire gem' : 'experience image');
                return;
            }
            try {
                setIsImageLoading(true);
                const images: ExperienceImage[] = await getExperienceImagesByExperienceId(String(exp.id));
                const primaryImage = images.find(img => String(img.is_primary) === "1") || images[0];

                if (primaryImage && primaryImage.image_url) {
                    const finalUrl = primaryImage.image_url.startsWith('http')
                        ? primaryImage.image_url
                        : `${IMAGE_BASE_URL}${primaryImage.image_url.replace(/\\/g, '/').replace(/^\//, '')}`;
                    setImageUrl(finalUrl);
                    setImageHint(primaryImage.alt_text || 'experience image');
                } else if (exp.experience_image) {
                     const finalUrl = exp.experience_image.startsWith('http')
                        ? exp.experience_image
                        : `${IMAGE_BASE_URL}${exp.experience_image.replace(/\\/g, '/').replace(/^\//, '')}`;
                    setImageUrl(finalUrl);
                } else {
                    setImageUrl('https://placehold.co/600x400.png');
                }
            } catch (error) {
                console.error(`Failed to fetch image for experience ${exp.id}:`, error);
                setImageUrl('https://placehold.co/600x400.png');
            } finally {
                setIsImageLoading(false);
            }
        };

        fetchImage();
    }, [exp.id, exp.experience_image, exp.slug]);


    return (
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card rounded-xl h-full border-none">
            <CardHeader className="p-0 relative aspect-video">
                 {isImageLoading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    <NextImage
                        src={imageUrl || 'https://placehold.co/600x400.png'}
                        alt={exp.name}
                        data-ai-hint={imageHint}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                )}
            </CardHeader>
            <CardContent className="p-5 flex flex-col flex-grow">
                <CardTitle className="font-headline text-xl mb-2">{exp.name}</CardTitle>
                <CardDescription className="font-body text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                {exp.short_description}
                </CardDescription>
                <div className="font-body text-xs text-muted-foreground space-y-1.5 mb-4 grid grid-cols-2">
                    <div className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-primary" /> {exp.duration}</div>
                    <div className="flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-primary" /> LKR {parseFloat(exp.Price).toLocaleString()}</div>
                    <div className="flex items-center col-span-2"><CalendarCheck className="w-3.5 h-3.5 mr-1.5 text-primary" /> {exp.advance_booking_required ? 'Advance Booking Required' : 'Walk-ins Welcome'}</div>
                </div>
                <Button asChild className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11">
                    <Link href={`/experiences/book/${exp.slug}`}>Book This Experience</Link>
                </Button>
            </CardContent>
        </Card>
    );
};

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
                setAllExperiences([sapphireTrailExperience, ...experiencesData]);
            } catch (err: any) {
                console.error("Failed to fetch experiences:", err);
                setError("Failed to load experiences. Please try again later.");
                setAllExperiences([sapphireTrailExperience]); // Show static one even if API fails
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
          src="https://content-provider.payshia.com/silver-ray/gallery-images/1/expirincesecover-68da36409faca.jpg"
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
                            src="https://images.unsplash.com/photo-1617063491873-1c71a3962b1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

    