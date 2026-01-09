
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Grand Silver Ray hotel, including location, amenities, and booking information.',
};

const faqItems = [
  {
    question: "What is Grand Silver Ray?",
    answer: "Grand Silver Ray is a luxury hotel located in Ratnapura, Sri Lanka — the gem capital — offering elegant accommodations, Luxury banquet halls, diverse dining experiences, and premium hospitality services for leisure and business travelers."
  },
  {
    question: "Where is Grand Silver Ray located?",
    answer: "The hotel is situated in Dipitigala, Lellopitiya, Ratnapura, Sri Lanka."
  },
  {
    question: "Can I host events or weddings at Grand Silver Ray?",
    answer: "Absolutely — the hotel provides beautiful spaces and professional services to host weddings, receptions, and other significant events."
  },
  {
    question: "What kinds of rooms are available?",
    answer: "Grand Silver Ray offers elegantly designed rooms and suites with modern amenities to ensure a comfortable stay."
  },
  {
    question: "What dining options are available?",
    answer: "The hotel offers multiple dining venues including: All Day Dining (Main Restaurant), Café 111 (Thai dishes), and Curry Pot (Indian flavors). Each outlet provides a unique culinary experience."
  },
  {
    question: "How can I contact the hotel for reservations or inquiries?",
    answer: "You can contact the hotel via phone at +94 71 910 7700 or +94 71 362 6200, or email reservation@silverray.lk."
  },
  {
    question: "Is parking available?",
    answer: "Yes — the hotel provides free on-site private parking for guests."
  },
  {
    question: "Is free Wi-Fi available throughout the hotel?",
    answer: "Yes — free Wi-Fi is available across the property, including guest rooms."
  },
  {
    question: "Do you provide concierge services?",
    answer: "Yes — concierge support is available to help guests with local information, recommendations, and travel assistance."
  }
];


export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Have questions? We've got answers. If you can't find what you're looking for, feel free to <Link href="/contact" className="text-primary underline">contact us</Link>.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/70">
              <AccordionTrigger className="text-left font-headline text-lg hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-base text-muted-foreground pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
