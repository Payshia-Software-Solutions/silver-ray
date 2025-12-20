
"use client";

import { Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import Link from 'next/link';

// Inline SVG for Pinterest icon
const PinterestIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
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

const socialLinks = [
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Youtube, label: 'YouTube' },
  { href: '#', icon: PinterestIcon, label: 'Pinterest' },
];

export function TopBar() {
  return (
    <div className="bg-secondary/30 text-secondary-foreground py-2 border-b border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs">
        <div className="flex items-center gap-x-4">
          <a href="tel:+94452274764" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+94 452 274 764</span>
          </a>
          <a href="mailto:reservation@silverray.lk" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">reservation@silverray.lk</span>
          </a>
        </div>
        <div className="flex items-center gap-x-3">
            {socialLinks.map((social) => (
                <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-foreground/70 hover:text-primary transition-colors"
                >
                    <social.icon size={16} />
                </a>
            ))}
        </div>
      </div>
    </div>
  );
}
