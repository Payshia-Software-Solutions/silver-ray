
"use client";

import type { Metadata } from 'next';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutDashboard, BedDouble, Briefcase, CalendarHeart } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Metadata cannot be exported from a Client Component.
// Individual admin pages (e.g., /admin/page.tsx) should define their own metadata.

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/admin" className="font-headline text-2xl font-bold text-sidebar-foreground">
            Admin Panel
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/admin'}>
                <Link href="/admin">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Accordion type="single" collapsible className="w-full px-2">
              <AccordionItem value="weddings" className="border-none">
                <AccordionTrigger className={cn(
                  "flex items-center justify-between w-full p-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring outline-none font-medium hover:no-underline",
                  pathname.startsWith('/admin/weddings') && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}>
                  <div className="flex items-center gap-2">
                    <CalendarHeart className="h-5 w-5" />
                    <span className="font-body">Weddings</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-0 pl-4 mt-1 space-y-1">
                    <SidebarMenuItem className="p-0">
                      <SidebarMenuButton asChild tooltip="Wedding Overview" size="sm" variant="ghost" className="w-full justify-start h-8 px-2" isActive={pathname === '/admin/weddings'}>
                        <Link href="/admin/weddings">
                          <span className="text-xs">Overview</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="p-0">
                      <SidebarMenuButton asChild tooltip="Manage Venues" size="sm" variant="ghost" className="w-full justify-start h-8 px-2" isActive={pathname === '/admin/weddings/venues'}>
                        <Link href="/admin/weddings/venues">
                          <span className="text-xs">Venues</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="p-0">
                      <SidebarMenuButton asChild tooltip="Manage Packages" size="sm" variant="ghost" className="w-full justify-start h-8 px-2" isActive={pathname === '/admin/weddings/packages'}>
                        <Link href="/admin/weddings/packages">
                          <span className="text-xs">Packages</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="p-0">
                      <SidebarMenuButton asChild tooltip="Manage Services" size="sm" variant="ghost" className="w-full justify-start h-8 px-2" isActive={pathname === '/admin/weddings/services'}>
                        <Link href="/admin/weddings/services">
                          <span className="text-xs">Services</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Room Management" isActive={pathname.startsWith('/admin/rooms')}>
                <Link href="/admin/rooms">
                  <BedDouble />
                  <span>Rooms</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Booking Management" isActive={pathname.startsWith('/admin/bookings')}>
                <Link href="/admin/bookings">
                  <Briefcase />
                  <span>Bookings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-background">
          <SidebarTrigger />
          <h1 className="font-headline text-xl font-semibold">Grand Silver Ray Admin</h1>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
