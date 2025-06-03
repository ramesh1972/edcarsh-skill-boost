
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { Clock, Users, DollarSign } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  durationHours: number;
  price: string;
  students: number;
  startDate: string;
  endDate: string;
  startTime: string;
  category: string;
  level: string;
  instructor: {
    name: string;
    image: string;
    specialty: string;
  };
}

interface CourseCalendarEventProps {
  course: Course;
  viewMode: 'day' | 'week' | 'month';
}

const CourseCalendarEvent: React.FC<CourseCalendarEventProps> = ({ course, viewMode }) => {
  const { getIcon } = useTheme();

  const getCategoryColor = (category: string) => {
    const colors = {
      'Frontend': 'bg-blue-100 text-blue-800 border-blue-200',
      'Backend': 'bg-green-100 text-green-800 border-green-200',
      'Data Science': 'bg-purple-100 text-purple-800 border-purple-200',
      'Marketing': 'bg-orange-100 text-orange-800 border-orange-200',
      'Design': 'bg-pink-100 text-pink-800 border-pink-200',
      'Mobile': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'DevOps': 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (viewMode === 'month') {
    return (
      <div className={`text-xs p-1 rounded border-l-2 ${getCategoryColor(course.category)}`}>
        <div className="font-medium truncate">{course.title}</div>
        <div className="text-xs opacity-75">{course.startTime}</div>
      </div>
    );
  }

  if (viewMode === 'week') {
    return (
      <div className={`text-xs p-2 rounded border ${getCategoryColor(course.category)}`}>
        <div className="font-medium text-xs mb-1 line-clamp-2">{course.title}</div>
        <div className="flex items-center gap-1 text-xs opacity-75">
          <Clock className="h-3 w-3" />
          {course.startTime}
        </div>
        <div className="flex items-center gap-1 text-xs opacity-75">
          <Users className="h-3 w-3" />
          {course.students}
        </div>
        <Badge variant="outline" className="text-xs mt-1">
          {course.level}
        </Badge>
      </div>
    );
  }

  // Day view - full detail
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
          <Badge variant="secondary">{course.level}</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.startTime}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.students} enrolled
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            ${course.price}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={getCategoryColor(course.category)}>
              {course.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {course.durationHours}h duration
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <img 
              src={course.instructor.image} 
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">{course.instructor.name}</span>
          </div>
        </div>
        
        <div className="mt-3 flex gap-2">
          <Button size="sm" className="flex-1">
            Enroll Now
          </Button>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCalendarEvent;
