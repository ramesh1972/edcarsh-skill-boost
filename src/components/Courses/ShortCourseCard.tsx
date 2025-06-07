
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { getSubjectColor } from '@/data/masterData';
import { useNavigate } from 'react-router-dom';
import ActionButtons from './ActionButtons';
import CourseInfoCard from './CourseInfoCard';
import { getInstructorById } from '@/data/instructors';
import { Wifi, WifiOff, Wrench } from 'lucide-react';
import { Course } from '@/types';

interface ShortCourseCardProps {
  course: Course;
  referrerRoute?: string;
  referrerName?: string;
}

const ShortCourseCard: React.FC<ShortCourseCardProps> = ({
  course,
  referrerRoute = '/courses',
  referrerName = 'Courses'
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const instructor = getInstructorById(course.instructorId);

  const handleViewClick = () => {
    navigate(`/courses/${course.id}`, {
      state: { from: referrerRoute, fromName: referrerName }
    });
  };

  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col gap-1 ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''}`}>
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 rounded-b-none">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-b-none" />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge variant="outline" className="bg-white/90 text-black text-xs">
            {course.industry}
          </Badge>
          <Badge customColor={getSubjectColor(course.subject)} className="text-white text-xs">
            {course.subject}
          </Badge>
        </div>
        <div className="absolute top-2 right-2 flex gap-1 flex-col">
          <Badge variant="secondary" className="bg-white/90 text-black text-xs">
            {course.level}
          </Badge>
          <Badge variant="outline" className={`text-xs ${course.mode === 'live' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {course.mode === 'live' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
            {course.mode}
          </Badge>
          {course.tools && (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
              <Wrench className="w-3 h-3 mr-1" />
              Tools
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="flex flex-col justify-start flex-shrink-0 gap-1">
        <div className="flex items-start justify-between">
          <CardTitle className={`text-base leading-tight line-clamp-2 ${theme.designSystem === 'material' ? 'text-sm font-medium' : 'text-base'}`}>
            {course.title}
          </CardTitle>
        </div>
        <CardDescription className="text-xs line-clamp-1 flex-1 flex items-start max-h-4 overflow-hidden">{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-1">
        {/* Topics Covered - Reduced height for alignment, max 6 topics */}
        <div className="flex-shrink-0 p-0">
          <h4 className="text-xs font-medium mb-1">Topics Covered:</h4>
          <div className="flex flex-wrap mb-2 gap-1 content-start overflow-hidden">
            {course.topics.slice(0, 6).map((topic, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Course Info Card - moved below image */}
        <div>
          <CourseInfoCard duration={course.duration} students={course.students} price={course.price} nextSession={course.nextSession} />
        </div>

        {/* Action Buttons aligned to bottom */}
        <div className="mt-auto p-0">
          <ActionButtons 
            courseId={course.id} 
            nextSession={course.nextSession}
            onViewClick={handleViewClick}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortCourseCard;
