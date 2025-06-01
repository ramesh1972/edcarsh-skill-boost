
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeConfig, ThemeContextType } from '@/types/theme';
import { defaultTheme, avatarCollections } from '@/constants/themeConstants';
import { iconLibraries } from '@/utils/iconLibraries';
import { applyDesignSystemStyles, applyColorTheme } from '@/utils/themeStyler';

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
    root.classList.remove('skin-default', 'skin-gradient', 'skin-textured', 'skin-glassmorphism');
    
    // Apply current theme classes
    root.classList.add(theme.colorTheme);
    root.classList.add(`${theme.designSystem}-design`);
    root.classList.add(`layout-${theme.layout}`);
    root.classList.add(`skin-${theme.skin}`);
    
    // Apply typography to body
    body.classList.add(`font-${theme.typography}`);
    
    // Apply design system specific styles
    applyDesignSystemStyles(theme.designSystem);
    
    // Apply color theme variables
    applyColorTheme(theme.colorTheme);
  }, [theme]);

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
