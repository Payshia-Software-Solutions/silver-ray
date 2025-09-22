
'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';

import { getWeddingPackageById } from '@/services/api/weddings';
import { premiumWeddingAddons } from '@/data/weddingData';
import type { WeddingPackageFromApi } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import type { BreadcrumbItem } from '@/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Utensils, Flower2, Camera, Music, BedDouble, Sparkles, Users, ClipboardCheck, Disc, Gem, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { WeddingAddonCard } from '@/components/weddings/WeddingAddonCard';
import { IMAGE_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/ui/skeleton';


const mapInclusions = (inclusions: string | null) => {
    if (!inclusions) return [];
    // This is a placeholder. You'll need a more robust way to map inclusion IDs/names to icons.
    return inclusions.split(',').map(inc => ({
        icon: CheckCircle, // Default icon
        text: inc.trim(),
    }));
}

interface IconCardProps {
  icon: LucideIcon;
  label: string;
}

function IconCard({ icon: Icon, label }: IconCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-3 bg-primary/5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Icon className="w-8 h-8 text-primary mb-2" />
      <span className="text-xs font-medium text-foreground/80">{label}</span>
    </div>
  );
}

interface InclusionGroup {
  title: string;
  icon: LucideIcon;
  items: { icon: LucideIcon; text: string }[];
}

export default function WeddingPackageDetailPage() {
  const params = useParams();
  const packageId = params.packageId as string;

  const [pkg, setPkg] = useState<WeddingPackageFromApi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!packageId) return;
    const fetchPackage = async () => {
      try {
        setIsLoading(true);
        const pkgData = await getWeddingPackageById(packageId);
        if (!pkgData) {
          notFound();
          return;
        }
        setPkg(pkgData);
      } catch (err) {
        console.error(err);
        setError('Failed to load wedding package details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackage();
  }, [packageId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Skeleton className="h-8 w-1/2 mb-8" />
        <Skeleton className="h-96 w-full mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container text-center py-20 text-destructive">{error}</div>;
  }

  if (!pkg) {
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Weddings', href: '/weddings' },
    { label: pkg.package_name },
  ];

  const overviewHighlights: IconCardProps[] = [
    { icon: Utensils, label: 'Premium Catering' },
    { icon: Gem, label: 'Luxury Decor' }, // Using Gem for Luxury Decor
    { icon: Camera, label: 'Photography' },
    { icon: Users, label: `${pkg.max_guests} Guests` }, // Updated label
  ];

  const pkgInclusions = mapInclusions(pkg.inclusions);

  // This grouping is a placeholder. You'd need a more robust system.
  const inclusionGroups: InclusionGroup[] = [
    { title: 'Services & Inclusions', icon: CheckCircle, items: pkgInclusions },
  ];

  const filteredInclusionGroups = inclusionGroups.filter(group => group.items.length > 0);
  const heroImage = pkg.weddinng_image && !pkg.weddinng_image.startsWith('http') ? `${IMAGE_BASE_URL}/${pkg.weddinng_image.replace(/\\/g, '/')}` : (pkg.weddinng_image || 'https://placehold.co/1920x700.png');


  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] md:min-h-[450px] flex items-center justify-center text-center text-white overflow-hidden">
        <NextImage
          src={heroImage}
          alt={pkg.package_name}
          data-ai-hint={"wedding venue celebration"}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-6 max-w-4xl">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-3 leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.6)'}}>
            {pkg.package_name}
          </h1>
          <p className="font-body text-lg sm:text-xl text-white/90 mb-8" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
            Your Dream Wedding Begins Here
          </p>
          <Button asChild size="lg" className="font-body text-lg px-8 py-3 bg-primary/90 hover:bg-primary text-primary-foreground transform hover:scale-105 transition-transform duration-300 rounded-md">
            <Link href={`/contact?subject=Wedding Package Inquiry: ${pkg.package_name}`}>Book Your Wedding Package</Link>
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Overview Section */}
        <section className="mb-12 md:mb-16 bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
            <div className="text-center md:text-left">
              <h2 className="font-headline text-3xl font-bold text-primary mb-2">{pkg.package_name}</h2>
              {pkg.price && (
                <div className="inline-block relative">
                    <p className="font-body text-lg text-muted-foreground mb-3">
                      Starting from <span className="font-semibold text-foreground">LKR {parseFloat(pkg.price).toLocaleString()}</span>
                    </p>
                </div>
              )}
              <p className="font-body text-foreground/80 leading-relaxed max-w-xl mx-auto md:mx-0 mb-6">
                {pkg.short_description}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {overviewHighlights.map(highlight => (
                <IconCard key={highlight.label} icon={highlight.icon} label={highlight.label} />
              ))}
            </div>
        </section>

        {/* What's Included Section */}
        {filteredInclusionGroups.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-12">
              What&apos;s Included
            </h2>
            {/* Mobile Accordion View */}
            <div className="md:hidden space-y-3">
              {filteredInclusionGroups.map(group => (
                <Accordion key={group.title} type="single" collapsible className="w-full bg-card rounded-xl shadow-md border px-4">
                    <AccordionItem value={group.title} className="border-b-0">
                        <AccordionTrigger className="hover:no-underline font-semibold text-foreground/80 py-4">
                          <div className="flex items-center gap-3">
                              <group.icon className="w-5 h-5 text-primary" />
                              <span>{group.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-0 pb-4">
                           <ul className="space-y-2.5 font-body text-sm text-muted-foreground pl-8">
                            {group.items.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2.5 mt-0.5 flex-shrink-0" />
                                <span>{item.text}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
              ))}
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredInclusionGroups.map((group) => (
                <Card key={group.title} className="bg-card rounded-xl shadow-lg flex flex-col">
                  <CardHeader className="pb-3 pt-5 px-5">
                    <div className="flex items-center">
                      <group.icon className="w-6 h-6 text-primary mr-3" />
                      <CardTitle className="font-headline text-xl text-foreground/90">{group.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 flex-grow">
                    <ul className="space-y-2.5 font-body text-sm text-muted-foreground">
                      {group.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2.5 mt-0.5 flex-shrink-0" />
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Premium Add-ons Section */}
        {premiumWeddingAddons.length > 0 && (
          <section className="mb-12 md:mb-16 py-12 md:bg-secondary/10 rounded-xl">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-12 md:text-primary">
              Premium Add-ons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 md:px-6">
              {premiumWeddingAddons.map((addon) => (
                <WeddingAddonCard key={addon.id} addon={addon} packageName={pkg.package_name} />
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-16 md:mt-24 text-center py-12 bg-primary/10 rounded-xl">
            <h3 className="font-headline text-2xl sm:text-3xl font-bold mb-4 text-primary">
              Ready to Plan Your Perfect Day?
            </h3>
            <p className="font-body text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact our wedding specialists to customize this package or to get more details.
            </p>
            <Button asChild size="lg" className="font-body text-lg px-10 py-3">
                <Link href={`/contact?subject=Inquiry about ${pkg.package_name}`}>Inquire Now</Link>
            </Button>
        </section>
      </div>
    </div>
  );
}

    