
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import ActionButtons from './ActionButtons';
import { Heart, Eye, UserPlus } from 'lucide-react';

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

interface LongCourseCardProps {
  course: Course;
}

const LongCourseCard: React.FC<LongCourseCardProps> = ({ course }) => {
  const { theme, getIcon } = useTheme();

  return (
    <Card className={`hover:shadow-lg transition-all duration-200 ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''}`}>
      <div className="flex">
        {/* Left side - Image and stats */}
        <div className="w-64 flex-shrink-0">
          <div className="relative h-48 overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
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
          
          {/* Course Details - moved below image */}
          <div className="p-4 pb-2 flex items-center justify-between text-sm border-b">
            <div className="flex items-center gap-1">
              {getIcon('time')}
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              {getIcon('student')}
              {course.students} enrolled
            </div>
          </div>
      
          {/* Price and Session - moved below image */}
          <div className="px-4 py-2 flex items-center justify-between border-b">
            <Badge variant="secondary" className="flex items-center gap-1">
              {getIcon('price')}
              {course.price}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              📅
              {course.nextSession}
            </div>
          </div>
        </div>

        {/* Right side - 2 columns structure */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Top row - 2 columns now */}
          <div className="grid grid-cols-2 gap-6 flex-1">
            {/* Column 1: Title and Description - increased height */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-xl font-semibold ${theme.designSystem === 'material' ? 'text-lg font-medium' : 'text-xl'}`}>
                  {course.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-h-[300px] overflow-hidden">{course.longDescription}</p>
            </div>

            {/* Column 2: Topics - max 6 topics */}
            <div className="col-span-1" style={{maxWidth: '280px'}}>
              <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
              <div className="flex flex-wrap gap-2">
                {course.longTopics.slice(0, 6).map((topic, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row - Action Buttons */}
          <div className="mt-6 pt-4 border-t">
            <ActionButtons />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LongCourseCard;
