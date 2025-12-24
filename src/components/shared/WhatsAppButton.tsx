
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    fill="currentColor"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-65.7-11.8-90.3-32.5l-6.7-4-67.1 17.6 17.9-65.5-4.4-7c-21.5-34.1-33.2-73.2-33.2-113.9 0-108.9 88.4-197.3 197.3-197.3 53.9 0 104.1 21.2 140.1 57.2s57.2 86.2 57.2 140.1c.1 108.9-88.3 197.3-197.2 197.3zm105.4-129.5c-5.4-2.7-32.1-15.8-37.1-17.6-5-1.8-8.7-2.7-12.4 2.7-3.7 5.4-14.1 17.6-17.3 21.2-3.2 3.6-6.4 4.1-11.8 1.3-27.4-13.6-45.7-29.7-65.4-53.1-17.4-21.2-27.6-35.6-36.9-50.8-9.3-15.2-1-23.4 2.7-30.9 3.3-6.9 7.4-11.4 10.4-15.1 3.2-3.7 4.2-6.1 6.2-10.1 2-4.1.1-7.7-1.3-10.4-1.5-2.7-12.4-29.7-17-40.4-4.5-10.7-9.1-9.2-12.4-9.3-3.2-.1-6.9-.1-10.6-.1-3.7 0-9.7 1.4-14.8 6.9-5.1 5.4-19.5 19-19.5 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.1-13 36.6-25.6 4.5-12.6 4.5-23.4 3.1-25.6-1.4-2.2-5.1-4.8-10.5-7.5z" />
  </svg>
);

export function WhatsAppButton() {
  // Use the phone number from the footer
  const phoneNumber = "94452274764";

  return (
    <Link
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      passHref
      legacyBehavior>
      <a className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]">
        <WhatsAppIcon className="h-8 w-8" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </Link>
  );
}
