
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

  // Combine main and more nav items
  const allNavItems = [...mainNavItems, ...moreMenuItems];

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="outline" size="sm" className="lg:hidden text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-primary-foreground/20 bg-primary">
          <div className="w-full px-6 py-6 space-y-6">
            {/* Main Navigation Section */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-primary-foreground/70 mb-3 px-4">Navigation</p>
              {allNavItems.map(item => 
                <Link key={item.name} to={item.href} className={`flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-lg transition-colors ${isActiveRoute(item.href) ? 'bg-background text-foreground' : 'text-primary-foreground hover:bg-primary-foreground/10'}`} onClick={() => setIsMenuOpen(false)}>
                  {getIcon(item.icon)}
                  {item.name}
                </Link>
              )}
            </div>

            {/* Utility Actions Section */}
            <div className="border-t border-primary-foreground/20 pt-6">
              <p className="text-xs font-semibold text-primary-foreground/70 mb-4 px-4">Actions</p>
              
              {/* Action buttons grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 py-3">
                  <Calendar className="w-4 h-4" />
                  Live 2h
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-primary-foreground border-primary-foreground/30 py-3">
                  <Bell className="w-4 h-4" />
                  Inbox
                </Button>
              </div>

              {/* Theme Selector */}
              <div className="mb-4">
                <ThemeSelector />
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-3 px-4 py-4 border border-primary-foreground/20 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-foreground">User Profile</p>
                  <p className="text-xs text-primary-foreground/70">View settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
