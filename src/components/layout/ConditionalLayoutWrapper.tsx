
"use client";

import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';

export function ConditionalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    // For admin pages, AdminLayout will provide its own <main> tag and overall structure.
    // The {children} here is the content of the admin page itself, 
    // which will be slotted into AdminLayout's structure.
    return <>{children}</>;
  }

  // For non-admin pages, this wrapper provides the header, main content area, and footer.
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main className="flex-grow">
        {children}
      </main>
      <WhatsAppButton />
      <SiteFooter />
    </>
  );
}
