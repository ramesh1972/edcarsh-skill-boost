
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useMenuLogic } from '@/hooks/useMenuLogic';
import { Logo } from './header/Logo';
import { NavigationItems } from './header/NavigationItems';
import { MoreDropdown } from './header/MoreDropdown';
import { ToolsSection } from './header/ToolsSection';
import { MobileMenu } from './header/MobileMenu';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, getSkinClasses } = useTheme();

  // Navigation items without dashboard (now in tools section)
  const allNavItems = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'All Courses', href: '/courses', icon: 'course' },
    { name: 'Express Intent', href: '/express-intent', icon: 'target' },
    { name: 'Corporate', href: '/corporate', icon: 'building' },
    { name: 'About Instructors', href: '/instructors', icon: 'instructor' },
    { name: 'Testimonials', href: '/testimonials', icon: 'testimonial' },
    { name: 'FAQ', href: '/faq', icon: 'help' },
    { name: 'Contact', href: '/contact', icon: 'contact' },
    { name: 'About', href: '/about', icon: 'about' },
    { name: 'Help', href: '/help', icon: 'help' },
    { name: 'Demo', href: '/demo', icon: 'live' }
  ];

  const { mainItems, moreItems, handleMoreItemClick } = useMenuLogic(allNavItems);

  // Get skin-specific header background classes - remove shadows and borders
  const getHeaderBackground = () => {
    switch (theme.skin) {
      case 'gradient':
        return 'bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-xl';
      case 'textured':
        return 'bg-background/98 backdrop-blur-sm';
      case 'glassmorphism':
        return 'bg-background/20 backdrop-blur-2xl';
      default:
        return 'bg-background/95 backdrop-blur';
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full supports-[backdrop-filter]:bg-background/60 ${getHeaderBackground()} ${getSkinClasses()}`}>
      {/* Single line - Logo, main navigation, and right-aligned tools */}
      <div className="w-full max-w-none flex h-12 items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation - Left aligned after logo */}
        <nav className="hidden lg:flex items-center space-x-2 flex-1 justify-start ml-8">
          <NavigationItems items={mainItems} />
          <MoreDropdown items={moreItems} onItemClick={handleMoreItemClick} />
        </nav>

        {/* Right-aligned tools */}
        <ToolsSection />

        {/* Mobile menu button */}
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu 
        items={allNavItems}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        getHeaderBackground={getHeaderBackground}
      />
    </header>
  );
};
