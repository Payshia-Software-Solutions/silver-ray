
import type { Metadata } from 'next';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Host your perfect event at Grand Silver Ray. Weddings, conferences, and special occasions.',
};

export default function EventsPage() {
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

      <div className="bg-card p-8 rounded-xl shadow-xl mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <NextImage 
              src="https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxiYWxscm9vbSUyMGV2ZW50fGVufDB8fHx8MTc0OTE0NTI0Nnww&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Elegant ballroom setup for an event" 
              data-ai-hint="ballroom event"
              width={600} 
              height={400} 
              className="rounded-lg shadow-md object-cover w-full h-auto"
            />
          </div>
          <div className="font-body">
            <h2 className="font-headline text-3xl font-semibold mb-4">Weddings & Celebrations</h2>
            <p className="text-muted-foreground mb-3">
              Create timeless memories with a breathtaking wedding at Grand Silver Ray. Our stunning venues, exquisite catering, and personalized service will make your special day truly unforgettable.
            </p>
            <p className="text-muted-foreground mb-6">
              We also cater to anniversaries, birthdays, and other milestone celebrations.
            </p>
            <Button asChild>
              <Link href="/contact?subject=Wedding+Inquiry">Inquire About Weddings</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card p-8 rounded-xl shadow-xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
           <div className="font-body md:order-2">
            <h2 className="font-headline text-3xl font-semibold mb-4">Meetings & Conferences</h2>
            <p className="text-muted-foreground mb-3">
              Host successful corporate events in our state-of-the-art meeting rooms and conference facilities. Equipped with the latest technology and supported by our professional event planners.
            </p>
            <ul className="text-muted-foreground mb-6 space-y-1">
                <li className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-primary"/>Multiple venue sizes</li>
                <li className="flex items-center"><CalendarDays className="w-4 h-4 mr-2 text-primary"/>Flexible booking options</li>
            </ul>
            <Button asChild>
               <Link href="/contact?subject=Conference+Inquiry">Plan Your Meeting</Link>
            </Button>
          </div>
          <div className="md:order-1">
             <NextImage 
              src="https://images.unsplash.com/flagged/photo-1576485436509-a7d286952b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjb25mZXJlbmNlJTIwcm9vbXxlbnwwfHx8fDE3NDkxNDUyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Modern conference room" 
              data-ai-hint="conference room"
              width={600} 
              height={400} 
              className="rounded-lg shadow-md object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
       <div className="text-center mt-16">
          <p className="font-body text-lg text-muted-foreground">Contact our events team to discuss your specific needs and start planning your perfect event.</p>
      </div>
    </div>
  );
}
