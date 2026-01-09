
"use client";

import Link from 'next/link';
import NextImage from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, HelpCircle, Youtube, Rss } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

// Inline SVG for TikTok icon
const TikTokIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.08.97.78 1.81 1.73 1.99.78.15 1.55-.15 2.15-.66.56-.47 1-1.15 1.11-1.84.1-1.61.01-3.21.02-4.82z" />
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
  { href: 'https://www.instagram.com/grand_silver_ray/', icon: Instagram, label: 'Instagram' },
  { href: 'https://www.facebook.com/Silverraylk', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.youtube.com/@GrandSilverRayOfficial', icon: Youtube, label: 'YouTube' },
  { href: 'https://www.tiktok.com/@grand_silver_ray', icon: TikTokIcon, label: 'TikTok' },
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
                    <div>
                      <a href="tel:+94719107700" className="hover:text-primary transition-colors block">+94 71 910 7700</a>
                      <a href="tel:+94713626200" className="hover:text-primary transition-colors block">+94 71 362 6200</a>
                    </div>
                </li>
                <li className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    <a href="mailto:reservation@silverray.lk" className="hover:text-primary transition-colors">reservation@silverray.lk</a>
                </li>
                <li className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 text-primary mt-1 flex-shrink-0" />
                    <span>Lellopitiya Dipitigala, Ratnapura, Sri Lanka.</span>
                </li>
                </ul>

                <div className="pt-4">
                  <h3 className="font-headline text-lg font-semibold text-slate-100 mb-2">Outlet Contacts</h3>
                   <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                        <span className="w-16">Curry pot:</span>
                        <a href="tel:0712770770" className="hover:text-primary transition-colors">0712770770</a>
                    </li>
                    <li className="flex items-center">
                        <span className="w-16">Cafe 111:</span>
                        <a href="tel:0717113111" className="hover:text-primary transition-colors">0717113111</a>
                    </li>
                    <li className="flex items-center">
                        <span className="w-16">Main rest:</span>
                        <a href="tel:0714040100" className="hover:text-primary transition-colors">0714040100</a>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                <h3 className="font-headline text-lg font-semibold text-slate-100 mb-3">Stay Connected</h3>
                <div className="flex space-x-3">
                    {socialLinks.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="text-slate-400 hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
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
         <div className="border-t border-slate-700 pt-8 text-sm flex flex-col md:flex-row justify-between items-center text-center">
            <p className="mb-2 md:mb-0">
                © 2026 Grand Silver Ray. All Rights Reserved.
            </p>
            <p>
                <span className="text-slate-400">Powered by </span>
                <a href="https://payshia.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-300 hover:text-primary hover:underline">
                Payshia Software Solutions PVT LTD
                </a>
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
        <p>Lellopitiya Dipitigala, Ratnapura, Sri Lanka.</p>
        <a href="mailto:reservation@silverray.lk" className="hover:text-primary transition-colors">reservation@silverray.lk</a>
        <p>+94 71 910 7700 / +94 71 362 6200</p>
         <div className="pt-4 text-left">
            <h3 className="font-headline text-base font-semibold text-slate-100 mb-2 text-center">Outlet Contacts</h3>
             <ul className="space-y-1 text-sm">
              <li className="flex items-center justify-center">
                  <span className="w-24 text-right mr-2">Curry pot:</span>
                  <a href="tel:0712770770" className="hover:text-primary transition-colors">0712770770</a>
              </li>
              <li className="flex items-center justify-center">
                  <span className="w-24 text-right mr-2">Cafe 111:</span>
                  <a href="tel:0717113111" className="hover:text-primary transition-colors">0717113111</a>
              </li>
              <li className="flex items-center justify-center">
                  <span className="w-24 text-right mr-2">Main restaurant:</span>
                  <a href="tel:0714040100" className="hover:text-primary transition-colors">0714040100</a>
              </li>
            </ul>
          </div>
      </div>
      <div className="flex space-x-6 mb-8">
        {socialLinks.map((social) => (
          <a 
            key={social.label} 
            href={social.href} 
            aria-label={social.label} 
            className="text-slate-400 hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
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
        <div className="text-xs text-slate-500 space-y-2">
            <p>&copy; 2026 Grand Silver Ray. All rights reserved.</p>
            <p>
                <span className="text-slate-500">Powered by </span>
                <a href="https://payshia.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-400 hover:underline hover:text-primary">
                Payshia Software Solutions PVT LTD
                </a>
            </p>
        </div>
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
    </footer>
  );
}
