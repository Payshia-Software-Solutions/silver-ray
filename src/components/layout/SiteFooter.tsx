
"use client";

import Link from 'next/link';
import NextImage from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, HelpCircle, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

// Inline SVG for Pinterest icon
const PinterestIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 1.5c-5.88 0-10.5 4.62-10.5 10.5 0 4.2 2.51 7.85 6.05 9.53.05-.37.08-.97.03-1.41-.06-.27-.38-1.62-.38-1.62s-.1-.4-.1-.98c0-.92.54-1.61 1.21-1.61.57 0 .84.42.84.93 0 .56-.36 1.4-.55 2.18-.15.61.31 1.11.91 1.11 1.1 0 1.93-1.16 1.93-2.85 0-1.53-.95-2.59-2.78-2.59-1.91 0-3.03 1.43-3.03 3.11 0 .37.12.77.27 1.02.03.05.06.1.06.16 0 .12-.04.23-.07.34-.03.08-.05.15-.08.22-.08.21-.18.39-.18.39s-.29 1.21-.36 1.49c-.16.68-.11 1.48-.11 1.48s-.58 2.42-.85 3.22c-.08.24-.01.5.2.65.22.16.5.13.7-.09.03-.03 1.29-1.26 1.72-2.3.2-.5.39-.97.39-.97s.23-.95.33-1.29c.27-.86.97-1.76 1.78-2.51.32-.3.7-.61 1.07-.9.46-.36.9-.7 1.3-.99.5-.36.98-.68 1.43-.94.48-.28.93-.52 1.34-.7.4-.18.77-.31 1.1-.39.7-.16 1.31-.22 1.82-.22 1.61 0 2.96.62 2.96 2.21 0 1.11-.56 2.29-1.43 2.94-.31.23-.63.47-.96.71-.21.15-.42.3-.63.46-.23.17-.46.34-.68.51-.15.12-.29.23-.43.35-.65.55-1.04 1.26-1.16 2.06-.07.46.09.91.19 1.33.44.09.9.15 1.37.15 4.46 0 8.27-3.28 8.27-8.27C22.5 6.12 17.88 1.5 12 1.5z" />
  </svg>
);

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms & Suites' },
  { href: '/dining', label: 'Dining' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/events', label: 'Meetings & Events' },
  { href: '/booking', label: 'Book a Stay' },
];

const mobileQuickLinks = [
    { href: '/', label: 'Home' },
    { href: '#', label: 'Video' },
    { href: '/events', label: 'Events' },
    { href: '/experiences', label: 'Experiences' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
];

const informationLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/cancellation-policy', label: 'Cancellation Policy' },
  { href: '/careers', label: 'Careers' },
  { href: '/faq', label: 'FAQs' },
  { href: '/sitemap', label: 'Site Map' },
];

const socialLinks = [
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Youtube, label: 'YouTube' },
  { href: '#', icon: PinterestIcon, label: 'Pinterest' },
];

