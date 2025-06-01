
import React from 'react';
import { Header } from '@/components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FAQ = () => {
  const faqs = [
    {
      question: "How long are the crash courses?",
      answer: "Our crash courses typically range from 8 to 30 hours, designed to be completed over a few days to a few weeks depending on your schedule. Most courses are structured as 2-8 hour daily live sessions."
    },
    {
      question: "What makes EdCrash different from other online courses?",
      answer: "EdCrash focuses on practical, tool-oriented learning with live interactive sessions. Our courses are short, intensive, and extremely affordable at just $25 per course. We emphasize real-world skills over lengthy theoretical lectures."
    },
    {
      question: "Are the sessions really live?",
      answer: "Yes! All our sessions are conducted live with expert instructors. This allows for real-time interaction, Q&A, and personalized guidance. Sessions are typically scheduled outside regular office hours for working professionals."
    },
    {
      question: "What if I miss a live session?",
      answer: "All live sessions are recorded and made available to enrolled students within 24 hours. You can catch up at your own pace, though we highly recommend attending live for the best learning experience."
    },
    {
      question: "How much do courses cost?",
      answer: "Most of our crash courses are priced at just $25, making quality education accessible to everyone. Some specialized or longer courses may be priced slightly higher, but we maintain our commitment to affordability."
    },
    {
      question: "Are courses available in multiple languages?",
      answer: "Yes! We offer courses in multiple languages including English, Spanish, French, German, and others. Check the course description for available language options."
    },
    {
      question: "What tools and software will I need?",
      answer: "Each course uses industry-standard tools relevant to the subject. All required software and tools are listed in the course description, and we provide guidance on setup during the first session."
    },
    {
      question: "Do I get a certificate upon completion?",
      answer: "Yes, you'll receive a certificate of completion for each course you finish. Our certificates are recognized by many employers and can be added to your LinkedIn profile."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center animate-slide-in-up">
          <h1 className="text-4xl font-bold mb-4 hover-color-shift">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-in-up animate-delay-200">
            Everything you need to know about EdCrash crash courses
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="animate-slide-in-left hover-lift hover-glow">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className={`${
                      index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
                    } animate-delay-${(index + 1) * 100}`}
                  >
                    <AccordionTrigger className="text-left hover:text-primary transition-colors hover-color-shift">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-8 text-center animate-slide-in-up animate-delay-500">
            <Card className="hover-lift hover-glow">
              <CardHeader>
                <CardTitle className="hover-color-shift">Still have questions?</CardTitle>
                <CardDescription>
                  Our support team is here to help you succeed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact us at support@edcrash.com or use our live chat
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
