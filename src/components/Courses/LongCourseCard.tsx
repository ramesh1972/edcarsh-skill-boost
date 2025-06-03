
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Calendar, MapPin } from 'lucide-react';
import { Course } from '@/types';
import { industriesData } from '@/data/masterData';

interface LongCourseCardProps {
  course: Course;
}

const LongCourseCard: React.FC<LongCourseCardProps> = ({ course }) => {
  const getIndustryDisplayName = (industryId: string) => {
    const industry = industriesData.find(ind => ind.id === industryId);
    return industry ? industry.name : industryId;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex">
          {/* Image */}
          <div className="relative w-48 h-32 flex-shrink-0">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 flex flex-col gap-1">
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
          
          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {getIndustryDisplayName(course.industry)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {course.subject}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.mediumDescription}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.students} students
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Next: {course.nextSession}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <img 
                  src={course.instructor.image} 
                  alt={course.instructor.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="text-right">
                  <div className="text-sm font-medium">{course.instructor.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {course.instructor.city} {course.instructor.flag}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LongCourseCard;
