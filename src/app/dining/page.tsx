import type { Metadata } from 'next';
import { DiningHero } from '@/components/dining/DiningHero';
import { VenueCard } from '@/components/dining/VenueCard';
import { DishCard, type DishProps } from '@/components/dining/DishCard';
import { ReservationSection } from '@/components/dining/ReservationSection';
import type { RestaurantFromApi } from '@/types';
import { getRestaurants } from '@/services/api/dining';
import { AnimatedInView } from '@/components/shared/AnimatedInView';

export const metadata: Metadata = {
  title: 'Dining at Grand Silver Ray',
  description: 'Explore a world of culinary delights at Grand Silver Ray. From lavish buffets to rooftop cocktails, discover unique dining experiences in Ratnapura.',
  openGraph: {
    title: 'Exquisite Dining Experiences | Grand Silver Ray',
    description: 'Discover the unforgettable flavors and exquisite settings of our celebrated restaurants and bars.',
    images: ['https://content-provider.payshia.com/silver-ray/gallery-images/1/dining8-68dd3625346e6.jpg'],
  },
};

const signatureDishes: DishProps[] = [
  {
    id: 'indian-food',
    name: 'Indian Cuisine',
    description: 'Aromatic spices and rich flavors define our authentic Indian dishes, from creamy curries to tandoori specialties.',
    imageUrl: 'https://content-provider.payshia.com/silver-ray/other/Indian.jpg',
    imageHint: 'assortment of indian dishes',
  },
  {
    id: 'thai-food',
    name: 'Thai Cuisine',
    description: 'Experience the perfect balance of sweet, sour, spicy, and salty with our traditional Thai food.',
    imageUrl: 'https://content-provider.payshia.com/silver-ray/other/Thai.jpg',
    imageHint: 'thai food platter',
  },
  {
    id: 'cakes',
    name: 'Decadent Cakes',
    description: 'Indulge in our selection of beautifully crafted cakes, perfect for any celebration or a sweet treat.',
    imageUrl: 'https://content-provider.payshia.com/silver-ray/other/Cake.jpg',
    imageHint: 'decorated chocolate cake',
  },
];

export default async function DiningPage() {
  let diningVenues: RestaurantFromApi[] = [];
  let error: string | null = null;

  try {
    const restaurantsData = await getRestaurants();
    diningVenues = Array.isArray(restaurantsData) ? restaurantsData : [restaurantsData];
  } catch (err: any) {
    console.error("Failed to fetch dining venues:", err);
    error = "Failed to load dining venues. Please try again later.";
  }
  
  const renderVenues = () => {
    if (error) {
      return <p className="col-span-full text-center text-destructive">{error}</p>;
    }
    if (!diningVenues || diningVenues.length === 0) {
        return <p className="col-span-full text-center text-muted-foreground">No dining venues found.</p>;
    }
    return diningVenues.map((venue, index) => (
      <AnimatedInView key={`${venue.id}-${index}`} delay={index * 0.1}>
        <VenueCard venue={venue} />
      </AnimatedInView>
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
            {signatureDishes.map((dish, index) => (
              <AnimatedInView key={dish.id} delay={index * 0.1}>
                <DishCard {...dish} />
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>
      
      
    </div>
  );
}
