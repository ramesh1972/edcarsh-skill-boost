
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Users, BookOpen, Award, MapPin, Mail, Phone, Globe, Calendar, Clock, GraduationCap, ArrowLeft } from 'lucide-react';
import ShortCourseCard from '@/components/Courses/ShortCourseCard';
import { getInstructorById, getInstructorCourses } from '@/data/instructors';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Instructor } from '@/types';

interface InstructorDetailsProps {
  instructor?: Instructor;
  onClose?: () => void;
}

const InstructorDetails: React.FC<InstructorDetailsProps> = ({ instructor: propInstructor, onClose }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [referrerRoute, setReferrerRoute] = useState('/instructors');
  const [referrerName, setReferrerName] = useState('Instructors');

  // Use prop instructor if provided, otherwise get from URL params
  const instructor = propInstructor || (id ? getInstructorById(parseInt(id)) : null);
  const instructorCourses = instructor ? getInstructorCourses(instructor.id || 0) : [];

  useEffect(() => {
    const state = location.state as { from?: string; fromName?: string } | null;
    const storedReferrer = sessionStorage.getItem('instructorViewReferrer');
    const storedReferrerName = sessionStorage.getItem('instructorViewReferrerName');

    if (state?.from) {
      setReferrerRoute(state.from);
      setReferrerName(state.fromName || 'Back');
      sessionStorage.setItem('instructorViewReferrer', state.from);
      sessionStorage.setItem('instructorViewReferrerName', state.fromName || 'Back');
    } else if (storedReferrer) {
      setReferrerRoute(storedReferrer);
      setReferrerName(storedReferrerName || 'Back');
    }
  }, [location]);

  const handleBackClick = () => {
    if (onClose) {
      onClose();
    } else {
      // Clear the stored referrer
      sessionStorage.removeItem('instructorViewReferrer');
      sessionStorage.removeItem('instructorViewReferrerName');
      navigate(referrerRoute);
    }
  };

  if (!instructor) {
    return <div>Instructor not found</div>;
  }
  
  return (
   <div className={`min-h-full bg-background`}>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {referrerName}
        </Button>

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
      <div className="space-y-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructorCourses.map((course) => (
              <ShortCourseCard 
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
   </div>
  );
};

export default InstructorDetails;
