import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import { usps } from '@/data/usps';

const USPsSection = () => {
  const { getIcon } = useTheme();
  const uspsAnimation = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={uspsAnimation.ref}
      className={`py-20 w-full mx-auto bg-gradient-to-r from-[#475569] via-[#475569]/20  via-primary/10  via-[#334155]/20 to-[#334155] transition-all duration-700 ${uspsAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
        }`}
    >
      <div className="container px-4 mx-auto">
        {/* Corner Images */}
        <div
          className={`absolute  lg:block transition-all duration-1000 delay-300 ${uspsAnimation.isVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-full'
            }`}
          style={{ marginTop: '-40px', marginLeft: '20px' }}
        >
          <img src="/lovable-uploads/14c1d102-af1f-4765-be76-42b00c50c8e3.png" alt="100% Quality Badge" className="w-48 h-48 object-contain" />
        </div>

        <div
          className={`absolute right-0  lg:block transition-all duration-1000 delay-500 ${uspsAnimation.isVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-full'
            }`}
          style={{ marginTop: '-40px', marginRight: '310px' }}
        >
          <img src="/lovable-uploads/7aa0ba35-0c3f-47dc-a574-f6ff47194b94.png" alt="Success Key Illustration" className="w-48 h-48 object-contain" />
        </div>

        <div
          className={`text-center mb-16 transition-all duration-700 delay-300 ${uspsAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
            }`}
        >
          <div className="flex items-center justify-center gap-8 mb-4">
            <h2 className="text-3xl font-bold">Why Choose EdCrash?</h2>
          </div>
          <p className=" text-center animate-pulse text-2xl font-bold-800" style={{ fontVariant: 'small-caps' }}>
            We're revolutionizing online education with our unique live & tools oriented approach
          </p>
        </div>

        <div className="hidden lg:block relative left-1/2 transform -translate-x-1/2 -translate-y-1/8 w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-full opacity-30 animate-pulse"></div>
        {/* Connected Cards Grid */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 !p-[20px]">
            {usps.map((usp, index) => (
              <Card
                key={index}
                className={`text-center hover:shadow-lg transition-all duration-700 hover:scale-105 hover:border-primary/50 group relative bg-primary/20 backdrop-blur-sm ${uspsAnimation.isVisible
                    ? `opacity-100 ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`
                    : 'opacity-0 translate-y-10'
                  }`}
                style={{
                  transitionDelay: uspsAnimation.isVisible ? `${500 + index * 100}ms` : '0ms'
                }}
              >
                {/* Connection dots */}
                <div className="hidden lg:block absolute -top-2 -left-2 w-4 h-4 bg-primary !rounded-full group-hover:bg-primary/40 transition-colors"></div>
                <div className="hidden lg:block absolute -top-2 -right-2 w-4 h-4 bg-primary !rounded-full group-hover:bg-primary/40 transition-colors"></div>
                <div className="hidden lg:block absolute -bottom-2 -left-2 w-4 h-4 bg-primary !rounded-full group-hover:bg-primary/40 transition-colors"></div>
                <div className="hidden lg:block absolute -bottom-2 -right-2 w-4 h-4 bg-primary !rounded-full group-hover:bg-primary/40 transition-colors"></div>

                <CardHeader className='bg-primary/40'>
                  <div className="mx-auto mb-4 relative ">
                    <div className="absolute inset-0 "></div>
                    <div className={`relative z-10 ${usp.iconColor}`}>
                      {getIcon(usp.iconName)}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{usp.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mt-5">
                    {usp.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Central connecting element */}
          <div className="hidden lg:block relative left-1/2 transform -translate-x-1/2 -translate-y-1/8 w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-full opacity-30 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default USPsSection;
