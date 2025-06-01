
export const applyDesignSystemStyles = (designSystem: string) => {
  const root = document.documentElement;
  
  // Apply design system specific CSS custom properties
  switch (designSystem) {
    case 'material':
      root.style.setProperty('--radius', '4px');
      root.style.setProperty('--shadow', '0 2px 4px rgba(0,0,0,0.1)');
      root.style.setProperty('--elevation', '4px');
      break;
    case 'human':
      root.style.setProperty('--radius', '12px');
      root.style.setProperty('--shadow', '0 4px 16px rgba(0,0,0,0.1)');
      root.style.setProperty('--elevation', '8px');
      break;
    case 'fluent':
      root.style.setProperty('--radius', '2px');
      root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
      root.style.setProperty('--elevation', '2px');
      break;
    case 'ant':
      root.style.setProperty('--radius', '6px');
      root.style.setProperty('--shadow', '0 2px 8px rgba(0,0,0,0.1)');
      root.style.setProperty('--elevation', '4px');
      break;
    case 'carbon':
      root.style.setProperty('--radius', '0px');
      root.style.setProperty('--shadow', '0 1px 2px rgba(0,0,0,0.1)');
      root.style.setProperty('--elevation', '1px');
      break;
    case 'atlassian':
      root.style.setProperty('--radius', '3px');
      root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
      root.style.setProperty('--elevation', '2px');
      break;
    case 'bootstrap':
      root.style.setProperty('--radius', '0.375rem');
      root.style.setProperty('--shadow', '0 0.125rem 0.25rem rgba(0,0,0,0.075)');
      root.style.setProperty('--elevation', '2px');
      break;
    case 'polaris':
      root.style.setProperty('--radius', '8px');
      root.style.setProperty('--shadow', '0 1px 0 rgba(0,0,0,0.05)');
      root.style.setProperty('--elevation', '2px');
      break;
    case 'lightning':
      root.style.setProperty('--radius', '0.25rem');
      root.style.setProperty('--shadow', '0 2px 2px rgba(0,0,0,0.1)');
      root.style.setProperty('--elevation', '2px');
      break;
    default: // tailwind
      root.style.setProperty('--radius', '0.5rem');
      root.style.setProperty('--shadow', '0 1px 3px rgba(0,0,0,0.1)');
      root.style.setProperty('--elevation', '2px');
      break;
  }
};

export const applyColorTheme = (colorTheme: string) => {
  const root = document.documentElement;
  
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
      break;
  }
};
