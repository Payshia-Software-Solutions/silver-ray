
"use client";

import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import Link from "next/link";

export function NotificationBanner() {
  return (
    <div className="bg-primary/80 backdrop-blur-sm py-3 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        <div className="flex items-center mb-2 sm:mb-0">
          <Gift className="w-5 h-5 mr-3 text-primary-foreground" />
          <p className="font-body text-sm text-primary-foreground">
            <span className="font-semibold">Book Direct & Save:</span> Enjoy complimentary breakfast & late checkout on direct bookings.
          </p>
        </div>
        <Button asChild variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 text-xs px-4 py-1 h-auto rounded-md">
          <Link href="/booking#benefits">See Benefits</Link>
        </Button>
      </div>
    </div>
  );
}
