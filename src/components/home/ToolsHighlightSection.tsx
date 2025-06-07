import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import ToolsList from '@/components/tools/ToolsList';

const ToolsHighlightSection = () => {
  const { getIcon } = useTheme();
  const toolsAnimation = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      ref={toolsAnimation.ref} 
      className={`py-20 w-full mx-auto bg-gradient-to- from-[rgb(214 228 81 / 85%)] via-primary/20 to-[rgb(214 228 81 / 28%)] transition-all duration-700 ${
        toolsAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 delay-300 ${toolsAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold mb-6 text-blue">🚀 Free! Hands-On Tools for Live Learning</h2>
          <p className="text-xl text-black-400 mb-4">
            Experience the <span className="font-bold text-primary-600 animate-pulse">CORE of upskilling</span> through our comprehensive toolkit
          </p>
          <p className="text-lg text-primary max-w-4xl mx-auto">
            Each live session is powered by industry-grade tools that provide real-world experience, 
            ensuring you're job-ready from day one.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-600 font-semibold text-base shadow-sm border border-green-200" style={{fontSize: '22px'}}>
              All tools are <strong className="text-3xl font-bold text-foreground/80 animate-pulse">100% FREE</strong> for learners!
              <br></br><br></br>
              Free For Lifetime!
            </span>
            <a
              href="https://demo.edcarsh.com" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-bold shadow hover:scale-105 transition-transform duration-200"
            >
              🎬 Try the Live Demo
            </a>
          </div>
        </div>

        {/* Tools List */}
        <ToolsList toolsAnimation={toolsAnimation}/>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-1000 ${toolsAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-primary/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">🎯 Ready to Experience Hands-On Learning?</h3>
            <p className="text-lg text-secondary-foreground mb-6">
              Join thousands of professionals who've accelerated their careers through our 
              <span className="font-bold text-primary-600 animate-pulse"> tool-focused approach</span> to upskilling! 🚀
            </p>
             <a
              href="https://demo.edcarsh.com" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-bold shadow hover:scale-105 transition-transform duration-200"
            >
              🎬 Try the Live Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsHighlightSection;
