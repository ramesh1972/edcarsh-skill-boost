import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { faqs } from '../data/mockData'; // Adjust the import path as necessary
import TitleComponent from '@/components/common/TitleComponent';

const FAQ = () => {

  return (
    <div className="min-h-full ">
      <div className="container mx-auto px-4 py-12 space-y-8">
        <TitleComponent
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our courses, instructors, and platform."
          iconName="help"
        />
          <div className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left p-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground p-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </div>
        </div>
      </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
