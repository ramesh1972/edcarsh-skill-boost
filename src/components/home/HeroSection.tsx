import React from 'react';
import { Play, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HeroSection = () => {
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={heroAnimation.ref}
      className={`relative overflow-hidden bg-gradient-to-br from-primary/100 to-blue-600/30 py-20 sm:py-32 rounded-t-[40px] transition-all duration-1000 ${
        heroAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
      }`}
     
    >
      <div className="container px-4 mx-auto">
        <div className="text-center">
          <Badge 
            className={`mb-4 h-8 transition-all duration-700 delay-100 animate-pulse duration-400 ${
              heroAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-5'
            }`} 
            variant="secondary" 
            style={{fontSize: '16px'}}
            
          >
            🚀 Launch Your Skills in Hours, Not Months
          </Badge>
            <br/>
            <Badge className="mb-9 inline-block px-4 py-2 bg-secondary/90 rounded-full text-primary-600 font-semibold text-base shadow-sm border border-green-700 items-center" style={{fontSize: '22px', verticalAlign: 'middle'}}>
              <span>With Tools that are</span> <span className="text-3xl font-bold text-foreground/80 delay-200 animate-pulse duration-1500"> 100% FREE </span> <span>for learners!</span>
              <br></br><br></br>
              Free For Lifetime!
            </Badge>
    
          <h1 
            className={`text-6xl sm:text-8xl font-bold tracking-tight mb-6 8ext-white transition-all duration-700 delay-300 ${
              heroAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
            }`}
          >
            Master Skills Fast with{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Crash Courses
            </span>
          </h1>
          <p 
            style={{
              fontSize: '30px',
              marginTop: '30px',
            }} 
            className={`mb-8 max-w-3xl mx-auto text-4xl font-semibold text-destructive-foreground text-secondary-foreground drop-shadow-lg mt-[20px] transition-all duration-700 delay-500 ${
              heroAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-10'
            }`}
          >
            Learn new skills with short, practical crash courses. Live sessions, affordable pricing, 
            and industry-focused training - all starting from just $25 per course.
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center mt-10 transition-all duration-700 delay-700 ${
              heroAnimation.isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-10'
            }`}
          >
            <Button size="lg" className="gap-2">
              <Play className="w-5 h-5" />
              Start Learning Now
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Calendar className="w-5 h-5" />
              View Upcoming Sessions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
