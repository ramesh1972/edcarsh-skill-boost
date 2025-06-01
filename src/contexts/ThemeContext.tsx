
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';

export interface ThemeConfig {
  colorTheme: 'ocean' | 'sunset' | 'forest' | 'lavender' | 'monochrome';
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
  colorTheme: 'ocean',
  typography: 'modern',
  iconScheme: 'normal',
  designSystem: 'tailwind',
  layout: 'default',
  skin: 'default'
};

// Updated icon libraries with only Lucide icons
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
    course: () => <LucideIcons.BookOpenCheck className="w-5 h-5" />,
    instructor: () => <LucideIcons.UserCheck className="w-5 h-5" />,
    student: () => <LucideIcons.GraduationCap className="w-5 h-5" />,
    time: () => <LucideIcons.Timer className="w-5 h-5" />,
    price: () => <LucideIcons.Coins className="w-5 h-5" />,
    live: () => <LucideIcons.Video className="w-5 h-5" />
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
    course: () => <LucideIcons.Library className="w-5 h-5" />,
    instructor: () => <LucideIcons.UserSquare className="w-5 h-5" />,
    student: () => <LucideIcons.UsersRound className="w-5 h-5" />,
    time: () => <LucideIcons.AlarmClock className="w-5 h-5" />,
    price: () => <LucideIcons.CreditCard className="w-5 h-5" />,
    live: () => <LucideIcons.PlayCircle className="w-5 h-5" />
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
    
    // Remove all existing theme classes
    root.classList.remove('ocean', 'sunset', 'forest', 'lavender', 'monochrome');
    body.classList.remove('font-technical', 'font-professional', 'font-elegant', 'font-modern', 'font-playful');
    root.classList.remove('material-design', 'human-interface', 'fluent-design', 'ant-design', 'carbon-design', 'atlassian-design', 'bootstrap-design', 'polaris-design', 'lightning-design', 'tailwind-design');
    root.classList.remove('layout-compact', 'layout-spacious', 'layout-modern', 'layout-default');
    
    // Apply current theme classes
    root.classList.add(theme.colorTheme);
    root.classList.add(`${theme.designSystem}-design`);
    root.classList.add(`layout-${theme.layout}`);
    
    // Apply typography to body
    body.classList.add(`font-${theme.typography}`);
    
    // Apply design system specific styles
    applyDesignSystemStyles(theme.designSystem);
    
    // Apply color theme variables
    applyColorTheme(theme.colorTheme);
  }, [theme]);

  const applyDesignSystemStyles = (designSystem: string) => {
    const root = document.documentElement;
    
    // Apply design system specific CSS custom properties
    switch (designSystem) {
      case 'material':
        root.style.setProperty('--radius', '4px');
        root.style.setProperty('--shadow', '0 2px 4px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '4px');
        break;
      case 'human':
        root.style.setProperty('--radius', '12px');
        root.style.setProperty('--shadow', '0 4px 16px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '8px');
        break;
      case 'fluent':
        root.style.setProperty('--radius', '2px');
        root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '2px');
        break;
      case 'ant':
        root.style.setProperty('--radius', '6px');
        root.style.setProperty('--shadow', '0 2px 8px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '4px');
        break;
      case 'carbon':
        root.style.setProperty('--radius', '0px');
        root.style.setProperty('--shadow', '0 1px 2px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '1px');
        break;
      case 'atlassian':
        root.style.setProperty('--radius', '3px');
        root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '2px');
        break;
      case 'bootstrap':
        root.style.setProperty('--radius', '0.375rem');
        root.style.setProperty('--shadow', '0 0.125rem 0.25rem rgba(0,0,0,0.075)');
        root.style.setProperty('--elevation', '2px');
        break;
      case 'polaris':
        root.style.setProperty('--radius', '8px');
        root.style.setProperty('--shadow', '0 1px 0 rgba(0,0,0,0.05)');
        root.style.setProperty('--elevation', '2px');
        break;
      case 'lightning':
        root.style.setProperty('--radius', '0.25rem');
        root.style.setProperty('--shadow', '0 2px 2px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '2px');
        break;
      default: // tailwind
        root.style.setProperty('--radius', '0.5rem');
        root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '2px');
        break;
    }
  };

  const applyColorTheme = (colorTheme: string) => {
    const root = document.documentElement;
    
    switch (colorTheme) {
      case 'ocean':
        // Deep blues and teals with white backgrounds
        root.style.setProperty('--background', '210 40% 98%');
        root.style.setProperty('--foreground', '210 40% 15%');
        root.style.setProperty('--primary', '210 100% 45%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '190 40% 92%');
        root.style.setProperty('--secondary-foreground', '210 40% 15%');
        root.style.setProperty('--muted', '210 30% 95%');
        root.style.setProperty('--muted-foreground', '210 20% 50%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '210 40% 15%');
        root.style.setProperty('--accent', '190 50% 85%');
        root.style.setProperty('--accent-foreground', '210 40% 15%');
        root.style.setProperty('--border', '210 30% 85%');
        break;
      case 'sunset':
        // Warm oranges and reds with cream backgrounds
        root.style.setProperty('--background', '30 40% 98%');
        root.style.setProperty('--foreground', '20 30% 20%');
        root.style.setProperty('--primary', '15 85% 55%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '35 50% 92%');
        root.style.setProperty('--secondary-foreground', '20 30% 20%');
        root.style.setProperty('--muted', '30 30% 95%');
        root.style.setProperty('--muted-foreground', '20 20% 50%');
        root.style.setProperty('--card', '40 50% 99%');
        root.style.setProperty('--card-foreground', '20 30% 20%');
        root.style.setProperty('--accent', '25 60% 88%');
        root.style.setProperty('--accent-foreground', '20 30% 20%');
        root.style.setProperty('--border', '30 30% 85%');
        break;
      case 'forest':
        // Deep greens with natural tones
        root.style.setProperty('--background', '120 20% 97%');
        root.style.setProperty('--foreground', '120 30% 15%');
        root.style.setProperty('--primary', '140 60% 35%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '110 30% 90%');
        root.style.setProperty('--secondary-foreground', '120 30% 15%');
        root.style.setProperty('--muted', '120 20% 94%');
        root.style.setProperty('--muted-foreground', '120 15% 45%');
        root.style.setProperty('--card', '120 40% 99%');
        root.style.setProperty('--card-foreground', '120 30% 15%');
        root.style.setProperty('--accent', '130 40% 85%');
        root.style.setProperty('--accent-foreground', '120 30% 15%');
        root.style.setProperty('--border', '120 20% 85%');
        break;
      case 'lavender':
        // Soft purples and pinks
        root.style.setProperty('--background', '280 30% 98%');
        root.style.setProperty('--foreground', '270 20% 20%');
        root.style.setProperty('--primary', '270 70% 50%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '290 40% 92%');
        root.style.setProperty('--secondary-foreground', '270 20% 20%');
        root.style.setProperty('--muted', '280 25% 95%');
        root.style.setProperty('--muted-foreground', '270 15% 50%');
        root.style.setProperty('--card', '285 40% 99%');
        root.style.setProperty('--card-foreground', '270 20% 20%');
        root.style.setProperty('--accent', '280 50% 88%');
        root.style.setProperty('--accent-foreground', '270 20% 20%');
        root.style.setProperty('--border', '280 25% 85%');
        break;
      case 'monochrome':
        // Pure blacks, whites, and grays
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '0 0% 10%');
        root.style.setProperty('--primary', '0 0% 20%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '0 0% 95%');
        root.style.setProperty('--secondary-foreground', '0 0% 10%');
        root.style.setProperty('--muted', '0 0% 97%');
        root.style.setProperty('--muted-foreground', '0 0% 45%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '0 0% 10%');
        root.style.setProperty('--accent', '0 0% 90%');
        root.style.setProperty('--accent-foreground', '0 0% 10%');
        root.style.setProperty('--border', '0 0% 85%');
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