const FooterLinkColumn = ({ title, links }: { title: string, links: { href: string, label: string }[] }) => {
  return (
    <div>
      <h3 className="font-headline text-xl font-semibold text-slate-100 mb-4">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


const DesktopFooter = () => (
    <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
            {/* Column 1: Hotel Info */}
            <div className="space-y-4 md:col-span-2 lg:col-span-1">
                <h2 className="font-headline text-3xl font-bold text-slate-100">Grand Silver Ray</h2>
                <p className="text-sm">
                A timeless sanctuary on the Sri Lankan coast.
                </p>
                <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    <span>+94 11 234 5678</span>
                </li>
                <li className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    <a href="mailto:info@grandsilverray.com" className="hover:text-primary transition-colors">info@grandsilverray.com</a>
                </li>
                <li className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 text-primary mt-1 flex-shrink-0" />
                    <span>123, Galle Road, Colombo 3, Sri Lanka</span>
                </li>
                </ul>
                <div className="pt-4">
                <h3 className="font-headline text-lg font-semibold text-slate-100 mb-3">Stay Connected</h3>
                <div className="flex space-x-3">
                    {socialLinks.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="text-slate-400 hover:text-primary transition-colors"
                    >
                        <social.icon size={20} />
                    </a>
                    ))}
                </div>
                </div>
            </div>
            
            {/* Columns 2 & 3: Links */}
            <div className="md:col-span-2 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                <FooterLinkColumn title="Quick Links" links={quickLinks} />
                <FooterLinkColumn title="Information" links={informationLinks} />
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-4">
                <div className="mb-4 hidden lg:block">
                <NextImage
                    src="https://content-provider.payshia.com/silver-ray/gallery-images/1/logopng-68dd3a98e6243.png"
                    alt="Grand Silver Ray Logo"
                    data-ai-hint="hotel logo monogram"
                    width={120}
                    height={80}
                    className="opacity-80" 
                />
                </div>
                <div>
                <label htmlFor="newsletter-email-desktop" className="block text-sm font-medium mb-1.5 text-slate-100">
                    Enter your email for updates
                </label>
                <form className="flex space-x-2">
                    <Input
                    type="email"
                    id="newsletter-email-desktop"
                    placeholder="your.email@example.com"
                    className="bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500 text-sm h-10 rounded-full"
                    aria-label="Email for newsletter"
                    />
                    <Button type="submit" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 text-sm shrink-0 rounded-full">
                    Subscribe
                    </Button>
                </form>
                </div>
                <p className="text-xs italic pt-2 hidden md:block">
                Where elegance meets ocean breeze—creating treasured memories for generations.
                </p>
            </div>
        </div>
         <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Grand Silver Ray. All Rights Reserved.
            </p>
        </div>
    </div>
);


const MobileFooter = () => (
  <div className="block md:hidden">
    <div className="flex flex-col items-center text-center py-10 px-4">
      <NextImage
        src="https://content-provider.payshia.com/silver-ray/gallery-images/1/logopng-68dd3a98e6243.png"
        alt="Grand Silver Ray Logo"
        data-ai-hint="hotel logo monogram"
        width={150}
        height={100}
        className="mb-4"
      />
      <h2 className="font-headline text-2xl font-semibold text-slate-100 mb-4 border-b-2 border-primary pb-2">
        Grand Silver Ray
      </h2>
      <div className="text-sm text-slate-300 space-y-1 mb-6">
        <p>123 Oceanfront Avenue, Silver Bay</p>
        <a href="mailto:reservations@grandsilverray.com" className="hover:text-primary transition-colors">reservations@grandsilverray.com</a>
        <p>+1 (555) 123-4567</p>
      </div>
      <div className="flex space-x-6 mb-8">
        {socialLinks.map((social) => (
          <a key={social.label} href={social.href} aria-label={social.label} className="text-slate-400 hover:text-primary transition-colors">
            <social.icon size={24} />
          </a>
        ))}
      </div>
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 font-body text-slate-300">
        {mobileQuickLinks.map(link => (
            <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
        ))}
      </nav>
       <Accordion type="single" collapsible className="w-full mb-8">
        <AccordionItem value="quick-links" className="border-b border-slate-700">
          <AccordionTrigger className="font-headline text-xl font-semibold text-slate-100 hover:no-underline py-3">
            Quick Links
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <ul className="space-y-2 text-base">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="information" className="border-b border-slate-700">
           <AccordionTrigger className="font-headline text-xl font-semibold text-slate-100 hover:no-underline py-3">
            Information
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <ul className="space-y-2 text-base">
              {informationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <form className="flex flex-col sm:flex-row items-center w-full max-w-sm gap-2 mb-8">
        <Input
          type="email"
          id="newsletter-email-mobile"
          placeholder="Subscribe to newsletter"
          className="bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500 h-12 text-center w-full rounded-full"
          aria-label="Email for newsletter"
        />
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full sm:w-auto px-6 rounded-full">
          Subscribe
        </Button>
      </form>
      <p className="text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Grand Silver Ray. All rights reserved.
      </p>
    </div>
    </div>
);


export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="bg-slate-800 py-3"> 
        {/* Optional: Top Accent Bar */}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:py-16">
        <DesktopFooter />
        <MobileFooter />
      </div>
      <div className="bg-sky-200 py-2 text-center text-sm">
        <span className="text-slate-600">Powered by </span>
        <a href="https://payshia.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-800 hover:underline">
          Payshia Software Solutions
        </a>
      </div>
    </footer>
  );
}
