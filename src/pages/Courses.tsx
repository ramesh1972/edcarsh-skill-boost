import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';
import { Heart, Eye, Filter } from 'lucide-react';

const Courses = () => {
  const {
    theme,
    getIcon,
    getBackground
  } = useTheme();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  // Get unique categories and levels for filter options
  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))];
  const levels = ['all', ...Array.from(new Set(courses.map(course => course.level)))];

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const categoryMatch = categoryFilter === 'all' || course.category === categoryFilter;
      const levelMatch = levelFilter === 'all' || course.level === levelFilter;
      return categoryMatch && levelMatch;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price':
          return parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''));
        case 'students':
          return b.students - a.students;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return 0;
      }
    });
    return filtered;
  }, [categoryFilter, levelFilter, sortBy]);
  return <div className={`min-h-full bg-background ${getBackground()}`}>
      <div className={`container mx-auto px-4 py-8 ${theme.layout === 'compact' ? 'space-y-4' : theme.layout === 'spacious' ? 'space-y-12' : 'space-y-8'}`}>
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
            {getIcon('course')} Available Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Short, practical crash courses designed for busy professionals
          </p>
        </div>

        {/* Filters and Sort Controls */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-card rounded-lg border">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters & Sort:</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[150px]">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[150px]">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => <SelectItem key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[150px]">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="ml-auto text-sm text-muted-foreground">
            {filteredAndSortedCourses.length} course{filteredAndSortedCourses.length !== 1 ? 's' : ''} found
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[5px]">
          {filteredAndSortedCourses.map(course => <Card key={course.id} className={`h-full hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''}`}>
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {course.level}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2 mb-1 h-32 flex flex-col justify-start flex-shrink-0">
                <div className="flex items-start justify-between">
                  <CardTitle className={`text-lg leading-tight line-clamp-2 ${theme.designSystem === 'material' ? 'text-base font-medium' : 'text-lg'}`}>
                    {course.title}
                  </CardTitle>
                  <Badge variant="outline" className="ml-2 text-xs shrink-0">
                    {course.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm line-clamp-2 flex-1 flex items-start">{course.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Topics Covered - Fixed height for alignment */}
                <div className="flex-shrink-0">
                  <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
                  <div className="flex flex-wrap mb-2 gap-1 h-[60px] content-start overflow-hidden">
                    {course.topics.map((topic, index) => <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                        {topic}
                      </Badge>)}
                  </div>
                </div>

                {/* Course Details - Fixed position */}
                <div className="flex items-center justify-between text-sm mb-1 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    {getIcon('time')}
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    {getIcon('student')}
                    {course.students} enrolled
                  </div>
                </div>

                {/* Price and Session - Fixed position */}
                <div className="flex items-center justify-between mb-5 flex-shrink-0">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getIcon('price')}
                    {course.price}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    📅
                    {course.nextSession}
                  </div>
                </div>

                {/* Action Buttons - Always at bottom */}
                <div className="flex gap-2 mt-auto">
                  <Button variant="outline" size="sm" className="flex-1 flex items-center gap-1 border-2">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  <Button size="sm" className={`flex-1 ${theme.designSystem === 'material' ? 'rounded-none uppercase text-sm font-medium' : theme.designSystem === 'human' ? 'rounded-lg' : theme.designSystem === 'fluent' ? 'rounded-sm' : ''}`}>
                    Enroll Now
                  </Button>
                  <Button variant="outline" size="sm" className="px-2 border-2">
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </div>;
};

export default Courses;
