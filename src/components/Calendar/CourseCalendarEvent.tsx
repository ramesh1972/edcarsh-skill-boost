
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { getSubjectColor } from '@/data/masterData';
import { getInstructorById } from '@/data/instructors';
import { Clock, User, Wifi, WifiOff } from 'lucide-react';
import { Course } from '@/types';

interface CourseCalendarEventProps {
  course: Course;
  viewMode: 'day' | 'week' | 'month';
  currentDay?: Date;
}

const CourseCalendarEvent: React.FC<CourseCalendarEventProps> = ({ 
  course, 
  viewMode,
  currentDay 
}) => {
  const navigate = useNavigate();
  const instructor = getInstructorById(course.instructorId);

  const handleClick = () => {
    navigate(`/courses/${course.id}`, {
      state: { from: '/calendar', fromName: 'Calendar' }
    });
  };

  if (!instructor) {
    return null; // Don't render if instructor not found
  }

  if (viewMode === 'month') {
    return (
      <div
        onClick={handleClick}
        className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
        style={{ backgroundColor: getSubjectColor(course.subject) }}
      >
        <div className="text-white font-medium truncate">
          {course.title}
        </div>
        <div className="text-white/80 truncate">
          {course.startTime}
        </div>
      </div>
    );
  }

  if (viewMode === 'week') {
    return (
      <Card 
        className="mb-1 cursor-pointer hover:shadow-md transition-shadow"
        onClick={handleClick}
      >
        <CardContent className="p-2">
          <div className="flex items-center gap-1 mb-1">
            <Badge 
              customColor={getSubjectColor(course.subject)} 
              className="text-white text-xs"
            >
              {course.subject}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {course.mode === 'live' ? <Wifi className="w-2 h-2 mr-1" /> : <WifiOff className="w-2 h-2 mr-1" />}
              {course.mode}
            </Badge>
          </div>
          <h4 className="font-medium text-xs leading-tight mb-1 line-clamp-2">
            {course.title}
          </h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{course.startTime}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <User className="w-3 h-3" />
            <span className="truncate">{instructor.name}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Day view
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex gap-2">
            <Badge 
              customColor={getSubjectColor(course.subject)} 
              className="text-white"
            >
              {course.subject}
            </Badge>
            <Badge variant="secondary">
              {course.level}
            </Badge>
            <Badge variant="outline" className={course.mode === 'live' ? 'text-green-600' : 'text-gray-600'}>
              {course.mode === 'live' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
              {course.mode}
            </Badge>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.startTime}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {instructor.name}
            </span>
          </div>
          <div className="text-right">
            <div className="font-semibold">{course.price}</div>
            <div className="text-muted-foreground">{course.duration}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCalendarEvent;
