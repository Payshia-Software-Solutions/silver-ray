
"use client";

// import type { Metadata } from 'next'; // Metadata cannot be exported from a Client Component.
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
import { 
  LayoutDashboard, 
  BedDouble, 
  Briefcase, 
  CalendarHeart, 
  List, 
  MapPin, 
  Package, 
  ClipboardList,
  Hotel,
  LineChart,
  CalendarCheck,
  Utensils,
  Star,
  Mail,
  Heart,
  Globe2,
  Users,
  Settings
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Individual admin pages (e.g., /admin/page.tsx) should define their own metadata.

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LineChart, activePath: '/admin', exact: true },
    { href: '/admin/rooms', label: 'Room Management', icon: BedDouble, activePath: '/admin/rooms' },
    { href: '/admin/bookings', label: 'Booking Management', icon: CalendarCheck, activePath: '/admin/bookings' },
    { href: '/admin/dining', label: 'Restaurant & Dining', icon: Utensils, activePath: '/admin/dining' },
    { href: '/admin/experiences', label: 'Experience Management', icon: Star, activePath: '/admin/experiences' },
    { href: '/admin/messages', label: 'Contact Messages', icon: Mail, activePath: '/admin/messages' },
    { href: '/admin/weddings', label: 'Wedding Management', icon: Heart, activePath: '/admin/weddings' },
    { href: '/admin/content', label: 'Website Content', icon: Globe2, activePath: '/admin/content' },
    { href: '/admin/users', label: 'User Management', icon: Users, activePath: '/admin/users' },
    { href: '/admin/settings', label: 'Settings', icon: Settings, activePath: '/admin/settings' },
  ];

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-md flex items-center justify-center w-10 h-10 shrink-0">
              <Hotel className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <Link href="/admin" className="font-headline text-lg font-semibold text-sidebar-foreground leading-tight block hover:text-primary transition-colors">
                Grand Silver Ray
              </Link>
              <p className="text-xs text-muted-foreground font-body">Hotel Admin</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.label} 
                  isActive={item.exact ? pathname === item.activePath : pathname.startsWith(item.activePath)}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-background">
          <SidebarTrigger />
          {/* You might want to dynamically set this title based on the page */}
          <h1 className="font-headline text-xl font-semibold">Grand Silver Ray Admin</h1> 
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
