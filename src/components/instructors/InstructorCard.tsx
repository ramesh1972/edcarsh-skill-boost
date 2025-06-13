import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Instructor } from '@/types'
import { getSubjectById, getSubjectBySubjectId } from '@/adapters/industrySubjectAdpator';
import { getUserName } from '@/adapters/userDataAdapter';

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
  titleText = 'Instructor',
  className = '',
  onAboutClick
}) => {
  // Return null if instructor is not found
  if (!instructor) {
    return null;
  }

  const sizeConfig = {
    sm: {
      avatar: 'h-10 w-10',
      title: 'text-xs',
      name: 'text-xs',
      details: 'text-xs',
      button: 'h-5 px-1 text-xs',
      icon: 'h-2 w-2',
      spacing: 'gap-2 mb-2',
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
    if (hideSubjects || instructor.preferredIndustries.length === 0 || instructor.preferredSubjects.length === 0) {
      return null;
    }

    const allSubjects: { name: string; color: string }[] = [];

    instructor.preferredSubjects.forEach(subjectId => {
      const subject = getSubjectBySubjectId(subjectId);
      const subjectName = subject?.name || 'Unknown Subject';
      if (subjectName !== 'Unknown Subject') {
        allSubjects.push({
          name: subjectName,
          color: subject?.color || '#6b7280'
        });
      }
    });

    if (allSubjects.length === 0) return null;

    const displayedSubjects = allSubjects.length > 2 ? allSubjects.slice(0, 2) : allSubjects;
    const extraCount = allSubjects.length - displayedSubjects.length;

    return (
      <div className="items-start flex flex-col justify-start flex-wrap">
        <h6 className={`font-medium mb-1 ${config.details}`}>Teaches</h6>
        <div className="flex flex-wrap gap-1">
          {displayedSubjects.map((subject, index) => (
            <Badge
              key={index}
              customColor={subject.color}
              className={`text-white ${config.badge}`}
            >
              {subject.name}
            </Badge>
          ))}
          {extraCount > 0 && (
            <Badge className={`bg-muted text-muted-foreground border border-muted-foreground/30 ${config.badge}`}>+ {extraCount} more</Badge>
          )}
        </div>
      </div>
    );
  };

  const instructorName = getUserName(instructor.id) || "Unknown Instructor";
  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center  ${className}`}>
        {showTitle && (
          <h4 className={`text-sm font-medium`}>
            {titleText}
          </h4>
        )}
        <Avatar className={`${config.avatar} flex-shrink-0 mb-2`}>
          <AvatarImage src={instructor.image} alt={getUserName(instructor.userId)} className="border-2 border-muted-foreground rounded-full object-cover" />
          <AvatarFallback className="rounded-full">
            {getUserName(instructor.userId).split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="items-center justify-start text-center" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
          <div className="flex items-center justify-center gap-2 mb-1 ">
            <h5 className={`font-medium ${config.name}`}>{instructorName}</h5>
            <span className={config.details}>{"Flag"}</span> {/* Placeholder for flag, replace with actual flag logic */}
          </div>
          <p className={`text-muted-foreground mb-1 ${config.details}`}>{instructor.specialty}</p>
          {!hideExperience && !hideLocation && (
            <p className={`text-muted-foreground mb-2 ${config.details}`}>
              {!hideExperience && instructor.experience}
              {!hideExperience && !hideLocation && ' • '}
              {!hideLocation && `${instructor.city}, ${instructor.country}`}
            </p>
          )}

          <div className="mt-3">
            <AboutButton />
          </div>
        </div>
        <div className={`flex items-center justify-center mt-4 ${config.spacing}`}>
          {renderSubjects()}
        </div>
        {!hideDescription && (
          <p className={`text-muted-foreground line-clamp-2 mt-3 ${config.details}`}>
            {instructor.about || instructor.description || "No description available."}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col  ${className} `}>
      {showTitle && (
        <h4 className={`text-sm font-medium mb-2`}>
          {titleText}
        </h4>
      )}
      <div className={`flex items-start ${config.spacing.split(' ')[0]}`}>
        <Avatar className={`${config.avatar} flex-shrink-0`}>
          <AvatarImage src={instructor.image} alt={instructorName} className="rounded-full object-cover" />
          <AvatarFallback className="rounded-full">
            {instructorName}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 flex-wrap" >
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h5 className={`font-medium ${config.name}`}>{instructorName}</h5>
            <span className={config.details}>{"Flag"}</span> {/* Placeholder for flag, replace with actual flag logic */}
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
        </div>
      </div>
      <div className={`flex items-start justify-start mt-4 ${config.spacing}`}>
        {renderSubjects()}
      </div>
      {!hideDescription && (
        <p className={`text-muted-foreground line-clamp-2 mt-3 ${config.details}`}>
          {instructor.about || instructor.description || "No description available."}
        </p>
      )}
    </div>
  );
};

export default InstructorCard;
