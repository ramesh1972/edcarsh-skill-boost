import { createContext, useContext } from "react";

export interface ThemeConfig {
  colorTheme: 'ocean' | 'sunset' | 'forest' | 'lavender' | 'monochrome' | 'aurora' | 'citrus' | 'flamingo' | 'galaxy';
  typography: 'technical' | 'professional' | 'elegant' | 'modern' | 'playful';
  iconScheme: 'normal' | 'cartoon' | 'emoji' | 'avatars';
  designSystem: 'material' | 'human' | 'fluent' | 'ant' | 'carbon' | 'atlassian' | 'bootstrap' | 'polaris' | 'lightning' | 'tailwind';
  layout: 'default' | 'compact' | 'spacious' | 'modern';
  skin: 'default' | 'gradient' | 'textured' | 'glassmorphism';
}

export const defaultTheme: ThemeConfig = {
  colorTheme: 'ocean',
  typography: 'modern',
  iconScheme: 'normal',
  designSystem: 'tailwind',
  layout: 'default',
  skin: 'default'
};

export interface ThemeContextType {
  theme: ThemeConfig;
  themeStr: string;
  setTheme: (theme: ThemeConfig) => void;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  getIcon: (iconName: string) => React.ReactNode;
  getAvatar: (avatarName: string) => string;
  getBackground: () => string;
  getSkinClasses: () => string;
  getPageLayoutClasses: () => string;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};