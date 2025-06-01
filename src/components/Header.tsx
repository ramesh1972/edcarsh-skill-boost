
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from './ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, getSkinClasses, getIcon } = useTheme();

  const mainNavItems = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'My Dashboard', href: '/dashboard', icon: 'student' },
    { name: 'All Courses', href: '/courses', icon: 'course' },
    { name: 'Express Intent', href: '/express-intent', icon: 'target' },
    { name: 'Corporate', href: '/corporate', icon: 'building' }
  ];

  const moreMenuItems = [
    { name: 'About Instructors', href: '/instructors', icon: 'instructor' },
    { name: 'Testimonials', href: '/testimonials', icon: 'testimonial' },
    { name: 'FAQ', href: '/faq', icon: 'help' },
    { name: 'Contact', href: '/contact', icon: 'contact' },
    { name: 'About', href: '/about', icon: 'about' },
    { name: 'Help', href: '/help', icon: 'help' },
    { name: 'Demo', href: '/demo', icon: 'live' }
  ];

  // Get skin-specific header background classes
  const getHeaderBackground = () => {
    switch (theme.skin) {
      case 'gradient':
        return 'bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-xl border-border/50';
      case 'textured':
        return 'bg-background/98 backdrop-blur-sm border-2 border-border/60 shadow-lg';
      case 'glassmorphism':
        return 'bg-background/20 backdrop-blur-2xl border border-white/20 shadow-2xl';
      default:
        return 'bg-background/95 backdrop-blur';
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b supports-[backdrop-filter]:bg-background/60 ${getHeaderBackground()} ${getSkinClasses()}`}>
      {/* Single line - Logo, main navigation, and right-aligned tools */}
      <div className="w-full max-w-none flex h-14 items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
          <div className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground rounded-xl p-2 shadow-lg">
            <span className="text-lg font-bold">EC</span>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              EdCrash
            </span>
            <div className="text-xs text-muted-foreground -mt-1">Learn Fast. Succeed Faster.</div>
          </div>
        </Link>

        {/* Desktop Navigation - Main nav items only */}
        <nav className="hidden lg:flex items-center space-x-2 flex-1 justify-center max-w-3xl mx-6">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:shadow-sm whitespace-nowrap"
            >
              {getIcon(item.icon)}
              {item.name}
            </Link>
          ))}
          
          {/* More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap">
                More
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {moreMenuItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link to={item.href} className="flex items-center gap-2 w-full">
                    {getIcon(item.icon)}
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right-aligned tools */}
        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
          {/* EdTools Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 shadow-sm font-semibold text-xs"
          >
            {getIcon('tools')}
            EdTools
          </Button>

          {/* Upcoming Live Session Button */}
          <Button 
            size="sm" 
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg font-semibold text-xs"
          >
            {getIcon('live')}
            Live Session in 2h
          </Button>

          {/* Theme Selector */}
          <ThemeSelector />
        </div>

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
      {isMenuOpen && (
        <div className={`lg:hidden border-t ${getHeaderBackground()}`}>
          <div className="w-full px-6 py-6 space-y-3">
            {/* Mobile EdTools and Live Session buttons */}
            <div className="flex gap-3 mb-6">
              <Button 
                variant="outline" 
                className="flex-1 items-center gap-2 bg-purple-50 text-purple-700 border-purple-200 py-3"
              >
                {getIcon('tools')}
                EdTools
              </Button>
              <Button 
                className="flex-1 items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 py-3"
              >
                {getIcon('live')}
                Live 2h
              </Button>
            </div>

            {/* Theme Selector for mobile */}
            <div className="mb-6">
              <ThemeSelector />
            </div>

            {/* Main nav items */}
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {getIcon(item.icon)}
                {item.name}
              </Link>
            ))}
            
            {/* More menu items */}
            <div className="border-t pt-4 mt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3 px-4">More</p>
              {moreMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getIcon(item.icon)}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
