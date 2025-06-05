
import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: 'Grand Silver Ray | Luxury Hotel & Resort',
    template: '%s | Grand Silver Ray',
  },
  description: 'Experience unparalleled luxury and comfort at Grand Silver Ray. Book your dream getaway today at the finest resort.',
  keywords: ['luxury hotel', 'resort', 'dining', 'events', 'experiences', 'gallery', 'booking', 'vacation', 'travel', 'Grand Silver Ray'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
