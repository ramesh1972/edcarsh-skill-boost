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
          background: hsl(var(--primary));
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
      <div className="fixed bottom-0 left-0 right-0 bg-primary z-10 overflow-x-auto px-[15px]">
        <nav className="flex items-stretch justify-end min-w-max px-4">
          {tabItems.map(item => (
            <div 
              key={item.name}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-medium whitespace-nowrap !rounded-b-lg relative ${
                isActiveRoute(item.href) 
                  ? 'bg-background text-foreground shadow-lg bottom-tab-curved' 
                  : 'text-primary-foreground hover:bg-primary-foreground/10'
              }`}
              style={isActiveRoute(item.href) ? {
                marginTop: '-6px',
                marginBottom: '12px',
                paddingTop: '18px',
                zIndex: 20
              } : {
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
