import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';

export interface ThemeConfig {
  colorTheme: 'ocean' | 'sunset' | 'forest' | 'lavender' | 'monochrome' | 'aurora' | 'citrus' | 'flamingo' | 'galaxy';
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
  getPageLayoutClasses: () => string;
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
    live: () => <LucideIcons.Play className="w-5 h-5" />,
    home: () => <LucideIcons.Home className="w-4 h-4" />,
    target: () => <LucideIcons.Target className="w-4 h-4" />,
    building: () => <LucideIcons.Building2 className="w-4 h-4" />,
    testimonial: () => <LucideIcons.MessageSquare className="w-4 h-4" />,
    help: () => <LucideIcons.HelpCircle className="w-4 h-4" />,
    contact: () => <LucideIcons.Mail className="w-4 h-4" />,
    about: () => <LucideIcons.Info className="w-4 h-4" />,
    tools: () => <LucideIcons.Wrench className="w-5 h-5" />
  },
  cartoon: {
    course: () => <LucideIcons.BookOpenCheck className="w-5 h-5" />,
    instructor: () => <LucideIcons.UserCheck className="w-5 h-5" />,
    student: () => <LucideIcons.GraduationCap className="w-5 h-5" />,
    time: () => <LucideIcons.Timer className="w-5 h-5" />,
    price: () => <LucideIcons.Coins className="w-5 h-5" />,
    live: () => <LucideIcons.Video className="w-5 h-5" />,
    home: () => <LucideIcons.House className="w-4 h-4" />,
    target: () => <LucideIcons.Crosshair className="w-4 h-4" />,
    building: () => <LucideIcons.Building className="w-4 h-4" />,
    testimonial: () => <LucideIcons.MessageCircle className="w-4 h-4" />,
    help: () => <LucideIcons.CircleHelp className="w-4 h-4" />,
    contact: () => <LucideIcons.MailOpen className="w-4 h-4" />,
    about: () => <LucideIcons.InfoIcon className="w-4 h-4" />,
    tools: () => <LucideIcons.Settings className="w-5 h-5" />
  },
  emoji: {
    course: () => <span className="text-lg">📚</span>,
    instructor: () => <span className="text-lg">👩‍🏫</span>,
    student: () => <span className="text-lg">👩‍🎓</span>,
    time: () => <span className="text-lg">🕐</span>,
    price: () => <span className="text-lg">💵</span>,
    live: () => <span className="text-lg">📹</span>,
    home: () => <span className="text-lg">🏠</span>,
    target: () => <span className="text-lg">🎯</span>,
    building: () => <span className="text-lg">🏢</span>,
    testimonial: () => <span className="text-lg">💬</span>,
    help: () => <span className="text-lg">❓</span>,
    contact: () => <span className="text-lg">📧</span>,
    about: () => <span className="text-lg">ℹ️</span>,
    tools: () => <span className="text-lg">🔧</span>
  },
  avatars: {
    course: () => <LucideIcons.Library className="w-5 h-5" />,
    instructor: () => <LucideIcons.UserSquare className="w-5 h-5" />,
    student: () => <LucideIcons.UsersRound className="w-5 h-5" />,
    time: () => <LucideIcons.AlarmClock className="w-5 h-5" />,
    price: () => <LucideIcons.CreditCard className="w-5 h-5" />,
    live: () => <LucideIcons.PlayCircle className="w-5 h-5" />,
    home: () => <LucideIcons.HomeIcon className="w-4 h-4" />,
    target: () => <LucideIcons.Focus className="w-4 h-4" />,
    building: () => <LucideIcons.Building2 className="w-4 h-4" />,
    testimonial: () => <LucideIcons.Quote className="w-4 h-4" />,
    help: () => <LucideIcons.LifeBuoy className="w-4 h-4" />,
    contact: () => <LucideIcons.AtSign className="w-4 h-4" />,
    about: () => <LucideIcons.FileText className="w-4 h-4" />,
    tools: () => <LucideIcons.Hammer className="w-5 h-5" />
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
    root.classList.remove('skin-default', 'skin-gradient', 'skin-textured', 'skin-glassmorphism');
    
    // Apply current theme classes (but NOT layout classes to root)
    root.classList.add(theme.colorTheme);
    root.classList.add(`${theme.designSystem}-design`);
    root.classList.add(`skin-${theme.skin}`);
    
    // Apply typography to body
    body.classList.add(`font-${theme.typography}`);
    
    // Apply design system specific styles
    applyDesignSystemStyles(theme.designSystem);
    
    // Apply color theme variables
    applyColorTheme(theme.colorTheme);
    
    // Debug logging
    console.log('Applied theme classes:', {
      colorTheme: theme.colorTheme,
      designSystem: `${theme.designSystem}-design`,
      skin: `skin-${theme.skin}`,
      typography: `font-${theme.typography}`,
      layout: `layout-${theme.layout} (for pages only)`
    });
  }, [theme]);

  const applyDesignSystemStyles = (designSystem: string) => {
    const root = document.documentElement;
    // Reset all design system related CSS variables to defaults first
    root.style.setProperty('--radius', '0.5rem');
    root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
    root.style.setProperty('--elevation', '2px');
    root.style.setProperty('--sidebar-background', '0 0% 98%');
    root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
    root.style.setProperty('--sidebar-primary', '240 5.9% 10%');
    root.style.setProperty('--sidebar-primary-foreground', '0 0% 98%');
    root.style.setProperty('--sidebar-accent', '240 4.8% 95.9%');
    root.style.setProperty('--sidebar-accent-foreground', '240 5.9% 10%');
    root.style.setProperty('--sidebar-border', '220 13% 91%');
    root.style.setProperty('--sidebar-ring', '217.2 91.2% 59.8%');

    switch (designSystem) {
      case 'material':
        root.style.setProperty('--radius', '4px');
        root.style.setProperty('--shadow', '0 2px 4px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '4px');
        root.style.setProperty('--sidebar-background', '0 0% 98%');
        root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
        root.style.setProperty('--sidebar-primary', '210 85% 40%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-accent', '14 80% 65%');
        root.style.setProperty('--sidebar-accent-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-border', '210 30% 85%');
        root.style.setProperty('--sidebar-ring', '210 100% 45%');
        break;
      case 'human':
        root.style.setProperty('--radius', '12px');
        root.style.setProperty('--shadow', '0 4px 16px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '8px');
        root.style.setProperty('--sidebar-background', '0 0% 98%');
        root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
        root.style.setProperty('--sidebar-primary', '140 60% 35%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-accent', '45 75% 55%');
        root.style.setProperty('--sidebar-accent-foreground', '25 40% 15%');
        root.style.setProperty('--sidebar-border', '115 18% 80%');
        root.style.setProperty('--sidebar-ring', '45 75% 55%');
        break;
      case 'fluent':
        root.style.setProperty('--radius', '2px');
        root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '2px');
        root.style.setProperty('--sidebar-background', '0 0% 98%');
        root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
        root.style.setProperty('--sidebar-primary', '275 65% 50%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-accent', '160 45% 65%');
        root.style.setProperty('--sidebar-accent-foreground', '160 50% 15%');
        root.style.setProperty('--sidebar-border', '295 20% 82%');
        root.style.setProperty('--sidebar-ring', '160 45% 65%');
        break;
      case 'ant':
        root.style.setProperty('--radius', '6px');
        root.style.setProperty('--shadow', '0 2px 8px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '4px');
        root.style.setProperty('--sidebar-background', '0 0% 98%');
        root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
        root.style.setProperty('--sidebar-primary', '20 85% 55%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-accent', '290 70% 65%');
        root.style.setProperty('--sidebar-accent-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-border', '45 40% 80%');
        root.style.setProperty('--sidebar-ring', '290 70% 65%');
        break;
      case 'carbon':
        root.style.setProperty('--radius', '0px');
        root.style.setProperty('--shadow', '0 1px 2px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '1px');
        root.style.setProperty('--sidebar-background', '0 0% 98%');
        root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
        root.style.setProperty('--sidebar-primary', '0 0% 15%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-accent', '210 100% 50%');
        root.style.setProperty('--sidebar-accent-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-border', '0 0% 80%');
        root.style.setProperty('--sidebar-ring', '210 100% 50%');
        break;
      case 'atlassian':
        root.style.setProperty('--radius', '3px');
        root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '2px');
        root.style.setProperty('--sidebar-background', '0 0% 98%');
        root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
        root.style.setProperty('--sidebar-primary', '210 100% 45%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-accent', '217.2 91.2% 59.8%');
        root.style.setProperty('--sidebar-accent-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-border', '210 30% 85%');
        root.style.setProperty('--sidebar-ring', '217.2 91.2% 59.8%');
        break;
      case 'bootstrap':
        root.style.setProperty('--radius', '0.375rem');
        root.style.setProperty('--shadow', '0 0.125rem 0.25rem rgba(0,0,0,0.075)');
        root.style.setProperty('--elevation', '2px');
        root.style.setProperty('--sidebar-background', '0 0% 98%');
        root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
        root.style.setProperty('--sidebar-primary', '0 0% 15%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-accent', '210 100% 50%');
        root.style.setProperty('--sidebar-accent-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-border', '0 0% 80%');
        root.style.setProperty('--sidebar-ring', '210 100% 50%');
        break;
      case 'polaris':
        root.style.setProperty('--radius', '8px');
        root.style.setProperty('--shadow', '0 1px 0 rgba(0,0,0,0.05)');
        root.style.setProperty('--elevation', '2px');
        root.style.setProperty('--sidebar-background', '0 0% 98%');
        root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
        root.style.setProperty('--sidebar-primary', '285 40% 95%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-accent', '160 45% 65%');
        root.style.setProperty('--sidebar-accent-foreground', '160 50% 15%');
        root.style.setProperty('--sidebar-border', '295 20% 82%');
        root.style.setProperty('--sidebar-ring', '160 45% 65%');
        break;
      case 'lightning':
        root.style.setProperty('--radius', '0.25rem');
        root.style.setProperty('--shadow', '0 2px 2px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '2px');
        root.style.setProperty('--sidebar-background', '0 0% 98%');
        root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
        root.style.setProperty('--sidebar-primary', '265 90% 60%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-accent', '200 100% 60%');
        root.style.setProperty('--sidebar-accent-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-border', '265 30% 40%');
        root.style.setProperty('--sidebar-ring', '200 100% 60%');
        break;
      default: // tailwind
        root.style.setProperty('--radius', '0.5rem');
        root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
        root.style.setProperty('--elevation', '2px');
        root.style.setProperty('--sidebar-background', '0 0% 98%');
        root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
        root.style.setProperty('--sidebar-primary', '240 5.9% 10%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 98%');
        root.style.setProperty('--sidebar-accent', '240 4.8% 95.9%');
        root.style.setProperty('--sidebar-accent-foreground', '240 5.9% 10%');
        root.style.setProperty('--sidebar-border', '220 13% 91%');
        root.style.setProperty('--sidebar-ring', '217.2 91.2% 59.8%');
        break;
    }
  };

  // Add support for new color themes in applyColorTheme
  const applyColorTheme = (colorTheme: string) => {
    const root = document.documentElement;
    // Reset all theme variables to defaults first (from :root in index.css)
    root.style.setProperty('--background', '210 40% 98%');
    root.style.setProperty('--foreground', '210 40% 15%');
    root.style.setProperty('--card', '0 0% 100%');
    root.style.setProperty('--card-foreground', '210 40% 15%');
    root.style.setProperty('--popover', '0 0% 100%');
    root.style.setProperty('--popover-foreground', '210 40% 15%');
    root.style.setProperty('--primary', '210 100% 45%');
    root.style.setProperty('--primary-foreground', '0 0% 100%');
    root.style.setProperty('--secondary', '190 40% 92%');
    root.style.setProperty('--secondary-foreground', '210 40% 15%');
    root.style.setProperty('--muted', '210 30% 95%');
    root.style.setProperty('--muted-foreground', '210 20% 50%');
    root.style.setProperty('--accent', '190 50% 85%');
    root.style.setProperty('--accent-foreground', '210 40% 15%');
    root.style.setProperty('--destructive', '0 84.2% 60.2%');
    root.style.setProperty('--destructive-foreground', '210 40% 98%');
    root.style.setProperty('--border', '210 30% 85%');
    root.style.setProperty('--input', '210 30% 85%');
    root.style.setProperty('--ring', '210 100% 45%');
    root.style.setProperty('--radius', '0.5rem');
    root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
    root.style.setProperty('--elevation', '2px');
    root.style.setProperty('--sidebar-background', '0 0% 98%');
    root.style.setProperty('--sidebar-foreground', '240 5.3% 26.1%');
    root.style.setProperty('--sidebar-primary', '240 5.9% 10%');
    root.style.setProperty('--sidebar-primary-foreground', '0 0% 98%');
    root.style.setProperty('--sidebar-accent', '240 4.8% 95.9%');
    root.style.setProperty('--sidebar-accent-foreground', '240 5.9% 10%');
    root.style.setProperty('--sidebar-border', '220 13% 91%');
    root.style.setProperty('--sidebar-ring', '217.2 91.2% 59.8%');
    root.style.setProperty('--scrollbar-bg', '210 30% 95%');
    root.style.setProperty('--scrollbar-thumb', '210 20% 80%');
    root.style.setProperty('--scrollbar-thumb-hover', '210 100% 45%');
    root.style.setProperty('--focus', '210 100% 45%');
    root.style.setProperty('--link', '210 100% 45%');
    root.style.setProperty('--link-hover', '210 100% 35%');
    root.style.setProperty('--success', '140 60% 35%');
    root.style.setProperty('--success-foreground', '0 0% 100%');
    root.style.setProperty('--warning', '45 100% 51%');
    root.style.setProperty('--warning-foreground', '0 0% 0%');
    root.style.setProperty('--info', '210 100% 45%');
    root.style.setProperty('--info-foreground', '0 0% 100%');
    root.style.setProperty('--error', '0 84.2% 60.2%');
    root.style.setProperty('--error-foreground', '210 40% 98%');
    root.style.setProperty('--overlay', '210 40% 10% / 0.5');
    root.style.setProperty('--modal-bg', '0 0% 100% / 0.95');
    root.style.setProperty('--modal-border', '210 30% 85%');
    root.style.setProperty('--tooltip-bg', '210 40% 15%');
    root.style.setProperty('--tooltip-foreground', '0 0% 100%');
    root.style.setProperty('--selection-bg', '210 100% 45% / 0.2');
    root.style.setProperty('--selection-foreground', '210 40% 15%');

    // Set --background-hue to match the hue of --background for each theme
    // This must be kept in sync with the values in index.css
    switch (colorTheme) {
      case 'ocean':
        root.style.setProperty('--background-hue', '210');
        break;
      case 'sunset':
        root.style.setProperty('--background-hue', '30');
        break;
      case 'forest':
        root.style.setProperty('--background-hue', '125');
        break;
      case 'lavender':
        root.style.setProperty('--background-hue', '285');
        break;
      case 'monochrome':
        root.style.setProperty('--background-hue', '0');
        break;
      case 'aurora':
        root.style.setProperty('--background-hue', '168');
        break;
      case 'citrus':
        root.style.setProperty('--background-hue', '60');
        break;
      case 'flamingo':
        root.style.setProperty('--background-hue', '330');
        break;
      case 'galaxy':
        root.style.setProperty('--background-hue', '248');
        break;
      default:
        root.style.setProperty('--background-hue', '210');
        break;
    }

    switch (colorTheme) {
      case 'ocean':
        // Ocean theme: Deep blues with coral and teal accents
        root.style.setProperty('--background', '210 45% 96%');
        root.style.setProperty('--foreground', '220 40% 18%');
        root.style.setProperty('--primary', '210 85% 40%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '180 45% 85%');
        root.style.setProperty('--secondary-foreground', '220 40% 18%');
        root.style.setProperty('--muted', '210 25% 92%');
        root.style.setProperty('--muted-foreground', '210 25% 45%');
        root.style.setProperty('--card', '205 40% 99%');
        root.style.setProperty('--card-foreground', '220 40% 18%');
        root.style.setProperty('--accent', '14 80% 65%');
        root.style.setProperty('--accent-foreground', '0 0% 100%');
        root.style.setProperty('--border', '180 25% 82%');
        root.style.setProperty('--input', '210 25% 90%');
        root.style.setProperty('--ring', '14 80% 65%');
        root.style.setProperty('--background-hue', '210');
        break;
      case 'sunset':
        // Sunset theme: Warm oranges with purple and pink accents
        root.style.setProperty('--background', '30 60% 95%');
        root.style.setProperty('--foreground', '25 40% 18%');
        root.style.setProperty('--primary', '20 85% 55%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '45 70% 88%');
        root.style.setProperty('--secondary-foreground', '25 40% 18%');
        root.style.setProperty('--muted', '35 45% 90%');
        root.style.setProperty('--muted-foreground', '25 35% 40%');
        root.style.setProperty('--card', '35 80% 98%');
        root.style.setProperty('--card-foreground', '25 40% 18%');
        root.style.setProperty('--accent', '290 70% 65%');
        root.style.setProperty('--accent-foreground', '0 0% 100%');
        root.style.setProperty('--border', '45 40% 80%');
        root.style.setProperty('--input', '35 40% 88%');
        root.style.setProperty('--ring', '290 70% 65%');
        root.style.setProperty('--background-hue', '30');
        break;
      case 'forest':
        // Forest theme: Rich greens with earth browns and golden accents
        root.style.setProperty('--background', '125 30% 94%');
        root.style.setProperty('--foreground', '125 35% 16%');
        root.style.setProperty('--primary', '140 60% 35%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '115 25% 86%');
        root.style.setProperty('--secondary-foreground', '125 35% 16%');
        root.style.setProperty('--muted', '120 20% 91%');
        root.style.setProperty('--muted-foreground', '120 18% 42%');
        root.style.setProperty('--card', '120 35% 97%');
        root.style.setProperty('--card-foreground', '125 35% 16%');
        root.style.setProperty('--accent', '45 75% 55%');
        root.style.setProperty('--accent-foreground', '25 40% 15%');
        root.style.setProperty('--border', '115 18% 80%');
        root.style.setProperty('--input', '120 18% 87%');
        root.style.setProperty('--ring', '45 75% 55%');
        root.style.setProperty('--background-hue', '125');
        break;
      case 'lavender':
        // Lavender theme: Soft purples with mint green and rose accents
        root.style.setProperty('--background', '285 40% 95%');
        root.style.setProperty('--foreground', '270 25% 18%');
        root.style.setProperty('--primary', '275 65% 50%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '295 35% 86%');
        root.style.setProperty('--secondary-foreground', '270 25% 18%');
        root.style.setProperty('--muted', '280 22% 90%');
        root.style.setProperty('--muted-foreground', '270 18% 45%');
        root.style.setProperty('--card', '290 50% 97%');
        root.style.setProperty('--card-foreground', '270 25% 18%');
        root.style.setProperty('--accent', '160 45% 65%');
        root.style.setProperty('--accent-foreground', '160 50% 15%');
        root.style.setProperty('--border', '295 20% 82%');
        root.style.setProperty('--input', '285 20% 88%');
        root.style.setProperty('--ring', '160 45% 65%');
        root.style.setProperty('--background-hue', '285');
        break;
      case 'monochrome':
        // Monochrome theme: Rich blacks and whites with blue accent
        root.style.setProperty('--background', '0 0% 97%');
        root.style.setProperty('--foreground', '0 0% 8%');
        root.style.setProperty('--primary', '0 0% 15%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '0 0% 88%');
        root.style.setProperty('--secondary-foreground', '0 0% 8%');
        root.style.setProperty('--muted', '0 0% 94%');
        root.style.setProperty('--muted-foreground', '0 0% 40%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '0 0% 8%');
        root.style.setProperty('--accent', '210 100% 50%');
        root.style.setProperty('--accent-foreground', '0 0% 100%');
        root.style.setProperty('--border', '0 0% 80%');
        root.style.setProperty('--input', '0 0% 88%');
        root.style.setProperty('--ring', '210 100% 50%');
        root.style.setProperty('--background-hue', '0');
        break;
      case 'aurora':
        root.style.setProperty('--background', '168 80% 96%');
        root.style.setProperty('--foreground', '282 40% 18%');
        root.style.setProperty('--primary', '168 90% 45%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '282 70% 90%');
        root.style.setProperty('--secondary-foreground', '282 40% 18%');
        root.style.setProperty('--muted', '195 40% 92%');
        root.style.setProperty('--muted-foreground', '282 20% 45%');
        root.style.setProperty('--card', '168 80% 99%');
        root.style.setProperty('--card-foreground', '282 40% 18%');
        root.style.setProperty('--accent', '312 80% 65%');
        root.style.setProperty('--accent-foreground', '0 0% 100%');
        root.style.setProperty('--border', '168 30% 80%');
        root.style.setProperty('--input', '168 30% 90%');
        root.style.setProperty('--ring', '312 80% 65%');
        root.style.setProperty('--background-hue', '168');
        break;
      case 'citrus':
        root.style.setProperty('--background', '60 90% 97%');
        root.style.setProperty('--foreground', '40 60% 18%');
        root.style.setProperty('--primary', '90 95% 50%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '40 95% 90%');
        root.style.setProperty('--secondary-foreground', '40 60% 18%');
        root.style.setProperty('--muted', '60 40% 92%');
        root.style.setProperty('--muted-foreground', '40 20% 45%');
        root.style.setProperty('--card', '60 90% 99%');
        root.style.setProperty('--card-foreground', '40 60% 18%');
        root.style.setProperty('--accent', '30 95% 60%');
        root.style.setProperty('--accent-foreground', '0 0% 100%');
        root.style.setProperty('--border', '90 30% 80%');
        root.style.setProperty('--input', '60 30% 90%');
        root.style.setProperty('--ring', '30 95% 60%');
        root.style.setProperty('--background-hue', '60');
        break;
      case 'flamingo':
        root.style.setProperty('--background', '330 80% 97%');
        root.style.setProperty('--foreground', '330 40% 18%');
        root.style.setProperty('--primary', '340 90% 60%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '20 90% 90%');
        root.style.setProperty('--secondary-foreground', '330 40% 18%');
        root.style.setProperty('--muted', '300 40% 92%');
        root.style.setProperty('--muted-foreground', '330 20% 45%');
        root.style.setProperty('--card', '340 80% 99%');
        root.style.setProperty('--card-foreground', '330 40% 18%');
        root.style.setProperty('--accent', '270 80% 65%');
        root.style.setProperty('--accent-foreground', '0 0% 100%');
        root.style.setProperty('--border', '340 30% 80%');
        root.style.setProperty('--input', '340 30% 90%');
        root.style.setProperty('--ring', '270 80% 65%');
        root.style.setProperty('--background-hue', '330');
        break;
      case 'galaxy':
        root.style.setProperty('--background', '248 60% 10%');
        root.style.setProperty('--foreground', '220 40% 95%');
        root.style.setProperty('--primary', '265 90% 60%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '220 80% 20%');
        root.style.setProperty('--secondary-foreground', '220 40% 95%');
        root.style.setProperty('--muted', '248 40% 18%');
        root.style.setProperty('--muted-foreground', '220 20% 80%');
        root.style.setProperty('--card', '248 60% 15%');
        root.style.setProperty('--card-foreground', '220 40% 95%');
        root.style.setProperty('--accent', '200 100% 60%');
        root.style.setProperty('--accent-foreground', '0 0% 100%');
        root.style.setProperty('--border', '265 30% 40%');
        root.style.setProperty('--input', '248 30% 20%');
        root.style.setProperty('--ring', '200 100% 60%');
        root.style.setProperty('--background-hue', '248');
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

  const getPageLayoutClasses = (): string => {
    switch (theme.layout) {
      case 'compact':
        return 'space-y-2 p-2';
      case 'spacious':
        return 'space-y-12 p-12';
      case 'modern':
        return 'space-y-8 p-8';
      default:
        return 'space-y-6 p-6';
    }
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
      getSkinClasses,
      getPageLayoutClasses
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
