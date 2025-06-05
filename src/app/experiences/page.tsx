
import type { Metadata } from 'next';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Coffee, Droplets, Sailboat } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Experiences',
  description: 'Discover unique experiences at Grand Silver Ray. Spa, wellness, activities, and local tours.',
};

const experiences = [
  {
    title: "Rejuvenating Spa",
    description: "Indulge in our world-class spa treatments, designed to relax your body and mind. From massages to facials, find your bliss.",
    icon: Droplets,
    imageHint: "spa wellness",
    link: "/contact?subject=Spa+Booking"
  },
  {
    title: "Gourmet Cooking Class",
    description: "Learn the secrets of local cuisine with our expert chefs. A hands-on experience perfect for food lovers.",
    icon: Coffee,
    imageHint: "cooking class",
    link: "/contact?subject=Cooking+Class+Inquiry"
  },
  {
    title: "Private Yacht Excursions",
    description: "Explore the stunning coastline on a private yacht. Enjoy breathtaking views, snorkeling, and a gourmet picnic.",
    icon: Sailboat,
    imageHint: "yacht sea",
    link: "/contact?subject=Yacht+Excursion"
  },
   {
    title: "Wellness Retreats",
    description: "Join our curated wellness retreats focusing on yoga, meditation, and holistic health to rejuvenate your spirit.",
    icon: Zap,
    imageHint: "yoga meditation",
    link: "/contact?subject=Wellness+Retreat"
  }
];

export default function ExperiencesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
          Unforgettable Experiences
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          At Grand Silver Ray, we offer a curated selection of activities and experiences to make your stay truly exceptional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {experiences.map((exp, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="p-0 relative h-60">
              <NextImage
                src={`https://placehold.co/600x350.png`}
                alt={exp.title}
                data-ai-hint={exp.imageHint}
                fill
                className="object-cover"
              />
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-grow">
              <div className="flex items-center mb-3">
                <exp.icon className="w-7 h-7 text-primary mr-3" />
                <CardTitle className="font-headline text-2xl">{exp.title}</CardTitle>
              </div>
              <p className="font-body text-muted-foreground text-sm mb-6 flex-grow">
                {exp.description}
              </p>
              <Button asChild className="mt-auto w-full sm:w-auto">
                <Link href={exp.link}>Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-16">
          <p className="font-body text-lg text-muted-foreground">Our concierge is available to help you plan your perfect itinerary.</p>
           <Button asChild variant="link" className="text-primary">
             <Link href="/contact">Contact Concierge</Link>
           </Button>
      </div>
    </div>
  );
}
