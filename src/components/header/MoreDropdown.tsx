
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

interface MoreDropdownProps {
  items: NavigationItem[];
  onItemClick: (item: NavigationItem) => void;
}

export const MoreDropdown: React.FC<MoreDropdownProps> = ({ items, onItemClick }) => {
  const { getIcon } = useTheme();
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const isMoreMenuActive = () => {
    return items.some(item => location.pathname === item.href);
  };

  if (items.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium whitespace-nowrap ${
            isMoreMenuActive()
              ? 'bg-primary/10 text-primary font-semibold'
              : ''
          }`}
        >
          More
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg">
        {items.map((item) => (
          <DropdownMenuItem key={item.name} asChild>
            <Link 
              to={item.href} 
              className={`flex items-center gap-2 w-full ${
                isActiveRoute(item.href)
                  ? 'bg-primary/10 text-primary font-semibold'
                  : ''
              }`}
              onClick={() => onItemClick(item)}
            >
              {getIcon(item.icon)}
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
