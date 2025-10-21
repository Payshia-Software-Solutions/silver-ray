
"use client";

import Link from 'next/link';
import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/rooms', label: 'Rooms' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/dining', label: 'Dining' },
  { href: '/events', label: 'Events' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <NextImage
            src="https://content-provider.payshia.com/silver-ray/gallery-images/1/logopng-68dd3a98e6243.png"
            alt="Grand Silver Ray Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="font-headline text-3xl font-bold text-foreground">Grand Silver Ray</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-body text-base font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/70"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="font-body rounded-full">
            <Link href="/booking">Book Now</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-2/3 bg-background/95 backdrop-blur">
              <SheetHeader className="p-4 border-b">
                 <SheetTitle asChild>
                    <Link href="/" className="flex items-center space-x-2">
                        <NextImage
                            src="https://content-provider.payshia.com/silver-ray/gallery-images/1/logopng-68dd3a98e6243.png"
                            alt="Grand Silver Ray Logo"
                            width={32}
                            height={32}
                            className="h-8 w-8"
                        />
                        <span className="font-headline text-2xl font-bold text-foreground">Grand Silver Ray</span>
                    </Link>
                 </SheetTitle>
              </SheetHeader>
               <nav className="flex flex-col items-start space-y-6 p-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-body text-xl font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-foreground/70"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild size="sm" className="font-body text-sm w-full mt-4" >
                  <Link href="/booking">Book Now</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
