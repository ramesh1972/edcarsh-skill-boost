
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { getSubjectColor } from '@/data/masterData';
import { courses } from '@/data/courses';
import { ArrowLeft, Calendar, Clock, Users, DollarSign, Wifi, WifiOff, Wrench, MapPin, Star } from 'lucide-react';
import CourseInfoCard from './CourseInfoCard';
import ActionButtons from './ActionButtons';

const CourseView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, getBackground } = useTheme();
  
  const course = courses.find(c => c.id === parseInt(id || '0'));

  if (!course) {
    return (
      <div className={`min-h-full bg-background ${getBackground()} flex items-center justify-center`}>
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="mb-4">The course you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-full bg-background ${getBackground()}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button 
          variant="outline" 
          onClick={() => navigate('/courses')} 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - left side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course header */}
            <Card>
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge variant="outline" className="bg-white/90 text-black">
                    {course.industry}
                  </Badge>
                  <Badge customColor={getSubjectColor(course.subject)} className="text-white">
                    {course.subject}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 flex-col">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {course.level}
                  </Badge>
                  <Badge variant="outline" className={`${course.mode === 'live' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {course.mode === 'live' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
                    {course.mode}
                  </Badge>
                  {course.tools && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      <Wrench className="w-3 h-3 mr-1" />
                      Tools
                    </Badge>
                  )}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">{course.title}</CardTitle>
                <p className="text-lg text-muted-foreground">{course.longDescription}</p>
              </CardHeader>
            </Card>

            {/* Topics covered as prominent chips */}
            <Card>
              <CardHeader>
                <CardTitle>Topics Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-6">
                  {course.topics.map((topic, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="px-4 py-2 text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
                <ul className="space-y-2">
                  {course.longTopics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructor details */}
            <Card>
              <CardHeader>
                <CardTitle>Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={course.instructor.image} alt={course.instructor.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white font-bold">
                      {course.instructor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                    <p className="text-muted-foreground mb-2">{course.instructor.specialty}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {course.instructor.city}, {course.instructor.country} {course.instructor.flag}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {course.instructor.experience}
                      </span>
                    </div>
                    <p className="text-sm">{course.instructor.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - right side */}
          <div className="space-y-6">
            {/* Course info card */}
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent>
                <CourseInfoCard 
                  duration={course.duration}
                  students={course.students}
                  price={course.price}
                  nextSession={course.nextSession}
                />
              </CardContent>
            </Card>

            {/* Action buttons */}
            <Card>
              <CardContent className="pt-6">
                <ActionButtons 
                  showJoinNow={true}
                  joinNowEnabled={true}
                  showJoinAsGuest={true}
                />
              </CardContent>
            </Card>

            {/* Additional course details */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Start Date: {course.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">End Date: {course.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Time: {course.startTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Daily Duration: {course.dailySessionDuration} hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
