
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';
import { Heart, Eye } from 'lucide-react';

const Courses = () => {
  const { theme, getIcon, getBackground } = useTheme();

  return (
    <div className={`min-h-full bg-background ${getBackground()}`}>
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
              className={`hover:shadow-lg transition-all duration-200 overflow-hidden ${
                theme.designSystem === 'material' ? 'shadow-md' : 
                theme.designSystem === 'fluent' ? 'border-2' : 
                'hover:shadow-lg'
              } ${
                theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''
              }`}
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {course.level}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className={`text-lg leading-tight ${theme.designSystem === 'material' ? 'text-base font-medium' : 'text-lg'}`}>
                    {course.title}
                  </CardTitle>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {course.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm">{course.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Topics Covered */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {course.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Course Details */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    {getIcon('time')}
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    {getIcon('student')}
                    {course.students} enrolled
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getIcon('price')}
                    {course.price}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    📅
                    {course.nextSession}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  <Button 
                    size="sm"
                    className={`flex-1 ${
                      theme.designSystem === 'material' ? 'rounded-none uppercase text-sm font-medium' :
                      theme.designSystem === 'human' ? 'rounded-lg' :
                      theme.designSystem === 'fluent' ? 'rounded-sm' :
                      ''
                    }`}
                  >
                    Enroll Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="px-2"
                  >
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
