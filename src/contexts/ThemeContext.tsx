import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';

export interface ThemeConfig {
  colorTheme: 'ocean' | 'sunset' | 'forest' | 'lavender' | 'monochrome';
  typography: 'technical' | 'professional' | 'elegant' | 'modern' | 'playful';
  iconScheme: 'normal' | 'cartoon' | 'emoji' | 'avatars';
  designSystem: 'material' | 'human' | 'fluent' | 'ant' | 'carbon' | 'atlassian' | 'bootstrap' | 'polaris' | 'lightning' | 'tailwind';
  layout: 'default' | 'compact' | 'spacious' | 'modern';
  skin: 'default' | 'gradient' | 'textured' | 'glassmorphism';
}

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  getIcon: (iconName: string) => React.ReactNode;
  getAvatar: (avatarName: string) => string;
  getBackground: () => string;
  getSkinClasses: () => string;
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

// Skin background patterns and styles
const skinStyles = {
  default: {
    pageBackground: '',
    cardBackground: '',
    controlBackground: '',
    classes: 'skin-default'
  },
  gradient: {
    pageBackground: 'bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5',
    cardBackground: 'bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border-primary/20',
    controlBackground: 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70',
    classes: 'skin-gradient'
  },
  textured: {
    pageBackground: 'bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.03"%3E%3Cpath d="M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] bg-background',
    cardBackground: 'bg-card/95 border-2 border-border/50 shadow-lg backdrop-blur-sm',
    controlBackground: 'bg-primary/90 hover:bg-primary border border-primary-foreground/20 shadow-md',
    classes: 'skin-textured'
  },
  glassmorphism: {
    pageBackground: 'bg-gradient-to-br from-primary/10 via-background to-secondary/10',
    cardBackground: 'bg-card/20 backdrop-blur-xl border border-white/20 shadow-xl',
    controlBackground: 'bg-primary/80 backdrop-blur-md border border-white/30 hover:bg-primary/90 shadow-lg',
    classes: 'skin-glassmorphism'
  }
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
    
    // Remove all skin classes from both root and body
    root.classList.remove('skin-default', 'skin-gradient', 'skin-textured', 'skin-glassmorphism');
    body.classList.remove('skin-default', 'skin-gradient', 'skin-textured', 'skin-glassmorphism');
    
    // Apply current theme classes
    root.classList.add(theme.colorTheme);
    root.classList.add(`${theme.designSystem}-design`);
    root.classList.add(`layout-${theme.layout}`);
    
    // Apply skin classes to body for better effect
    body.classList.add(`skin-${theme.skin}`);
    
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
        root.style.setProperty('--background', '210 45% 96%');
        root.style.setProperty('--foreground', '210 50% 12%');
        root.style.setProperty('--primary', '210 85% 40%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '195 35% 88%');
        root.style.setProperty('--secondary-foreground', '210 50% 12%');
        root.style.setProperty('--muted', '210 25% 92%');
        root.style.setProperty('--muted-foreground', '210 25% 45%');
        root.style.setProperty('--card', '205 40% 99%');
        root.style.setProperty('--card-foreground', '210 50% 12%');
        root.style.setProperty('--accent', '185 45% 82%');
        root.style.setProperty('--accent-foreground', '210 50% 12%');
        root.style.setProperty('--border', '210 25% 82%');
        root.style.setProperty('--input', '210 25% 90%');
        root.style.setProperty('--ring', '210 85% 40%');
        break;
      case 'sunset':
        root.style.setProperty('--background', '25 50% 95%');
        root.style.setProperty('--foreground', '15 40% 18%');
        root.style.setProperty('--primary', '20 80% 50%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '40 45% 85%');
        root.style.setProperty('--secondary-foreground', '15 40% 18%');
        root.style.setProperty('--muted', '30 35% 90%');
        root.style.setProperty('--muted-foreground', '20 25% 40%');
        root.style.setProperty('--card', '30 60% 98%');
        root.style.setProperty('--card-foreground', '15 40% 18%');
        root.style.setProperty('--accent', '35 55% 80%');
        root.style.setProperty('--accent-foreground', '15 40% 18%');
        root.style.setProperty('--border', '30 30% 80%');
        root.style.setProperty('--input', '30 30% 88%');
        root.style.setProperty('--ring', '20 80% 50%');
        break;
      case 'forest':
        root.style.setProperty('--background', '125 25% 94%');
        root.style.setProperty('--foreground', '125 35% 16%');
        root.style.setProperty('--primary', '140 55% 32%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '115 25% 86%');
        root.style.setProperty('--secondary-foreground', '125 35% 16%');
        root.style.setProperty('--muted', '120 20% 91%');
        root.style.setProperty('--muted-foreground', '120 18% 42%');
        root.style.setProperty('--card', '120 35% 97%');
        root.style.setProperty('--card-foreground', '125 35% 16%');
        root.style.setProperty('--accent', '130 35% 78%');
        root.style.setProperty('--accent-foreground', '125 35% 16%');
        root.style.setProperty('--border', '120 18% 80%');
        root.style.setProperty('--input', '120 18% 87%');
        root.style.setProperty('--ring', '140 55% 32%');
        break;
      case 'lavender':
        root.style.setProperty('--background', '285 35% 95%');
        root.style.setProperty('--foreground', '270 25% 18%');
        root.style.setProperty('--primary', '275 65% 45%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '295 35% 86%');
        root.style.setProperty('--secondary-foreground', '270 25% 18%');
        root.style.setProperty('--muted', '280 22% 90%');
        root.style.setProperty('--muted-foreground', '270 18% 45%');
        root.style.setProperty('--card', '290 40% 97%');
        root.style.setProperty('--card-foreground', '270 25% 18%');
        root.style.setProperty('--accent', '285 45% 82%');
        root.style.setProperty('--accent-foreground', '270 25% 18%');
        root.style.setProperty('--border', '280 20% 82%');
        root.style.setProperty('--input', '280 20% 88%');
        root.style.setProperty('--ring', '275 65% 45%');
        break;
      case 'monochrome':
        root.style.setProperty('--background', '0 0% 97%');
        root.style.setProperty('--foreground', '0 0% 8%');
        root.style.setProperty('--primary', '0 0% 15%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '0 0% 90%');
        root.style.setProperty('--secondary-foreground', '0 0% 8%');
        root.style.setProperty('--muted', '0 0% 94%');
        root.style.setProperty('--muted-foreground', '0 0% 40%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '0 0% 8%');
        root.style.setProperty('--accent', '0 0% 85%');
        root.style.setProperty('--accent-foreground', '0 0% 8%');
        root.style.setProperty('--border', '0 0% 80%');
        root.style.setProperty('--input', '0 0% 88%');
        root.style.setProperty('--ring', '0 0% 15%');
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
    return '';
  };

  const getSkinClasses = (): string => {
    return `skin-${theme.skin}`;
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
      getBackground,
      getSkinClasses
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
