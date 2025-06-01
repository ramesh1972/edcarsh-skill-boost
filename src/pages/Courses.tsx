
import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign, Calendar } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Courses = () => {
  const { theme, getIcon, getBackground } = useTheme();

  const courses = [
    {
      id: 1,
      title: "React Development Crash Course",
      description: "Master React in just 16 hours with hands-on projects",
      duration: "16 hours",
      price: "$25",
      students: 250,
      nextSession: "Dec 15, 2024"
    },
    {
      id: 2,
      title: "Python for Data Science",
      description: "Learn Python data analysis tools and techniques",
      duration: "20 hours",
      price: "$25",
      students: 180,
      nextSession: "Dec 18, 2024"
    },
    {
      id: 3,
      title: "Digital Marketing Essentials",
      description: "Complete digital marketing strategy in 12 hours",
      duration: "12 hours",
      price: "$25",
      students: 320,
      nextSession: "Dec 20, 2024"
    }
  ];

  return (
    <div className={`min-h-screen bg-background ${getBackground()}`}>
      <Header />
      <div className={`container mx-auto px-4 py-8 ${theme.layout === 'compact' ? 'space-y-4' : theme.layout === 'spacious' ? 'space-y-12' : 'space-y-8'}`}>
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
            {getIcon('course')} Available Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Short, practical crash courses designed for busy professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className={`hover:shadow-lg transition-all duration-200 ${
                theme.designSystem === 'material' ? 'shadow-md' : 
                theme.designSystem === 'fluent' ? 'border-2' : 
                'hover:shadow-lg'
              } ${
                theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''
              }`}
            >
              <CardHeader>
                <CardTitle className={`text-xl ${theme.designSystem === 'material' ? 'text-lg font-medium' : 'text-xl'}`}>
                  {getIcon('course')} {course.title}
                </CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    {theme.iconScheme === 'normal' ? <Clock className="w-4 h-4" /> : <span>{getIcon('time')}</span>}
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    {theme.iconScheme === 'normal' ? <Users className="w-4 h-4" /> : <span>{getIcon('student')}</span>}
                    {course.students} enrolled
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {theme.iconScheme === 'normal' ? <DollarSign className="w-3 h-3" /> : <span>{getIcon('price')}</span>}
                    {course.price}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {theme.iconScheme === 'normal' ? <Calendar className="w-4 h-4" /> : <span>📅</span>}
                    {course.nextSession}
                  </div>
                </div>
                <Button 
                  className={`w-full ${
                    theme.designSystem === 'material' ? 'rounded-none uppercase text-sm font-medium' :
                    theme.designSystem === 'human' ? 'rounded-lg' :
                    theme.designSystem === 'fluent' ? 'rounded-sm' :
                    ''
                  }`}
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
