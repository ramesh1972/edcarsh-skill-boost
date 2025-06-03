
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';

interface CourseInfoCardProps {
  duration: string;
  students: number;
  price: string;
  nextSession: string;
}

const CourseInfoCard: React.FC<CourseInfoCardProps> = ({
  duration,
  students,
  price,
  nextSession
}) => {
  const { getIcon } = useTheme();
  
  return (
    <div className="flex grid-cols-2 grid-rows-1 gap-2 p-2">
      {/* Course Details */}
      <div className="flex items-center justify-between text-sm border-b">
        <div className="flex items-center gap-1">
          {getIcon('time')}
          {duration}
        </div>
        <div className="flex items-center gap-1">
          {getIcon('student')}
          {students} enrolled
        </div>
      </div>

      {/* Price and Session */}
      <div className="flex items-center justify-between text-sm border-b">
        <Badge variant="default" className="flex items-center gap-1">
          {getIcon('price')}
          {price}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          📅
          {nextSession}
        </div>
      </div>
    </div>
  );
};

export default CourseInfoCard;
