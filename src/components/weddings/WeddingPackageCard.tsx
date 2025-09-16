
import NextImage from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { WeddingPackage } from '@/types';
import { CheckCircle } from 'lucide-react'; // Using CheckCircle as a generic icon for inclusions
import { IMAGE_BASE_URL } from '@/lib/config';

interface WeddingPackageCardProps {
  packageItem: WeddingPackage;
}

export function WeddingPackageCard({ packageItem }: WeddingPackageCardProps) {
  const finalImageUrl = `${IMAGE_BASE_URL}${packageItem.iconImageUrl}`;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card text-center items-center">
      <CardHeader className="pt-6 pb-3 items-center">
        {packageItem.iconImageUrl ? (
          <div className="relative w-20 h-20 mb-3 rounded-full overflow-hidden border-2 border-primary/30 flex items-center justify-center bg-secondary/50">
            <NextImage
              src={finalImageUrl}
              alt={`${packageItem.name} icon`}
              data-ai-hint={packageItem.imageHint}
              width={80}
              height={80}
              className="object-contain p-2"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-20 h-20 mb-3 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
            <packageItem.icon className="w-10 h-10 text-primary" />
          </div>
        )}
        <CardTitle className="font-headline text-lg">{packageItem.name}</CardTitle>
        {packageItem.price && (
          <CardDescription className="font-body text-sm text-muted-foreground">
            Starting from LKR {parseFloat(packageItem.price).toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="px-5 pb-5 flex flex-col flex-grow w-full">
        {packageItem.inclusions && packageItem.inclusions.length > 0 ? (
          <ul className="font-body text-xs text-muted-foreground space-y-1.5 mb-4 text-left flex-grow">
            {packageItem.inclusions.slice(0, 4).map((inclusion, index) => ( // Show max 4 inclusions
              <li key={index} className="flex items-start">
                <inclusion.icon className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0 mt-0.5" />
                <span>{inclusion.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-body text-xs text-muted-foreground mb-4 text-left flex-grow">{packageItem.shortDescription}</p>
        )}
        <Button asChild className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-sm py-2 h-auto">
          <Link href={`/weddings/packages/${packageItem.id}`}>View Full Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
