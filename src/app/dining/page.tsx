
import type { Metadata } from 'next';
import { DiningHero } from '@/components/dining/DiningHero';
import { VenueCard, type VenueProps } from '@/components/dining/VenueCard';
import { DishCard, type DishProps } from '@/components/dining/DishCard';
import { ReservationSection } from '@/components/dining/ReservationSection';
import { InfoBar } from '@/components/dining/InfoBar';

export const metadata: Metadata = {
  title: 'Culinary Experiences',
  description: 'Discover unforgettable flavors and exquisite settings at Grand Silver Ray Hotel. Explore our celebrated restaurants and bars.',
};

const diningVenues: VenueProps[] = [
  {
    id: 'main-restaurant',
    name: 'Main Restaurant',
    description: 'Elegant dining crafted to symphony taste buds.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'elegant restaurant interior',
    viewMoreLink: '/contact?subject=Inquiry+Main+Restaurant',
  },
  {
    id: 'cafe-101',
    name: 'Cafe 101',
    description: 'Authentic, traditional dishes in a relaxed atmosphere.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cozy cafe ambiance',
    viewMoreLink: '/contact?subject=Inquiry+Cafe+101',
  },
  {
    id: 'indian-restaurant',
    name: 'Indian Restaurant',
    description: 'Traditional Indian flavors brought to life.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'indian cuisine presentation',
    viewMoreLink: '/contact?subject=Inquiry+Indian+Restaurant',
  },
];

const signatureDishes: DishProps[] = [
  {
    id: 'seared-salmon',
    name: 'Seared Salmon with Lemon Beurre Blanc',
    description: 'Perfectly cooked salmon, market vegetables, and a silky lemon butter sauce.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'seared salmon dish gourmet',
  },
  {
    id: 'molten-lava-cake',
    name: 'Molten Chocolate Lava Cake',
    description: 'Rich chocolate cake with a warm, gooey center, garnished with gold leaf and fresh berries.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'chocolate lava cake dessert',
  },
  {
    id: 'prime-ribeye',
    name: 'Prime Ribeye with Truffle Mash',
    description: 'Juicy ribeye steak, truffle-infused mashed potatoes, and seasonal vegetables.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'ribeye steak meal',
  },
];

export default function DiningPage() {
  return (
    <div className="bg-background">
      <DiningHero />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Our Dining Venues</h2>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
              From lavish buffets to rooftop cocktails, each venue offers a unique ambiance and culinary experiences to delight every palate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diningVenues.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Chef's Signature Dishes</h2>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
              Indulge in our chef's most celebrated creations and seasonal specialties, crafted with passion and the finest ingredients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureDishes.map((dish) => (
              <DishCard key={dish.id} {...dish} />
            ))}
          </div>
        </div>
      </section>
      
      <ReservationSection />
      <InfoBar />
    </div>
  );
}
