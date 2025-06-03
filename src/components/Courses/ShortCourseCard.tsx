
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar } from 'lucide-react';
import { Course } from '@/types';
import { industriesData } from '@/data/masterData';

interface ShortCourseCardProps {
  course: Course;
}

const ShortCourseCard: React.FC<ShortCourseCardProps> = ({ course }) => {
  const getIndustryDisplayName = (industryId: string) => {
    const industry = industriesData.find(ind => ind.id === industryId);
    return industry ? industry.name : industryId;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-16 h-16 rounded object-cover flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <Badge variant="secondary" className="text-xs">
                {getIndustryDisplayName(course.industry)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {course.subject}
              </Badge>
            </div>
            
            <h3 className="font-medium text-sm line-clamp-2 mb-2">{course.title}</h3>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {course.students}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {course.nextSession}
              </div>
              <Badge variant="default" className="text-xs">
                ${course.price}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortCourseCard;
