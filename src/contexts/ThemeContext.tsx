import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import * as HeroIcons from '@heroicons/react/24/outline';
import { 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaUserGraduate, 
  FaClock, 
  FaDollarSign, 
  FaCircle,
  FaBook,
  FaUser,
  FaUsers,
  FaPlay
} from 'react-icons/fa';
import { 
  GiTeacher, 
  GiBookshelf, 
  GiAlarmClock, 
  GiTakeMyMoney, 
  GiRadialBalance 
} from 'react-icons/gi';

export interface ThemeConfig {
  colorTheme: 'light' | 'dark' | 'vibrant' | 'vivid' | 'minimal' | 'grayscale';
  typography: 'technical' | 'professional' | 'elegant' | 'modern' | 'playful';
  iconScheme: 'normal' | 'cartoon' | 'emoji' | 'avatars';
  designSystem: 'material' | 'human' | 'fluent' | 'ant' | 'carbon' | 'atlassian' | 'bootstrap' | 'polaris' | 'lightning' | 'tailwind';
  layout: 'default' | 'compact' | 'spacious' | 'modern';
  skin: 'default' | 'gradient' | 'solid' | 'pattern';
}

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  getIcon: (iconName: string) => React.ReactNode;
  getAvatar: (avatarName: string) => string;
  getBackground: () => string;
}

const defaultTheme: ThemeConfig = {
  colorTheme: 'light',
  typography: 'modern',
  iconScheme: 'normal',
  designSystem: 'tailwind',
  layout: 'default',
  skin: 'default'
};

// Updated icon libraries with actual React components
const iconLibraries = {
  normal: {
    course: () => <LucideIcons.BookOpen className="w-5 h-5" />,
    instructor: () => <LucideIcons.User className="w-5 h-5" />,
    student: () => <LucideIcons.Users className="w-5 h-5" />,
    time: () => <LucideIcons.Clock className="w-5 h-5" />,
    price: () => <LucideIcons.DollarSign className="w-5 h-5" />,
    live: () => <LucideIcons.Play className="w-5 h-5" />
  },
  cartoon: {
    course: () => <GiBookshelf className="w-5 h-5" />,
    instructor: () => <GiTeacher className="w-5 h-5" />,
    student: () => <FaUserGraduate className="w-5 h-5" />,
    time: () => <GiAlarmClock className="w-5 h-5" />,
    price: () => <GiTakeMyMoney className="w-5 h-5" />,
    live: () => <GiRadialBalance className="w-5 h-5" />
  },
  emoji: {
    course: () => <span className="text-lg">📚</span>,
    instructor: () => <span className="text-lg">👩‍🏫</span>,
    student: () => <span className="text-lg">👩‍🎓</span>,
    time: () => <span className="text-lg">🕐</span>,
    price: () => <span className="text-lg">💵</span>,
    live: () => <span className="text-lg">📹</span>
  },
  avatars: {
    course: () => <FaBook className="w-5 h-5" />,
    instructor: () => <FaChalkboardTeacher className="w-5 h-5" />,
    student: () => <FaUsers className="w-5 h-5" />,
    time: () => <FaClock className="w-5 h-5" />,
    price: () => <FaDollarSign className="w-5 h-5" />,
    live: () => <FaPlay className="w-5 h-5" />
  }
};

// Avatar collections
const avatarCollections = {
  normal: [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
  ],
  cartoon: [
    'https://api.dicebear.com/7.x/bottts/svg?seed=1',
    'https://api.dicebear.com/7.x/bottts/svg?seed=2',
    'https://api.dicebear.com/7.x/bottts/svg?seed=3'
  ],
  emoji: [
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=1',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=2',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=3'
  ],
  avatars: [
    'https://api.dicebear.com/7.x/personas/svg?seed=1',
    'https://api.dicebear.com/7.x/personas/svg?seed=2',
    'https://api.dicebear.com/7.x/personas/svg?seed=3'
  ]
};

