
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ApplicationForm } from './ApplicationForm';

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

interface CareersPageClientProps {
  jobTitles: string[];
}

export function CareersPageClient({ jobTitles }: CareersPageClientProps) {
  const searchParams = useSearchParams();
  const positionFromQuery = searchParams.get('position');

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

  useEffect(() => {
    const handleApplyNow = (event: Event) => {
        const customEvent = event as CustomEvent;
        const jobTitle = customEvent.detail.jobTitle;
        if (jobTitle) {
            form.setValue('position', jobTitle);
        }
    };

    window.addEventListener('applyNow', handleApplyNow);

    return () => {
        window.removeEventListener('applyNow', handleApplyNow);
    };
  }, [form]);

  return <ApplicationForm form={form} jobTitles={jobTitles} />;
}
