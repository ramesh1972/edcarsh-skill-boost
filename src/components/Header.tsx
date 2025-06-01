
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Target, 
  Users, 
  MessageSquare, 
  HelpCircle, 
  Mail, 
  Info,
  User,
  Building2,
  ChevronDown,
  Video,
  Wrench,
  Play
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
  const { theme } = useTheme();

  const mainNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'My Dashboard', href: '/dashboard', icon: User },
    { name: 'All Courses', href: '/courses', icon: BookOpen },
    { name: 'Express Intent', href: '/express-intent', icon: Target },
    { name: 'Corporate', href: '/corporate', icon: Building2 },
    { name: 'About Instructors', href: '/instructors', icon: Users }
  ];

  const moreMenuItems = [
    { name: 'Testimonials', href: '/testimonials', icon: MessageSquare },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Help', href: '/help', icon: HelpCircle },
    { name: 'Demo', href: '/demo', icon: Play }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground rounded-xl p-3 shadow-lg">
            <span className="text-2xl font-bold">EC</span>
          </div>
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              EdCrash
            </span>
            <div className="text-xs text-muted-foreground -mt-1">Learn Fast. Succeed Faster.</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:shadow-sm"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
          
          {/* More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg">
                More
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {moreMenuItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link to={item.href} className="flex items-center gap-2 w-full">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right side items */}
        <div className="flex items-center space-x-3">
          {/* EdTools Button */}
          <Button 
            variant="outline" 
            size="lg" 
            className="hidden md:flex items-center gap-2 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 shadow-sm font-semibold"
          >
            <Wrench className="w-5 h-5" />
            <span className="hidden lg:inline">EdTools</span>
            <span className="lg:hidden">Tools</span>
          </Button>

          {/* Upcoming Live Session Button */}
          <Button 
            size="lg" 
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg font-semibold"
          >
            <Video className="w-5 h-5" />
            <span className="hidden lg:inline">Live Session in 2h</span>
            <span className="lg:hidden">Live 2h</span>
          </Button>

          {/* Theme Selector */}
          <ThemeSelector />

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
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur">
          <div className="container px-4 py-4 space-y-2">
            {/* Mobile EdTools and Live Session buttons */}
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                className="flex-1 items-center gap-2 bg-purple-50 text-purple-700 border-purple-200"
              >
                <Wrench className="w-4 h-4" />
                EdTools
              </Button>
              <Button 
                className="flex-1 items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600"
              >
                <Video className="w-4 h-4" />
                Live 2h
              </Button>
            </div>

            {/* Main nav items */}
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
            
            {/* More menu items */}
            <div className="border-t pt-3 mt-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">More</p>
              {moreMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
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
