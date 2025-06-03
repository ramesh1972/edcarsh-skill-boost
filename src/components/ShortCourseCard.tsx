

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, Eye, UserPlus } from 'lucide-react';

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

interface ShortCourseCardProps {
  course: Course;
}

const ShortCourseCard: React.FC<ShortCourseCardProps> = ({ course }) => {
  const { theme, getIcon } = useTheme();

  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''}`}>
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
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

      <CardHeader className="pb-2 mb-1 h-20 flex flex-col justify-start flex-shrink-0">
        <div className="flex items-start justify-between">
          <CardTitle className={`text-base leading-tight line-clamp-2 ${theme.designSystem === 'material' ? 'text-sm font-medium' : 'text-base'}`}>
            {course.title}
          </CardTitle>
        </div>
        <CardDescription className="text-xs line-clamp-1 flex-1 flex items-start max-h-4 overflow-hidden">{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Topics Covered - Reduced height for alignment, max 6 topics */}
        <div className="flex-shrink-0 mb-4">
          <h4 className="text-xs font-medium mb-1">Topics Covered:</h4>
          <div className="flex flex-wrap mb-2 gap-1 h-[40px] content-start overflow-hidden">
            {course.topics.slice(0, 6).map((topic, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons aligned to bottom */}
        <div className="mt-auto">
          <div className="flex gap-2 justify-between items-center">
            <Button variant="outline" size="sm" className="flex items-center gap-1 border-2">
              <UserPlus className="h-3 w-3" />
              Join as Guest
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                View
              </Button>
              <Button size="sm" className={`${theme.designSystem === 'material' ? 'rounded-none uppercase text-sm font-medium' : theme.designSystem === 'human' ? 'rounded-lg' : theme.designSystem === 'fluent' ? 'rounded-sm' : ''}`}>
                Enroll Now
              </Button>
              <Button variant="secondary" size="sm" className="px-2">
                <Heart className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortCourseCard;

