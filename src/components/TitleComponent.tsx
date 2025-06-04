import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface TitleComponentProps {
  title: string;
  subtitle: string;
  iconName?: string;
  className?: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ title, subtitle, iconName = 'course', className = '' }) => {
  const { getIcon } = useTheme();
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="[&>svg]:w-12 [&>svg]:h-12 md:[&>svg]:w-[2.8rem] md:[&>svg]:h-[2.8rem] leading-none flex items-center justify-center">
          {getIcon(iconName)}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-lg m-0 p-0">
          {title}
        </h1>
      </div>
      <p className="text-lg md:text-xl text-muted-foreground font-medium mt-2">{subtitle}</p>
    </div>
  );
};

export default TitleComponent;
