
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Grand Silver Ray',
  description: 'Read the terms and conditions for services provided by Grand Silver Ray, including our banquet halls, rooms, and restaurant.',
  openGraph: {
    title: 'Terms and Conditions | Grand Silver Ray',
    description: 'Understand the terms of service for bookings, payments, cancellations, and guest conduct at our hotel.',
  },
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="font-headline text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">
      {title}
    </h2>
    <div className="space-y-4 text-foreground/80">
      {children}
    </div>
  </div>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex">
    <span className="text-primary mr-3 mt-1.5 flex-shrink-0">•</span>
    <span>{children}</span>
  </li>
);

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl font-body">
        <header className="text-center mb-10">
          <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-2">
            Terms and Conditions
          </h1>
          <p className="text-muted-foreground text-sm">Silver Ray Grand Pvt Ltd | Effective Date: 2026.01.01</p>
        </header>

        <main>
            <p className="mb-8 text-foreground/80">
                These Terms and Conditions govern the use of services provided by Silver Ray Grand Pvt Ltd, including our Banquet halls, Rooms, and Restaurant. By making a reservation, booking, or using our services, you agree to these terms.
            </p>

            <Section title="1. Company Information">
                <ul className="space-y-2">
                    <ListItem><strong>Company Name:</strong> Silver Ray Grand Pvt Ltd</ListItem>
                    <ListItem><strong>Address:</strong> Dippitigala, Lellopitiya</ListItem>
                    <ListItem><strong>Contact Number:</strong> 0452 274 764</ListItem>
                </ul>
            </Section>

            <Section title="2. Reservations & Bookings">
                <ul className="space-y-2">
                    <ListItem>All reservations are subject to availability.</ListItem>
                    <ListItem>Advance payments or deposits may be required to confirm bookings.</ListItem>
                    <ListItem>Booking confirmations will be provided via phone, message, or email.</ListItem>
                    <ListItem>Guests must provide accurate and complete information at the time of booking.</ListItem>
                </ul>
            </Section>

            <Section title="3. Payments">
                <ul className="space-y-2">
                    <ListItem>Payments must be made according to the agreed terms at the time of booking.</ListItem>
                    <ListItem>Prices are subject to change without prior notice unless a booking is confirmed.</ListItem>
                    <ListItem>Any applicable taxes, service charges, or government levies will be added to the final bill.</ListItem>
                </ul>
            </Section>

            <Section title="4. Cancellation & Refund Policy">
                <p>Cancellation terms vary depending on the service booked.</p>
                <h3 className="font-semibold text-lg text-foreground mt-4 mb-2">Banquet / Event Bookings</h3>
                <ul className="space-y-2">
                    <ListItem><strong>More than 3 months before the event date:</strong> Full refund will be provided (without initial deposit).</ListItem>
                    <ListItem><strong>Between 1–3 months before the event date:</strong> Initial deposit and any advance payments are non-refundable.</ListItem>
                </ul>
                <h3 className="font-semibold text-lg text-foreground mt-4 mb-2">Room Bookings</h3>
                <ul className="space-y-2">
                    <ListItem><strong>More than 1 month before the check-in date:</strong> Full refund will be provided.</ListItem>
                    <ListItem><strong>Between 2 weeks and 4 weeks before the check-in date:</strong> 50% refund will be provided.</ListItem>
                    <ListItem><strong>Less than 1 week before the check-in date:</strong> No refund will be provided.</ListItem>
                </ul>
                <p className="mt-4">All cancellation requests must be made in writing (email or official communication). Refunds, if applicable, will be processed within a specified number of working days.</p>
            </Section>

            <Section title="5. Check-in & Check-out (Rooms)">
                <ul className="space-y-2">
                    <ListItem>Check-in and check-out times will be communicated at the time of booking.</ListItem>
                    <ListItem>Early check-in or late check-out is subject to availability and may incur additional charges.</ListItem>
                    <ListItem>Valid identification may be required at check-in.</ListItem>
                </ul>
            </Section>

            <Section title="6. Use of Banquet Halls & Event Spaces">
                 <ul className="space-y-2">
                    <ListItem>Event timings must strictly adhere to the agreed schedule.</ListItem>
                    <ListItem>Decorations, sound systems, and equipment must not cause damage to property.</ListItem>
                    <ListItem>Any damage to property caused by guests or event participants will be charged to the booking party.</ListItem>
                    <ListItem>Silver Ray Grand Pvt Ltd reserves the right to stop any event that violates safety, legal, or decency standards.</ListItem>
                </ul>
            </Section>
            
            <Section title="7. Restaurant Services">
                 <ul className="space-y-2">
                    <ListItem>Menu items and prices are subject to availability and change.</ListItem>
                    <ListItem>Special dietary requests should be communicated in advance.</ListItem>
                    <ListItem>Outside food and beverages are not permitted unless approved by management.</ListItem>
                </ul>
            </Section>

            <Section title="8. Guest Conduct">
                 <ul className="space-y-2">
                    <ListItem>Guests are expected to behave respectfully and comply with hotel rules.</ListItem>
                    <ListItem>Any illegal, disruptive, or unsafe behavior may result in immediate removal from the premises without refund.</ListItem>
                    <ListItem>Smoking, alcohol consumption, and noise levels must comply with applicable laws and house rules.</ListItem>
                </ul>
            </Section>

            <Section title="9. Liability">
                 <ul className="space-y-2">
                    <ListItem>Silver Ray Grand Pvt Ltd is not responsible for loss, theft, or damage to guests’ personal belongings.</ListItem>
                    <ListItem>Use of facilities is at the guest’s own risk, except where liability cannot be excluded by law.</ListItem>
                    <ListItem>The company shall not be liable for delays or service failures caused by events beyond its reasonable control.</ListItem>
                </ul>
            </Section>

            <Section title="10. Privacy">
                <p>Personal information collected from guests is handled in accordance with our Privacy Policy.</p>
            </Section>

            <Section title="11. Amendments">
                <p>Silver Ray Grand Pvt Ltd reserves the right to modify these Terms and Conditions at any time. Updated terms will be effective immediately upon publication or notice.</p>
            </Section>

            <Section title="12. Governing Law">
                 <p>These Terms and Conditions shall be governed by and interpreted in accordance with the laws of Sri Lanka.</p>
            </Section>
        </main>
      </div>
    </div>
  );
}
