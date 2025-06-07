
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Info } from 'lucide-react';
import InstructorDetailsModal from './InstructorDetailsModal';

interface Instructor {
  name: string;
  image: string;
  experience: string;
  specialty: string;
  city: string;
  country: string;
  flag: string;
  description: string;
}

interface InstructorCardProps {
  instructor: Instructor;
  hideDescription?: boolean;
  hideAboutButton?: boolean;
  hideLocation?: boolean;
  hideExperience?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  showTitle?: boolean;
  titleText?: string;
  className?: string;
  onAboutClick?: () => void;
}

const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  hideDescription = false,
  hideAboutButton = false,
  hideLocation = false,
  hideExperience = false,
  size = 'md',
  layout = 'horizontal',
  showTitle = true,
  titleText = 'Instructor:',
  className = '',
  onAboutClick
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sizeConfig = {
    sm: {
      avatar: 'h-8 w-8',
      title: 'text-xs',
      name: 'text-xs',
      details: 'text-xs',
      button: 'h-5 px-1 text-xs',
      icon: 'h-2 w-2',
      spacing: 'gap-2 mb-2',
      padding: 'p-0'
    },
    md: {
      avatar: 'h-12 w-12',
      title: 'text-sm',
      name: 'text-sm',
      details: 'text-xs',
      button: 'h-6 px-2 text-xs',
      icon: 'h-3 w-3',
      spacing: 'gap-3 mb-3',
      padding: 'p-0'
    },
    lg: {
      avatar: 'h-16 w-16',
      title: 'text-base',
      name: 'text-base',
      details: 'text-sm',
      button: 'h-8 px-3 text-sm',
      icon: 'h-4 w-4',
      spacing: 'gap-4 mb-4',
      padding: 'p-1'
    }
  };

  const config = sizeConfig[size];

  const handleAboutClick = () => {
    if (onAboutClick) {
      onAboutClick();
    } else {
      setIsModalOpen(true);
    }
  };

  if (layout === 'vertical') {
    return (
      <>
        <div className={`flex flex-col items-center text-center ${config.padding} ${className}`}>
          {showTitle && (
            <h4 className={`font-medium ${config.title} ${config.spacing.split(' ')[1]}`}>
              {titleText}
            </h4>
          )}
          <Avatar className={`${config.avatar} flex-shrink-0 mb-2`}>
            <AvatarImage src={instructor.image} alt={instructor.name} className="rounded-full object-cover" />
            <AvatarFallback className="rounded-full">
              {instructor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h5 className={`font-medium ${config.name}`}>{instructor.name}</h5>
              <span className={config.details}>{instructor.flag}</span>
            </div>
            <p className={`text-muted-foreground mb-1 ${config.details}`}>{instructor.specialty}</p>
            {!hideExperience && !hideLocation && (
              <p className={`text-muted-foreground mb-2 ${config.details}`}>
                {!hideExperience && instructor.experience}
                {!hideExperience && !hideLocation && ' • '}
                {!hideLocation && `${instructor.city}, ${instructor.country}`}
              </p>
            )}
            {!hideAboutButton && (
              <Button 
                variant="outline" 
                size="sm" 
                className={config.button}
                onClick={handleAboutClick}
              >
                <Info className={`${config.icon} mr-1`} />
                About
              </Button>
            )}
          </div>
          {!hideDescription && (
            <p className={`text-muted-foreground line-clamp-4 mt-3 ${config.details}`}>
              {instructor.description}
            </p>
          )}
        </div>
        <InstructorDetailsModal 
          instructor={instructor}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className={`flex flex-col ${config.padding} ${className}`}>
        {showTitle && (
          <h4 className={`font-medium ${config.title} ${config.spacing.split(' ')[1]}`}>
            {titleText}
          </h4>
        )}
        <div className={`flex items-start ${config.spacing.split(' ')[0]}`}>
          <Avatar className={`${config.avatar} flex-shrink-0`}>
            <AvatarImage src={instructor.image} alt={instructor.name} className="rounded-full object-cover" />
            <AvatarFallback className="rounded-full">
              {instructor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h5 className={`font-medium ${config.name}`}>{instructor.name}</h5>
              <span className={config.details}>{instructor.flag}</span>
              {!hideAboutButton && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={config.button}
                  onClick={handleAboutClick}
                >
                  <Info className={`${config.icon} mr-1`} />
                  About
                </Button>
              )}
            </div>
            <p className={`text-muted-foreground mb-1 ${config.details}`}>{instructor.specialty}</p>
            {!hideExperience && !hideLocation && (
              <p className={`text-muted-foreground ${config.details}`}>
                {!hideExperience && instructor.experience}
                {!hideExperience && !hideLocation && ' • '}
                {!hideLocation && `${instructor.city}, ${instructor.country}`}
              </p>
            )}
          </div>
        </div>
        {!hideDescription && (
          <p className={`text-muted-foreground line-clamp-4 mt-3 ${config.details}`}>
            {instructor.description}
          </p>
        )}
      </div>
      <InstructorDetailsModal 
        instructor={instructor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default InstructorCard;
