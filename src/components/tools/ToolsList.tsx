import React from 'react';
import { useTheme } from '@/hooks/useTheme';

import tools from '@/data/tools'; // Assuming you have a tools data file

interface Tool {
  iconName: string;
  iconColor: string;
  title: string;
  description: string;
}

interface ToolsListProps {
  toolsAnimation: { isVisible: boolean };
}

const ToolsList: React.FC<ToolsListProps> = ({  toolsAnimation }) => {
  const { getIcon } = useTheme();
  const toolsData = tools || [];
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {toolsData.map((tool, index) => (
        <div
          key={index}
          className={`rounded-xl p-4 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02] group relative overflow-hidden border-2 ${toolsAnimation.isVisible
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
