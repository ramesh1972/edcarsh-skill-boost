import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Users, BookOpen, Award } from 'lucide-react';
import { Instructor } from '@/types';
import { getSubjectBySubjectId } from '@/adapters/industrySubjectAdpator';
import { getInstructorCourses, getInstructorCourseStats, getInstructorDeepCourseInfo } from '@/adapters/instructorDataAdapter';
import { getInstructor, getUserName } from '@/adapters/userDataAdapter';

interface InstructorDashCardProps {
  instructor: Instructor;
}

const InstructorDashCard: React.FC<InstructorDashCardProps> = ({ instructor }) => {
  // Use prop instructor if provided, otherwise get from URL params
  const instructorCourses = instructor ? getInstructorDeepCourseInfo(instructor.id) : [];
  const instructorName = getUserName(instructor.userId) || 'Unknown Instructor';
  const instructorStats = getInstructorCourseStats(instructor.userId) || null;

  // todo
  instructor.avgRating = 4.5;

  const renderSubjects = () => {
    const subjectsIds = instructor?.preferredSubjects || [];
    if (!subjectsIds || subjectsIds.length === 0) {
      return null;
    }

    const industryIds = instructor?.preferredIndustries || [];
    const allSubjects: { name: string; color: string }[] = [];

    subjectsIds.forEach(subjectId => {
      const subject = getSubjectBySubjectId(subjectId);
      const subjectName = subject?.name || 'Unknown Subject';
      if (subjectName !== 'Unknown Subject') {
        allSubjects.push({
          name: subjectName,
          color: subject?.color || '#6b7280'
        });
      }
    });

    if (allSubjects.length === 0) return null;

    return (
      <div className="mt-3">
        <h4 className="text-xs font-medium mb-2">Teaches</h4>
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

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={instructor.image} alt={instructorName} className='border-2 border-muted-foreground rounded-full' />
          <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-2xl font-bold">
            {instructorName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold">{instructorName}</h3>
        <p className="text-sm text-muted-foreground">{instructor.specialty || instructor.expertise}</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          {instructor.avgRating && (
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{instructor.avgRating}</span>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2 text-center text-sm mb-6">
            {instructorStats && (
              <div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                </div>
                <p className="font-medium">{instructorStats.enrollments}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
            )}
            {instructorCourses && (
              <div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <BookOpen className="w-3 h-3" />
                </div>
                <p className="font-medium">{instructorCourses.length}</p>
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

export default InstructorDashCard;