// Background patterns
const backgroundPatterns = {
  default: '',
  gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10',
  solid: 'bg-muted/20',
  pattern: 'bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('edcrash-theme');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('edcrash-theme', JSON.stringify(theme));
    
    // Apply theme classes to document
    const root = document.documentElement;
    const body = document.body;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'vibrant', 'vivid', 'minimal', 'grayscale');
    body.classList.remove('font-technical', 'font-professional', 'font-elegant', 'font-modern', 'font-playful');
    root.classList.remove('material-design', 'human-interface', 'fluent-design', 'ant-design', 'carbon-design', 'atlassian-design', 'bootstrap-design', 'polaris-design', 'lightning-design', 'tailwind-design');
    root.classList.remove('layout-compact', 'layout-spacious', 'layout-modern');
    
    // Apply current theme classes
    root.classList.add(theme.colorTheme);
    root.classList.add(`${theme.designSystem}-design`);
    root.classList.add(`layout-${theme.layout}`);
    
    // Apply typography to body
    body.classList.add(`font-${theme.typography}`);
    
    // Apply color theme variables
    applyColorTheme(theme.colorTheme);
    applyDesignSystem(theme.designSystem);
  }, [theme]);

  const applyColorTheme = (colorTheme: string) => {
    const root = document.documentElement;
    
    switch (colorTheme) {
      case 'dark':
        root.style.setProperty('--background', '222.2 84% 4.9%');
        root.style.setProperty('--foreground', '210 40% 98%');
        root.style.setProperty('--primary', '210 40% 98%');
        root.style.setProperty('--primary-foreground', '222.2 47.4% 11.2%');
        root.style.setProperty('--secondary', '217.2 32.6% 17.5%');
        root.style.setProperty('--secondary-foreground', '210 40% 98%');
        root.style.setProperty('--muted', '217.2 32.6% 17.5%');
        root.style.setProperty('--muted-foreground', '215 20.2% 65.1%');
        root.style.setProperty('--card', '222.2 84% 4.9%');
        root.style.setProperty('--card-foreground', '210 40% 98%');
        break;
      case 'vibrant':
        root.style.setProperty('--background', '340 100% 97%');
        root.style.setProperty('--foreground', '340 10% 10%');
        root.style.setProperty('--primary', '340 75% 55%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '340 50% 90%');
        root.style.setProperty('--secondary-foreground', '340 10% 10%');
        root.style.setProperty('--muted', '340 30% 85%');
        root.style.setProperty('--muted-foreground', '340 10% 40%');
        root.style.setProperty('--card', '340 100% 98%');
        root.style.setProperty('--card-foreground', '340 10% 10%');
        break;
      case 'vivid':
        root.style.setProperty('--background', '270 100% 97%');
        root.style.setProperty('--foreground', '270 10% 10%');
        root.style.setProperty('--primary', '270 100% 60%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '270 60% 90%');
        root.style.setProperty('--secondary-foreground', '270 10% 10%');
        root.style.setProperty('--muted', '270 40% 85%');
        root.style.setProperty('--muted-foreground', '270 10% 40%');
        root.style.setProperty('--card', '270 100% 98%');
        root.style.setProperty('--card-foreground', '270 10% 10%');
        break;
      case 'minimal':
        root.style.setProperty('--background', '0 0% 99%');
        root.style.setProperty('--foreground', '0 0% 15%');
        root.style.setProperty('--primary', '0 0% 25%');
        root.style.setProperty('--primary-foreground', '0 0% 98%');
        root.style.setProperty('--secondary', '0 0% 95%');
        root.style.setProperty('--secondary-foreground', '0 0% 15%');
        root.style.setProperty('--muted', '0 0% 90%');
        root.style.setProperty('--muted-foreground', '0 0% 45%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '0 0% 15%');
        break;
      case 'grayscale':
        root.style.setProperty('--background', '0 0% 95%');
        root.style.setProperty('--foreground', '0 0% 20%');
        root.style.setProperty('--primary', '0 0% 40%');
        root.style.setProperty('--primary-foreground', '0 0% 95%');
        root.style.setProperty('--secondary', '0 0% 85%');
        root.style.setProperty('--secondary-foreground', '0 0% 20%');
        root.style.setProperty('--muted', '0 0% 80%');
        root.style.setProperty('--muted-foreground', '0 0% 50%');
        root.style.setProperty('--card', '0 0% 92%');
        root.style.setProperty('--card-foreground', '0 0% 20%');
        break;
      default: // light
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '222.2 84% 4.9%');
        root.style.setProperty('--primary', '222.2 47.4% 11.2%');
        root.style.setProperty('--primary-foreground', '210 40% 98%');
        root.style.setProperty('--secondary', '210 40% 96.1%');
        root.style.setProperty('--secondary-foreground', '222.2 47.4% 11.2%');
        root.style.setProperty('--muted', '210 40% 96.1%');
        root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '222.2 84% 4.9%');
        break;
    }
  };

  const applyDesignSystem = (designSystem: string) => {
    const root = document.documentElement;
    
    switch (designSystem) {
      case 'material':
        root.style.setProperty('--radius', '4px');
        break;
      case 'human':
        root.style.setProperty('--radius', '8px');
        break;
      case 'fluent':
        root.style.setProperty('--radius', '2px');
        break;
      case 'ant':
        root.style.setProperty('--radius', '6px');
        break;
      case 'carbon':
        root.style.setProperty('--radius', '0px');
        break;
      case 'bootstrap':
        root.style.setProperty('--radius', '0.375rem');
        break;
      default:
        root.style.setProperty('--radius', '0.5rem');
        break;
    }
  };

  const getIcon = (iconName: string): React.ReactNode => {
    const IconComponent = iconLibraries[theme.iconScheme]?.[iconName] || iconLibraries.normal[iconName];
    return IconComponent ? IconComponent() : <span>•</span>;
  };

  const getAvatar = (avatarName: string): string => {
    const avatars = avatarCollections[theme.iconScheme] || avatarCollections.normal;
    const index = avatarName.charCodeAt(0) % avatars.length;
    return avatars[index];
  };

  const getBackground = (): string => {
    return backgroundPatterns[theme.skin] || backgroundPatterns.default;
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      updateTheme, 
      resetTheme, 
      getIcon, 
      getAvatar, 
      getBackground 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
