
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Users, BookOpen, Award, MapPin, Clock, Calendar } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  duration: string;
  nextSession: string;
  enrolled: number;
}

interface Instructor {
  id?: number;
  name: string;
  image: string;
  experience: string;
  specialty: string;
  city: string;
  country: string;
  flag: string;
  description: string;
  rating?: number;
  students?: number;
  courses?: number;
  expertise?: string;
}

interface InstructorDetailsProps {
  instructor: Instructor;
  onClose?: () => void;
}

const InstructorDetails: React.FC<InstructorDetailsProps> = ({ instructor, onClose }) => {
  // Mock courses data - in a real app, this would come from an API
  const instructorCourses: Course[] = [
    {
      id: 1,
      title: "React Fundamentals Crash Course",
      duration: "2 hours",
      nextSession: "2024-12-15 14:00",
      enrolled: 45
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      duration: "3 hours",
      nextSession: "2024-12-18 16:00",
      enrolled: 32
    },
    {
      id: 3,
      title: "Frontend Architecture Best Practices",
      duration: "2.5 hours",
      nextSession: "2024-12-20 10:00",
      enrolled: 28
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarImage src={instructor.image} alt={instructor.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-4xl font-bold">
              {instructor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{instructor.name}</CardTitle>
          <p className="text-xl text-muted-foreground">{instructor.specialty || instructor.expertise}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{instructor.city}, {instructor.country} {instructor.flag}</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Stats Section */}
          {(instructor.rating || instructor.students || instructor.courses) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-primary/10 rounded-lg">
              {instructor.rating && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                    <Star className="w-6 h-6 fill-current" />
                    <span className="text-2xl font-bold">{instructor.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              )}
              {instructor.students && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold">{instructor.students}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
              )}
              {instructor.courses && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold">{instructor.courses}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Courses</p>
                </div>
              )}
            </div>
          )}

          {/* Experience Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              {instructor.experience}
            </Badge>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About {instructor.name}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {instructor.description}
            </p>
          </div>

          {/* Courses Section */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-6">Current Courses</h3>
            <div className="grid gap-4">
              {instructorCourses.map((course) => (
                <Card key={course.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{course.title}</h4>
                      <Badge variant="outline">{course.enrolled} enrolled</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Next: {new Date(course.nextSession).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {onClose && (
            <div className="flex justify-center pt-6">
              <Button variant="outline" size="lg" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorDetails;
