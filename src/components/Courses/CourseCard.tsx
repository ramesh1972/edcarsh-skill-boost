
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { getSubjectById, getIndustryNameById, getSubjectNameById } from '@/data/masterData';
import { useNavigate } from 'react-router-dom';
import ActionButtons from './ActionButtons';
import CourseInfoCard from './CourseInfoCard';
import InstructorCard from '@/components/instructors/InstructorCard';
import { getInstructorById } from '@/data/instructors';
import { Heart, Eye, UserPlus, Wifi, WifiOff, Wrench } from 'lucide-react';
import { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  referrerRoute?: string;
  referrerName?: string;
  cardClassName?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  referrerRoute = '/courses',
  referrerName = 'Courses',
  cardClassName = ''
}) => {
  const {
    theme,
    getIcon
  } = useTheme();
  const navigate = useNavigate();
  const instructor = getInstructorById(course.instructorId);

  const handleViewClick = () => {
    navigate(`/courses/${course.id}`, {
      state: {
        from: referrerRoute,
        fromName: referrerName
      }
    });
  };

  if (!instructor) {
    return null; // Don't render if instructor not found
  }

  const industryName = getIndustryNameById(course.industryId);
  const subjectName = getSubjectNameById(course.industryId, course.subjectId);
  const subject = getSubjectById(course.industryId, course.subjectId);

  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''} ${cardClassName}`}>
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 rounded-b-0">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-b-0" />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge variant="outline" className="bg-white/90 text-black text-xs">
            {industryName}
          </Badge>
          <Badge customColor={subject?.color} className="text-white text-xs">
            {subjectName}
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
          {course.tools && <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
              <Wrench className="w-3 h-3 mr-1" />
              Tools
            </Badge>}
        </div>
      </div>

      <CardHeader className="pb-2 mb-1 h-32 flex flex-col justify-start flex-shrink-0">
        <div className="flex items-start justify-between">
          <CardTitle className={`text-lg leading-tight line-clamp-2 ${theme.designSystem === 'material' ? 'text-base font-medium' : 'text-lg'}`}>
            {course.title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm line-clamp-2 flex-1 flex items-start max-h-30 overflow-hidden">{course.mediumDescription}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-6 pt-0 pb-0">
        {/* Topics Covered - Fixed height for alignment, max 6 topics */}
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
          <div className="flex flex-wrap mb-2 gap-1 h-[60px] content-start overflow-hidden">
            {course.topics.slice(0, 6).map((topic, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Instructor Section - aligned to top */}
        <div className="mb-4">
          <InstructorCard instructor={instructor} hideDescription={true} size="sm" />
        </div>

        {/* Spacer to push content to bottom */}
        <div className="flex-1"></div>

        {/* Bottom section - Course Info and Action Buttons */}
        <div className="mt-auto space-y-3">
          <CourseInfoCard 
            duration={course.duration} 
            students={course.students} 
            price={course.price} 
            nextSession={course.nextSession} 
          />
          
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

export default CourseCard;
