

'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';

import type { ExperienceDetail, BreadcrumbItem } from '@/types';

import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ExperienceBookingForm } from '@/components/experiences/booking/ExperienceBookingForm';
import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin, ListChecks, CalendarDays, XCircle, ShoppingBag, Gem, Info } from 'lucide-react';
import { IMAGE_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/ui/skeleton';

const sapphireTrailsExperience: ExperienceDetail = {
    id: 'sapphire-trails',
    pageTitle: 'Book Your Sapphire Trails Expedition',
    heroImageUrl: 'https://images.unsplash.com/photo-1599933570115-731a65a63952?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heroImageHint: 'rough blue sapphire gems',
    overviewTitle: 'Sapphire Trails Expedition - Overview',
    overviewContent: 'Journey into the heart of Sabaragamuwa, the legendary land of gems. This exclusive tour takes you to a traditional gem mine where you can witness the entire process of unearthing Ceylon’s world-renowned blue sapphires. Learn about the rich history, geology, and unique mining techniques from local experts and artisans.',
    highlightsContent: 'This is more than just a tour; it’s an immersive cultural and geological adventure into the sparkling underworld of Sri Lankan gems. You will get a chance to see the mining pits, watch miners at work, and understand how rough stones are identified and sorted.',
    details: [
        { icon: Clock, label: 'Duration', value: '4 Hours (approx.)' },
        { icon: CalendarDays, label: 'Availability', value: 'Daily (Morning & Afternoon)' },
        { icon: Users, label: 'Participants', value: 'Minimum 2, Maximum 8' },
        { icon: Gem, label: 'Focus', value: 'Blue Sapphires & Gemology' },
        { icon: ListChecks, label: 'Inclusions', value: 'Guided mine tour, Safety briefing, Refreshments, Transportation' },
        { icon: XCircle, label: 'Exclusions', value: 'Gem purchases, Personal expenses' },
        { icon: ShoppingBag, label: 'What to Bring', value: 'Sturdy shoes, Camera, Sunscreen' },
        { icon: MapPin, label: 'Meeting Point', value: 'Hotel Lobby' },
    ],
    galleryImages: [
        { src: 'https://images.unsplash.com/photo-1617063491873-1c71a3962b1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Blue sapphire held in tweezers', hint: 'blue sapphire gem' },
        { src: 'https://images.unsplash.com/photo-1593121104037-c88a825a073f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Gem mining pit in Sri Lanka', hint: 'gem mining pit' },
        { src: 'https://images.unsplash.com/photo-1605151241169-95995d33a6c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Sorting rough gemstones', hint: 'sorting rough gems' },
    ],
    defaultAdults: 2,
    pricePerAdult: 5000,
};

function ExperienceBookingHero({ title, imageUrl, imageHint }: { title: string, imageUrl: string, imageHint: string }) {
  return (
    <section className="relative h-[50vh] min-h-[350px] md:h-[60vh] lg:h-[400px] flex items-center justify-center text-center text-white">
      <NextImage
        src={imageUrl}
        alt={title}
        data-ai-hint={imageHint}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-6 max-w-4xl">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.6)'}}>
          {title}
        </h1>
      </div>
    </section>
  );
}

function ExperienceContentLayout({ experience }: { experience: ExperienceDetail }) {
  return (
    <div className="bg-card p-6 sm:p-8 rounded-xl shadow-xl">
      <h2 className="font-headline text-2xl text-primary font-semibold mb-4">{experience.overviewTitle}</h2>
      <p className="font-body text-foreground/80 mb-6">{experience.overviewContent}</p>
      
      <p className="font-body text-foreground/80 mb-8">{experience.highlightsContent}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8 font-body text-sm">
        {experience.details.map((detail, index) => (
          <div key={index} className="flex items-start">
            <detail.icon className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-foreground/90">{detail.label}:</span>{' '}
              <span className="text-muted-foreground">{detail.value}</span>
            </div>
          </div>
        ))}
      </div>

      {experience.galleryImages && experience.galleryImages.length > 0 && (
        <div>
          <h3 className="font-headline text-xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {experience.galleryImages.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md group">
                <NextImage
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.hint}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


export default function SapphireTrailsPage() {
  const experience = sapphireTrailsExperience;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Experiences', href: '/experiences' },
    { label: experience.overviewTitle.replace(' - Overview', ''), href: `/experiences/book/${experience.id}` },
    { label: 'Book Now' },
  ];

  return (
    <div className="bg-background">
      <ExperienceBookingHero title={experience.pageTitle} imageUrl={experience.heroImageUrl} imageHint={experience.heroImageHint} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-3">
            <ExperienceContentLayout experience={experience} />
          </div>
          <div className="lg:col-span-2 lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-card p-6 sm:p-8 rounded-xl shadow-2xl">
              <h2 className="font-headline text-2xl font-semibold mb-1">Book Your Experience</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">
                Please fill out the form below to confirm your booking. Our team will contact you shortly.
              </p>
              <ExperienceBookingForm experienceId={experience.id} defaultAdults={experience.defaultAdults} />
            </div>
            <div className="bg-blue-50 border border-blue-200 text-blue-900 p-6 rounded-xl shadow-lg">
                <h3 className="font-headline text-xl font-semibold mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-600"/>
                    More Information
                </h3>
                <p className="font-body text-sm text-blue-800/90 mb-4">
                    For more in-depth details about the gem mining history, processes, and the cultural significance of sapphires in Sri Lanka, visit the official Sapphire Trails website.
                </p>
                <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <a href="https://sapphiretrails.lk" target="_blank" rel="noopener noreferrer">
                        Visit sapphiretrails.lk
                    </a>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
