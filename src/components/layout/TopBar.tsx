
"use client";

import { Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import Link from 'next/link';

// Inline SVG for TikTok icon
const TikTokIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
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


const socialLinks = [
  { href: 'https://www.instagram.com/grand_silver_ray/', icon: Instagram, label: 'Instagram' },
  { href: 'https://www.facebook.com/Silverraylk', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.youtube.com/@GrandSilverRayOfficial', icon: Youtube, label: 'YouTube' },
  { href: 'https://www.tiktok.com/@grand_silver_ray', icon: TikTokIcon, label: 'TikTok' },
];

export function TopBar() {
  return (
    <div className="bg-secondary/30 text-secondary-foreground py-2 border-b border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs">
        <div className="flex items-center gap-x-4">
          <a href="tel:+94719107700" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+94 71 910 7700</span>
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
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <social.icon size={16} />
                </a>
            ))}
        </div>
      </div>
    </div>
  );
}
