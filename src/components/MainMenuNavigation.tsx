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

interface MainMenuNavigationProps {
  mainNavItems: NavigationItem[];
  moreMenuItems: NavigationItem[];
  isActiveRoute: (href: string) => boolean;
}

export const MainMenuNavigation: React.FC<MainMenuNavigationProps> = ({
  mainNavItems,
  moreMenuItems,
  isActiveRoute
}) => {
  const { getIcon } = useTheme();

  return (
    <>
      <style>{`
            .tab-curved {
                position: relative;
            }
            .tab-curved::before,
            .tab-curved::after {
                content: '';
                position: absolute;
                bottom: -7px;
                width: 25px;
                height: 21px;
                /* Gradient background for corners */
                background: bg-background linear-gradient(to bottom, hsl(var(--background)/1), hsl(var(--primary)/1));
            }
            .tab-curved::before {
                left: -15px;
                border-bottom-right-radius: 25px;
                border: 10px solid hsl(var(--background));
                border-top: none;
                border-left: none;
            }
            .tab-curved::after {
                right: -15px;
                border-bottom-left-radius: 25px;
                border: 10px solid hsl(var(--background));
                border-top: none;
                border-right: none;
            }
          `}</style>

      <div className="fixed bg-primary z-10 overflow-hidden px-[15px]" style={{ marginTop: '-12px' }}>
        <nav className="hidden lg:flex items-center justify-left">
          {mainNavItems.map(item =>
            <div
              key={item.name}
              className={`flex items-center gap-2 px-3 py-2 text-xs  whitespace-nowrap !rounded-t-lg relative ${isActiveRoute(item.href) ?
                'bg-background bg-gradient-to-b from-primary/25 to-background/100 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 text-foreground tab-curved' :
                'text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              style={isActiveRoute(item.href) ? {
                fontSize: '.93rem',
                marginTop: '12px',
                marginBottom: '-6px',
                paddingBottom: '18px',
                zIndex: 20
              } : {
                fontSize: '.93rem',
                marginTop: '12px',
                marginBottom: '-6px',
                paddingBottom: '18px',
                zIndex: 18
              }}
            >
              <Link to={item.href} className="flex items-center gap-2">
                {getIcon(item.icon)}
                {item.name}
              </Link>
            </div>
          )}

          {/* More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 px-6 mt-2 text-sm font-medium whitespace-nowrap text-primary-foreground hover:bg-primary-foreground/10">
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
      </div>
    </>
  );
};
