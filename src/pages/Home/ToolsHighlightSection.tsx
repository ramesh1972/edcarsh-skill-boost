
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ToolsHighlightSection = () => {
  const { getIcon } = useTheme();
  const toolsAnimation = useScrollAnimation({ threshold: 0.1 });

  const tools = [
    {
      iconName: "course",
      iconColor: "text-blue-500",
      title: "Your Classroom",
      description: "Interactive virtual classroom environment designed for real-time learning with live instructor interaction and peer collaboration."
    },
    {
      iconName: "tools",
      iconColor: "text-green-500",
      title: "Your Performance",
      description: "Real-time analytics tracking your progress, strengths, and areas for improvement with detailed performance insights."
    },
    {
      iconName: "target",
      iconColor: "text-purple-500",
      title: "Your Learning Path",
      description: "Personalized roadmap tailored to your career goals, with adaptive milestones and skill progression tracking."
    },
    {
      iconName: "student",
      iconColor: "text-orange-500",
      title: "Truth AI",
      description: "AI-powered learning assistant providing instant feedback, personalized recommendations, and intelligent tutoring support."
    },
    {
      iconName: "instructor",
      iconColor: "text-red-500",
      title: "Instructor Q&A",
      description: "Direct access to expert instructors for real-time doubt resolution and personalized guidance during live sessions."
    },
    {
      iconName: "testimonial",
      iconColor: "text-indigo-500",
      title: "Community Discussion",
      description: "Vibrant peer-to-peer learning community for knowledge sharing, networking, and collaborative problem-solving."
    },
    {
      iconName: "tools",
      iconColor: "text-teal-500",
      title: "Ed Tools",
      description: "Industry-specific, subject-tailored tools and software platforms used in real-world professional environments."
    },
    {
      iconName: "help",
      iconColor: "text-pink-500",
      title: "Guides",
      description: "Comprehensive step-by-step guides and documentation to support your hands-on learning journey."
    },
    {
      iconName: "about",
      iconColor: "text-amber-500",
      title: "Articles",
      description: "Curated industry insights, best practices, and latest trends to complement your practical learning experience."
    }
  ];

  return (
    <section 
      ref={toolsAnimation.ref}
      className={`py-20 w-full mx-auto bg-gradient-to-r from-[#0f172a] via-primary/30 to-[#1e293b] transition-all duration-700 ${
        toolsAnimation.isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-700 delay-300 ${
            toolsAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold mb-6 text-white">Hands-On Tools for Live Learning</h2>
          <p className="text-xl text-gray-200 mb-4">
            Experience the <span className="font-bold text-primary">CORE of upskilling</span> through our comprehensive toolkit
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Each live session is powered by industry-grade tools that provide real-world experience, 
            ensuring you're job-ready from day one.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {tools.map((tool, index) => (
            <Card 
              key={index} 
              className={`text-center hover:shadow-2xl transition-all duration-700 hover:scale-105 hover:border-primary/50 group relative bg-background/90 backdrop-blur-sm border-primary/20 ${
                toolsAnimation.isVisible 
                  ? `opacity-100 ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}` 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: toolsAnimation.isVisible ? `${400 + index * 80}ms` : '0ms'
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-600/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="relative z-10">
                <div className="mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className={`relative z-10 ${tool.iconColor} [&>svg]:w-12 [&>svg]:h-12`}>
                    {getIcon(tool.iconName)}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors font-bold">
                  {tool.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
                  {tool.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-12 transition-all duration-700 delay-1000 ${
            toolsAnimation.isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-primary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Experience Hands-On Learning?</h3>
            <p className="text-gray-200 text-lg">
              Join thousands of professionals who've accelerated their careers through our 
              <span className="font-bold text-primary"> tool-focused approach</span> to upskilling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsHighlightSection;
