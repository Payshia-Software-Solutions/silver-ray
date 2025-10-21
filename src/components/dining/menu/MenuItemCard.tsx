
import NextImage from 'next/image';
import type { MenuItemType, DietaryIndicator } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Flame, Vegan, WheatOff, Shell } from 'lucide-react'; // Added more icons

interface MenuItemCardProps {
  item: MenuItemType;
  className?: string;
}

const dietaryIconMapping = {
  vegetarian: Leaf,
  vegan: Vegan,
  'gluten-free': WheatOff,
  spicy: Flame,
  nuts: Shell, // Example for nuts
};

function DietaryIcon({ indicator }: { indicator: DietaryIndicator }) {
  const IconComponent = dietaryIconMapping[indicator.type];
  if (!IconComponent) return null;

  return (
    <div
      className={`w-5 h-5 rounded-full flex items-center justify-center ${indicator.color} mr-1.5`}
      title={indicator.label}
    >
      <IconComponent className="w-3 h-3 text-white" />
    </div>
  );
}

export function MenuItemCard({ item, className }: MenuItemCardProps) {
  return (
    <Card className={`overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row h-full rounded-xl bg-card ${item.isChefSpecial ? 'border-2 border-primary/70' : 'border-border'}`}>
      <div className="relative w-full sm:w-1/3 md:w-1/4 aspect-[4/3] sm:aspect-square flex-shrink-0">
        <NextImage
          src={item.imageUrl}
          alt={`Image of ${item.name}`}
          data-ai-hint={item.imageHint}
          fill
          className="object-cover"
          unoptimized
        />
        {item.isChefSpecial && (
          <Badge variant="default" className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs">
            Chef's Special
          </Badge>
        )}
      </div>
      <CardContent className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-headline text-lg sm:text-xl font-semibold mb-1">{item.name}</h3>
          <p className="font-body text-sm text-muted-foreground mb-2 line-clamp-2 sm:line-clamp-3">
            {item.description}
          </p>
        </div>
        <div className="mt-auto">
          {item.dietaryIndicators && item.dietaryIndicators.length > 0 && (
            <div className="flex items-center mb-2">
              {item.dietaryIndicators.map((indicator) => (
                <DietaryIcon key={indicator.type} indicator={indicator} />
              ))}
            </div>
          )}
          <p className="font-body text-base sm:text-lg font-semibold text-primary">{item.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}
