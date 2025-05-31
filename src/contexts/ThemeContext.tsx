
import React, { createContext, useContext, useEffect, useState } from 'react';

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
}

const defaultTheme: ThemeConfig = {
  colorTheme: 'light',
  typography: 'modern',
  iconScheme: 'normal',
  designSystem: 'tailwind',
  layout: 'default',
  skin: 'default'
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
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'vibrant', 'vivid', 'minimal', 'grayscale');
    root.classList.remove('font-inter', 'font-poppins', 'font-roboto', 'font-playfair', 'font-comic');
    
    // Apply current theme classes
    root.classList.add(theme.colorTheme);
    
    // Apply typography
    switch (theme.typography) {
      case 'technical':
        root.classList.add('font-roboto');
        break;
      case 'professional':
        root.classList.add('font-inter');
        break;
      case 'elegant':
        root.classList.add('font-playfair');
        break;
      case 'modern':
        root.classList.add('font-poppins');
        break;
      case 'playful':
        root.classList.add('font-comic');
        break;
    }
    
    // Apply CSS variables for different color themes
    applyColorTheme(theme.colorTheme);
  }, [theme]);

  const applyColorTheme = (colorTheme: string) => {
    const root = document.documentElement;
    
    switch (colorTheme) {
      case 'dark':
        root.style.setProperty('--background', '222.2 84% 4.9%');
        root.style.setProperty('--foreground', '210 40% 98%');
        root.style.setProperty('--primary', '210 40% 98%');
        root.style.setProperty('--primary-foreground', '222.2 47.4% 11.2%');
        break;
      case 'vibrant':
        root.style.setProperty('--background', '340 100% 97%');
        root.style.setProperty('--foreground', '340 10% 10%');
        root.style.setProperty('--primary', '340 75% 55%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        break;
      case 'vivid':
        root.style.setProperty('--background', '270 100% 97%');
        root.style.setProperty('--foreground', '270 10% 10%');
        root.style.setProperty('--primary', '270 100% 60%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        break;
      case 'minimal':
        root.style.setProperty('--background', '0 0% 99%');
        root.style.setProperty('--foreground', '0 0% 15%');
        root.style.setProperty('--primary', '0 0% 25%');
        root.style.setProperty('--primary-foreground', '0 0% 98%');
        break;
      case 'grayscale':
        root.style.setProperty('--background', '0 0% 95%');
        root.style.setProperty('--foreground', '0 0% 20%');
        root.style.setProperty('--primary', '0 0% 40%');
        root.style.setProperty('--primary-foreground', '0 0% 95%');
        break;
      default: // light
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '222.2 84% 4.9%');
        root.style.setProperty('--primary', '222.2 47.4% 11.2%');
        root.style.setProperty('--primary-foreground', '210 40% 98%');
        break;
    }
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
