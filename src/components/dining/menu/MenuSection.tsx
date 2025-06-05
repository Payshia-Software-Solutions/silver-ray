
import type { MenuCategoryType } from '@/types';
import { MenuItemCard } from './MenuItemCard';

interface MenuSectionProps {
  category: MenuCategoryType;
  isChefSpecialsSection?: boolean;
}

export function MenuSection({ category, isChefSpecialsSection = false }: MenuSectionProps) {
  if (!category || category.items.length === 0) return null;

  return (
    <section id={`category-${category.id}`} className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`font-headline text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 ${isChefSpecialsSection ? 'text-primary' : 'text-foreground'}`}>
          {isChefSpecialsSection && <span className="text-yellow-500 mr-2">★</span>}
          {category.name}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {category.items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
