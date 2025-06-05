
import type { Metadata } from 'next';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dining',
  description: 'Explore culinary delights at Grand Silver Ray. Exquisite dining options await you.',
};

export default function DiningPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
          Dining at Grand Silver Ray
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our exquisite restaurants and bars, offering a range of culinary experiences designed to delight your senses.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <NextImage 
            src="https://placehold.co/600x400.png" 
            alt="Elegant dining room" 
            data-ai-hint="restaurant interior" 
            width={600} 
            height={400} 
            className="rounded-lg shadow-xl object-cover w-full h-auto"
          />
        </div>
        <div className="font-body">
          <h2 className="font-headline text-3xl font-semibold mb-4">The Signature Restaurant</h2>
          <p className="text-muted-foreground mb-3">
            Indulge in a world-class fine dining experience at The Signature Restaurant. Our chefs craft innovative dishes using the freshest local ingredients, paired with an extensive wine list.
          </p>
          <p className="text-muted-foreground mb-6">
            Open daily for dinner. Reservations highly recommended.
          </p>
          <Button asChild>
            <Link href="/contact?subject=Dining+Reservation">Make a Reservation</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="font-body md:order-2">
          <h2 className="font-headline text-3xl font-semibold mb-4">The Terrace Cafe</h2>
          <p className="text-muted-foreground mb-3">
            Enjoy casual all-day dining at The Terrace Cafe. With stunning views and a relaxed atmosphere, it's the perfect spot for breakfast, lunch, or a light snack.
          </p>
          <p className="text-muted-foreground mb-6">
            Open daily from morning till evening. Walk-ins welcome.
          </p>
           <Button variant="outline">View Menu</Button>
        </div>
        <div className="md:order-1">
           <NextImage 
            src="https://placehold.co/600x400.png" 
            alt="Sunny terrace cafe" 
            data-ai-hint="cafe terrace" 
            width={600} 
            height={400} 
            className="rounded-lg shadow-xl object-cover w-full h-auto"
          />
        </div>
      </div>
       <div className="text-center mt-16">
          <p className="font-body text-lg text-muted-foreground">More dining options coming soon. Stay tuned!</p>
      </div>
    </div>
  );
}
