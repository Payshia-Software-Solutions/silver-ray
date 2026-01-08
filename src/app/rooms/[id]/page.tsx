

'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { getRoomById, getRoomImagesByRoomId } from '@/services/api/rooms';
import type { Room, RoomFromApi, RoomImage } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  CheckCircle, 
  Users, 
  Bed, 
  Maximize, 
  Award, 
  Sparkle, 
  CalendarDays, 
  DollarSign,
  ArrowLeft,
  Heart,
  Eye,
  Camera,
  BedDouble,
  ShowerHead,
  Tv,
  Wifi,
  Coffee,
  Mountain,
  Ruler,
  Building,
  Star,
  Phone,
  Droplets,
  Shirt,
  Flashlight,
} from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from '@/components/ui/separator';
import { IMAGE_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Helper to map API data to our Room type
const mapRoomData = (apiRoom: RoomFromApi, roomImages: RoomImage[]): Room => {
  const imagesForThisRoom = roomImages.filter(img => String(img.room_id) === String(apiRoom.id));
  const primaryImage = imagesForThisRoom.find(img => String(img.is_primary) === '1') || imagesForThisRoom[0];
  
  const constructImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    const cleanedPath = imagePath.replace(/\\/g, '/').replace(/^\//, '');
    return `${IMAGE_BASE_URL}${cleanedPath}`;
  };

  const finalImageUrl = primaryImage ? constructImageUrl(primaryImage.image_url) : (apiRoom.room_images ? constructImageUrl(apiRoom.room_images) : '');

  // Handle amenities, checking if it's an array of objects
  const amenities = Array.isArray(apiRoom.amenities) 
    ? apiRoom.amenities.map(a => a.amenity_name)
    : (typeof apiRoom.amenities_id === 'string' ? apiRoom.amenities_id.split(',').map(a => a.trim()) : []);

  const isSuite = apiRoom.descriptive_title.toLowerCase().includes('suite');
  const size = isSuite ? '638' : '432';
  const capacity = 3;

  return {
    ...apiRoom,
    id: String(apiRoom.id),
    name: apiRoom.descriptive_title,
    slug: apiRoom.slug,
    description: apiRoom.short_description,
    longDescription: apiRoom.short_description, 
    pricePerNight: parseFloat(apiRoom.price_per_night),
    imageUrl: finalImageUrl,
    images: imagesForThisRoom.map(img => ({ ...img, image_url: constructImageUrl(img.image_url)})),
    amenities: amenities,
    capacity: capacity,
    beds: '1 King Bed',
    size: `${size} sqft`,
    category: apiRoom.room_type?.type_name as any || 'Standard',
    rating: 4.8, 
  };
};

const amenitiesIcons: { [key: string]: LucideIcon } = {
  'Housekeeping': CheckCircle,
  'Full bathroom amenities': ShowerHead,
  'Water bottles': Droplets,
  'Tea/Coffee making facility': Coffee,
  'Iron & iron board': Shirt,
  'Torch': Flashlight,
  'King-size Bed': BedDouble,
  'Rain Shower': ShowerHead,
  'Smart TV': Tv,
  'High-speed Wi-Fi': Wifi,
  'Coffee Bar': Coffee,
  'Private Balcony': Mountain,
  'Nespresso Machine': Coffee,
  'Air Conditioning': Wifi,
  'Free Wi-Fi': Wifi,
  'Pet Friendly': Bed,
};

export default function RoomDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRoomData = async () => {
      if (!id) {
          setIsLoading(false);
          setError("Room ID not provided.");
          return;
      }
      try {
        setIsLoading(true);
        setError(null);
        
        const apiRoom = await getRoomById(id);
        if (!apiRoom) {
          notFound();
          return;
        }

        const roomImages = await getRoomImagesByRoomId(String(apiRoom.id));
        const mappedRoom = mapRoomData(apiRoom, roomImages);
        setRoom(mappedRoom);
        
        const imagesToShow = mappedRoom.images && mappedRoom.images.length > 0 
            ? mappedRoom.images.map(img => img.image_url) 
            : (mappedRoom.imageUrl ? [mappedRoom.imageUrl] : []);
        setMainImage(imagesToShow[0] || null);

      } catch (err: any) {
        console.error(err);
        if (err.message.includes('404')) {
          notFound();
        } else {
          setError("Failed to load room details. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomData();
  }, [id]);


  if (isLoading) {
    return (
        <div className="container mx-auto md:px-4 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
                <div className="md:col-span-2 space-y-2">
                    <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                    <div className="grid grid-cols-4 gap-2">
                        <Skeleton className="aspect-video w-full rounded-md" />
                        <Skeleton className="aspect-video w-full rounded-md" />
                        <Skeleton className="aspect-video w-full rounded-md" />
                        <Skeleton className="aspect-video w-full rounded-md" />
                    </div>
                </div>
                <div className="space-y-6 mt-6 md:mt-0">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
  }

  if (error) {
    return <div className="container text-center py-20 text-destructive">{error}</div>;
  }
  
  if (!room) {
    return notFound();
  }
  
  const imagesToShow = room.images && room.images.length > 0 
    ? room.images.map(img => img.image_url) 
    : (room.imageUrl ? [room.imageUrl] : []);

  const thumbnails = imagesToShow.slice(0, 4); 

  const floor = '1st';

  return (
    <div className="bg-background md:bg-secondary/10">
        {/* --- Floating Mobile Header --- */}
        <div className="md:hidden sticky top-0 z-40 bg-background/80 backdrop-blur-sm p-3 flex items-center justify-between border-b">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/rooms"><ArrowLeft /></Link>
            </Button>
            <h2 className="font-headline text-lg font-semibold truncate">{room.name}</h2>
            <Button variant="ghost" size="icon"><Heart /></Button>
        </div>
        
      <div className="container mx-auto md:px-4 md:py-12">
          {/* --- Desktop Header --- */}
          <div className="hidden md:block mb-6">
              <Link href="/rooms" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2"/> Back to Rooms
              </Link>
              <h1 className="font-headline text-4xl font-bold">{room.name}</h1>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
            {/* --- Left/Main Column --- */}
            <div className="md:col-span-2">
                {/* --- Image Carousel --- */}
                <div className="relative mb-6">
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg">
                        {mainImage ? (
                          <NextImage
                              src={mainImage}
                              alt={`${room.name} Main Image`}
                              data-ai-hint={`${room.category?.toLowerCase()} room interior detail`}
                              fill
                              className="object-cover"
                              priority
                              unoptimized
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">No Image Available</div>
                        )}
                         <div className="absolute bottom-4 left-4">
                            <Button variant="secondary" className="bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 border-white/20">
                                <Camera className="w-4 h-4 mr-2" /> 360° Tour
                            </Button>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                        {thumbnails.map((img, index) => (
                             <div 
                                key={index} 
                                className={cn("relative aspect-video w-full rounded-md overflow-hidden cursor-pointer border-2 hover:border-primary", mainImage === img ? 'border-primary' : 'border-transparent')}
                                onClick={() => setMainImage(img)}
                             >
                                {img ? (
                                  <NextImage
                                      src={img}
                                      alt={`${room.name} - Thumbnail ${index + 1}`}
                                      data-ai-hint={`${room.category?.toLowerCase()} room interior thumbnail`}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                  />
                                ) : (
                                  <div className="w-full h-full bg-muted"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                 {/* --- Details for Desktop --- */}
                <div className="hidden md:block bg-card p-6 rounded-xl shadow-sm">
                   <Badge variant="outline" className="mb-2 text-sm">{room.category}</Badge>
                    <h1 className="font-headline text-3xl font-bold mb-4">{room.name}</h1>
                    <p className="font-body text-foreground/80 text-base leading-relaxed">{room.longDescription}</p>
                </div>
            </div>

            {/* --- Right/Side Column --- */}
            <div className="md:col-span-1 px-4 md:px-0">
               <div className="md:sticky md:top-24 md:h-fit">
                    {/* --- Details for Mobile --- */}
                    <div className="md:hidden mb-6">
                        <Badge variant="outline" className="mb-2 text-sm">{room.category}</Badge>
                        <h1 className="font-headline text-2xl font-bold mb-3">{room.name}</h1>
                        <p className="font-body text-foreground/80 text-sm leading-relaxed">{room.longDescription}</p>
                    </div>

                    {/* --- Booking Widget --- */}
                    <div className="bg-card p-4 rounded-xl shadow-lg border border-border/50 mb-6">
                         <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className="font-body text-2xl font-bold text-foreground">{room.currency} {room.pricePerNight.toLocaleString()}</span>
                                <span className="text-sm text-muted-foreground">/night</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                <span className="font-semibold">{room.rating}</span>
                                <span className="text-muted-foreground">(127)</span>
                            </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="lg" className="w-full font-body text-base">Book Now</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Contact Reservations</DialogTitle>
                              <DialogDescription>
                                Please call one of our hotline numbers to book your stay.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col space-y-3 pt-4">
                               <Button asChild size="lg" className="font-body text-base">
                                  <a href="tel:+94719107700" className="flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    +94 71 910 7700
                                  </a>
                                </Button>
                               <Button asChild size="lg" className="font-body text-base">
                                  <a href="tel:+94713626200" className="flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    +94 71 362 6200
                                  </a>
                                </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                    </div>

                    {/* --- Amenities Section --- */}
                    <div className="mb-6">
                        <h2 className="font-headline text-xl font-semibold mb-4">Room Amenities</h2>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 font-body text-foreground/90 text-sm">
                            {room.amenities.slice(0, 6).map((amenity) => {
                                const Icon = (amenitiesIcons as any)[amenity] || Bed;
                                return (
                                <div key={amenity} className="flex items-center">
                                    <Icon className="w-5 h-5 mr-2.5 text-primary flex-shrink-0" />
                                    <span>{amenity}</span>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                    <Separator className="my-6"/>

                    {/* --- Room Stats Section --- */}
                     <div className="flex justify-around text-center mb-6">
                        <div className="flex flex-col items-center gap-1">
                            <Ruler className="w-6 h-6 text-primary"/>
                            <span className="text-sm font-semibold">{room.size.replace(' sqft','')}</span>
                            <span className="text-xs text-muted-foreground">sq ft</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Users className="w-6 h-6 text-primary"/>
                            <span className="text-sm font-semibold">{room.capacity}</span>
                            <span className="text-xs text-muted-foreground">max guests</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Building className="w-6 h-6 text-primary"/>
                            <span className="text-sm font-semibold">{floor}</span>
                            <span className="text-xs text-muted-foreground">floor</span>
                        </div>
                    </div>
                    <Separator className="my-6"/>

                    {/* --- Room Layout --- */}
                    {room.roomLayoutImageUrl && (
                    <div className="mb-6">
                        <h2 className="font-headline text-xl font-semibold mb-4">Room Layout</h2>
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-border bg-card p-2 shadow-sm">
                        <NextImage
                            src={room.roomLayoutImageUrl}
                            alt={`${room.name} Layout`}
                            data-ai-hint="floor plan"
                            fill
                            className="object-contain" 
                            unoptimized
                        />
                        </div>
                        <Button variant="link" className="text-primary w-full mt-2">
                             <Eye className="w-4 h-4 mr-2"/>View Full Layout
                        </Button>
                    </div>
                    )}
                    <Separator className="my-6"/>

                    {/* --- Enhance Your Stay --- */}
                    {room.enhanceYourStay && room.enhanceYourStay.length > 0 && (
                    <div className="mb-6">
                        <h2 className="font-headline text-xl font-semibold mb-4">Enhance Your Stay</h2>
                        <div className="flex flex-wrap gap-2">
                        {room.enhanceYourStay.map((perk) => (
                            <Badge key={perk} variant="outline" className="font-normal bg-secondary/50 border-input">
                            {perk}
                            </Badge>
                        ))}
                        </div>
                    </div>
                    )}
                    
                    {/* --- Need More Space? --- */}
                     <div className="mt-6 bg-primary/5 p-4 rounded-lg text-center border border-primary/10">
                        <h3 className="font-headline text-md font-semibold mb-2 text-primary-foreground/90">Need more space?</h3>
                        <p className="text-sm text-muted-foreground mb-3">Upgrade to our Presidential Suite for the ultimate luxury experience.</p>
                        <Button asChild variant="link" className="text-sm text-primary hover:text-primary/80 h-auto p-0">
                            <Link href="/rooms/presidential-villa">View Presidential Suite &rarr;</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
       {/* --- Sticky Mobile Footer --- */}
        <div className="md:hidden sticky bottom-0 z-40 bg-background/90 backdrop-blur-sm p-3 flex items-center justify-between border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <div>
                 <span className="font-body text-xl font-bold text-foreground">{room.currency} {room.pricePerNight.toLocaleString()}</span>
                 <span className="text-sm text-muted-foreground">/night</span>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg" className="font-body text-base w-1/2">Book Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xs">
                    <DialogHeader>
                        <DialogTitle>Contact Reservations</DialogTitle>
                        <DialogDescription>
                        Please call one of our hotline numbers to book your stay.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col space-y-3 pt-4">
                        <Button asChild size="lg" className="font-body text-base">
                            <a href="tel:+94719107700" className="flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                +94 71 910 7700
                            </a>
                        </Button>
                        <Button asChild size="lg" className="font-body text-base">
                            <a href="tel:+94713626200" className="flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                +94 71 362 6200
                            </a>
                        </Button>
                    </div>
                </DialogContent>
             </Dialog>
        </div>
    </div>
  );
}
