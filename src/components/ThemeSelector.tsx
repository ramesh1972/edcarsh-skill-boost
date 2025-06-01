
import React, { useState } from 'react';
import { Settings, Palette, Type, Image, Layout, Brush, Layers, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const ThemeSelector: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colorThemes = [
    { key: 'ocean', label: 'Ocean Depths', description: 'Deep blues with coral and teal accents' },
    { key: 'sunset', label: 'Golden Sunset', description: 'Warm oranges with purple highlights' },
    { key: 'forest', label: 'Forest Grove', description: 'Rich greens with golden earth tones' },
    { key: 'lavender', label: 'Lavender Fields', description: 'Soft purples with mint and rose' },
    { key: 'monochrome', label: 'Classic Mono', description: 'Timeless blacks and whites with blue' }
  ];

  const skinOptions = [
    { key: 'default', label: 'Default', description: 'Clean, minimal appearance' },
    { key: 'gradient', label: 'Gradient', description: 'Smooth gradient backgrounds' },
    { key: 'textured', label: 'Textured', description: 'Subtle pattern textures' },
    { key: 'glassmorphism', label: 'Glass', description: 'Frosted glass effect' }
  ];

  const handleThemeChange = (themeUpdate: any) => {
    updateTheme(themeUpdate);
    console.log('Theme updated:', themeUpdate);
    // Don't close the menu, keep it open for multiple changes
  };

  const handleItemClick = (themeUpdate: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleThemeChange(themeUpdate);
  };

  const handleSubMenuClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-2 shadow-md hover:shadow-lg transition-shadow">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 border-2 shadow-xl bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-2 py-1.5 border-b">
          <DropdownMenuLabel className="p-0">Customize Theme</DropdownMenuLabel>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-accent border hover:border-accent-foreground/20 shadow-sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger 
            className="flex items-center gap-2 border border-transparent hover:border-accent shadow-sm"
            onSelect={(e) => e.preventDefault()}
            onClick={handleSubMenuClick}
          >
            <Palette className="w-4 h-4" />
            Color Palette
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64 border-2 shadow-xl bg-background/95 backdrop-blur-sm">
            {colorThemes.map((color) => (
              <DropdownMenuItem
                key={color.key}
                onSelect={(e) => e.preventDefault()}
                onClick={(e) => handleItemClick({ colorTheme: color.key as any }, e)}
                className={`flex flex-col items-start gap-1 p-3 border border-transparent hover:border-accent/50 shadow-sm hover:shadow-md transition-all ${theme.colorTheme === color.key ? 'bg-primary text-primary-foreground border-primary shadow-md' : ''}`}
              >
                <div className="font-medium">{color.label}</div>
                <div className="text-xs opacity-75">{color.description}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger 
            className="flex items-center gap-2 border border-transparent hover:border-accent shadow-sm"
            onSelect={(e) => e.preventDefault()}
            onClick={handleSubMenuClick}
          >
            <Type className="w-4 h-4" />
            Typography
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="border-2 shadow-xl bg-background/95 backdrop-blur-sm">
            {['technical', 'professional', 'elegant', 'modern', 'playful'].map((typography) => (
              <DropdownMenuItem
                key={typography}
                onSelect={(e) => e.preventDefault()}
                onClick={(e) => handleItemClick({ typography: typography as any }, e)}
                className={`border border-transparent hover:border-accent/50 shadow-sm hover:shadow-md transition-all ${theme.typography === typography ? 'bg-primary text-primary-foreground border-primary shadow-md' : ''}`}
              >
                {typography.charAt(0).toUpperCase() + typography.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger 
            className="flex items-center gap-2 border border-transparent hover:border-accent shadow-sm"
            onSelect={(e) => e.preventDefault()}
            onClick={handleSubMenuClick}
          >
            <Image className="w-4 h-4" />
            Icon Scheme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="border-2 shadow-xl bg-background/95 backdrop-blur-sm">
            {['normal', 'cartoon', 'emoji', 'avatars'].map((iconScheme) => (
              <DropdownMenuItem
                key={iconScheme}
                onSelect={(e) => e.preventDefault()}
                onClick={(e) => handleItemClick({ iconScheme: iconScheme as any }, e)}
                className={`border border-transparent hover:border-accent/50 shadow-sm hover:shadow-md transition-all ${theme.iconScheme === iconScheme ? 'bg-primary text-primary-foreground border-primary shadow-md' : ''}`}
              >
                {iconScheme.charAt(0).toUpperCase() + iconScheme.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger 
            className="flex items-center gap-2 border border-transparent hover:border-accent shadow-sm"
            onSelect={(e) => e.preventDefault()}
            onClick={handleSubMenuClick}
          >
            <Layers className="w-4 h-4" />
            Design System
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="border-2 shadow-xl bg-background/95 backdrop-blur-sm">
            {[
              { key: 'tailwind', label: 'Tailwind CSS' },
              { key: 'material', label: 'Material Design' },
              { key: 'human', label: 'Human Interface' },
              { key: 'fluent', label: 'Fluent Design' },
              { key: 'ant', label: 'Ant Design' },
              { key: 'carbon', label: 'Carbon Design' },
              { key: 'atlassian', label: 'Atlassian' },
              { key: 'bootstrap', label: 'Bootstrap' },
              { key: 'polaris', label: 'Polaris' },
              { key: 'lightning', label: 'Lightning' }
            ].map((designSystem) => (
              <DropdownMenuItem
                key={designSystem.key}
                onSelect={(e) => e.preventDefault()}
                onClick={(e) => handleItemClick({ designSystem: designSystem.key as any }, e)}
                className={`border border-transparent hover:border-accent/50 shadow-sm hover:shadow-md transition-all ${theme.designSystem === designSystem.key ? 'bg-primary text-primary-foreground border-primary shadow-md' : ''}`}
              >
                {designSystem.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger 
            className="flex items-center gap-2 border border-transparent hover:border-accent shadow-sm"
            onSelect={(e) => e.preventDefault()}
            onClick={handleSubMenuClick}
          >
            <Layout className="w-4 h-4" />
            Layout
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="border-2 shadow-xl bg-background/95 backdrop-blur-sm">
            {['default', 'compact', 'spacious', 'modern'].map((layout) => (
              <DropdownMenuItem
                key={layout}
                onSelect={(e) => e.preventDefault()}
                onClick={(e) => handleItemClick({ layout: layout as any }, e)}
                className={`border border-transparent hover:border-accent/50 shadow-sm hover:shadow-md transition-all ${theme.layout === layout ? 'bg-primary text-primary-foreground border-primary shadow-md' : ''}`}
              >
                {layout.charAt(0).toUpperCase() + layout.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger 
            className="flex items-center gap-2 border border-transparent hover:border-accent shadow-sm"
            onSelect={(e) => e.preventDefault()}
            onClick={handleSubMenuClick}
          >
            <Brush className="w-4 h-4" />
            Skin Style
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64 border-2 shadow-xl bg-background/95 backdrop-blur-sm">
            {skinOptions.map((skin) => (
              <DropdownMenuItem
                key={skin.key}
                onSelect={(e) => e.preventDefault()}
                onClick={(e) => handleItemClick({ skin: skin.key as any }, e)}
                className={`flex flex-col items-start gap-1 p-3 border border-transparent hover:border-accent/50 shadow-sm hover:shadow-md transition-all ${theme.skin === skin.key ? 'bg-primary text-primary-foreground border-primary shadow-md' : ''}`}
              >
                <div className="font-medium">{skin.label}</div>
                <div className="text-xs opacity-75">{skin.description}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onSelect={(e) => e.preventDefault()} 
          onClick={resetTheme}
          className="border border-transparent hover:border-destructive/50 shadow-sm hover:shadow-md transition-all hover:bg-destructive/10"
        >
          Reset to Default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
