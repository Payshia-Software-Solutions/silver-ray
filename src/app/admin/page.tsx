
import type { Metadata } from 'next';
import Link from 'next/link';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  Mail,
  DollarSign,
  PlusCircle,
  Settings,
  Users,
  ClipboardList,
  Briefcase,
  MessageSquare,
  Star,
  Gift,
  Utensils,
  BookOpenCheck,
  UserCheck,
  MailOpen,
  SparklesIcon,
  Wrench,
  TrendingUp,
  Bell,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Overview of hotel management at Grand Silver Ray.',
};

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: React.ElementType;
  iconBgColor: string;
  iconTextColor: string;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
}

function StatCard({ title, value, subtext, icon: Icon, iconBgColor, iconTextColor, trend, trendText }: StatCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <Icon className={`h-6 w-6 ${iconTextColor}`} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-body">{title}</p>
          <p className="text-2xl font-bold font-headline text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground font-body">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface QuickActionProps {
  title: string;
  icon: React.ElementType;
  href: string;
  iconBgColor?: string;
  iconTextColor?: string;
}

function QuickActionCard({ title, icon: Icon, href, iconBgColor = 'bg-primary/10', iconTextColor = 'text-primary' }: QuickActionProps) {
  return (
    <Link href={href} className="block">
      <Card className="shadow-sm hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2 aspect-square">
          <div className={`p-3 rounded-full ${iconBgColor}`}>
            <Icon className={`h-6 w-6 ${iconTextColor}`} />
          </div>
          <p className="text-sm font-medium font-body text-foreground">{title}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

interface ActivityItemProps {
  icon: React.ElementType;
  iconBgColor: string;
  iconTextColor: string;
  description: React.ReactNode;
  time: string;
}

function ActivityItem({ icon: Icon, iconBgColor, iconTextColor, description, time }: ActivityItemProps) {
  return (
    <li className="flex items-start space-x-3 py-3">
      <div className={`p-2 rounded-full ${iconBgColor} mt-1`}>
        <Icon className={`h-4 w-4 ${iconTextColor}`} />
      </div>
      <div>
        <p className="text-sm text-foreground font-body">{description}</p>
        <p className="text-xs text-muted-foreground font-body">{time}</p>
      </div>
    </li>
  );
}

interface CheckInItemProps {
  avatarUrl: string;
  avatarFallback: string;
  name: string;
  details: string;
  statusColor: string; // tailwind bg color e.g. bg-green-500
}

function CheckInItem({ avatarUrl, avatarFallback, name, details, statusColor }: CheckInItemProps) {
  return (
    <li className="flex items-center space-x-3 py-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatarUrl} alt={name} data-ai-hint="person avatar" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground font-body">{name}</p>
        <p className="text-xs text-muted-foreground font-body">{details}</p>
      </div>
      <div className={`h-2.5 w-2.5 rounded-full ${statusColor}`} />
    </li>
  );
}


export default function AdminDashboardPage() {
  const stats: StatCardProps[] = [
    { title: 'Available Rooms', value: '24', subtext: '↑ +2 from yesterday', icon: BedDouble, iconBgColor: 'bg-green-100', iconTextColor: 'text-green-600' },
    { title: "Today's Bookings", value: '12', subtext: '8 check-ins, 4 check-outs', icon: CalendarDays, iconBgColor: 'bg-blue-100', iconTextColor: 'text-blue-600' },
    { title: 'Pending Messages', value: '7', subtext: '↓ 3 urgent responses', icon: Mail, iconBgColor: 'bg-orange-100', iconTextColor: 'text-orange-600' },
    { title: 'Revenue Today', value: 'LKR. 42,000', subtext: '↑ +15% vs yesterday', icon: DollarSign, iconBgColor: 'bg-yellow-100', iconTextColor: 'text-yellow-600' },
  ];

  const quickActions: QuickActionProps[] = [
    { title: 'New Booking', icon: PlusCircle, href: '/admin/bookings/new', iconBgColor: 'bg-sky-100', iconTextColor: 'text-sky-600' },
    { title: 'Manage Rooms', icon: BedDouble, href: '/admin/rooms', iconBgColor: 'bg-emerald-100', iconTextColor: 'text-emerald-600' },
    { title: 'New Experience', icon: Star, href: '/admin/experiences/new', iconBgColor: 'bg-purple-100', iconTextColor: 'text-purple-600' },
    { title: 'Wedding Package', icon: Gift, href: '/admin/weddings/packages', iconBgColor: 'bg-pink-100', iconTextColor: 'text-pink-600' },
    { title: 'View Messages', icon: MessageSquare, href: '/admin/messages', iconBgColor: 'bg-amber-100', iconTextColor: 'text-amber-600' },
    { title: 'Dining Reservations', icon: Utensils, href: '/admin/dining/reservations', iconBgColor: 'bg-red-100', iconTextColor: 'text-red-600' },
  ];

  const recentActivities: ActivityItemProps[] = [
    { icon: BookOpenCheck, iconBgColor: 'bg-blue-100', iconTextColor: 'text-blue-600', description: <>New booking created for <Link href="/admin/rooms/205" className="font-semibold text-primary hover:underline">Room 205</Link></>, time: '2 minutes ago' },
    { icon: UserCheck, iconBgColor: 'bg-green-100', iconTextColor: 'text-green-600', description: <>Guest checked in to <Link href="/admin/rooms/presidential-suite" className="font-semibold text-primary hover:underline">Presidential Suite</Link></>, time: '15 minutes ago' },
    { icon: MailOpen, iconBgColor: 'bg-orange-100', iconTextColor: 'text-orange-600', description: 'New contact form message received', time: '32 minutes ago' },
    { icon: SparklesIcon, iconBgColor: 'bg-purple-100', iconTextColor: 'text-purple-600', description: 'New spa experience booking for tomorrow', time: '1 hour ago' },
    { icon: Wrench, iconBgColor: 'bg-red-100', iconTextColor: 'text-red-600', description: 'Room 112 marked as under maintenance', time: '2 hours ago' },
  ];

  const todaysCheckIns: CheckInItemProps[] = [
    { avatarUrl: 'https://placehold.co/40x40.png?text=SJ', avatarFallback: 'SJ', name: 'Sarah Johnson', details: 'Room 301 • 2:00 PM', statusColor: 'bg-green-500' },
    { avatarUrl: 'https://placehold.co/40x40.png?text=MC', avatarFallback: 'MC', name: 'Michael Chen', details: 'Room 156 • 3:30 PM', statusColor: 'bg-yellow-500' },
    { avatarUrl: 'https://placehold.co/40x40.png?text=ED', avatarFallback: 'ED', name: 'Emily Davis', details: 'Suite 401 • 4:15 PM', statusColor: 'bg-yellow-500' },
    { avatarUrl: 'https://placehold.co/40x40.png?text=RW', avatarFallback: 'RW', name: 'Robert Wilson', details: 'Room 203 • 5:00 PM', statusColor: 'bg-slate-400' },
  ];


  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="font-body text-muted-foreground">
          Welcome back! Here's what's happening at your hotel today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-headline text-xl font-semibold mb-3 text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>
      </div>

      {/* Recent Activity & Today's Check-ins */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border -mx-6 px-6">
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </ul>
            <div className="mt-4 text-right">
              <Button variant="link" asChild className="text-primary font-body">
                <Link href="/admin/activity-log">View All Activity</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Today's Check-ins</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border -mx-6 px-6">
              {todaysCheckIns.map((checkIn, index) => (
                <CheckInItem key={index} {...checkIn} />
              ))}
            </ul>
            <div className="mt-4 text-right">
              <Button variant="link" asChild className="text-primary font-body">
                <Link href="/admin/check-ins">View All Check-ins</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Overview Placeholder */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground font-body">Revenue chart will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
