import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Tool {
  iconName: string;
  iconColor: string;
  title: string;
  description: string;
}

interface ToolsListProps {
  toolsAnimation: any;
}

const tools = [{
  iconName: "course",
  iconColor: "text-blue-500",
  title: "Your Classroom",
  description: "Interactive virtual classroom environment designed for real-time learning with live instructor interaction and peer collaboration."
}, {
  iconName: "tools",
  iconColor: "text-green-500",
  title: "Your Performance",
  description: "Real-time analytics tracking your progress, strengths, and areas for improvement with detailed performance insights."
}, {
  iconName: "target",
  iconColor: "text-purple-500",
  title: "Your Learning Path",
  description: "Personalized roadmap tailored to your career goals, with adaptive milestones and skill progression tracking."
}, {
  iconName: "tools",
  iconColor: "text-teal-500",
  title: "Ed Tools",
  description: "Industry-specific, subject-tailored tools and software platforms used in real-world professional environments."
}, {
  iconName: "student",
  iconColor: "text-orange-500",
  title: "Truth AI",
  description: "AI-powered learning assistant providing instant feedback, personalized recommendations, and intelligent tutoring support."
}, {
  iconName: "instructor",
  iconColor: "text-red-500",
  title: "Instructor Q&A",
  description: "Direct access to expert instructors for real-time doubt resolution and personalized guidance during live sessions."
}, {
  iconName: "testimonial",
  iconColor: "text-indigo-500",
  title: "Community Discussion",
  description: "Vibrant peer-to-peer learning community for knowledge sharing, networking, and collaborative problem-solving."
}, {
  iconName: "help",
  iconColor: "text-pink-500",
  title: "Guides",
  description: "Comprehensive step-by-step guides and documentation to support your hands-on learning journey."
}, {
  iconName: "about",
  iconColor: "text-amber-500",
  title: "Articles",
  description: "Curated industry insights, best practices, and latest trends to complement your practical learning experience."
}];

const ToolsList: React.FC<ToolsListProps> = ({ toolsAnimation }) => {
  toolsAnimation.isVisible = true; // Force visibility for demo purposes
  const { getIcon } = useTheme();
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {tools.map((tool, index) => (
        <div
          key={index}
          className={`rounded-xl p-4 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02] group relative overflow-hidden ${toolsAnimation.isVisible
              ? `opacity-100 ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`
              : 'opacity-0 translate-y-10'
            }`}
          style={{
            transitionDelay: toolsAnimation.isVisible ? `${400 + index * 80}ms` : '0ms',
          }}
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-transparent"></div>

          {/* Horizontal Layout: Icon + Tool Name Square + Description */}
          <div className="relative z-10 flex items-center gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div
                  className={`relative z-10 ${tool.iconColor} [&>svg]:w-10 [&>svg]:h-10 transform group-hover:scale-110 transition-transform duration-300 !shadow-none !border-none`}
                >
                  {getIcon(tool.iconName)}
                </div>
              </div>
            </div>

            {/* Tool Name Square */}
            <div className="flex-shrink-0">
              <div className="w-40 h-20 flex p-2 items-center justify-center border-2 border-secondary bg-primary/80 rounded-lg group-hover:border-primary/70 transition-all duration-300 transform group-hover:scale-105">
                <h3 className="text-lg font-bold text-secondary text-center leading-tight ">{tool.title}</h3>
              </div>
            </div>

            {/* Tool Description */}
            <div className="flex-1">
              <div className="rounded-lg p-4 border border-muted/40 group-hover:border-muted/60 transition-all duration-300">
                <p className="text-base text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                  ✨ {tool.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sparkle effect on hover */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-ping"></div>
          </div>
          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <div className="w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsList;
