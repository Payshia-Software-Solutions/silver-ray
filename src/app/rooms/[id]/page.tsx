
import type { Metadata, ResolvingMetadata } from 'next';
import NextImage from 'next/image';
import { mockRooms } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Maximize, Award, Sparkle, CalendarDays, DollarSign, Bed } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const room = mockRooms.find((r) => r.id === params.id);

  if (!room) {
    return {
      title: 'Room Not Found | Grand Silver Ray',
    };
  }

  return {
    title: `${room.name} | Grand Silver Ray`,
    description: room.description,
    openGraph: {
        images: room.images && room.images.length > 0 ? [room.images[0]] : [room.imageUrl],
    },
  };
}

export default function RoomDetailPage({ params }: Props) {
  const room = mockRooms.find((r) => r.id === params.id);

  if (!room) {
    notFound();
  }

  const imagesToShow = room.images && room.images.length > 0 ? room.images : [room.imageUrl];

  return (
    <div className="bg-secondary/5 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-12">
          {/* Left Column: Room Details */}
          <div className="lg:col-span-5 space-y-8">
            <Carousel 
              className="w-full rounded-lg overflow-hidden shadow-xl border border-border"
              opts={{ loop: imagesToShow.length > 1 }}
            >
              <CarouselContent>
                {imagesToShow.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[16/10] w-full">
                      <NextImage
                        src={img}
                        alt={`${room.name} - Image ${index + 1}`}
                        data-ai-hint={`${room.category.toLowerCase()} room interior detail`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {imagesToShow.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 text-foreground" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 text-foreground" />
                </>
              )}
            </Carousel>
            
            <div>
              <Badge variant="outline" className="mb-2 text-sm">{room.category}</Badge>
              <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-4">{room.name}</h1>
              <p className="font-body text-foreground/80 text-base leading-relaxed">{room.longDescription}</p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-semibold mb-4">Key Amenities</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 font-body text-foreground/90">
                {room.amenities.slice(0, 9).map((amenity) => ( // Show up to 9 amenities for brevity
                  <li key={amenity} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-border">
              <div className="flex items-start p-4 bg-card rounded-lg shadow-sm">
                <Maximize className="w-7 h-7 mr-3 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-headline text-md font-semibold">Room Size</h3>
                  <p className="font-body text-sm text-muted-foreground">{room.size}</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-card rounded-lg shadow-sm">
                <Users className="w-7 h-7 mr-3 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-headline text-md font-semibold">Max Occupancy</h3>
                  <p className="font-body text-sm text-muted-foreground">{room.capacity} Guests ({room.beds})</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-card rounded-lg shadow-sm">
                <Award className="w-7 h-7 mr-3 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-headline text-md font-semibold">View</h3>
                  <p className="font-body text-sm text-muted-foreground">{room.viewType || 'Pleasant Views'}</p>
                </div>
              </div>
            </div>
            
            {room.roomLayoutImageUrl && (
              <div>
                <h2 className="font-headline text-2xl font-semibold mb-4">Room Layout</h2>
                <div className="relative aspect-[2/1] w-full max-w-xl overflow-hidden rounded-lg border border-border shadow-sm">
                  <NextImage
                    src={room.roomLayoutImageUrl}
                    alt={`${room.name} Layout`}
                    data-ai-hint="floor plan"
                    fill
                    className="object-contain p-2 bg-card" 
                  />
                </div>
              </div>
            )}

            {room.enhanceYourStay && room.enhanceYourStay.length > 0 && (
              <div>
                <h2 className="font-headline text-2xl font-semibold mb-4">Enhance Your Stay</h2>
                <ul className="space-y-2 font-body text-foreground/90">
                  {room.enhanceYourStay.map((perk) => (
                    <li key={perk} className="flex items-center">
                      <Sparkle className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 h-fit"> {/* Added h-fit for sticky */}
            <div className="bg-card p-6 rounded-xl shadow-2xl border border-border">
              <div className="mb-6">
                <span className="font-body text-sm text-muted-foreground">Starting from</span>
                <p className="font-headline text-4xl font-bold text-foreground">
                  ${room.pricePerNight}
                  <span className="text-lg font-normal text-muted-foreground">/night</span>
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="font-body text-sm font-medium text-muted-foreground block mb-1">Check In</label>
                  <div className="flex items-center p-3 rounded-md border border-input bg-background text-sm text-muted-foreground">
                    <CalendarDays className="w-5 h-5 mr-2 text-muted-foreground/70" />
                    <span>Select date</span>
                  </div>
                </div>
                 <div>
                  <label className="font-body text-sm font-medium text-muted-foreground block mb-1">Check Out</label>
                  <div className="flex items-center p-3 rounded-md border border-input bg-background text-sm text-muted-foreground">
                    <CalendarDays className="w-5 h-5 mr-2 text-muted-foreground/70" />
                    <span>Select date</span>
                  </div>
                </div>
                 <div>
                  <label className="font-body text-sm font-medium text-muted-foreground block mb-1">Guests</label>
                  <div className="flex items-center p-3 rounded-md border border-input bg-background text-sm text-muted-foreground">
                    <Users className="w-5 h-5 mr-2 text-muted-foreground/70" />
                    <span>1 Adult</span>
                  </div>
                </div>
              </div>
              
              <Button asChild size="lg" className="w-full font-body text-lg transform hover:scale-105 transition-transform duration-300">
                <Link href={`/booking?roomId=${room.id}`}>Book This Room</Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                You won't be charged until the stay.
              </p>
            </div>
            
            <div className="mt-6 bg-primary/10 p-4 rounded-lg text-center">
                <h3 className="font-headline text-md font-semibold mb-2 text-primary-foreground/90">Need more space?</h3>
                <p className="text-sm text-primary-foreground/80 mb-3">Explore our luxurious suites for an upgraded experience.</p>
                <Button asChild variant="link" className="text-sm text-primary-foreground hover:text-primary-foreground/80">
                    <Link href="/rooms?category=Suite">View Suites</Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return mockRooms.map((room) => ({
    id: room.id,
  }));
}
