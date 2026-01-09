
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight } from "lucide-react";

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
];


export function FaqSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Frequently Asked Questions
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                Find quick answers to common questions about our hotel and services.
            </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
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

            <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline" className="font-body text-lg group border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    <Link href="/faq">
                    View All FAQs
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </Button>
            </div>
        </div>
    </section>
  );
}
