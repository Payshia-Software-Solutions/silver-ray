
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cancellation Policy | Grand Silver Ray',
  description: 'Understand the cancellation and refund policies for banquet halls, rooms, and other services at Grand Silver Ray.',
  openGraph: {
    title: 'Cancellation Policy | Grand Silver Ray',
    description: 'Review our policies regarding booking cancellations and refunds for events and room reservations.',
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


export default function CancellationPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl font-body">
        <header className="text-center mb-10">
          <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-2">
            Cancellation & Refund Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Our cancellation terms vary depending on the service booked. We aim to be as fair as possible while accounting for the commitments we make to reserve our spaces and services for you.
          </p>
        </header>
        
        <main>
          <Section title="Banquet / Event Bookings">
            <ul className="space-y-3">
              <ListItem>
                <strong>More than 3 months before the event date:</strong> A full refund of any payments made will be provided, excluding the initial non-refundable deposit.
              </ListItem>
              <ListItem>
                <strong>Between 1 to 3 months before the event date:</strong> The initial deposit and any advance payments made are non-refundable.
              </ListItem>
            </ul>
          </Section>

          <Section title="Room Bookings">
            <ul className="space-y-3">
              <ListItem>
                <strong>More than 1 month before the check-in date:</strong> A full refund will be provided.
              </ListItem>
              <ListItem>
                <strong>Between 2 weeks and 4 weeks before the check-in date:</strong> A 50% refund of the total booking cost will be provided.
              </ListItem>
              <ListItem>
                <strong>Less than 1 week before the check-in date:</strong> No refund will be provided.
              </ListItem>
            </ul>
          </Section>

          <Section title="General Terms">
             <ul className="space-y-3">
              <ListItem>
                All cancellation requests must be submitted in writing (via email or other official communication) to be considered valid.
              </ListItem>
              <ListItem>
                Refunds, if applicable according to the terms above, will be processed within 14-21 working days from the date of the cancellation confirmation.
              </ListItem>
            </ul>
          </Section>
        </main>
        
        <footer className="mt-8 border-t pt-6 text-sm text-muted-foreground">
            For a complete overview of our policies, please refer to our full <Link href="/terms" className="underline hover:text-primary">Terms and Conditions</Link>. If you have any questions, please do not hesitate to <Link href="/contact" className="underline hover:text-primary">contact us</Link>.
        </footer>
      </div>
    </div>
  );
}
