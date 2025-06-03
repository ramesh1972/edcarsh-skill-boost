import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
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

        {/* Right side - 2 rows structure */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Top row - 3 columns */}
          <div className="grid grid-cols-3 gap-6 flex-1">
            {/* Column 1: Title and Description */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-xl font-semibold ${theme.designSystem === 'material' ? 'text-lg font-medium' : 'text-xl'}`}>
                  {course.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-h-[200px] overflow-hidden">{course.longDescription}</p>
            </div>

            {/* Column 2: Topics - max 8 topics */}
            <div className="col-span-1">
              <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
              <ul className="text-sm space-y-1">
                {course.longTopics.slice(0, 8).map((topic, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-current rounded-full flex-shrink-0"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: About Instructor - increased width by 20px */}
            <div className="col-span-1 flex flex-col" style={{marginLeft: '-20px'}}>
              <div className="flex items-start gap-3 mb-4 flex-1">
                <img src={course.instructor.image} alt={course.instructor.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="text-sm text-muted-foreground flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">{course.instructor.name}</p>
                    <Button variant="ghost" size="sm" className="text-xs px-2 h-6">
                      About
                    </Button>
                  </div>
                  <p className="mb-1">Expert in {course.instructor.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 mb-4 flex-1>
                <p className="text-xs line-clamp-3 max-h-12 overflow-hidden">{course.instructor.description}</p>
                <p className="mb-1">{course.level} level specialist</p>
                <p className="mb-1">Teaching for {course.instructor.experience}</p>
                <p className="mb-1 flex items-center gap-1">
                  <span>{course.instructor.flag}</span>
                  {course.instructor.city}, {course.instructor.country}
                </p>
              </div>
              
              {/* Action Buttons - similar to ShortCourseCard */}
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
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LongCourseCard;
