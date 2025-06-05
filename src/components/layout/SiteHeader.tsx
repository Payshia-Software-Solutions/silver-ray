
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/rooms', label: 'Rooms' },
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
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <Hotel className="h-8 w-8 text-primary" />
          <span className="font-headline text-3xl font-bold text-foreground">Grand Silver Ray</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-body text-lg font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/70"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="lg" className="font-body rounded-full">
            <Link href="/booking">Book Now</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 border-b">
             <Link href="/" className="flex items-center space-x-2">
                <Hotel className="h-8 w-8 text-primary" />
                <span className="font-headline text-3xl font-bold text-foreground">Grand Silver Ray</span>
            </Link>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
            >
                <X className="h-7 w-7" />
            </Button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-grow space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-body text-2xl font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground/70"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="lg" className="font-body text-xl px-8 py-6 rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/booking">Book Now</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
