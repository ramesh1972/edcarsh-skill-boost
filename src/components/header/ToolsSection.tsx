
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from '../ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';

export const ToolsSection: React.FC = () => {
  const { getIcon } = useTheme();

  return (
    <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
      {/* EdTools Button */}
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 font-semibold text-xs"
      >
        {getIcon('tools')}
        EdTools
      </Button>

      {/* Upcoming Live Session Button */}
      <Button 
        size="sm" 
        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 font-semibold text-xs"
      >
        {getIcon('live')}
        Live Session in 2h
      </Button>

      {/* Theme Selector */}
      <ThemeSelector />
    </div>
  );
};
