
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

  return (
    <header className={`w-full bg-primary border-b border-primary-foreground/20 ${getSkinClasses()}`}>
      {/* Single line - Logo, main navigation, and right-aligned tools */}
      <div className="w-full max-w-none flex h-12 items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
          <div className="bg-gradient-to-br from-primary-foreground to-primary-foreground/80 text-primary rounded-xl p-2 shadow-lg">
            <span className="text-lg font-bold">EC</span>
          </div>
          <div>
            <span className="text-xl font-bold text-primary-foreground">
              EdCrash
            </span>
            <div className="text-xs text-primary-foreground/70 -mt-1">Learn Fast. Succeed Faster.</div>
          </div>
        </Link>

        {/* Desktop Navigation - Left aligned after logo */}
        <nav className="hidden lg:flex items-center space-x-2 flex-1 justify-start ml-8">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-200 whitespace-nowrap rounded-md"
            >
              {getIcon(item.icon)}
              {item.name}
            </Link>
          ))}
          
          {/* More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 px-3 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground hover:bg-primary-foreground/10">
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
          className="lg:hidden text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-primary-foreground/20 bg-primary">
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
                className="flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {getIcon(item.icon)}
                {item.name}
              </Link>
            ))}
            
            {/* More menu items */}
            <div className="border-t border-primary-foreground/20 pt-4 mt-4">
              <p className="text-xs font-semibold text-primary-foreground/70 mb-3 px-4">More</p>
              {moreMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
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
