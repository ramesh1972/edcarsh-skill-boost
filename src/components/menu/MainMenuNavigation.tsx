import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';

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
                /* Gradient border using border-image for active tab */
                border-top: 3px solid;
                border-image: linear-gradient(90deg, hsl(var(--primary) / 0.85) 0%, hsl(var(--background-hue) 60% 80% / 0.85) 100%) 1;
                /* Optionally, add a subtle box-shadow for elevation */
                box-shadow: 0 4px 24px 0 hsl(var(--background-hue) 30% 40% / 0.10), 0 1.5px 0 0 hsl(var(--background-hue) 30% 80% / 0.25);
            }
            .tab-curved::before,
            .tab-curved::after {
                content: '';
                position: absolute;
                bottom: -6px;
                width: 25px;
                height: 21px;
                /* Gradient background for corners */
                background: bg-background linear-gradient(to bottom, hsl(var(--background)/100), hsl(var(--primary)/10));
                height: 25px;
                z-index: 1;
                /* Gradient border for the curved ends */
                border-top: 3px solid;
                border-image: linear-gradient(90deg, hsl(var(--primary) / 0.85) 0%, hsl(var(--background-hue) 60% 80% / 0.85) 100%) 1;
                background: none;
            }
            .tab-curved::before {
                left: -15px;
                border-bottom-right-radius: 25px;
                border-left: none;
                border-right: none;
                border-bottom: none;
            }
            .tab-curved::after {
                right: -15px;
                border-bottom-left-radius: 25px;
                border-left: none;
                border-right: none;
                border-bottom: none;
            }
          `}</style>

      <div className="fixed bg-primary z-10 overflow-hidden px-[15px]" style={{ marginTop: '-12px' }}>
        <nav className="hidden lg:flex items-center justify-left">
          {mainNavItems.map(item =>
            <div
              key={item.name}
              className={`flex items-center gap-2 px-3 py-2 text-xs  whitespace-nowrap !rounded-t-lg relative ${isActiveRoute(item.href) ?
                'bg-background bg-gradient-to-b from-primary/40 to-background/100 border-0 text-foreground ' :
                'text-primary-foreground hover:bg-primary-foreground/30'
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
