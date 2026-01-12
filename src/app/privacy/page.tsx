
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Grand Silver Ray',
  description: 'Read the privacy policy for Grand Silver Ray. We are committed to protecting your personal information and your right to privacy when using our services.',
  openGraph: {
    title: 'Privacy Policy | Grand Silver Ray',
    description: 'Understand how we collect, use, and protect your data at Grand Silver Ray.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
        <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-8">Silver Ray Grand Pvt Ltd | Effective Date: 2026.01.01</p>
        
        <div className="prose prose-lg max-w-none font-body text-foreground/90">
          <p>
            Silver Ray Grand Pvt Ltd is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services, including our Banquet halls, Rooms, and Restaurant services.
          </p>

          <h2 className="font-headline">1. Company Information</h2>
          <ul>
            <li><strong>Company Name:</strong> Silver Ray Grand Pvt Ltd</li>
            <li><strong>Address:</strong> Dippitigala, Lellopitiya</li>
            <li><strong>Contact Number:</strong> 0452 274 764</li>
          </ul>

          <h2 className="font-headline">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <h3>a. Personal Information</h3>
          <ul>
            <li>Name</li>
            <li>Contact number</li>
            <li>Email address</li>
            <li>Address</li>
            <li>Identification details (if required for room bookings or legal purposes)</li>
          </ul>
          <h3>b. Booking and Service Information</h3>
          <ul>
            <li>Reservation details (banquet halls, rooms, restaurant bookings)</li>
            <li>Event details</li>
            <li>Payment-related information (processed securely through authorized payment providers)</li>
          </ul>
          <h3>c. Automatically Collected Information</h3>
          <ul>
            <li>Date and time of inquiries</li>
            <li>Communication records (calls, messages, emails)</li>
          </ul>

          <h2 className="font-headline">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process reservations and bookings</li>
            <li>Provide hospitality and customer services</li>
            <li>Communicate with you regarding inquiries, confirmations, or changes</li>
            <li>Improve our services and customer experience</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>

          <h2 className="font-headline">4. Sharing of Information</h2>
          <p>We do not sell, rent, or trade your personal information. We may share information only:</p>
          <ul>
            <li>With trusted service providers involved in payment processing or service delivery</li>
            <li>When required by law, regulation, or legal process</li>
            <li>To protect the rights, property, or safety of Silver Ray Grand Pvt Ltd, our customers, or others</li>
          </ul>

          <h2 className="font-headline">5. Data Security</h2>
          <p>We take reasonable administrative, technical, and physical measures to protect your personal information from unauthorized access, misuse, or disclosure.</p>

          <h2 className="font-headline">6. Data Retention</h2>
          <p>We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>

          <h2 className="font-headline">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data, subject to legal obligations</li>
          </ul>
          <p>To exercise these rights, please contact us using the details below.</p>

          <h2 className="font-headline">8. Third-Party Links</h2>
          <p>Our services may include links to third-party websites or services. We are not responsible for the privacy practices of those third parties.</p>

          <h2 className="font-headline">9. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting.</p>
        </div>
      </div>
    </div>
  );
}
