
import { ThemeConfig } from '@/types/theme';

export const defaultTheme: ThemeConfig = {
  colorTheme: 'ocean',
  typography: 'modern',
  iconScheme: 'normal',
  designSystem: 'tailwind',
  layout: 'default',
  skin: 'default'
};

// Avatar collections
export const avatarCollections = {
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
export const skinStyles = {
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
