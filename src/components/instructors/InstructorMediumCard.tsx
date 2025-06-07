
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Users, BookOpen, Award } from 'lucide-react';
import { Instructor } from '@/types';

interface InstructorMediumCardProps {
  instructor: Instructor;
}

const InstructorMediumCard: React.FC<InstructorMediumCardProps> = ({ instructor }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
      <CardContent className="space-y-4">
        {instructor.rating && (
          <div className="flex items-center justify-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium">{instructor.rating}</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 text-center text-sm">
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

        <Link to={`/instructors/${instructor.id}`}>
          <Button className="w-full" variant="outline">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default InstructorMediumCard;
