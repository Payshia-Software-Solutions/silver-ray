
'use client';

import { useState, useEffect } from 'react';
import { DiningHero } from '@/components/dining/DiningHero';
import { VenueCard } from '@/components/dining/VenueCard';
import { DishCard, type DishProps } from '@/components/dining/DishCard';
import { ReservationSection } from '@/components/dining/ReservationSection';
import { InfoBar } from '@/components/dining/InfoBar';
import type { RestaurantFromApi } from '@/types';
import { getRestaurants } from '@/services/api/dining';
import { Skeleton } from '@/components/ui/skeleton';

const signatureDishes: DishProps[] = [
  {
    id: 'seared-salmon',
    name: 'Seared Salmon with Lemon Beurre Blanc',
    description: 'Perfectly cooked salmon, market vegetables, and a silky lemon butter sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1627662234966-bd65a4e21363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzZWFyZWQlMjBzYWxtb24lMjBkaXNoJTIwZ291cm1ldHxlbnwwfHx8fDE3NDkxNDUxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'seared salmon dish gourmet',
  },
  {
    id: 'molten-lava-cake',
    name: 'Molten Chocolate Lava Cake',
    description: 'Rich chocolate cake with a warm, gooey center, garnished with gold leaf and fresh berries.',
    imageUrl: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjaG9jb2xhdGUlMjBsYXZhJTIwY2FrZSUyMGRlc3NlcnR8ZW58MHx8fHwxNzQ5MTQ1MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'chocolate lava cake dessert',
  },
  {
    id: 'prime-ribeye',
    name: 'Prime Ribeye with Truffle Mash',
    description: 'Juicy ribeye steak, truffle-infused mashed potatoes, and seasonal vegetables.',
    imageUrl: 'https://images.unsplash.com/photo-1625937329368-9c6e55f665ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyaWJleWUlMjBzdGVhayUyMG1lYWx8ZW58MHx8fHwxNzQ5MTQ1MTY0fDA&ixlib.rb-4.1.0&q=80&w=1080',
    imageHint: 'ribeye steak meal',
  },
];

export default function DiningPage() {
  const [diningVenues, setDiningVenues] = useState<RestaurantFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiningData = async () => {
      try {
        setIsLoading(true);
        const restaurantsData = await getRestaurants();
        // Ensure the data is always an array before setting state
        const venues = Array.isArray(restaurantsData) ? restaurantsData : [restaurantsData];
        setDiningVenues(venues);
      } catch (err: any) {
        console.error("Failed to fetch dining venues:", err);
        setError("Failed to load dining venues. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiningData();
  }, []);
  
  const renderVenues = () => {
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
    if (!diningVenues || diningVenues.length === 0) {
        return <p className="col-span-full text-center text-muted-foreground">No dining venues found.</p>;
    }
    return diningVenues.map((venue, index) => (
      <VenueCard key={`${venue.id}-${index}`} venue={venue} />
    ));
  }

  return (
    <div className="bg-background">
      <DiningHero />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Our Dining Venues</h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              From lavish buffets to rooftop cocktails, each venue offers a unique ambiance and culinary experience to delight every palate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderVenues()}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-3">Chef's Signature Dishes</h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
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
