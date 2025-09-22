
'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getEvents } from '@/services/api/events';
import type { EventFromApi, EventImage } from '@/types';
import { EventCard, type EventCardProps } from '@/components/events/EventCard';
import { IMAGE_BASE_URL } from '@/lib/config';


export default function EventsPage() {
    const [events, setEvents] = useState<EventFromApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                const eventsData = await getEvents();
                setEvents(eventsData);
            } catch(err: any) {
                console.error("Failed to fetch events:", err);
                setError("Failed to load events. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return [...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl shadow-lg animate-pulse">
                    <div className="aspect-[4/3] bg-muted rounded-t-xl"></div>
                    <div className="p-6 space-y-3">
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                </div>
            ));
        }

        if (error) {
            return <p className="col-span-full text-center text-destructive">{error}</p>;
        }
        
        if (events.length === 0) {
            return <p className="col-span-full text-center text-muted-foreground">No upcoming events found.</p>
        }

        return events.map((event) => (
            <EventCard key={event.id} event={event} />
        ));
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center mb-12">
                <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
                Events at Grand Silver Ray
                </h1>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                From grand celebrations to intimate gatherings, our versatile event spaces and dedicated team ensure a memorable occasion.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {renderContent()}
            </div>

            <div className="text-center mt-16">
                <p className="font-body text-lg text-muted-foreground mb-4">
                    Interested in hosting your own event with us?
                </p>
                <Button asChild>
                    <Link href="/contact?subject=Event+Inquiry">Plan Your Event</Link>
                </Button>
            </div>
        </div>
    );
}
