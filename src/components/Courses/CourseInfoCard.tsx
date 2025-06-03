
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';

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
    <div className={`grid grid-cols-1 grid-rows-2 gap-2 p-0 ${className}`}>
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
        <Badge variant="outline" className="flex items-center gap-1 p-2 rounded-2" style={{fontSize:'20px', borderRadius: '2px', backgroundColor: 'lightgreen', color: 'white'}}>
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
