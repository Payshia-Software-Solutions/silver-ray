
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import NextImage from 'next/image';
import { ApplicationForm } from './ApplicationForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Briefcase, MapPin } from 'lucide-react';
import { AnimatedInView } from '@/components/shared/AnimatedInView';

const applicationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  position: z.string().min(1, "Please select a position."),
  cv: z.instanceof(File).refine(file => file.size > 0, "CV is required.")
        .refine(file => file.size <= 5 * 1024 * 1024, "CV must be less than 5MB.")
        .refine(file => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type), "Only .pdf and .doc/docx files are allowed."),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

interface JobOpening {
    id: string;
    title: string;
    description: string;
}

interface CareersPageClientProps {
  jobOpenings: JobOpening[];
}

export function CareersPageClient({ jobOpenings }: CareersPageClientProps) {
  const searchParams = useSearchParams();
  const positionFromQuery = searchParams.get('position');
  const formRef = useRef<HTMLDivElement>(null);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      position: positionFromQuery || "",
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (positionFromQuery) {
      form.setValue('position', positionFromQuery);
    }
  }, [positionFromQuery, form]);

  const handleApplyClick = (title: string) => {
    form.setValue('position', title);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  const jobTitles = jobOpenings.map(j => j.title);

  return (
    <>
      <section className="relative h-[50vh] min-h-[300px] md:h-[60vh] lg:h-[350px] flex items-center justify-center text-center text-white">
        <NextImage
          src="https://content-provider.payshia.com/silver-ray/other/careers-694939b72a089-optimized.webp"
          alt="Grand Silver Ray Hotel staff"
          data-ai-hint="hotel staff group photo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-6 max-w-3xl">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-3 leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.6)'}}>
            Join Our Team
          </h1>
          <p className="font-body text-lg sm:text-xl max-w-xl mx-auto" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
            Become a part of the Grand Silver Ray family and start your journey in the world of luxury hospitality.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="lg:grid lg:grid-cols-1 lg:gap-12 lg:items-start">
            <div id="job-openings">
              <h2 className="font-headline text-3xl font-bold mb-8 text-center">Current Openings</h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                {jobOpenings.map((job, index) => (
                  <AnimatedInView key={job.id} delay={index * 0.1}>
                      <Card className="shadow-lg hover:shadow-xl transition-shadow">
                          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex-1 mb-4 sm:mb-0">
                                  <h3 className="font-headline text-xl font-semibold text-primary">{job.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-1 mb-3">{job.description}</p>
                                  <div className="flex items-center text-xs text-muted-foreground gap-x-4">
                                      <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> Ratnapura, Sri Lanka</span>
                                      <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1" /> Full-time</span>
                                  </div>
                              </div>
                              <Button onClick={() => handleApplyClick(job.title)} className="w-full sm:w-auto shrink-0">
                                  Apply Now
                              </Button>
                          </CardContent>
                      </Card>
                  </AnimatedInView>
                ))}
              </div>
            </div>

            <div className="mt-16 lg:mt-24" ref={formRef}>
              <Card className="shadow-xl max-w-3xl mx-auto">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                      <FileText className="w-7 h-7 text-primary"/>
                      <CardTitle className="font-headline text-2xl">Submit Your Application</CardTitle>
                  </div>
                  <CardDescription>
                    Don't see a role for you? Send us your resume for future opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationForm form={form} jobTitles={jobTitles} />
                </CardContent>
              </Card>
            </div>
        </div>
      </div>
    </>
  );
}
