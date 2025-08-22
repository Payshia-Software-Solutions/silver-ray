
import type { Metadata } from 'next';
import { DiningHero } from '@/components/dining/DiningHero';
import { VenueCard, type VenueProps } from '@/components/dining/VenueCard';
import { DishCard, type DishProps } from '@/components/dining/DishCard';
import { ReservationSection } from '@/components/dining/ReservationSection';
import { InfoBar } from '@/components/dining/InfoBar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


export const metadata: Metadata = {
  title: 'Culinary Experiences',
  description: 'Discover unforgettable flavors and exquisite settings at Grand Silver Ray Hotel. Explore our celebrated restaurants and bars.',
};

const diningVenues: VenueProps[] = [
  {
    id: 'main-restaurant',
    name: 'Main Restaurant',
    description: 'Elegant dining crafted to symphony taste buds.',
    imageUrl: 'https://images.unsplash.com/photo-1743793055663-5aee4edc16d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fHx8MTc0OTE0NTA4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'elegant restaurant interior',
    viewMoreLink: '/dining/menu/main-restaurant',
  },
  {
    id: 'cafe-101',
    name: 'Cafe 101',
    description: 'Authentic, traditional dishes in a relaxed atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1742427605886-18fc2eb3ef71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGFtYmlhbmNlfGVufDB8fHx8MTc0OTE0NTA4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'cozy cafe ambiance',
    viewMoreLink: '/dining/menu/cafe-101',
  },
  {
    id: 'indian-restaurant',
    name: 'Indian Restaurant',
    description: 'Traditional Indian flavors brought to life.',
    imageUrl: 'https://images.unsplash.com/photo-1620268835770-1e9c62832a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxpbmRpYW4lMjBjdWlzaW5lJTIwcHJlc2VudGF0aW9ufGVufDB8fHx8MTc0OTE0NTA4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'indian cuisine presentation',
    viewMoreLink: '/dining/menu/indian-restaurant',
  },
];

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
    imageUrl: 'https://images.unsplash.com/photo-1625937329368-9c6e55f665ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyaWJleWUlMjBzdGVhayUyMG1lYWx8ZW58MHx8fHwxNzQ5MTQ1MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel className="w-full max-w-sm mx-auto">
              <CarouselContent className="-ml-4">
                {diningVenues.map((venue) => (
                  <CarouselItem key={venue.id} className="pl-4">
                    <div className="p-1 h-full">
                      <VenueCard {...venue} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-50px] bg-background/70 hover:bg-background/90 text-foreground" />
              <CarouselNext className="absolute right-[-50px] bg-background/70 hover:bg-background/90 text-foreground" />
            </Carousel>
          </div>
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel className="w-full max-w-sm mx-auto">
              <CarouselContent className="-ml-4">
                {signatureDishes.map((dish) => (
                  <CarouselItem key={dish.id} className="pl-4">
                    <div className="p-1 h-full">
                      <DishCard {...dish} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-50px] bg-background/70 hover:bg-background/90 text-foreground" />
              <CarouselNext className="absolute right-[-50px] bg-background/70 hover:bg-background/90 text-foreground" />
            </Carousel>
          </div>
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
