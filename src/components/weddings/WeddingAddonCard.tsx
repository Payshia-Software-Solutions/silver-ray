
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
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card text-center items-center p-4">
      <CardHeader className="pt-4 pb-2 items-center">
        <div className="w-12 h-12 mb-3 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
          <addon.icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="font-headline text-md font-semibold text-foreground/90">{addon.name}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-4 flex flex-col flex-grow w-full items-center">
        <p className="font-body text-xs text-muted-foreground mb-2 line-clamp-2 flex-grow">
          {addon.description}
        </p>
        <p className="font-body text-sm font-medium text-primary mb-3">
          {addon.price}
        </p>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="w-full mt-auto border-primary text-primary hover:bg-primary/10 text-xs h-8"
        >
          <Link href={`/contact?subject=Inquiry about ${packageName} with Add-on: ${addon.name}`}>
            Add to Package
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
