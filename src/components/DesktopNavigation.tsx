
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

interface DesktopNavigationProps {
  mainNavItems: NavigationItem[];
  moreMenuItems: NavigationItem[];
  isActiveRoute: (href: string) => boolean;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  mainNavItems,
  moreMenuItems,
  isActiveRoute
}) => {
  const { getIcon } = useTheme();

  return (
    <nav className="hidden lg:flex items-center space-x-2 flex-1 justify-start ml-8 mt-[22px]">
      {mainNavItems.map(item => 
        <div key={item.name} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap !rounded-t-lg relative ${isActiveRoute(item.href) ? 'bg-background text-foreground shadow-lg tab-curved' : 'text-primary-foreground hover:bg-primary-foreground/10'}`} style={isActiveRoute(item.href) ? {
          marginBottom: '-6px',
          paddingBottom: '16px',
          zIndex: 20
        } : {}}>
          <Link to={item.href} className="flex items-center gap-2">
            {getIcon(item.icon)}
            {item.name}
          </Link>
        </div>
      )}
      
      {/* More Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 px-3 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground hover:bg-primary-foreground/10">
            More
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {moreMenuItems.map(item => 
            <DropdownMenuItem key={item.name} asChild>
              <Link to={item.href} className="flex items-center gap-2 w-full">
                {getIcon(item.icon)}
                {item.name}
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
