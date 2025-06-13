
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { DeepCourseInfo } from '@/types';
import { getNextNCourseSchedules } from '@/adapters/coursesDataAdapter';

interface CourseInfoCardProps {
  deepCourseInfo: DeepCourseInfo
  className?: string;
}

const CourseInfoCard: React.FC<CourseInfoCardProps> = ({
  deepCourseInfo,
  className = ""
}) => {
  const { getIcon } = useTheme();

  const duration = deepCourseInfo.durationHours ? `${deepCourseInfo.durationHours} hours` : 'Unknown';
  const students = deepCourseInfo.stats?.enrollments || 0;
  const price = getNextNCourseSchedules(deepCourseInfo.id, 1)?.[0]?.price || 'TBD';
  const nextSession = getNextNCourseSchedules(deepCourseInfo.id, 1)?.[0]?.startDate || 'TBD';

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
        <Badge variant="outline" className="flex items-center justify-items p-2 rounded-lg" style={{fontSize:'18px', backgroundColor: 'lightgreen', color: 'primary'}}>
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
