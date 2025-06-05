import type { Metadata, ResolvingMetadata } from 'next';
import NextImage from 'next/image';
import { mockRooms } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, BedDouble,Maximize, DollarSign, Star } from 'lucide-react';
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
      title: 'Room Not Found',
    };
  }

  return {
    title: `${room.name} - LuxeStay`,
    description: room.description,
    openGraph: {
        images: [room.imageUrl],
    },
  };
}

export default function RoomDetailPage({ params }: Props) {
  const room = mockRooms.find((r) => r.id === params.id);

  if (!room) {
    notFound();
  }

  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-3">
             <Carousel className="w-full rounded-lg overflow-hidden shadow-xl">
              <CarouselContent>
                {room.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[16/10] w-full">
                      <NextImage
                        src={img}
                        alt={`${room.name} - Image ${index + 1}`}
                        data-ai-hint={`${room.category.toLowerCase()} room detail view`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground" />
            </Carousel>
          </div>

          {/* Room Details */}
          <div className="lg:col-span-2 bg-card p-6 md:p-8 rounded-lg shadow-xl">
            <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-2">{room.name}</h1>
            <div className="flex items-center mb-4">
              <Badge variant="outline" className="text-sm mr-2">{room.category}</Badge>
              {room.rating && (
                 <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < room.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
                    ))}
                    <span className="ml-1 text-sm text-muted-foreground">({room.rating.toFixed(1)})</span>
                </div>
              )}
            </div>
            
            <p className="font-body text-foreground/80 mb-6">{room.longDescription}</p>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                <span>Capacity: {room.capacity} guests</span>
              </div>
              <div className="flex items-center">
                <BedDouble className="w-5 h-5 mr-2 text-primary" />
                <span>Beds: {room.beds}</span>
              </div>
              <div className="flex items-center">
                <Maximize className="w-5 h-5 mr-2 text-primary" />
                <span>Size: {room.size}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary" />
                <span>Price: ${room.pricePerNight}/night</span>
              </div>
            </div>

            {room.features && room.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-headline text-lg font-semibold mb-2">Key Features:</h3>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <Badge key={feature} variant="secondary">{feature}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            <Button asChild size="lg" className="w-full font-body text-lg transform hover:scale-105 transition-transform duration-300">
              <Link href={`/booking?roomId=${room.id}`}>Book This Room</Link>
            </Button>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mt-12 bg-card p-6 md:p-8 rounded-lg shadow-xl">
            <h2 className="font-headline text-2xl font-semibold mb-6">Amenities</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 font-body">
            {room.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
                <span>{amenity}</span>
                </li>
            ))}
            </ul>
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
