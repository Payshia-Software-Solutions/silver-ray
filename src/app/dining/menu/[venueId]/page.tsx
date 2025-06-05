
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getMenuByVenueId, AllRestaurantMenus } from '@/data/menuData';
import type { RestaurantMenuType, BreadcrumbItem } from '@/types';

import { MenuHero } from '@/components/dining/menu/MenuHero';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { MenuCategoryNavigation } from '@/components/dining/menu/MenuCategoryNavigation';
import { MenuSection } from '@/components/dining/menu/MenuSection';

type Props = {
  params: { venueId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const menu = getMenuByVenueId(params.venueId);

  if (!menu) {
    return {
      title: 'Menu Not Found | Grand Silver Ray',
    };
  }

  return {
    title: `${menu.venueName} Menu | Grand Silver Ray`,
    description: `Explore the delicious offerings at ${menu.venueName}, Grand Silver Ray. ${menu.venueDescription || ''}`,
    openGraph: {
      images: [menu.heroImageUrl],
    },
  };
}

export default function RestaurantMenuPage({ params }: Props) {
  const menuData = getMenuByVenueId(params.venueId);

  if (!menuData) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Dining', href: '/dining' },
    { label: `${menuData.venueName} Menu` },
  ];

  const chefSpecialsCategory = menuData.categories.find(cat => cat.id === 'chef-specials');
  const regularCategories = menuData.categories.filter(cat => cat.id !== 'chef-specials');


  return (
    <div className="bg-secondary/10">
      <MenuHero 
        venueName={menuData.venueName}
        venueDescription={menuData.venueDescription}
        heroImageUrl={menuData.heroImageUrl}
        heroImageHint={menuData.heroImageHint}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      
      <MenuCategoryNavigation categories={menuData.categories} />

      <main className="bg-background">
        {regularCategories.map((category) => (
          <MenuSection key={category.id} category={category} />
        ))}
        {chefSpecialsCategory && (
           <MenuSection key={chefSpecialsCategory.id} category={chefSpecialsCategory} isChefSpecialsSection={true} />
        )}
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return AllRestaurantMenus.map((menu) => ({
    venueId: menu.venueId,
  }));
}
