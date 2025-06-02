
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, Calendar, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from './ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    theme,
    getSkinClasses,
    getIcon
  } = useTheme();
  const location = useLocation();
  const mainNavItems = [{
    name: 'Home',
    href: '/',
    icon: 'home'
  }, {
    name: 'My Dashboard',
    href: '/dashboard',
    icon: 'student'
  }, {
    name: 'All Courses',
    href: '/courses',
    icon: 'course'
  }, {
    name: 'Express Intent',
    href: '/express-intent',
    icon: 'target'
  }, {
    name: 'Corporate',
    href: '/corporate',
    icon: 'building'
  }];
  const moreMenuItems = [{
    name: 'About Instructors',
    href: '/instructors',
    icon: 'instructor'
  }, {
    name: 'Testimonials',
    href: '/testimonials',
    icon: 'testimonial'
  }, {
    name: 'FAQ',
    href: '/faq',
    icon: 'help'
  }, {
    name: 'Contact',
    href: '/contact',
    icon: 'contact'
  }, {
    name: 'About',
    href: '/about',
    icon: 'about'
  }, {
    name: 'Help',
    href: '/help',
    icon: 'help'
  }, {
    name: 'Demo',
    href: '/demo',
    icon: 'live'
  }];
  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };
  return <>
    <style>{`
      .tab-curved {
        position: relative;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
      }
      .tab-curved::before,
      .tab-curved::after {
          content: '';
          position: absolute;
          bottom: 0;
          width: 25px;
          height: 25px;
          background: hsl(var(--primary));
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
    <header className={`w-full bg-primary ${getSkinClasses()} relative z-10`} style={{ marginTop: '8px' }}>
      {/* Single line - Logo, main navigation, and right-aligned tools */}
      <div className="w-full max-w-none flex h-12 items-center justify-between px-6 lg:px-[32px] my-[18px]">
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
          {mainNavItems.map(item => <Link key={item.name} to={item.href} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 relative ${isActiveRoute(item.href) ? 'bg-background text-foreground shadow-lg tab-curved' : 'text-primary-foreground hover:bg-primary-foreground/10 rounded-t-lg'}`} style={isActiveRoute(item.href) ? {
              marginBottom: '-10px',
              paddingBottom: '12px',
              zIndex: 20
            } : {}}>
              {getIcon(item.icon)}
              {item.name}
            </Link>)}
          
          {/* More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 px-3 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground hover:bg-primary-foreground/10">
                More
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {moreMenuItems.map(item => <DropdownMenuItem key={item.name} asChild>
                  <Link to={item.href} className="flex items-center gap-2 w-full">
                    {getIcon(item.icon)}
                    {item.name}
                  </Link>
                </DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right-aligned tools */}
        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
          {/* Theme Selector */}
          <ThemeSelector />

          {/* Live Session Button */}
          <Button size="sm" className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg font-semibold text-xs">
            <Calendar className="w-4 h-4" />
            Live Session in 2h
          </Button>

          {/* Inbox Button */}
          <Button variant="outline" size="sm" className="flex items-center gap-2 px-3 py-1.5 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
            <Bell className="w-4 h-4" />
            Inbox
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 py-2 text-primary-foreground hover:bg-primary-foreground/10">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xs">
                    <User className="w-3 h-3" />
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <Button variant="outline" size="sm" className="lg:hidden text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="lg:hidden border-t border-primary-foreground/20 bg-primary">
          <div className="w-full px-6 py-6 space-y-3">
            {/* Mobile Theme, Live Session, Inbox and Profile buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 py-3">
                <Calendar className="w-4 h-4" />
                Live 2h
              </Button>
              <Button variant="outline" className="flex items-center gap-2 text-primary-foreground border-primary-foreground/30 py-3">
                <Bell className="w-4 h-4" />
                Inbox
              </Button>
            </div>

            {/* Theme Selector for mobile */}
            <div className="mb-6">
              <ThemeSelector />
            </div>

            {/* Profile Section for mobile */}
            <div className="flex items-center gap-3 px-4 py-4 border border-primary-foreground/20 rounded-lg mb-6">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary-foreground">User Profile</p>
                <p className="text-xs text-primary-foreground/70">View settings</p>
              </div>
            </div>

            {/* Main nav items */}
            {mainNavItems.map(item => <Link key={item.name} to={item.href} className={`flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-lg transition-colors ${isActiveRoute(item.href) ? 'bg-background text-foreground' : 'text-primary-foreground hover:bg-primary-foreground/10'}`} onClick={() => setIsMenuOpen(false)}>
                {getIcon(item.icon)}
                {item.name}
              </Link>)}
            
            {/* More menu items */}
            <div className="border-t border-primary-foreground/20 pt-4 mt-4">
              <p className="text-xs font-semibold text-primary-foreground/70 mb-3 px-4">More</p>
              {moreMenuItems.map(item => <Link key={item.name} to={item.href} className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {getIcon(item.icon)}
                  {item.name}
                </Link>)}
            </div>
          </div>
        </div>}
    </header>
  </>;
};
