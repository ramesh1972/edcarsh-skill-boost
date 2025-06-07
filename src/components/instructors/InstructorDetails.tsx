
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Users, BookOpen, Award, MapPin } from 'lucide-react';
import LongCourseCard from '@/components/Courses/LongCourseCard';

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
  subject: string;
  industry: string;
  mode: 'live' | 'offline';
  tools: boolean;
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
      longDescription: "Master the fundamentals of React including components, state management, hooks, and modern development practices. This comprehensive course covers everything you need to know to build professional React applications from scratch.",
      duration: "2 hours",
      price: "$99",
      students: 45,
      nextSession: "2024-12-15 14:00",
      image: "/placeholder.svg",
      longTopics: ["JSX Syntax", "Component Architecture", "State & Props", "Event Handling", "Hooks (useState, useEffect)", "Context API", "Router Integration", "Performance Optimization"],
      level: "Beginner",
      subject: "Web Development",
      industry: "Technology",
      mode: "live",
      tools: true,
      instructor: instructor
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      longDescription: "Dive deep into advanced TypeScript concepts and design patterns. Learn how to leverage TypeScript's powerful type system to build robust, maintainable applications with confidence.",
      duration: "3 hours",
      price: "$149",
      students: 32,
      nextSession: "2024-12-18 16:00",
      image: "/placeholder.svg",
      longTopics: ["Generic Types", "Conditional Types", "Mapped Types", "Template Literals", "Decorators", "Advanced Interfaces", "Type Guards", "Utility Types"],
      level: "Advanced",
      subject: "Programming",
      industry: "Technology",
      mode: "live",
      tools: true,
      instructor: instructor
    },
    {
      id: 3,
      title: "Frontend Architecture Best Practices",
      longDescription: "Learn how to design and implement scalable frontend architectures. Understand patterns, principles, and practices that will help you build maintainable and performant web applications.",
      duration: "2.5 hours",
      price: "$129",
      students: 28,
      nextSession: "2024-12-20 10:00",
      image: "/placeholder.svg",
      longTopics: ["Component Design", "State Management", "Code Organization", "Performance Patterns", "Testing Strategies", "Build Optimization", "Deployment Strategies", "Monitoring & Analytics"],
      level: "Intermediate",
      subject: "Architecture",
      industry: "Technology",
      mode: "offline",
      tools: false,
      instructor: instructor
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 mb-8">
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

      {/* Courses Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Current Courses</h3>
        <div className="space-y-6">
          {instructorCourses.map((course) => (
            <LongCourseCard 
              key={course.id} 
              course={course}
              referrerRoute={`/instructors/${instructor.id}`}
              referrerName={instructor.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;
