
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Building, Sparkles, Utensils, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the team at Grand Silver Ray. Explore career opportunities with us.',
};

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  icon: React.ElementType;
}

const jobOpenings: JobOpening[] = [
  {
    id: 'front-desk-manager',
    title: 'Front Desk Manager',
    department: 'Guest Services',
    location: 'Ratnapura',
    type: 'Full-time',
    icon: Users,
  },
  {
    id: 'executive-chef',
    title: 'Executive Chef',
    department: 'Culinary',
    location: 'Ratnapura',
    type: 'Full-time',
    icon: Utensils,
  },
  {
    id: 'marketing-specialist',
    title: 'Marketing Specialist',
    department: 'Sales & Marketing',
    location: 'Ratnapura',
    type: 'Full-time',
    icon: Sparkles,
  },
  {
    id: 'housekeeping-supervisor',
    title: 'Housekeeping Supervisor',
    department: 'Operations',
    location: 'Ratnapura',
    type: 'Full-time',
    icon: Building,
  },
];

const JobCard = ({ job }: { job: JobOpening }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-headline text-xl mb-2">{job.title}</CardTitle>
            <CardDescription className="flex items-center text-sm text-muted-foreground mb-4">
                <Briefcase className="w-4 h-4 mr-2" /> {job.department}
                <span className="mx-2">|</span>
                <MapPin className="w-4 h-4 mr-2" /> {job.location}
            </CardDescription>
          </div>
           <job.icon className="w-8 h-8 text-primary/70 hidden sm:block" />
        </div>
      
        <div className="flex items-center justify-between">
            <Badge variant="outline">{job.type}</Badge>
            <Button asChild variant="link" className="p-0 h-auto">
                <Link href={`/contact?subject=Application for ${job.title}`}>Apply Now</Link>
            </Button>
        </div>
    </CardContent>
  </Card>
);

export default function CareersPage() {
  return (
    <div className="bg-secondary/20">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
          Join Our Team
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Become a part of the Grand Silver Ray family and help us create unforgettable experiences for our guests.
        </p>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-24">
        <div className="max-w-4xl mx-auto">
            <div className="bg-card p-8 sm:p-10 rounded-xl shadow-xl mb-12">
                 <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-4 text-center text-primary">
                    Why Work With Us?
                </h2>
                <p className="font-body text-center text-muted-foreground mb-8">
                    At Grand Silver Ray, we believe our team is our greatest asset. We are committed to fostering a supportive, inclusive, and dynamic work environment where every member can thrive.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Competitive Benefits</h3>
                        <p className="text-sm text-muted-foreground">We offer a comprehensive benefits package, including health insurance, retirement plans, and paid time off.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Career Growth</h3>
                        <p className="text-sm text-muted-foreground">We are dedicated to your professional development with training programs and opportunities for advancement.</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg mb-1">Vibrant Culture</h3>
                        <p className="text-sm text-muted-foreground">Join a team that values collaboration, respect, and a passion for excellence in hospitality.</p>
                    </div>
                </div>
            </div>

          <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-8 text-center">
            Current Openings
          </h2>

          <div className="space-y-6">
            {jobOpenings.length > 0 ? (
              jobOpenings.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-center text-muted-foreground">
                There are no open positions at this time. Please check back later.
              </p>
            )}
          </div>

          <div className="mt-12 text-center bg-card p-8 rounded-xl shadow-lg border">
            <h3 className="font-headline text-xl font-semibold mb-2">Don't see a role for you?</h3>
            <p className="text-muted-foreground mb-4">
              We are always looking for talented individuals. Send us your resume and we'll keep it on file for future opportunities.
            </p>
            <Button asChild>
                <Link href="/contact?subject=General Career Inquiry">Submit Your Resume</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
