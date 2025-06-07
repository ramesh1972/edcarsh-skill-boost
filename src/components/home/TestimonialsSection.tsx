import React from 'react';
import { Star } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import { homeTestimonials } from '@/data/testimonials';

const TestimonialsSection = () => {
  const testimonialsAnimation = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      ref={testimonialsAnimation.ref}
      className={`py-20 bg-muted/50 round-[px] border-[2px] border-primary transition-all duration-700 ${
        testimonialsAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255,0.4), rgba(255, 255, 255,.8)), url('/lovable-uploads/9c6e854a-b9ee-4453-be78-e8a940f7033d.png')`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat-x'
      }}
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-xl text-muted-foreground">
            Real success stories from our learning community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeTestimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className={`transition-all duration-700 ${
                testimonialsAnimation.isVisible 
                  ? `opacity-100 ${
                      index % 3 === 0 ? 'animate-fade-in-left' : 
                      index % 3 === 1 ? 'animate-zoom-in' : 'animate-fade-in-right'
                    }` 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: testimonialsAnimation.isVisible ? `${400 + index * 200}ms` : '0ms'
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
