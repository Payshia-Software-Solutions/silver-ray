
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { WeddingAddon } from '@/data/weddingData';

interface WeddingAddonCardProps {
  addon: WeddingAddon;
  packageName: string;
}

export function WeddingAddonCard({ addon, packageName }: WeddingAddonCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card text-left p-4">
      <CardHeader className="pt-2 pb-2 px-2 items-start">
        <CardTitle className="font-headline text-lg font-semibold text-foreground/90">{addon.name}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-2 flex flex-col flex-grow w-full">
        <p className="font-body text-sm text-muted-foreground mb-2 line-clamp-2 flex-grow">
          {addon.description}
        </p>
        <p className="font-body text-base font-medium text-foreground mb-3">
          +{addon.price}
        </p>
        <Button
          asChild
          size="sm"
          variant="default"
          className="w-full mt-auto bg-primary/90 text-primary-foreground h-10 text-sm"
        >
          <Link href={`/contact?subject=Inquiry about ${packageName} with Add-on: ${addon.name}`}>
            Add to Package
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
