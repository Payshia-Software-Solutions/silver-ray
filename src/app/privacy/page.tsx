
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Grand Silver Ray',
  description: 'Read the privacy policy for Grand Silver Ray. We are committed to protecting your personal information and your right to privacy when using our services.',
  openGraph: {
    title: 'Privacy Policy | Grand Silver Ray',
    description: 'Understand how we collect, use, and protect your data at Grand Silver Ray.',
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

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl font-body">
        <header className="text-center mb-10">
          <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">Silver Ray Grand Pvt Ltd | Effective Date: 2026.01.01</p>
        </header>

        <main>
          <p className="mb-8 text-foreground/80">
            Silver Ray Grand Pvt Ltd is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services, including our Banquet halls, Rooms, and Restaurant services.
          </p>

          <Section title="1. Company Information">
            <ul className="space-y-2">
              <ListItem><strong>Company Name:</strong> Silver Ray Grand Pvt Ltd</ListItem>
              <ListItem><strong>Address:</strong> Dippitigala, Lellopitiya</ListItem>
              <ListItem><strong>Contact Number:</strong> 0452 274 764</ListItem>
            </ul>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following types of information:</p>
            <h3 className="font-semibold text-lg text-foreground mt-4 mb-2">a. Personal Information</h3>
            <ul className="space-y-2">
              <ListItem>Name</ListItem>
              <ListItem>Contact number</ListItem>
              <ListItem>Email address</ListItem>
              <ListItem>Address</ListItem>
              <ListItem>Identification details (if required for room bookings or legal purposes)</ListItem>
            </ul>
            <h3 className="font-semibold text-lg text-foreground mt-4 mb-2">b. Booking and Service Information</h3>
            <ul className="space-y-2">
              <ListItem>Reservation details (banquet halls, rooms, restaurant bookings)</ListItem>
              <ListItem>Event details</ListItem>
              <ListItem>Payment-related information (processed securely through authorized payment providers)</ListItem>
            </ul>
            <h3 className="font-semibold text-lg text-foreground mt-4 mb-2">c. Automatically Collected Information</h3>
            <ul className="space-y-2">
              <ListItem>Date and time of inquiries</ListItem>
              <ListItem>Communication records (calls, messages, emails)</ListItem>
            </ul>
          </Section>
          
          <Section title="3. How We Use Your Information">
            <p>We use your information to:</p>
            <ul className="space-y-2">
                <ListItem>Process reservations and bookings</ListItem>
                <ListItem>Provide hospitality and customer services</ListItem>
                <ListItem>Communicate with you regarding inquiries, confirmations, or changes</ListItem>
                <ListItem>Improve our services and customer experience</ListItem>
                <ListItem>Comply with legal and regulatory requirements</ListItem>
            </ul>
          </Section>

          <Section title="4. Sharing of Information">
            <p>We do not sell, rent, or trade your personal information. We may share information only:</p>
            <ul className="space-y-2">
                <ListItem>With trusted service providers involved in payment processing or service delivery</ListItem>
                <ListItem>When required by law, regulation, or legal process</ListItem>
                <ListItem>To protect the rights, property, or safety of Silver Ray Grand Pvt Ltd, our customers, or others</ListItem>
            </ul>
          </Section>

          <Section title="5. Data Security">
            <p>We take reasonable administrative, technical, and physical measures to protect your personal information from unauthorized access, misuse, or disclosure.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to:</p>
            <ul className="space-y-2">
                <ListItem>Request access to your personal information</ListItem>
                <ListItem>Request correction of inaccurate information</ListItem>
                <ListItem>Request deletion of your data, subject to legal obligations</ListItem>
            </ul>
            <p className="mt-4">To exercise these rights, please contact us using the details provided.</p>
          </Section>

          <Section title="8. Third-Party Links">
             <p>Our services may include links to third-party websites or services. We are not responsible for the privacy practices of those third parties.</p>
          </Section>

          <Section title="9. Changes to This Privacy Policy">
            <p>We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting.</p>
          </Section>
        </main>
      </div>
    </div>
  );
}
