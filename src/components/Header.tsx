
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { HeaderLogo } from './HeaderLogo';
import { MainMenuNavigation } from './MainMenuNavigation';
import { SecondaryMenuNavigation } from './SecondaryMenuNavigation';
import { MobileNavigation } from './MobileNavigation';

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
    return location.pathname === href;
  };

  return (
    <>
      <style>{`
        .tab-curved {
          position: relative;
        }
        .tab-curved::before,
        .tab-curved::after {
            content: '';
            position: absolute;
            bottom: -7px;
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
      <header className={`w-full bg-primary ${getSkinClasses()} relative z-10 mt-4`} style={{ height: '80px' }}>
        <div className="w-full max-w-none flex items-center justify-between px-6 lg:px-[32px] h-full">
          <HeaderLogo />

          <MainMenuNavigation 
            mainNavItems={mainNavItems}
            moreMenuItems={moreMenuItems}
            isActiveRoute={isActiveRoute}
          />

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
      </header>
    </>
  );
};
