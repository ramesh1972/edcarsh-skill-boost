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
    { key: 'ocean', label: 'Ocean Blue', description: 'Deep blues and teals' },
    { key: 'sunset', label: 'Sunset Orange', description: 'Warm oranges and reds' },
    { key: 'forest', label: 'Forest Green', description: 'Natural greens and earth tones' },
    { key: 'lavender', label: 'Lavender Purple', description: 'Soft purples and pinks' },
    { key: 'monochrome', label: 'Monochrome', description: 'Pure blacks, whites, and grays' }
  ];

  const skinOptions = [
    { key: 'default', label: 'Default', description: 'Clean, minimal appearance' },
    { key: 'gradient', label: 'Gradient', description: 'Smooth gradient backgrounds' },
    { key: 'textured', label: 'Textured', description: 'Subtle pattern textures' },
    { key: 'glassmorphism', label: 'Glass', description: 'Frosted glass effect' }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>Customize Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Color Palette
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64">
            {colorThemes.map((color) => (
              <DropdownMenuItem
                key={color.key}
                onClick={() => updateTheme({ colorTheme: color.key as any })}
                className={`flex flex-col items-start gap-1 p-3 ${theme.colorTheme === color.key ? 'bg-primary text-primary-foreground' : ''}`}
              >
                <div className="font-medium">{color.label}</div>
                <div className="text-xs opacity-75">{color.description}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Typography
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {['technical', 'professional', 'elegant', 'modern', 'playful'].map((typography) => (
              <DropdownMenuItem
                key={typography}
                onClick={() => updateTheme({ typography: typography as any })}
                className={theme.typography === typography ? 'bg-primary text-primary-foreground' : ''}
              >
                {typography.charAt(0).toUpperCase() + typography.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Icon Scheme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {['normal', 'cartoon', 'emoji', 'avatars'].map((iconScheme) => (
              <DropdownMenuItem
                key={iconScheme}
                onClick={() => updateTheme({ iconScheme: iconScheme as any })}
                className={theme.iconScheme === iconScheme ? 'bg-primary text-primary-foreground' : ''}
              >
                {iconScheme.charAt(0).toUpperCase() + iconScheme.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Design System
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
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
                className={theme.designSystem === designSystem.key ? 'bg-primary text-primary-foreground' : ''}
              >
                {designSystem.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Layout
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {['default', 'compact', 'spacious', 'modern'].map((layout) => (
              <DropdownMenuItem
                key={layout}
                onClick={() => updateTheme({ layout: layout as any })}
                className={theme.layout === layout ? 'bg-primary text-primary-foreground' : ''}
              >
                {layout.charAt(0).toUpperCase() + layout.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Brush className="w-4 h-4" />
            Skin Style
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64">
            {skinOptions.map((skin) => (
              <DropdownMenuItem
                key={skin.key}
                onClick={() => updateTheme({ skin: skin.key as any })}
                className={`flex flex-col items-start gap-1 p-3 ${theme.skin === skin.key ? 'bg-primary text-primary-foreground' : ''}`}
              >
                <div className="font-medium">{skin.label}</div>
                <div className="text-xs opacity-75">{skin.description}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={resetTheme}>
          Reset to Default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
