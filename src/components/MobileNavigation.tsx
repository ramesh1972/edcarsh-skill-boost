
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { MobileUtilityActions } from './MobileUtilityActions';

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
            <MobileUtilityActions setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>
      )}
    </>
  );
};
