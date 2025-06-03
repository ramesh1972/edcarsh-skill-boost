import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import ActionButtons from './ActionButtons';
import { Heart, Eye, UserPlus, Info } from 'lucide-react';
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
const LongCourseCard: React.FC<LongCourseCardProps> = ({
  course
}) => {
  const {
    theme,
    getIcon
  } = useTheme();
  return <Card className={`hover:shadow-lg transition-all duration-200 ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''}`}>
      <div className="flex">
        {/* Left side - Image and stats */}
        <div className="w-64 flex-shrink-0 flex flex-col">
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
          
          {/* Spacer to push stats and price to bottom */}
          <div className="flex-1"></div>
          
          {/* Course Details - aligned to bottom */}
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
      
          {/* Price and Session - aligned to bottom */}
          <div className="px-4 py-2 pb-4 flex items-center justify-between border-b">
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
              <p className="text-sm text-muted-foreground max-h-[160px] overflow-hidden">{course.longDescription}</p>
            </div>

            {/* Column 2: Topics as bulleted list - max 6 topics */}
            <div className="col-span-1" style={{
            maxWidth: '280px'
          }}>
              <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {course.longTopics.slice(0, 6).map((topic, index) => <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{topic}</span>
                  </li>)}
              </ul>
            </div>

            {/* Column 3: Instructor Details */}
            <div className="col-span-1 flex flex-col">
              <h4 className="text-sm font-medium mb-3">Instructor:</h4>
              <div className="flex items-start gap-3 mb-4 flex-1">
                <Avatar className="h-12 w-12 rounded-full flex-shrink-0">
                  <AvatarImage src={course.instructor.image} alt={course.instructor.name} />
                  <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-sm">{course.instructor.name}</h5>
                    <span className="text-xs">{course.instructor.flag}</span>
                    <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                      <Info className="h-3 w-3 mr-1" />
                      About
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{course.instructor.specialty}</p>
                  <p className="text-xs text-muted-foreground mb-1">{course.instructor.experience} • {course.instructor.city}, {course.instructor.country}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-4">{course.instructor.description}</p>
              
              {/* Action Buttons aligned to bottom with left margin */}
              <div className="mt-auto -ml-[25px]">
                <ActionButtons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>;
};

export default LongCourseCard;
