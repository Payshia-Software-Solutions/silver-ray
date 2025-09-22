
'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { WeddingPackageFromApi, WeddingImage } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { getWeddingImagesByPackageId } from '@/services/api/weddings';
import { Gift } from 'lucide-react';
import { IMAGE_BASE_URL } from '@/lib/config';

interface WeddingPackageCardProps {
  packageItem: WeddingPackageFromApi;
}

export function WeddingPackageCard({ packageItem }: WeddingPackageCardProps) {
  const { id, package_name, price, short_description } = packageItem;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageHint, setImageHint] = useState<string>('wedding package icon');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (!id) {
        setIsLoading(false);
        setImageUrl(null);
        return;
      }
      try {
        setIsLoading(true);
        const images: WeddingImage[] = await getWeddingImagesByPackageId(String(id));
        const primaryImage = images.find(img => String(img.is_primary) === "1") || images[0];
        
        if (primaryImage && primaryImage.image_url) {
          const finalUrl = primaryImage.image_url.startsWith('http')
            ? primaryImage.image_url
            : `${IMAGE_BASE_URL}${primaryImage.image_url.replace(/\\/g, '/').replace(/^\//, '')}`;
          setImageUrl(finalUrl);
          setImageHint(primaryImage.alt_text || 'wedding package icon');
        } else {
          setImageUrl(null);
        }
      } catch (error) {
        console.error(`Failed to fetch image for wedding package ${id}:`, error);
        setImageUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-xl bg-card text-center items-center">
      <CardHeader className="pt-6 pb-3 items-center">
        <div className="relative w-20 h-20 mb-3 rounded-full overflow-hidden border-2 border-primary/30 flex items-center justify-center bg-secondary/50">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : imageUrl ? (
            <NextImage
              src={imageUrl}
              alt={`${package_name} icon`}
              data-ai-hint={imageHint}
              width={80}
              height={80}
              className="object-contain p-2"
              unoptimized
            />
          ) : (
            <Gift className="w-10 h-10 text-primary" />
          )}
        </div>
        <CardTitle className="font-headline text-lg">{package_name}</CardTitle>
        {price && (
          <CardDescription className="font-body text-sm text-muted-foreground">
            Starting from LKR {parseFloat(price).toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="px-5 pb-5 flex flex-col flex-grow w-full">
        <p className="font-body text-xs text-muted-foreground mb-4 text-left flex-grow line-clamp-4">
          {short_description}
        </p>
        <Button asChild className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-sm py-2 h-auto">
          <Link href={`/weddings/packages/${id}`}>View Full Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
