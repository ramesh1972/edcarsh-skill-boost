
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from '../ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

interface MobileMenuProps {
  items: NavigationItem[];
  isOpen: boolean;
  onClose: () => void;
  getHeaderBackground: () => string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  items, 
  isOpen, 
  onClose, 
  getHeaderBackground 
}) => {
  const { getIcon } = useTheme();
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  if (!isOpen) return null;

  return (
    <div className={`lg:hidden ${getHeaderBackground()}`}>
      <div className="w-full px-6 py-6 space-y-3">
        {/* Mobile EdTools and Live Session buttons */}
        <div className="flex gap-3 mb-6">
          <Button 
            variant="outline" 
            className="flex-1 items-center gap-2 bg-purple-50 text-purple-700 border-purple-200 py-3"
          >
            {getIcon('tools')}
            EdTools
          </Button>
          <Button 
            className="flex-1 items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 py-3"
          >
            {getIcon('live')}
            Live 2h
          </Button>
        </div>

        {/* Theme Selector for mobile */}
        <div className="mb-6">
          <ThemeSelector />
        </div>

        {/* All nav items for mobile - no separation */}
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-lg transition-colors ${
              isActiveRoute(item.href)
                ? 'bg-primary/10 text-primary font-semibold'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
            onClick={onClose}
          >
            {getIcon(item.icon)}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
