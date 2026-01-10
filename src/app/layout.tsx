
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ConditionalLayoutWrapper } from '@/components/layout/ConditionalLayoutWrapper';
import Snowfall from '@/components/shared/Snowfall';

export const metadata: Metadata = {
  metadataBase: new URL('https://grandsilverray.com'),
  title: {
    default: 'Grand Silver Ray | Luxury Hotel & Resort in Ratnapura',
    template: '%s | Grand Silver Ray',
  },
  description: 'Experience unparalleled luxury at Grand Silver Ray, Ratnapura. Offering elegant accommodations, luxury banquet halls, diverse dining, and premium hospitality for leisure and business.',
  keywords: ['luxury hotel ratnapura', 'sri lanka resort', 'grand silver ray', 'banquet halls ratnapura', 'wedding venues sri lanka', 'fine dining ratnapura', 'ratnapura hotels', 'gem capital hotel'],
  openGraph: {
    title: 'Grand Silver Ray | Luxury Hotel & Resort in Ratnapura',
    description: 'Discover elegance and comfort in the heart of Sri Lanka\'s gem capital. Book your stay, event, or dining experience at Grand Silver Ray.',
    images: ['https://content-provider.payshia.com/silver-ray/other/IMG_6722-6947156a07530-optimized.webp'],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grand Silver Ray | Luxury Hotel & Resort in Ratnapura',
    description: 'Experience luxury and top-tier hospitality at Grand Silver Ray. Your perfect destination for weddings, dining, and relaxing stays.',
    images: ['https://content-provider.payshia.com/silver-ray/other/IMG_6722-6947156a07530-optimized.webp'],
  },
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
