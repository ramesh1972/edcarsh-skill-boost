
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Users, BookOpen, Award } from 'lucide-react';
import { getIndustryNameById, getSubjectNameById, getSubjectById } from '@/data/masterData';
import { Instructor } from '@/types';

interface InstructorMediumCardProps {
  instructor: Instructor;
}

const InstructorMediumCard: React.FC<InstructorMediumCardProps> = ({ instructor }) => {
  const renderSubjects = () => {
    if (!instructor.subjects || instructor.subjects.length === 0) {
      return null;
    }

    const allSubjects: { name: string; color: string }[] = [];
    
    instructor.subjects.forEach(industrySubjects => {
      industrySubjects.subjectIds.forEach(subjectId => {
        const subjectName = getSubjectNameById(industrySubjects.industryId, subjectId);
        const subject = getSubjectById(industrySubjects.industryId, subjectId);
        if (subjectName !== 'Unknown Subject') {
          allSubjects.push({
            name: subjectName,
            color: subject?.color || '#6b7280'
          });
        }
      });
    });

    if (allSubjects.length === 0) return null;

    return (
      <div className="mt-3">
        <h6 className="text-xs font-medium mb-2">Teaches:</h6>
        <div className="flex flex-wrap gap-1">
          {allSubjects.slice(0, 4).map((subject, index) => (
            <Badge 
              key={index} 
              customColor={subject.color}
              className="text-white text-xs px-2 py-1"
            >
              {subject.name}
            </Badge>
          ))}
          {allSubjects.length > 4 && (
            <Badge variant="secondary" className="text-xs px-2 py-1">
              +{allSubjects.length - 4} more
            </Badge>
          )}
        </div>
      </div>
    );
  };

  const renderIndustries = () => {
    if (!instructor.industries || instructor.industries.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        <h6 className="text-xs font-medium mb-2">Industries:</h6>
        <div className="flex flex-wrap gap-1">
          {instructor.industries.slice(0, 3).map((industryId, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="text-xs px-2 py-1"
            >
              {getIndustryNameById(industryId)}
            </Badge>
          ))}
          {instructor.industries.length > 3 && (
            <Badge variant="secondary" className="text-xs px-2 py-1">
              +{instructor.industries.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={instructor.image} alt={instructor.name} />
          <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-2xl font-bold">
            {instructor.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold">{instructor.name}</h3>
        <p className="text-sm text-muted-foreground">{instructor.specialty || instructor.expertise}</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          {instructor.rating && (
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{instructor.rating}</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
            {instructor.students && (
              <div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                </div>
                <p className="font-medium">{instructor.students}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
            )}
            {instructor.courses && (
              <div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <BookOpen className="w-3 h-3" />
                </div>
                <p className="font-medium">{instructor.courses}</p>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
            )}
            <div>
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <Award className="w-3 h-3" />
              </div>
              <p className="font-medium text-xs">{instructor.experience}</p>
            </div>
          </div>

          {renderSubjects()}
          {renderIndustries()}
        </div>

        <Link to={`/instructors/${instructor.id}`} className="mt-6">
          <Button className="w-full" variant="outline">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default InstructorMediumCard;
