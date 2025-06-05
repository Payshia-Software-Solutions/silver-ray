import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for LuxeStay.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
        <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-8 text-center">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none font-body text-foreground/90">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="font-headline">Introduction</h2>
          <p>
            Welcome to LuxeStay ("us", "we", or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at privacy@luxestay.com.
          </p>
          <p>
            When you visit our website luxestay.com (the "Website"), and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue use of our Sites and our services.
          </p>

          <h2 className="font-headline">Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when registering at the Website, expressing an interest in obtaining information about us or our products and services, when participating in activities on the Website or otherwise contacting us.
          </p>
          <p>
            The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect can include the following: Name and Contact Data, Credentials, Payment Data.
          </p>

          <h2 className="font-headline">How We Use Your Information</h2>
          <p>
            We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To send administrative information to you.</li>
            <li>To fulfill and manage your orders/bookings.</li>
            <li>To post testimonials.</li>
            <li>Request Feedback.</li>
          </ul>

          <h2 className="font-headline">Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
          
          <h2 className="font-headline">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
          </p>

          <h2 className="font-headline">Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you may email us at privacy@luxestay.com or by post to:
          </p>
          <p>
            LuxeStay<br />
            Attn: Privacy Officer<br />
            123 Luxury Lane, Paradise City, PC 12345
          </p>
        </div>
      </div>
    </div>
  );
}
