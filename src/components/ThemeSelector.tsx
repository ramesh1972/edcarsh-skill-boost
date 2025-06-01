
import React from 'react';
import { Settings, Palette, Type, Image, Layout, Brush, Layers, X, ChevronLeft } from 'lucide-react';
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

  const handleThemeUpdate = (updates: any) => {
    updateTheme(updates);
  };

  return (
    <div className="space-y-1">
      <DropdownMenuLabel className="text-base font-semibold border-b border-secondary/30 pb-2 mb-2">Customize Theme</DropdownMenuLabel>
      
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-card hover:text-card-foreground border border-transparent hover:border-secondary/50 transition-all">
          <ChevronLeft className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <span>Color Palette</span>
            <Palette className="w-4 h-4" />
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-64 bg-card border-2 border-secondary/60 shadow-xl z-[200]">
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center justify-between p-3 border-b border-secondary/30 cursor-pointer transition-all hover:bg-card/50 hover:text-card-foreground"
          >
            <X className="w-4 h-4" />
            <span>Close Sub-Menu</span>
          </DropdownMenuItem>
          {colorThemes.map((color) => (
            <DropdownMenuItem
              key={color.key}
              onSelect={(e) => {
                e.preventDefault();
                handleThemeUpdate({ colorTheme: color.key as any });
              }}
              className={`flex flex-col items-end gap-1 p-3 border-b border-secondary/30 last:border-b-0 cursor-pointer transition-all text-right ${
                theme.colorTheme === color.key 
                  ? 'bg-card text-card-foreground border-r-4 border-r-secondary' 
                  : 'hover:bg-card/50 hover:text-card-foreground'
              }`}
            >
              <div className="font-medium">{color.label}</div>
              <div className="text-xs opacity-75">{color.description}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-card hover:text-card-foreground border border-transparent hover:border-secondary/50 transition-all">
          <ChevronLeft className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <span>Typography</span>
            <Type className="w-4 h-4" />
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="bg-card border-2 border-secondary/60 shadow-xl z-[200]">
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center justify-between p-3 border-b border-secondary/30 cursor-pointer transition-all hover:bg-card/50 hover:text-card-foreground"
          >
            <X className="w-4 h-4" />
            <span>Close Sub-Menu</span>
          </DropdownMenuItem>
          {['technical', 'professional', 'elegant', 'modern', 'playful'].map((typography) => (
            <DropdownMenuItem
              key={typography}
              onSelect={(e) => {
                e.preventDefault();
                handleThemeUpdate({ typography: typography as any });
              }}
              className={`px-3 py-2 border-b border-secondary/30 last:border-b-0 cursor-pointer transition-all text-right ${
                theme.typography === typography 
                  ? 'bg-card text-card-foreground border-r-4 border-r-secondary' 
                  : 'hover:bg-card/50 hover:text-card-foreground'
              }`}
            >
              {typography.charAt(0).toUpperCase() + typography.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-card hover:text-card-foreground border border-transparent hover:border-secondary/50 transition-all">
          <ChevronLeft className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <span>Icon Scheme</span>
            <Image className="w-4 h-4" />
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="bg-card border-2 border-secondary/60 shadow-xl z-[200]">
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center justify-between p-3 border-b border-secondary/30 cursor-pointer transition-all hover:bg-card/50 hover:text-card-foreground"
          >
            <X className="w-4 h-4" />
            <span>Close Sub-Menu</span>
          </DropdownMenuItem>
          {['normal', 'cartoon', 'emoji', 'avatars'].map((iconScheme) => (
            <DropdownMenuItem
              key={iconScheme}
              onSelect={(e) => {
                e.preventDefault();
                handleThemeUpdate({ iconScheme: iconScheme as any });
              }}
              className={`px-3 py-2 border-b border-secondary/30 last:border-b-0 cursor-pointer transition-all text-right ${
                theme.iconScheme === iconScheme 
                  ? 'bg-card text-card-foreground border-r-4 border-r-secondary' 
                  : 'hover:bg-card/50 hover:text-card-foreground'
              }`}
            >
              {iconScheme.charAt(0).toUpperCase() + iconScheme.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-card hover:text-card-foreground border border-transparent hover:border-secondary/50 transition-all">
          <ChevronLeft className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <span>Design System</span>
            <Layers className="w-4 h-4" />
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="bg-card border-2 border-secondary/60 shadow-xl z-[200]">
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center justify-between p-3 border-b border-secondary/30 cursor-pointer transition-all hover:bg-card/50 hover:text-card-foreground"
          >
            <X className="w-4 h-4" />
            <span>Close Sub-Menu</span>
          </DropdownMenuItem>
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
              onSelect={(e) => {
                e.preventDefault();
                handleThemeUpdate({ designSystem: designSystem.key as any });
              }}
              className={`px-3 py-2 border-b border-secondary/30 last:border-b-0 cursor-pointer transition-all text-right ${
                theme.designSystem === designSystem.key 
                  ? 'bg-card text-card-foreground border-r-4 border-r-secondary' 
                  : 'hover:bg-card/50 hover:text-card-foreground'
              }`}
            >
              {designSystem.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-card hover:text-card-foreground border border-transparent hover:border-secondary/50 transition-all">
          <ChevronLeft className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <span>Layout</span>
            <Layout className="w-4 h-4" />
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="bg-card border-2 border-secondary/60 shadow-xl z-[200]">
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center justify-between p-3 border-b border-secondary/30 cursor-pointer transition-all hover:bg-card/50 hover:text-card-foreground"
          >
            <X className="w-4 h-4" />
            <span>Close Sub-Menu</span>
          </DropdownMenuItem>
          {['default', 'compact', 'spacious', 'modern'].map((layout) => (
            <DropdownMenuItem
              key={layout}
              onSelect={(e) => {
                e.preventDefault();
                handleThemeUpdate({ layout: layout as any });
              }}
              className={`px-3 py-2 border-b border-secondary/30 last:border-b-0 cursor-pointer transition-all text-right ${
                theme.layout === layout 
                  ? 'bg-card text-card-foreground border-r-4 border-r-secondary' 
                  : 'hover:bg-card/50 hover:text-card-foreground'
              }`}
            >
              {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-card hover:text-card-foreground border border-transparent hover:border-secondary/50 transition-all">
          <ChevronLeft className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <span>Skin Style</span>
            <Brush className="w-4 h-4" />
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-64 bg-card border-2 border-secondary/60 shadow-xl z-[200]">
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center justify-between p-3 border-b border-secondary/30 cursor-pointer transition-all hover:bg-card/50 hover:text-card-foreground"
          >
            <X className="w-4 h-4" />
            <span>Close Sub-Menu</span>
          </DropdownMenuItem>
          {skinOptions.map((skin) => (
            <DropdownMenuItem
              key={skin.key}
              onSelect={(e) => {
                e.preventDefault();
                handleThemeUpdate({ skin: skin.key as any });
              }}
              className={`flex flex-col items-end gap-1 p-3 border-b border-secondary/30 last:border-b-0 cursor-pointer transition-all text-right ${
                theme.skin === skin.key 
                  ? 'bg-card text-card-foreground border-r-4 border-r-secondary' 
                  : 'hover:bg-card/50 hover:text-card-foreground'
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
        className="px-3 py-2 rounded-md hover:bg-card hover:text-card-foreground border border-transparent hover:border-secondary/50 transition-all cursor-pointer"
      >
        <Settings className="w-4 h-4 mr-2" />
        Reset to Default
      </DropdownMenuItem>
    </div>
  );
};
