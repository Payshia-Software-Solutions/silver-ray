
"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

export function NotificationBanner() {
  return (
    <div className="bg-secondary/50 py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        <div className="flex items-center mb-2 sm:mb-0">
          <Star className="w-5 h-5 mr-2 text-primary fill-primary/50" />
          <p className="font-body text-sm text-foreground/80">
            <span className="font-semibold">Book direct & Save:</span> Enjoy complimentary breakfast & late checkout on direct bookings.
          </p>
        </div>
        <Button asChild variant="default" size="sm" className="bg-primary/20 text-primary hover:bg-primary/30 text-xs px-4 py-1 h-auto rounded-full">
          <Link href="/booking#benefits">See Benefits</Link>
        </Button>
      </div>
    </div>
  );
}
