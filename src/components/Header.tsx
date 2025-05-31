
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
  Calendar,
  TrendingUp,
  MapPin,
  Brain,
  MessageCircle,
  Calculator,
  FileText,
  Newspaper,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from './ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLevel2Open, setIsLevel2Open] = useState(false);
  const { theme } = useTheme();

  const level1NavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'My Dashboard', href: '/dashboard', icon: User },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Express Intent', href: '/express-intent', icon: Target },
    { name: 'Instructors', href: '/instructors', icon: Users },
    { name: 'Testimonials', href: '/testimonials', icon: MessageSquare },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'About Us', href: '/about', icon: Info }
  ];

  const level2NavItems = [
    { name: 'Your Classroom', href: '/classroom', icon: BookOpen },
    { name: 'Your Performance', href: '/performance', icon: TrendingUp },
    { name: 'Your Learning Path', href: '/learning-path', icon: MapPin },
    { name: 'Truth AI', href: '/truth-ai', icon: Brain },
    { name: 'Instructor Q&A', href: '/instructor-qa', icon: MessageCircle },
    { name: 'Community Discussion', href: '/community', icon: MessageSquare },
    { name: 'Calculators', href: '/calculators', icon: Calculator },
    { name: 'Guides', href: '/guides', icon: FileText },
    { name: 'Articles', href: '/articles', icon: Newspaper }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground rounded-lg p-2">
            <span className="text-xl font-bold">EC</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            EdCrash
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {level1NavItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side items */}
        <div className="flex items-center space-x-2">
          {/* Upcoming Session Link */}
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
            <Video className="w-4 h-4" />
            <span className="hidden lg:inline">Live Session in 2h</span>
            <span className="lg:hidden">Live 2h</span>
          </Button>

          {/* Theme Selector */}
          <ThemeSelector />

          {/* Level 2 Navigation Toggle */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsLevel2Open(!isLevel2Open)}
            className="hidden md:flex"
          >
            More
          </Button>

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

      {/* Level 2 Navigation */}
      {isLevel2Open && (
        <div className="border-t bg-muted/50 hidden md:block">
          <div className="container px-4 py-2">
            <div className="flex flex-wrap gap-1">
              {level2NavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <item.icon className="w-3 h-3" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-2">
            {level1NavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            <div className="border-t pt-2 mt-2">
              <p className="text-xs font-semibold text-muted-foreground mb-2">More Tools</p>
              {level2NavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
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
