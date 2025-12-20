
'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedInView } from '../shared/AnimatedInView';
import { ArrowRight } from 'lucide-react';

const weddingImages = [
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6722.jpg',
    alt: 'Elegant wedding reception table setup with flowers',
    hint: 'wedding table flowers',
    className: 'col-span-2 md:col-span-2 row-span-2',
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6752.jpg',
    alt: 'Outdoor wedding ceremony arch with floral decorations',
    hint: 'wedding ceremony arch',
    className: 'col-span-1 md:col-span-1 row-span-1',
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6750.jpg',
    alt: 'Bride and groom walking down the aisle',
    hint: 'bride groom aisle',
    className: 'col-span-1 md:col-span-1 row-span-1',
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6718.jpg',
    alt: 'Beautifully decorated wedding cake',
    hint: 'wedding cake flowers',
    className: 'col-span-1 md:col-span-1 row-span-1',
  },
  {
    src: 'https://content-provider.payshia.com/silver-ray/other/IMG_6716.jpg',
    alt: 'Close-up of a wedding bouquet',
    hint: 'wedding bouquet flowers',
    className: 'col-span-1 md:col-span-1 row-span-1',
  },
];

export function WeddingHighlightsSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <AnimatedInView>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-4">
                Your Dream Wedding, Perfectly Crafted
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6">
                From intimate ceremonies to grand celebrations, our venues and dedicated team ensure every detail is flawless. Let us bring your vision to life and create a day you'll cherish forever.
              </p>
              <Button asChild size="lg" className="font-body text-lg group">
                <Link href="/weddings">
                  Explore Wedding Packages
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </AnimatedInView>
          </div>
          <div className="order-1 lg:order-2">
            <AnimatedInView delay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 max-h-[500px]">
                {weddingImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-xl shadow-lg group ${image.className}`}
                  >
                    <NextImage
                      src={image.src}
                      alt={image.alt}
                      data-ai-hint={image.hint}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </AnimatedInView>
          </div>
        </div>
      </div>
    </section>
  );
}
