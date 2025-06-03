
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Calendar } from 'lucide-react';
import { Course } from '@/types';
import { industriesData } from '@/data/masterData';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getIndustryDisplayName = (industryId: string) => {
    const industry = industriesData.find(ind => ind.id === industryId);
    return industry ? industry.name : industryId;
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge variant="secondary" className="text-xs">
            {getIndustryDisplayName(course.industry)}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {course.subject}
          </Badge>
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Badge variant="default" className="text-xs">
            ${course.price}
          </Badge>
          {course.isLive && (
            <Badge variant="destructive" className="text-xs">
              Live
            </Badge>
          )}
          {course.hasTools && (
            <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
              Tools
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {course.expertLevel}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {course.students}
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Next: {course.nextSession}
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">4.8</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <img 
            src={course.instructor.image} 
            alt={course.instructor.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{course.instructor.name}</span>
          <span className="text-xs text-muted-foreground">{course.instructor.flag}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
