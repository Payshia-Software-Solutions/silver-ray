
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Grand Silver Ray',
  description: 'Read the terms and conditions for services provided by Grand Silver Ray, including our banquet halls, rooms, and restaurant.',
  openGraph: {
    title: 'Terms and Conditions | Grand Silver Ray',
    description: 'Understand the terms of service for bookings, payments, cancellations, and guest conduct at our hotel.',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-4xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
        <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-6 text-center">
          Terms and Conditions
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-8">Silver Ray Grand Pvt Ltd | Effective Date: 2026.01.01</p>
        
        <div className="prose prose-lg max-w-none font-body text-foreground/90">
          <p>
            These Terms and Conditions govern the use of services provided by Silver Ray Grand Pvt Ltd, including our Banquet halls, Rooms, and Restaurant. By making a reservation, booking, or using our services, you agree to these terms.
          </p>

          <h2 className="font-headline">1. Company Information</h2>
          <ul>
            <li><strong>Company Name:</strong> Silver Ray Grand Pvt Ltd</li>
            <li><strong>Address:</strong> Dippitigala, Lellopitiya</li>
            <li><strong>Contact Number:</strong> 0452 274 764</li>
          </ul>

          <h2 className="font-headline">2. Reservations & Bookings</h2>
          <ul>
            <li>All reservations are subject to availability.</li>
            <li>Advance payments or deposits may be required to confirm bookings.</li>
            <li>Booking confirmations will be provided via phone, message, or email.</li>
            <li>Guests must provide accurate and complete information at the time of booking.</li>
          </ul>

          <h2 className="font-headline">3. Payments</h2>
          <ul>
            <li>Payments must be made according to the agreed terms at the time of booking.</li>
            <li>Prices are subject to change without prior notice unless a booking is confirmed.</li>
            <li>Any applicable taxes, service charges, or government levies will be added to the final bill.</li>
          </ul>

          <h2 className="font-headline">4. Cancellation & Refund Policy</h2>
          <p>Cancellation terms vary depending on the service booked.</p>
          <h3>Banquet / Event Bookings</h3>
          <ul>
            <li><strong>More than 3 months before the event date:</strong> Full refund will be provided (without initial deposit).</li>
            <li><strong>Between 1–3 months before the event date:</strong> Initial deposit and any advance payments are non-refundable.</li>
          </ul>
          <h3>Room Bookings</h3>
          <ul>
            <li><strong>More than 1 month before the check-in date:</strong> Full refund will be provided.</li>
            <li><strong>Between 2 weeks and 4 weeks before the check-in date:</strong> 50% refund will be provided.</li>
            <li><strong>Less than 1 week before the check-in date:</strong> No refund will be provided.</li>
          </ul>
          <p>All cancellation requests must be made in writing (email or official communication). Refunds, if applicable, will be processed within a specified number of working days.</p>

          <h2 className="font-headline">5. Check-in & Check-out (Rooms)</h2>
          <ul>
            <li>Check-in and check-out times will be communicated at the time of booking.</li>
            <li>Early check-in or late check-out is subject to availability and may incur additional charges.</li>
            <li>Valid identification may be required at check-in.</li>
          </ul>

          <h2 className="font-headline">6. Use of Banquet Halls & Event Spaces</h2>
          <ul>
            <li>Event timings must strictly adhere to the agreed schedule.</li>
            <li>Decorations, sound systems, and equipment must not cause damage to property.</li>
            <li>Any damage to property caused by guests or event participants will be charged to the booking party.</li>
            <li>Silver Ray Grand Pvt Ltd reserves the right to stop any event that violates safety, legal, or decency standards.</li>
          </ul>

          <h2 className="font-headline">7. Restaurant Services</h2>
          <ul>
            <li>Menu items and prices are subject to availability and change.</li>
            <li>Special dietary requests should be communicated in advance.</li>
            <li>Outside food and beverages are not permitted unless approved by management.</li>
          </ul>

          <h2 className="font-headline">8. Guest Conduct</h2>
          <ul>
            <li>Guests are expected to behave respectfully and comply with hotel rules.</li>
            <li>Any illegal, disruptive, or unsafe behavior may result in immediate removal from the premises without refund.</li>
            <li>Smoking, alcohol consumption, and noise levels must comply with applicable laws and house rules.</li>
          </ul>

          <h2 className="font-headline">9. Liability</h2>
          <ul>
            <li>Silver Ray Grand Pvt Ltd is not responsible for loss, theft, or damage to guests’ personal belongings.</li>
            <li>Use of facilities is at the guest’s own risk, except where liability cannot be excluded by law.</li>
            <li>The company shall not be liable for delays or service failures caused by events beyond its reasonable control.</li>
          </ul>
          
          <h2 className="font-headline">10. Privacy</h2>
          <p>Personal information collected from guests is handled in accordance with our Privacy Policy.</p>

          <h2 className="font-headline">11. Amendments</h2>
          <p>Silver Ray Grand Pvt Ltd reserves the right to modify these Terms and Conditions at any time. Updated terms will be effective immediately upon publication or notice.</p>
          
          <h2 className="font-headline">12. Governing Law</h2>
          <p>These Terms and Conditions shall be governed by and interpreted in accordance with the laws of Sri Lanka.</p>
        </div>
      </div>
    </div>
  );
}
