import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { HeaderLogo } from './HeaderLogo';
import { MainMenuNavigation } from '../menu/MainMenuNavigation';
import { SecondaryMenuNavigation } from '../menu/SecondaryMenuNavigation';
import { MobileNavigation } from '../menu/MobileNavigation';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getSkinClasses } = useTheme();
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
    // Check if we're on the exact route
    if (location.pathname === href) {
      return true;
    }

    // Special case: if we're on a course view page and it came from Home, highlight Home tab
    if (href === '/' && location.pathname.startsWith('/courses/')) {
      const storedReferrer = sessionStorage.getItem('courseViewReferrer');
      return storedReferrer === '/';
    }

    return false;
  };

  return (
    <>
      <header className={`w-full bg-primary ${getSkinClasses()} relative z-10 mt-0`} style={{ height: '80px' }}>
        <div className="w-full max-w-none flex items-center justify-between px-6 lg:px-[32px] h-full">
          {/* Logo Section - Left */}
          <div className="flex-shrink-0">
            <HeaderLogo />
          </div>

          {/* Navigation Section - Center */}
          <div className="flex-1 flex justify-left" style={{ marginLeft: '40px' }}>
            <MainMenuNavigation
              mainNavItems={mainNavItems}
              moreMenuItems={moreMenuItems}
              isActiveRoute={isActiveRoute}
            />
          </div>

          {/* Secondary Menu Section - Right */}
          <div className="flex-shrink-0">
            <div className="hidden lg:block">
              <SecondaryMenuNavigation setIsMenuOpen={setIsMenuOpen} />
            </div>

            <MobileNavigation
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              mainNavItems={mainNavItems}
              moreMenuItems={moreMenuItems}
              isActiveRoute={isActiveRoute}
            />
          </div>
        </div>
      </header>
    </>
  );
};
