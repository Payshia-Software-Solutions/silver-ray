
"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export function NotificationBanner() {
  return (
    <div className="bg-primary/10 py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        <div className="flex items-center mb-2 sm:mb-0">
          <Home className="w-5 h-5 mr-2 text-primary" />
          <p className="font-body text-sm text-foreground/80">
            <span className="font-semibold">Book direct & Save.</span> Enjoy complimentary breakfast & late checkout on direct bookings.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 hover:text-primary text-xs px-3 py-1 h-auto">
          <Link href="/booking#benefits">See Benefits</Link>
        </Button>
      </div>
    </div>
  );
}
