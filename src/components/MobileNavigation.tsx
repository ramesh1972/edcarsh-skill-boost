
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeSelector } from './ThemeSelector';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      <Button variant="outline" size="sm" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-primary-foreground/20 bg-primary z-50">
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

            {/* Secondary Menu Section */}
            <div className="border-t border-primary-foreground/20 pt-6">
              {/* Row: Theme, Inbox, and Profile */}
              <div className="flex items-center gap-3 px-4">
                {/* Theme Selector */}
                <ThemeSelector />
                
                {/* Inbox Button */}
                <Button variant="outline" className="flex items-center gap-2 text-primary-foreground border-primary-foreground/30">
                  <Bell className="w-4 h-4" />
                  Inbox
                </Button>

                {/* Profile Section */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 px-3 py-2 border border-primary-foreground/20 rounded-lg cursor-pointer hover:bg-primary-foreground/10 transition-colors">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="" alt="Profile" />
                        <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                          <User className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-primary-foreground">Profile</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
