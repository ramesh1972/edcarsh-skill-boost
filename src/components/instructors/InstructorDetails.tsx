
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Users, BookOpen, Award, MapPin, Mail, Phone, Globe, Calendar, Clock, GraduationCap } from 'lucide-react';
import LongCourseCard from '@/components/Courses/LongCourseCard';
import { getInstructorCourses } from '@/data/instructors';

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
  const instructorCourses = getInstructorCourses(instructor.id || 0);

  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* Main Profile Card */}
      <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 mb-8">
        <CardHeader className="text-center pb-6">
          <Avatar className="w-40 h-40 mx-auto mb-6 ring-4 ring-primary/20">
            <AvatarImage src={instructor.image} alt={instructor.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-5xl font-bold">
              {instructor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-4xl mb-2">{instructor.name}</CardTitle>
          <p className="text-xl text-muted-foreground mb-4">{instructor.specialty || instructor.expertise}</p>
          
          {/* Location and Experience */}
          <div className="flex items-center justify-center gap-6 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{instructor.city}, {instructor.country} {instructor.flag}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              <span>{instructor.experience}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 rounded-xl">
            {instructor.rating && (
              <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-yellow-500 mb-3">
                  <Star className="w-8 h-8 fill-current" />
                  <span className="text-3xl font-bold">{instructor.rating}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-xs text-muted-foreground mt-1">Based on student feedback</p>
              </div>
            )}
            {instructor.students && (
              <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Users className="w-8 h-8 text-primary" />
                  <span className="text-3xl font-bold text-primary">{instructor.students.toLocaleString()}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Students Taught</p>
                <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
              </div>
            )}
            {instructor.courses && (
              <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <span className="text-3xl font-bold text-primary">{instructor.courses}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Courses Created</p>
                <p className="text-xs text-muted-foreground mt-1">Active and upcoming</p>
              </div>
            )}
          </div>

          {/* Credentials and Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="w-6 h-6 text-primary" />
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="px-4 py-2">
                    <Award className="w-4 h-4 mr-2" />
                    {instructor.experience}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Specialization</p>
                  <p className="text-muted-foreground">{instructor.specialty || instructor.expertise}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                  Location & Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Based in</p>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <span>{instructor.city}, {instructor.country}</span>
                    <span className="text-lg">{instructor.flag}</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Teaching Status</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Available for new courses
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* About Section Enhanced */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">About {instructor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {instructor.description}
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Courses Section Enhanced */}
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold">Courses by {instructor.name}</h3>
            <p className="text-muted-foreground mt-2">
              {instructorCourses.length} active course{instructorCourses.length !== 1 ? 's' : ''} available
            </p>
          </div>
          {instructorCourses.length > 0 && (
            <Badge variant="secondary" className="px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              {instructorCourses.length} Course{instructorCourses.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        
        {instructorCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructorCourses.map((course) => (
              <LongCourseCard cardClassName="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200" 
                key={course.id} 
                course={course}
                referrerRoute={`/instructors/${instructor.id}`}
                referrerName={instructor.name}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h4 className="text-xl font-semibold mb-2">No Active Courses</h4>
            <p className="text-muted-foreground">
              {instructor.name} doesn't have any active courses at the moment. Check back later for new offerings!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InstructorDetails;
