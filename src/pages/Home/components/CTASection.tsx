
import React from 'react';
import { Target, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CTASection = () => {
  const ctaAnimation = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={ctaAnimation.ref}
      className={`py-20 bg-gradient-to-r from-primary to-blue-600 text-white round-[20px] transition-all duration-700 delay-300 ${
        ctaAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container px-4 mx-auto text-center">
        <h2 
          className={`text-3xl font-bold mb-4 transition-all duration-700 delay-500 ${
            ctaAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
          }`}
        >
          Ready to Crash Your Way to Success?
        </h2>
        <p 
          className={`text-xl mb-8 opacity-90 transition-all duration-700 delay-700 ${
            ctaAnimation.isVisible ? 'animate-fade-in-left opacity-90' : 'opacity-0 -translate-x-10'
          }`}
        >
          Join thousands of professionals who've accelerated their careers with EdCrash
        </p>
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-900 ${
            ctaAnimation.isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-10'
          }`}
        >
          <Button size="lg" variant="secondary" className="gap-2">
            <Target className="w-5 h-5" />
            Express Your Learning Intent
          </Button>
          <Button size="lg" variant="outline" className="gap-2 border-white hover:bg-white hover:text-primary">
            <Calendar className="w-5 h-5" />
            View Course Calendar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
