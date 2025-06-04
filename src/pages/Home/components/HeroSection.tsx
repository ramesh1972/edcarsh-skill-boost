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
      className={`relative overflow-hidden bg-gradient-to-br from-primary/5 to-blue-600/5 py-20 sm:py-32 rounded-t-[20px] transition-all duration-1000 ${
        heroAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
      }`}
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 50%, rgba(155,155,155,0.2) 70%), url('/lovable-uploads/4046cf4d-c9d6-454a-9102-15024ca94163.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container px-4 mx-auto">
        <div className="text-center">
          <Badge 
            className={`mb-4 transition-all duration-700 delay-100 ${
              heroAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-5'
            }`} 
            variant="secondary" 
            style={{fontSize: '16px'}}
          >
            🚀 Launch Your Skills in Hours, Not Months
          </Badge>
          <h1 
            className={`text-6xl sm:text-8xl font-bold tracking-tight mb-6 text-white transition-all duration-700 delay-300 ${
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
              color: 'orange',
              fontSize: '30px',
              marginTop: '30px',
            }} 
            className={`mb-8 max-w-3xl mx-auto text-3xl font-semibold text-yellow-200 mt-[20px] transition-all duration-700 delay-500 ${
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
