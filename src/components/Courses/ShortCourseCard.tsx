
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { getSubjectColor } from '@/data/masterData';
import ActionButtons from './ActionButtons';
import CourseInfoCard from './CourseInfoCard';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  students: number;
  nextSession: string;
  image: string;
  topics: string[];
  level: string;
  subject: string;
  industry: string;
  instructor: {
    name: string;
    image: string;
    experience: string;
    specialty: string;
    city: string;
    country: string;
    flag: string;
    description: string;
  };
}

interface ShortCourseCardProps {
  course: Course;
}

const ShortCourseCard: React.FC<ShortCourseCardProps> = ({
  course
}) => {
  const { theme } = useTheme();
  
  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''}`}>
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 rounded-b-none">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-b-none" />
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-white/90 text-black">
            {course.industry}
          </Badge>
        </div>
        <div className="absolute top-2 right-2 flex gap-1 flex-col">
          <Badge customColor={getSubjectColor(course.subject)} className="text-white text-xs">
            {course.subject}
          </Badge>
          <Badge variant="secondary" className="bg-white/90 text-black text-xs">
            {course.level}
          </Badge>
        </div>
      </div>

      <CardHeader className=" flex flex-col justify-start flex-shrink-0 pt-4 h-[85px]">
        <div className="flex items-start justify-between">
          <CardTitle className={`text-base leading-tight line-clamp-2 ${theme.designSystem === 'material' ? 'text-sm font-medium' : 'text-base'}`}>
            {course.title}
          </CardTitle>
        </div>
        <CardDescription className="text-xs line-clamp-1 flex-1 flex items-start max-h-4 overflow-hidden">{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Topics Covered - Reduced height for alignment, max 6 topics */}
        <div className="flex-shrink-0 p-0 mb-2">
          <h4 className="text-xs font-medium mb-1">Topics Covered:</h4>
          <div className="flex flex-wrap mb-2 gap-1 h-[50px] content-start overflow-hidden">
            {course.topics.slice(0, 6).map((topic, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Course Info Card - moved below image */}
        <div className="mb-4">
          <CourseInfoCard duration={course.duration} students={course.students} price={course.price} nextSession={course.nextSession} />
        </div>

        {/* Action Buttons aligned to bottom */}
        <div className="mt-auto p-0">
          <ActionButtons />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortCourseCard;
