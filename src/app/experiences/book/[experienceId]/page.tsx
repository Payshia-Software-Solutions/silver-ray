
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import NextImage from 'next/image';
import Link from 'next/link';

import { allExperienceDetails, getExperienceDetailById } from '@/data/experienceDetailsData';
import type { ExperienceDetail, BreadcrumbItem } from '@/types';

import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ExperienceBookingForm } from '@/components/experiences/booking/ExperienceBookingForm';
import { Button } from '@/components/ui/button'; // For potential use

type Props = {
  params: { experienceId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const experience = getExperienceDetailById(params.experienceId);

  if (!experience) {
    return {
      title: 'Experience Not Found | Grand Silver Ray',
    };
  }

  return {
    title: `${experience.pageTitle} | Grand Silver Ray`,
    description: `Book the "${experience.overviewTitle.replace(' - Overview', '')}" experience at Grand Silver Ray. ${experience.overviewContent.substring(0, 160)}...`,
    openGraph: {
      images: [experience.heroImageUrl],
    },
  };
}

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
  const experience = getExperienceDetailById(params.experienceId);

  if (!experience) {
    notFound();
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

export async function generateStaticParams() {
  return allExperienceDetails.map((exp) => ({
    experienceId: exp.id,
  }));
}

    