
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ConditionalLayoutWrapper } from '@/components/layout/ConditionalLayoutWrapper';
import Snowfall from '@/components/shared/Snowfall';

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
        <link rel="apple-touch-icon" sizes="180x180" href="https://content-provider.payshia.com/silver-ray/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://content-provider.payshia.com/silver-ray/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://content-provider.payshia.com/silver-ray/favicon/favicon-16x16.png" />
        <link rel="icon" href="https://content-provider.payshia.com/silver-ray/favicon/favicon.ico" sizes="any" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col" suppressHydrationWarning={true}>
        <Snowfall />
        <ConditionalLayoutWrapper>
          {children}
        </ConditionalLayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}
