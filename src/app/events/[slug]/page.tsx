

'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getEventBySlug, getEventImagesByEventId } from '@/services/api/events';
import type { EventFromApi, EventImage, BreadcrumbItem } from '@/types';
import { IMAGE_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Tag, Users, Ticket, Info, Edit } from 'lucide-react';
import Link from 'next/link';

interface EventDetail {
    id: string;
    name: string;
    description: string;
    heroImageUrl: string;
    heroImageHint: string;
    galleryImages: { src: string; alt: string; hint: string }[];
    details: { icon: React.ElementType; label: string; value: string | React.ReactNode }[];
}

function EventHero({ title, imageUrl, imageHint }: { title: string, imageUrl: string, imageHint: string }) {
  return (
    <section className="relative h-[50vh] min-h-[350px] md:h-[60vh] lg:h-[400px] flex items-center justify-center text-center text-white">
      <NextImage
        src={imageUrl}
        alt={title}
        data-ai-hint={imageHint}
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-6 max-w-4xl">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.7)'}}>
          {title}
        </h1>
      </div>
    </section>
  );
}

function EventContentLayout({ event }: { event: EventDetail }) {
  return (
    <div className="bg-card p-6 sm:p-8 rounded-xl shadow-xl">
      <h2 className="font-headline text-2xl text-primary font-semibold mb-4">About The Event</h2>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.description }} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 my-8 font-body text-sm">
        {event.details.map((detail, index) => (
          <div key={index} className="flex items-start">
            <detail.icon className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground/90 text-base">{detail.label}</p>
              <div className="text-muted-foreground">{detail.value}</div>
            </div>
          </div>
        ))}
      </div>

      {event.galleryImages && event.galleryImages.length > 0 && (
        <div>
          <h3 className="font-headline text-xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {event.galleryImages.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md group">
                <NextImage
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.hint}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [apiEvent, setApiEvent] = useState<EventFromApi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchEventData = async () => {
      try {
        setIsLoading(true);
        const apiEventData = await getEventBySlug(slug);

        if (!apiEventData) {
          notFound();
          return;
        }

        setApiEvent(apiEventData);

        const imageContentProviderBaseUrl = 'https://content-provider.gotickets.lk';
        const heroImageUrl = `${imageContentProviderBaseUrl}${apiEventData.imageUrl}`;

        const mappedEvent: EventDetail = {
            id: String(apiEventData.id),
            name: apiEventData.name,
            description: apiEventData.description,
            heroImageUrl: heroImageUrl,
            heroImageHint: apiEventData.name,
            galleryImages: [], // The new API does not seem to provide a gallery per event
            details: [
                { icon: Calendar, label: 'Date', value: new Date(apiEventData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) },
                { icon: MapPin, label: 'Venue', value: apiEventData.venueName },
                { icon: Tag, label: 'Category', value: <Badge variant="outline" className="text-sm">{apiEventData.category}</Badge> },
            ]
        };

        setEvent(mappedEvent);

      } catch (err) {
        console.error(err);
        if (err instanceof Error && err.message.includes('404')) {
            notFound();
        } else {
            setError("Failed to load event details.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Skeleton className="h-8 w-1/3 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-2 space-y-6">
                  <Skeleton className="h-[400px] w-full" />
                  <Skeleton className="h-64 w-full" />
              </div>
              <div className="lg:sticky lg:top-24 h-fit">
                  <Skeleton className="h-[300px] w-full" />
              </div>
          </div>
      </div>
    );
  }

  if (error) {
    return <div className="container text-center py-20 text-destructive">{error}</div>;
  }
  
  if (!event || !apiEvent) {
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: event.name },
  ];

  return (
    <div className="bg-background">
      <EventHero title={event.name} imageUrl={event.heroImageUrl} imageHint={event.heroImageHint} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2">
            <EventContentLayout event={event} />
          </div>
          <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <div className="bg-card p-6 sm:p-8 rounded-xl shadow-2xl border">
              <h2 className="font-headline text-2xl font-semibold mb-6">Book Your Tickets</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">
                Secure your spot for this event. Tickets are available through our official partner.
              </p>
                {apiEvent.accept_booking === "1" ? (
                    <Button asChild size="lg" className="w-full">
                        <a href={`https://gotickets.silverray.lk/events/${slug}`} target="_blank" rel="noopener noreferrer">
                        Book on GoTickets.lk
                        </a>
                    </Button>
                ) : (
                    <Button size="lg" className="w-full" disabled>
                        Sold Out
                    </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
