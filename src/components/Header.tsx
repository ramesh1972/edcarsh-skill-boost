import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const [selectedMoreItem, setSelectedMoreItem] = useState<any>(null);
  const { theme, getSkinClasses, getIcon } = useTheme();
  const location = useLocation();

  // All navigation items
  const allNavItems = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'My Dashboard', href: '/dashboard', icon: 'student' },
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

  // Dynamic menu calculation
  const getMenuItems = () => {
    const baseMainItems = allNavItems.slice(0, 5);
    let mainItems = [...baseMainItems];
    let moreItems = allNavItems.slice(5);

    if (selectedMoreItem) {
      // Add selected item as 6th item
      mainItems.push(selectedMoreItem);
      // Remove it from more items
      moreItems = moreItems.filter(item => item.href !== selectedMoreItem.href);
    }

    return { mainItems, moreItems };
  };

  const { mainItems, moreItems } = getMenuItems();

  // Handle more menu item selection
  const handleMoreItemClick = (item: any) => {
    setSelectedMoreItem(item);
  };

  // Check if current route is in more menu originally and set it as selected
  useEffect(() => {
    const currentItem = allNavItems.find(item => item.href === location.pathname);
    const isInMoreMenu = allNavItems.slice(5).some(item => item.href === location.pathname);
    
    if (currentItem && isInMoreMenu) {
      setSelectedMoreItem(currentItem);
    }
  }, [location.pathname]);

  // Check if a menu item is active
  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  // Check if any more menu item is active
  const isMoreMenuActive = () => {
    return moreItems.some(item => location.pathname === item.href);
  };

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
        <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
          <div className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground rounded-xl p-2">
            <span className="text-lg font-bold">EC</span>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              EdCrash
            </span>
            <div className="text-xs text-muted-foreground -mt-1">Learn Fast. Succeed Faster.</div>
          </div>
        </Link>

        {/* Desktop Navigation - Left aligned after logo */}
        <nav className="hidden lg:flex items-center space-x-2 flex-1 justify-start ml-8">
          {mainItems.map((item) => (
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
          
          {/* More Dropdown - only show if there are items */}
          {moreItems.length > 0 && (
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
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link 
                      to={item.href} 
                      className={`flex items-center gap-2 w-full ${
                        isActiveRoute(item.href)
                          ? 'bg-primary/10 text-primary font-semibold'
                          : ''
                      }`}
                      onClick={() => handleMoreItemClick(item)}
                    >
                      {getIcon(item.icon)}
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Right-aligned tools */}
        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
          {/* EdTools Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 font-semibold text-xs"
          >
            {getIcon('tools')}
            EdTools
          </Button>

          {/* Upcoming Live Session Button */}
          <Button 
            size="sm" 
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 font-semibold text-xs"
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
        <div className={`lg:hidden ${getHeaderBackground()}`}>
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

            {/* All nav items for mobile - no separation */}
            {allNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-lg transition-colors ${
                  isActiveRoute(item.href)
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {getIcon(item.icon)}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
