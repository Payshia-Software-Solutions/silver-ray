
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Website sitemap for Grand Silver Ray.',
};

interface SitemapSectionProps {
  title: string;
  links: { href: string; label: string }[];
}

const SitemapSection = ({ title, links }: SitemapSectionProps) => (
  <div>
    <h2 className="font-headline text-2xl font-semibold mb-4 text-primary">{title}</h2>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href} className="flex items-center">
          <ChevronRight className="w-4 h-4 mr-2 text-muted-foreground" />
          <Link href={link.href} className="font-body text-foreground hover:text-primary hover:underline transition-colors">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function SitemapPage() {
  const mainPages = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms & Suites' },
    { href: '/dining', label: 'Dining' },
    { href: '/experiences', label: 'Experiences' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const bookingsAndEvents = [
    { href: '/booking', label: 'Book a Stay' },
    { href: '/weddings', label: 'Weddings' },
    { href: '/events', label: 'Meetings & Events' },
  ];
  
  const legalPages = [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms & Conditions' },
      { href: '/cancellation-policy', label: 'Cancellation Policy' },
      { href: '/careers', label: 'Careers' },
      { href: '/faq', label: 'FAQs' },
  ];

  const otherLinks = [
      { href: '/sitemap', label: 'Sitemap' },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">Site Map</h1>
            <p className="font-body text-lg text-muted-foreground">
                Find your way around our website with this overview of all our pages.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <SitemapSection title="Main Pages" links={mainPages} />
            <SitemapSection title="Bookings & Events" links={bookingsAndEvents} />
            <div>
              <SitemapSection title="Information" links={legalPages} />
              <div className="mt-8">
                 <SitemapSection title="Other" links={otherLinks} />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
