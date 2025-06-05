
import Link from 'next/link';
import { Hotel, Facebook, Instagram, Twitter } from 'lucide-react';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Hotel className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold">Grand Silver Ray</span>
            </Link>
            <p className="font-body text-sm text-secondary-foreground/80">
              Experience the pinnacle of luxury and comfort. Your unforgettable journey starts here.
            </p>
          </div>
          
          <div>
            <h3 className="font-headline text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 font-body">
              <li><Link href="/rooms" className="hover:text-primary transition-colors">Our Rooms</Link></li>
              <li><Link href="/dining" className="hover:text-primary transition-colors">Dining</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/experiences" className="hover:text-primary transition-colors">Experiences</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/booking" className="hover:text-primary transition-colors">Book a Stay</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" aria-label="Facebook" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                <Twitter size={24} />
              </a>
            </div>
            <p className="font-body text-sm text-secondary-foreground/80">
              123 Luxury Lane, Paradise City, PC 12345
            </p>
            <p className="font-body text-sm text-secondary-foreground/80">
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-border/60 pt-8 text-center">
          <p className="font-body text-sm text-secondary-foreground/80">
            &copy; {currentYear} Grand Silver Ray. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
