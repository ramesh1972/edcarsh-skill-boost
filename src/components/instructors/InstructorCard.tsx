import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { getIndustryNameById, getSubjectNameById, getSubjectById } from '@/data/masterData';
import { Instructor } from '@/types/instructor.types';

interface InstructorCardProps {
  instructor: Instructor | null | undefined;
  referrerRoute?: string;
  referrerName?: string;
  hideDescription?: boolean;
  hideAboutButton?: boolean;
  hideLocation?: boolean;
  hideExperience?: boolean;
  hideSubjects?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  showTitle?: boolean;
  titleText?: string;
  className?: string;
  onAboutClick?: () => void;
}

const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  referrerRoute = '/instructors',
  referrerName = 'Instructors',
  hideDescription = false,
  hideAboutButton = false,
  hideLocation = false,
  hideExperience = false,
  hideSubjects = false,
  size = 'md',
  layout = 'horizontal',
  showTitle = true,
  titleText = 'Instructor:',
  className = '',
  onAboutClick
}) => {
  // Return null if instructor is not found
  if (!instructor) {
    return null;
  }

  const sizeConfig = {
    sm: {
      avatar: 'h-8 w-8',
      title: 'text-xs',
      name: 'text-xs',
      details: 'text-xs',
      button: 'h-5 px-1 text-xs',
      icon: 'h-2 w-2',
      spacing: 'gap-2 mb-2',
      padding: 'p-2',
      badge: 'text-xs px-1 py-0.5'
    },
    md: {
      avatar: 'h-12 w-12',
      title: 'text-sm',
      name: 'text-sm',
      details: 'text-xs',
      button: 'h-6 px-2 text-xs',
      icon: 'h-3 w-3',
      spacing: 'gap-3 mb-3',
      padding: 'p-',
      badge: 'text-xs px-2 py-1'
    },
    lg: {
      avatar: 'h-16 w-16',
      title: 'text-base',
      name: 'text-base',
      details: 'text-sm',
      button: 'h-8 px-3 text-sm',
      icon: 'h-4 w-4',
      spacing: 'gap-4 mb-4',
      padding: 'p-1',
      badge: 'text-sm px-3 py-1'
    }
  };

  const config = sizeConfig[size];

  const handleAboutClick = () => {
    if (onAboutClick) {
      onAboutClick();
    }
  };

  const AboutButton = () => {
    if (hideAboutButton) return null;

    if (onAboutClick) {
      return (
        <Button
          variant="outline"
          size="sm"
          className={config.button}
          onClick={handleAboutClick}
        >
          <Info className={`${config.icon} mr-1`} />
          About
        </Button>
      );
    }

    return (
      <Link to={`/instructors/${instructor.id}`}>
        <Button
          variant="outline"
          size="sm"
          className={config.button}
        >
          <Info className={`${config.icon} mr-1`} />
          About
        </Button>
      </Link>
    );
  };

  const renderSubjects = () => {
    if (hideSubjects || !instructor.subjects || instructor.subjects.length === 0) {
      return null;
    }

    const allSubjects: { name: string; color: string }[] = [];
    
    instructor.subjects.forEach(industrySubjects => {
      industrySubjects.subjectIds.forEach(subjectId => {
        const subjectName = getSubjectNameById(industrySubjects.industryId, subjectId);
        const subject = getSubjectById(industrySubjects.industryId, subjectId);
        if (subjectName !== 'Unknown Subject') {
          allSubjects.push({
            name: subjectName,
            color: subject?.color || '#6b7280'
          });
        }
      });
    });

    if (allSubjects.length === 0) return null;

    return (
      <div className="mt-2">
        <h6 className={`font-medium mb-1 ${config.details}`}>Teaches:</h6>
        <div className="flex flex-wrap gap-1">
          {allSubjects.map((subject, index) => (
            <Badge 
              key={index} 
              customColor={subject.color}
              className={`text-white ${config.badge}`}
            >
              {subject.name}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  if (layout === 'vertical') {
    return (
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
        <div className="flex-1 min-w-0 w-full">
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
          {renderSubjects()}
          <div className="mt-3">
            <AboutButton />
          </div>
        </div>
        {!hideDescription && (
          <p className={`text-muted-foreground line-clamp-2 mt-3 ${config.details}`}>
            {instructor.description}
          </p>
        )}
      </div>
    );
  }

  return (
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
            <AboutButton />
          </div>
          <p className={`text-muted-foreground mb-1 ${config.details}`}>{instructor.specialty}</p>
          {!hideExperience && !hideLocation && (
            <p className={`text-muted-foreground ${config.details}`}>
              {!hideExperience && instructor.experience}
              {!hideExperience && !hideLocation && ' • '}
              {!hideLocation && `${instructor.city}, ${instructor.country}`}
            </p>
          )}
          {renderSubjects()}
        </div>
      </div>
      {!hideDescription && (
        <p className={`text-muted-foreground line-clamp-2 mt-3 ${config.details}`}>
          {instructor.description}
        </p>
      )}
    </div>
  );
};

export default InstructorCard;
