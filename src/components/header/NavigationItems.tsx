
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

interface NavigationItemsProps {
  items: NavigationItem[];
}

export const NavigationItems: React.FC<NavigationItemsProps> = ({ items }) => {
  const { getIcon } = useTheme();
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
            isActiveRoute(item.href)
              ? 'bg-primary/10 text-primary font-semibold'
              : 'hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {getIcon(item.icon)}
          {item.name}
        </Link>
      ))}
    </>
  );
};
