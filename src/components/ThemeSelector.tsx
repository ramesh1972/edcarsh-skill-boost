
import React from 'react';
import { Settings, Palette, Type, Image, Layout, Brush, Layers } from 'lucide-react';
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

  return (
    <div className="space-y-1">
      <DropdownMenuLabel className="text-base font-semibold border-b border-border/30 pb-2 mb-2">Customize Theme</DropdownMenuLabel>
      
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent/50 transition-all">
          <Palette className="w-4 h-4" />
          Color Palette
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-64 bg-background border-2 border-accent/40 shadow-lg">
          {colorThemes.map((color) => (
            <DropdownMenuItem
              key={color.key}
              onClick={() => updateTheme({ colorTheme: color.key as any })}
              className={`flex flex-col items-start gap-1 p-3 border-b border-border/20 last:border-b-0 cursor-pointer transition-all ${
                theme.colorTheme === color.key 
                  ? 'bg-accent text-accent-foreground border-l-4 border-l-accent' 
                  : 'hover:bg-accent/50'
              }`}
            >
              <div className="font-medium">{color.label}</div>
              <div className="text-xs opacity-75">{color.description}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent/50 transition-all">
          <Type className="w-4 h-4" />
          Typography
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="bg-background border-2 border-accent/40 shadow-lg">
          {['technical', 'professional', 'elegant', 'modern', 'playful'].map((typography) => (
            <DropdownMenuItem
              key={typography}
              onClick={() => updateTheme({ typography: typography as any })}
              className={`px-3 py-2 border-b border-border/20 last:border-b-0 cursor-pointer transition-all ${
                theme.typography === typography 
                  ? 'bg-accent text-accent-foreground border-l-4 border-l-accent' 
                  : 'hover:bg-accent/50'
              }`}
            >
              {typography.charAt(0).toUpperCase() + typography.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent/50 transition-all">
          <Image className="w-4 h-4" />
          Icon Scheme
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="bg-background border-2 border-accent/40 shadow-lg">
          {['normal', 'cartoon', 'emoji', 'avatars'].map((iconScheme) => (
            <DropdownMenuItem
              key={iconScheme}
              onClick={() => updateTheme({ iconScheme: iconScheme as any })}
              className={`px-3 py-2 border-b border-border/20 last:border-b-0 cursor-pointer transition-all ${
                theme.iconScheme === iconScheme 
                  ? 'bg-accent text-accent-foreground border-l-4 border-l-accent' 
                  : 'hover:bg-accent/50'
              }`}
            >
              {iconScheme.charAt(0).toUpperCase() + iconScheme.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent/50 transition-all">
          <Layers className="w-4 h-4" />
          Design System
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="bg-background border-2 border-accent/40 shadow-lg">
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
              onClick={() => updateTheme({ designSystem: designSystem.key as any })}
              className={`px-3 py-2 border-b border-border/20 last:border-b-0 cursor-pointer transition-all ${
                theme.designSystem === designSystem.key 
                  ? 'bg-accent text-accent-foreground border-l-4 border-l-accent' 
                  : 'hover:bg-accent/50'
              }`}
            >
              {designSystem.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent/50 transition-all">
          <Layout className="w-4 h-4" />
          Layout
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="bg-background border-2 border-accent/40 shadow-lg">
          {['default', 'compact', 'spacious', 'modern'].map((layout) => (
            <DropdownMenuItem
              key={layout}
              onClick={() => updateTheme({ layout: layout as any })}
              className={`px-3 py-2 border-b border-border/20 last:border-b-0 cursor-pointer transition-all ${
                theme.layout === layout 
                  ? 'bg-accent text-accent-foreground border-l-4 border-l-accent' 
                  : 'hover:bg-accent/50'
              }`}
            >
              {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent/50 transition-all">
          <Brush className="w-4 h-4" />
          Skin Style
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-64 bg-background border-2 border-accent/40 shadow-lg">
          {skinOptions.map((skin) => (
            <DropdownMenuItem
              key={skin.key}
              onClick={() => updateTheme({ skin: skin.key as any })}
              className={`flex flex-col items-start gap-1 p-3 border-b border-border/20 last:border-b-0 cursor-pointer transition-all ${
                theme.skin === skin.key 
                  ? 'bg-accent text-accent-foreground border-l-4 border-l-accent' 
                  : 'hover:bg-accent/50'
              }`}
            >
              <div className="font-medium">{skin.label}</div>
              <div className="text-xs opacity-75">{skin.description}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSeparator className="my-2" />
      <DropdownMenuItem 
        onClick={resetTheme}
        className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent/50 transition-all cursor-pointer"
      >
        <Settings className="w-4 h-4 mr-2" />
        Reset to Default
      </DropdownMenuItem>
    </div>
  );
};
