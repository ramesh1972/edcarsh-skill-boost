
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { getSubjectColor } from '@/data/masterData';
import ActionButtons from './ActionButtons';
import CourseInfoCard from './CourseInfoCard';
import InstructorCard from '@/components/instructors/InstructorCard';
import { Wifi, WifiOff, Wrench } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  longDescription: string;
  duration: string;
  price: string;
  students: number;
  nextSession: string;
  image: string;
  longTopics: string[];
  level: string;
  subject: string;
  industry: string;
  mode: 'live' | 'offline';
  tools: boolean;
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

interface LongCourseCardProps {
  course: Course;
}

const LongCourseCard: React.FC<LongCourseCardProps> = ({ course }) => {
  const { theme, getIcon } = useTheme();
  
  return (
    <Card className={`hover:shadow-lg transition-all duration-200 ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''}`}>
      <div className="flex">
        {/* Left side - Image and stats */}
        <div className="w-64 flex-shrink-0 flex flex-col">
          <div className="relative h-48 overflow-hidden rounded-b-none">
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
          
          {/* Spacer to push stats and price to bottom */}
          <div className="flex-1 p-4">
          
          {/* Course Info Card - aligned to bottom */}
          <CourseInfoCard 
            duration={course.duration}
            students={course.students}
            price={course.price}
            nextSession={course.nextSession}
          />
            </div>
        </div>

        {/* Right side - 3 columns structure */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Top row - 3 columns now */}
          <div className="grid grid-cols-3 gap-6 flex-1">
            {/* Column 1: Title and Description */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-xl font-semibold ${theme.designSystem === 'material' ? 'text-lg font-medium' : 'text-xl'}`}>
                  {course.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-h-[165px] overflow-hidden">{course.longDescription}</p>
            </div>

            {/* Column 2: Topics as bulleted list - max 6 topics */}
            <div className="col-span-1" style={{ maxWidth: '280px' }}>
              <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {course.longTopics.slice(0, 7).map((topic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Instructor Details */}
            <div className="flex flex-col justify-between h-full -ml-[25px]">
              <InstructorCard instructor={course.instructor} />
              <div className="mt-auto">
                <ActionButtons courseId={course.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LongCourseCard;
