
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from './ThemeSelector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  mainNavItems: NavigationItem[];
  moreMenuItems: NavigationItem[];
  isActiveRoute: (href: string) => boolean;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  mainNavItems,
  moreMenuItems,
  isActiveRoute
}) => {
  const { getIcon } = useTheme();

  // Calculate positions for circular arrangement
  const radius = 15; // 15% of viewport height
  const centerX = 50; // Center horizontally
  const centerY = 100; // Bottom of screen (semi-circle)
  
  // Combine all navigation items for circular arrangement
  const allNavItems = [...mainNavItems, ...moreMenuItems];
  
  const getCircularPosition = (index: number, total: number) => {
    // Arrange items in a semi-circle from left to right
    const angle = (Math.PI / (total + 1)) * (index + 1); // Distribute across 180 degrees
    const x = centerX + (radius * Math.cos(angle));
    const y = centerY - (radius * Math.sin(angle));
    return { x, y };
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="outline" size="sm" className="lg:hidden text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Mobile Navigation - Semi-circular overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-primary/95 backdrop-blur-sm">
          {/* Profile at top right */}
          <div className="absolute top-6 right-6">
            <div className="flex items-center gap-3 px-4 py-3 border border-primary-foreground/20 rounded-full bg-primary-foreground/10">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary-foreground">User</p>
              </div>
            </div>
          </div>

          {/* Theme Selector at top left */}
          <div className="absolute top-6 left-6">
            <ThemeSelector />
          </div>

          {/* Live Session and Inbox buttons at top center */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-3">
            <Button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2">
              <Calendar className="w-4 h-4" />
              Live 2h
            </Button>
            <Button variant="outline" className="flex items-center gap-2 text-primary-foreground border-primary-foreground/30 px-4 py-2">
              <Bell className="w-4 h-4" />
              Inbox
            </Button>
          </div>

          {/* Semi-circular navigation items */}
          <div className="absolute inset-0">
            {allNavItems.map((item, index) => {
              const position = getCircularPosition(index, allNavItems.length);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                    isActiveRoute(item.href) 
                      ? 'bg-background text-foreground shadow-lg' 
                      : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
                  }`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-current/10">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-medium text-center whitespace-nowrap">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Close button at center bottom */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
