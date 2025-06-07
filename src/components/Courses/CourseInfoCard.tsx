
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';

interface CourseInfoCardProps {
  duration: string;
  students: number;
  price: string;
  nextSession: string;
  className?: string;
}

const CourseInfoCard: React.FC<CourseInfoCardProps> = ({
  duration,
  students,
  price,
  nextSession,
  className = ""
}) => {
  const { getIcon } = useTheme();
  
  return (
    <div className={`grid grid-cols-1 gap-2 !rounded-md ${className}`} style={{fontSize: '12px'}}>
      {/* Course Details */}
      <div className="flex items-center justify-between">
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
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="flex items-center p-2 rounded-lg" style={{fontSize:'16px', backgroundColor: 'lightgreen', color: 'primary'}}>
          {getIcon('price')}
          {price}
        </Badge>
        <div className="flex items-center gap-1 text-muted-foreground">
          {getIcon('calendar')}
          {nextSession}
        </div>
      </div>
    </div>
  );
};

export default CourseInfoCard;
