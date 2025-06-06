
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const ToolsNavigation: React.FC = () => {
  const { getIcon } = useTheme();
  const location = useLocation();

  const tabItems = [
    {
      name: 'Your Classroom',
      href: '/classroom',
      icon: 'course'
    },
    {
      name: 'Your Analytics',
      href: '/analytics',
      icon: 'tools'
    },
    {
      name: 'Your Learning Path',
      href: '/learning-path',
      icon: 'target'
    },
    {
      name: 'Truth AI',
      href: '/truth-ai',
      icon: 'student'
    },
    {
      name: 'Tools',
      href: '/edutools',
      icon: 'tools'
    },
    {
      name: 'Instructor Q&A',
      href: '/instructor-qa',
      icon: 'instructor'
    },
    {
      name: 'Community Discussion',
      href: '/community',
      icon: 'testimonial'
    },
    {
      name: 'Guides',
      href: '/guides',
      icon: 'help'
    },
    {
      name: 'Articles',
      href: '/articles',
      icon: 'about'
    }
  ];

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <>
      <style>{`
        .bottom-tab-curved {
          position: relative;
        }
        .bottom-tab-curved::before,
        .bottom-tab-curved::after {
          content: '';
          position: absolute;
          top: -7px;
          width: 25px;
          height: 21px;
          background:  bg-background linear-gradient(to bottom, hsl(var(--primary)/1), hsl(var(--background)/1));
        }
        .dark .bottom-tab-curved::before,
        .dark .bottom-tab-curved::after {
          background: rgba(0, 0, 0, 0.4);
        }
        .bottom-tab-curved::before {
          left: -15px;
          border-top-right-radius: 25px;
          border: 10px solid hsl(var(--background));
          border-bottom: none;
          border-left: none;
        }
        .bottom-tab-curved::after {
          right: -15px;
          border-top-left-radius: 25px;
          border: 10px solid hsl(var(--background));
          border-bottom: none;
          border-right: none;
        }
      `}</style>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/90 backdrop-blur-md border-t border-white/20 z-10 overflow-x-auto px-[15px]">
        <nav className="flex items-stretch justify-end min-w-max px-4">
          {tabItems.map(item => (
            <div
              key={item.name}
              className={`flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap !rounded-b-lg relative ${isActiveRoute(item.href)
                  ? 'bg-white/70 dark:bg-black/40 text-foreground shadow-xl backdrop-blur-md bottom-tab-curved border border-[hsl(var(--border))]'
                  : 'text-primary-foreground hover:bg-white/10 backdrop-blur-sm'
                }`}
              style={isActiveRoute(item.href) ? {
                fontSize: '1rem',
                marginTop: '-6px',
                marginBottom: '12px',
                paddingTop: '18px',
                zIndex: 20
              } : {
                fontSize: '1rem',
                marginTop: '-6px',
                marginBottom: '12px',
                paddingTop: '18px',
                zIndex: 18
              }}
            >
              <Link to={item.href} className="flex items-center gap-2">
                {getIcon(item.icon)}
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default ToolsNavigation;
