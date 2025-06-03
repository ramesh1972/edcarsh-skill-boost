import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import ActionButtons from './ActionButtons';
import CourseInfoCard from './CourseInfoCard';
import InstructorCard from '@/components/instructors/InstructorCard';
import { Heart, Eye, UserPlus } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  mediumDescription: string;
  duration: string;
  price: string;
  students: number;
  nextSession: string;
  image: string;
  topics: string[];
  level: string;
  category: string;
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
interface CourseCardProps {
  course: Course;
}
const CourseCard: React.FC<CourseCardProps> = ({
  course
}) => {
  const {
    theme,
    getIcon
  } = useTheme();
  return <Card className={`h-full hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''}`}>
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 rounded-b-0">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-b-0" />
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-white/90 text-black">
            {course.category}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 text-black">
            {course.level}
          </Badge>
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

      <CardContent className="flex-1 flex flex-col ">
        {/* Topics Covered - Fixed height for alignment, max 6 topics */}
        <div className="flex-shrink-0 mb-1 ">
          <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
          <div className="flex flex-wrap mb-2 gap-1 h-[60px] content-start overflow-hidden">
            {course.topics.slice(0, 6).map((topic, index) => <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {topic}
              </Badge>)}
          </div>
        </div>

        {/* Instructor Section - using InstructorCard component */}
        <div className="mt-auto">
          <div className="mb-4 p-0">
            <InstructorCard instructor={course.instructor} hideDescription={true} />
          </div>
  {/* Course Info Card - moved below image */}
      <CourseInfoCard className="mb-2" duration={course.duration} students={course.students} price={course.price} nextSession={course.nextSession} />

          {/* Action Buttons - using ActionButtons component */}
          <div className="px-2.5">
            <ActionButtons />
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default CourseCard;
