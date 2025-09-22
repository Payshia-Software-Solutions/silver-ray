
'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getExperienceById } from '@/services/api/experiences';
import type { ExperienceDetail, ExperienceFromApi, BreadcrumbItem } from '@/types';

import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ExperienceBookingForm } from '@/components/experiences/booking/ExperienceBookingForm';
import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin, ListChecks } from 'lucide-react';
import { IMAGE_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/ui/skeleton';


type Props = {
  params: { experienceId: string };
};

const mapApiToExperienceDetail = (apiData: ExperienceFromApi): ExperienceDetail => {
    const heroImageUrl = apiData.experience_image ? `${IMAGE_BASE_URL}${apiData.experience_image}` : 'https://placehold.co/1920x500.png';
    return {
        id: String(apiData.id),
        pageTitle: `Book: ${apiData.name}`,
        heroImageUrl: heroImageUrl,
        heroImageHint: 'experience event',
        overviewTitle: `${apiData.name} - Overview`,
        overviewContent: apiData.detailed_description,
        highlightsContent: apiData.schedule_note,
        details: [
            { icon: Clock, label: 'Duration', value: apiData.duration },
            { icon: Users, label: 'Participants', value: `${apiData.min_participants} - ${apiData.max_participants}` },
            { icon: ListChecks, label: 'Inclusions', value: apiData.advance_booking_required ? 'Advance Booking' : 'Walk-ins Welcome' },
            { icon: MapPin, label: 'Meeting Point', value: apiData.meeting_Point },
        ],
        galleryImages: [], // This would need another API call or to be included in the main one
        defaultAdults: apiData.min_participants,
        pricePerAdult: parseFloat(apiData.Price),
    };
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
        unoptimized
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
      
      <h3 className="font-headline text-xl font-semibold mb-3">Highlights</h3>
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


export default function ExperienceBookingPage({ params }: Props) {
  const [experience, setExperience] = useState<ExperienceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
        try {
            setIsLoading(true);
            const apiExperience = await getExperienceById(params.experienceId);
            if (!apiExperience) {
                notFound();
                return;
            }
            const mappedExperience = mapApiToExperienceDetail(apiExperience);
            setExperience(mappedExperience);
        } catch (err) {
            console.error(err);
            setError("Failed to load experience details.");
        } finally {
            setIsLoading(false);
        }
    };
    fetchExperience();
  }, [params.experienceId]);


  if (isLoading) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <Skeleton className="h-8 w-1/3 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-[400px] w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
                <div className="lg:sticky lg:top-24 h-fit">
                    <Skeleton className="h-[500px] w-full" />
                </div>
            </div>
        </div>
    );
  }

  if (error) {
    return <div className="container text-center py-20 text-destructive">{error}</div>;
  }
  
  if (!experience) {
    return null;
  }

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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2">
            <ExperienceContentLayout experience={experience} />
          </div>
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card p-6 sm:p-8 rounded-xl shadow-2xl">
              <h2 className="font-headline text-2xl font-semibold mb-1 text-center">Book Your Experience</h2>
              <p className="font-body text-sm text-muted-foreground mb-6 text-center">
                Please fill out the form below to confirm your booking. Our team will contact you shortly.
              </p>
              <ExperienceBookingForm experienceId={experience.id} defaultAdults={experience.defaultAdults} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
