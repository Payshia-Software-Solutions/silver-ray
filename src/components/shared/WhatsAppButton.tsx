
'use client';

import Link from 'next/link';
import NextImage from 'next/image';

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
      <a className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-transparent text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]">
        <NextImage
          src="https://content-provider.payshia.com/silver-ray/other/whatsapp.png"
          alt="WhatsApp Icon"
          width={64}
          height={64}
          className="rounded-full"
        />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </Link>
  );
}
