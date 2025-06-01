
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Customize Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Color Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {['light', 'dark', 'vibrant', 'vivid', 'minimal', 'grayscale'].map((color) => (
              <DropdownMenuItem
                key={color}
                onClick={() => updateTheme({ colorTheme: color as any })}
                className={theme.colorTheme === color ? 'bg-primary text-primary-foreground' : ''}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
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
            Skin
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {['default', 'gradient', 'solid', 'pattern'].map((skin) => (
              <DropdownMenuItem
                key={skin}
                onClick={() => updateTheme({ skin: skin as any })}
                className={theme.skin === skin ? 'bg-primary text-primary-foreground' : ''}
              >
                {skin.charAt(0).toUpperCase() + skin.slice(1)}
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
