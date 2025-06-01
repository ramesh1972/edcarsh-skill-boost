
import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';

const Courses = () => {
  const { theme, getIcon, getBackground } = useTheme();

  return (
    <div className={`min-h-screen bg-background ${getBackground()}`}>
      <Header />
      <div className={`container mx-auto px-4 py-8 ${theme.layout === 'compact' ? 'space-y-4' : theme.layout === 'spacious' ? 'space-y-12' : 'space-y-8'}`}>
        <div className="mb-8 animate-slide-in-left">
          <h1 className={`text-4xl font-bold mb-4 hover-color-shift ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
            {getIcon('course')} Available Courses
          </h1>
          <p className="text-lg text-muted-foreground animate-slide-in-right animate-delay-200">
            Short, practical crash courses designed for busy professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card 
              key={course.id} 
              className={`hover:shadow-lg transition-all duration-300 hover-lift hover-glow hover-border-glow ${
                theme.designSystem === 'material' ? 'shadow-md' : 
                theme.designSystem === 'fluent' ? 'border-2' : 
                'hover:shadow-lg'
              } ${
                theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''
              } ${
                index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
              } animate-delay-${(index % 6 + 1) * 100}`}
            >
              <CardHeader>
                <CardTitle className={`text-xl hover-color-shift ${theme.designSystem === 'material' ? 'text-lg font-medium' : 'text-xl'}`}>
                  <span className="hover-scale inline-block">{getIcon('course')}</span> {course.title}
                </CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 hover-color-shift">
                    <span className="hover-scale inline-block">{getIcon('time')}</span>
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 hover-color-shift">
                    <span className="hover-scale inline-block">{getIcon('student')}</span>
                    {course.students} enrolled
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="flex items-center gap-1 hover-scale-small">
                    <span className="hover-scale inline-block">{getIcon('price')}</span>
                    {course.price}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground hover-color-shift">
                    📅
                    {course.nextSession}
                  </div>
                </div>
                <Button 
                  className={`w-full hover-lift hover-glow ${
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
