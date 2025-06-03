
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';
import { Filter, LayoutGrid, List, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { isAfter, parseISO, isSameDay } from 'date-fns';
import CourseCard from '@/components/Courses/CourseCard';
import LongCourseCard from '@/components/Courses/LongCourseCard';
import CoursesCalendarView from '@/components/Courses/CoursesCalendarView';
import PopularCoursesMapView from '@/components/Courses/PopularCoursesMapView';

const Courses = () => {
  const {
    theme,
    getIcon,
    getBackground
  } = useTheme();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState('card');
  const [calendarViewMode, setCalendarViewMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get unique categories and levels for filter options
  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))];
  const levels = ['all', ...Array.from(new Set(courses.map(course => course.level)))];

  // Filter courses that are today or in the future for calendar view
  const futureCourses = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return courses.filter(course => {
      const courseStartDate = parseISO(course.startDate);
      const categoryMatch = categoryFilter === 'all' || course.category === categoryFilter;
      const levelMatch = levelFilter === 'all' || course.level === levelFilter;
      return categoryMatch && levelMatch && (isSameDay(courseStartDate, today) || isAfter(courseStartDate, today));
    });
  }, [categoryFilter, levelFilter]);

  // Filter and sort courses for card/list view
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

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <span className="font-medium">View:</span>
            <ToggleGroup type="single" value={viewMode} onValueChange={value => value && setViewMode(value)}>
              <ToggleGroupItem value="card" aria-label="Card view" className="gap-1">
                <LayoutGrid className="h-4 w-4" />
                Card
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view" className="gap-1">
                <List className="h-4 w-4" />
                List
              </ToggleGroupItem>
              <ToggleGroupItem value="calendar" aria-label="Calendar view" className="gap-1">
                <CalendarIcon className="h-4 w-4" />
                Calendar
              </ToggleGroupItem>
              <ToggleGroupItem value="map" aria-label="Map view" className="gap-1">
                <MapPin className="h-4 w-4" />
                Map
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
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

            {viewMode !== 'calendar' && viewMode !== 'map' && <div className="min-w-[150px]">
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
              </div>}
          </div>

          <div className="ml-auto text-sm text-muted-foreground">
            {viewMode === 'calendar' || viewMode === 'map' ? '' : `${filteredAndSortedCourses.length} course${filteredAndSortedCourses.length !== 1 ? 's' : ''} found`}
          </div>
        </div>

        {/* Card View */}
        {viewMode === 'card' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCourses.map(course => <CourseCard key={course.id} course={course} />)}
          </div>}

        {/* List View */}
        {viewMode === 'list' && <div className="space-y-4">
            {filteredAndSortedCourses.map(course => <LongCourseCard key={course.id} course={course} />)}
          </div>}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <CoursesCalendarView
            courses={courses}
            categoryFilter={categoryFilter}
            levelFilter={levelFilter}
            calendarViewMode={calendarViewMode}
            setCalendarViewMode={setCalendarViewMode}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        )}

        {/* Map View */}
        {viewMode === 'map' && (
          <PopularCoursesMapView courses={filteredAndSortedCourses} />
        )}
      </div>
    </div>;
};

export default Courses;
