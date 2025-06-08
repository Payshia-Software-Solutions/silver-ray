
import type { Metadata } from 'next';
import '../globals.css'; // Ensure global styles are applied
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
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';
import { LayoutDashboard, BedDouble, Briefcase, CalendarHeart, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Grand Silver Ray',
  description: 'Admin panel for Grand Silver Ray Hotel.',
};

export default function AdminLayout({
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
      <body className="font-body antialiased">
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
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/admin">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Wedding Management">
                    <Link href="/admin/weddings">
                      <CalendarHeart />
                      <span>Weddings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Room Management">
                    <Link href="/admin/rooms">
                      <BedDouble />
                      <span>Rooms</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Booking Management">
                    <Link href="/admin/bookings">
                      <Briefcase />
                      <span>Bookings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 {/* Add more admin links here later e.g. Settings */}
              </SidebarMenu>
            </SidebarContent>
             {/* You can add a SidebarFooter here if needed */}
          </Sidebar>
          <SidebarInset>
            <header className="flex items-center justify-between p-4 border-b bg-background">
              <SidebarTrigger />
              <h1 className="font-headline text-xl font-semibold">Grand Silver Ray Admin</h1>
              {/* Potentially add user profile/logout button here */}
            </header>
            <main className="p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
