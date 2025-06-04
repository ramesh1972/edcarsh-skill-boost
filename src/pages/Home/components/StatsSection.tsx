
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const StatsSection = () => {
  const statsAnimation = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={statsAnimation.ref}
      className={`py-20 bg-primary text-primary-foreground round-[10px] transition-all duration-700 delay-300 ${
        statsAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div 
            className={`transition-all duration-700 delay-500 ${
              statsAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="text-sm opacity-90">Active Students</div>
          </div>
          <div 
            className={`transition-all duration-700 delay-600 ${
              statsAnimation.isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-sm opacity-90">Courses Available</div>
          </div>
          <div 
            className={`transition-all duration-700 delay-700 ${
              statsAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="text-4xl font-bold mb-2">95%</div>
            <div className="text-sm opacity-90">Success Rate</div>
          </div>
          <div 
            className={`transition-all duration-700 delay-800 ${
              statsAnimation.isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-sm opacity-90">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
