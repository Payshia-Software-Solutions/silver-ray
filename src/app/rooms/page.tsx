
'use client';

import { useState, useEffect } from 'react';
import { RoomCard } from '@/components/shared/RoomCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, SlidersHorizontal, ArrowRight, MountainSnow, Leaf, Waves, Landmark, Users, Phone, Gem, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { RoomsPageHero } from '@/components/rooms/RoomsPageHero';
import { NotificationBanner } from '@/components/rooms/NotificationBanner';
import type { Room, RoomFromApi, ExperienceFromApi, FeaturedExperience } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { getRooms } from '@/services/api/rooms';
import { getExperiences } from '@/services/api/experiences';
import { AnimatedInView } from '@/components/shared/AnimatedInView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NextImage from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';


interface ExperienceHighlightCardProps {
  experience: FeaturedExperience;
}

function ExperienceHighlightCard({ experience }: { experience: FeaturedExperience }) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card border-border">
      <CardHeader className="p-0 relative aspect-video">
        <NextImage
          src={experience.imageUrl}
          alt={experience.title}
          data-ai-hint={experience.imageHint}
          fill
          className="object-cover"
        />
      </CardHeader>
      <CardContent className="p-5 flex flex-col flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{experience.title}</CardTitle>
        <p className="font-body text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
          {experience.description}
        </p>
        <Button asChild variant="link" className="font-body text-sm p-0 justify-start group mt-auto text-primary">
          <Link href={`/experiences/book/${experience.id}`}>
            Learn More
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}


function DesktopRoomFilters() {
  return (
    <div className="hidden md:block my-8 p-4 bg-card rounded-xl shadow-md border">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground/80">Filter by:</span>
                <Select>
                    <SelectTrigger className="w-[140px] bg-secondary/40 border-border">
                        <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ocean">Ocean View</SelectItem>
                        <SelectItem value="city">City View</SelectItem>
                        <SelectItem value="garden">Garden View</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[140px] bg-secondary/40 border-border">
                        <SelectValue placeholder="Occupancy" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4+ Guests</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[140px] bg-secondary/40 border-border">
                        <SelectValue placeholder="Amenities" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pool">Private Pool</SelectItem>
                        <SelectItem value="balcony">Balcony</SelectItem>
                        <SelectItem value="kitchen">Kitchen</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[140px] bg-secondary/40 border-border">
                        <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">$200-$400</SelectItem>
                        <SelectItem value="medium">$400-$800</SelectItem>
                        <SelectItem value="high">$800+</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground/80">Sort by:</span>
                <Select defaultValue="recommended">
                    <SelectTrigger className="w-[180px] bg-secondary/40 border-border">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="size">Size</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
  );
}


function MobileRoomFilters() {
  return (
    <div className="my-8 md:hidden">
      <Accordion type="single" collapsible className="w-full bg-card rounded-lg shadow-sm border px-4">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="hover:no-underline font-semibold text-foreground/80">
             <div className='flex items-center gap-2'>
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters & Sort</span>
             </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 items-end pt-4">
                <div className="col-span-2 space-y-1.5">
                    <Label>Sort by</Label>
                    <Select defaultValue="recommended">
                        <SelectTrigger>
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recommended">Recommended</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="size">Size</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1.5">
                    <Label>View</Label>
                     <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ocean">Ocean</SelectItem>
                            <SelectItem value="city">City</SelectItem>
                            <SelectItem value="garden">Garden</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-1.5">
                    <Label>Occupancy</Label>
                    <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-1.5">
                    <Label>Price</Label>
                    <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">$200-$400</SelectItem>
                            <SelectItem value="medium">$400-$800</SelectItem>
                            <SelectItem value="high">$800+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-1.5">
                    <Label>Amenities</Label>
                    <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pool">Pool</SelectItem>
                            <SelectItem value="balcony">Balcony</SelectItem>
                            <SelectItem value="kitchen">Kitchen</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

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

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        setIsLoading(true);
        const roomsData: RoomFromApi[] = await getRooms();
        
        const mappedRooms: Room[] = roomsData.map(apiRoom => {
            const roomSize = (parseFloat(apiRoom.room_width) * parseFloat(apiRoom.room_height) / 10.764).toFixed(0);
            return {
              ...apiRoom,
              id: String(apiRoom.id), // Ensure id is a string
              name: apiRoom.descriptive_title,
              description: apiRoom.short_description,
              pricePerNight: parseFloat(apiRoom.price_per_night),
              capacity: apiRoom.adults_capacity,
              imageUrl: '', // This is handled by RoomCard internally
              amenities: apiRoom.amenities_id?.split(',').map(a => a.trim()) || [],
              beds: '1 King Bed', // Placeholder, adjust if API provides this
              size: `${roomSize} sqft`,
              category: apiRoom.room_type?.type_name as any || 'Standard',
            };
        });

        setRooms(mappedRooms);

      } catch (err: any) {
        console.error('Failed to fetch room data:', err);
        setError(err.message || 'Failed to load rooms. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRoomsData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(rooms.length);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg shadow animate-pulse">
              <div className="aspect-[4/3] bg-muted rounded-t-lg"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (error) {
      return <p className="text-center font-body text-lg text-destructive">{error}</p>;
    }
    if (rooms.length === 0) {
      return (
        <p className="text-center font-body text-lg text-muted-foreground">
          No rooms available at the moment.
        </p>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.slice(0, visibleCount).map((room, index) => (
          <AnimatedInView key={room.id} delay={index % 3 * 0.1}>
            <RoomCard room={room} />
          </AnimatedInView>
        ))}
      </div>
    );
  };

  return (
    <>
      <RoomsPageHero />
      <NotificationBanner />
      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <DesktopRoomFilters />
          <MobileRoomFilters />
          
          {renderContent()}

          {!isLoading && !error && visibleCount < rooms.length && (
            <div className="text-center mt-12">
              <Button variant="outline" className="rounded-full px-6 py-3 h-auto" onClick={handleLoadMore}>
                Load More <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
        
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
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 text-sm">
                                <div className="flex items-center text-muted-foreground"><Gem className="w-5 h-5 mr-2 text-primary" /> Gemology & Culture</div>
                                <div className="flex items-center text-muted-foreground"><Clock className="w-5 h-5 mr-2 text-primary" /> 4 Hour Tour</div>
                                <div className="flex items-center text-muted-foreground">
                                    <Phone className="w-5 h-5 mr-2 text-primary" /> 
                                    <a href="tel:0713626200" className="hover:text-primary">0713626200</a>
                                </div>
                            </div>
                            <Button asChild size="lg" className="font-body text-lg group">
                                <a href="http://sapphiretrails.lk/" target="_blank" rel="noopener noreferrer">
                                    Discover the Trail
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                        </div>
                    </AnimatedInView>
                </div>
            </div>
        </section>

        <section className="py-16 lg:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">Explore Nearby Attractions</h2>
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
    </>
  );
}
