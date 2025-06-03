
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';
import { Filter, LayoutGrid, List, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, addWeeks, addMonths, subDays, subWeeks, subMonths, isSameDay, isAfter, parseISO } from 'date-fns';
import CourseCard from '@/components/Courses/CourseCard';
import LongCourseCard from '@/components/Courses/LongCourseCard';
import CourseCalendarEvent from '@/components/Calendar/CourseCalendarEvent';

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
  const [calendarViewMode, setCalendarViewMode] = useState('month'); // 'day', 'week', 'month'
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

  // Get courses for current calendar view period
  const getCoursesForPeriod = useMemo(() => {
    let startDate, endDate;
    
    switch (calendarViewMode) {
      case 'day':
        startDate = new Date(currentDate);
        endDate = new Date(currentDate);
        break;
      case 'week':
        startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
        endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
        break;
      case 'month':
        startDate = startOfMonth(currentDate);
        endDate = endOfMonth(currentDate);
        break;
      default:
        startDate = new Date(currentDate);
        endDate = new Date(currentDate);
    }

    return courses.filter(course => {
      const courseStartDate = parseISO(course.startDate);
      const categoryMatch = categoryFilter === 'all' || course.category === categoryFilter;
      const levelMatch = levelFilter === 'all' || course.level === levelFilter;
      
      if (calendarViewMode === 'day') {
        return categoryMatch && levelMatch && isSameDay(courseStartDate, currentDate);
      }
      
      return categoryMatch && levelMatch && courseStartDate >= startDate && courseStartDate <= endDate;
    });
  }, [calendarViewMode, currentDate, categoryFilter, levelFilter]);

  const navigatePeriod = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      switch (calendarViewMode) {
        case 'day':
          return direction === 'next' ? addDays(prev, 1) : subDays(prev, 1);
        case 'week':
          return direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1);
        case 'month':
          return direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1);
        default:
          return prev;
      }
    });
  };

  const getViewTitle = () => {
    switch (calendarViewMode) {
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy');
      case 'week':
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      default:
        return '';
    }
  };

  const renderCalendarView = () => {
    if (calendarViewMode === 'day') {
      const daysCourses = getCoursesForPeriod;
      
      return (
        <div className="space-y-4">
          {daysCourses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No courses scheduled for this day
            </div>
          ) : (
            daysCourses.map(course => (
              <CourseCalendarEvent key={course.id} course={course} viewMode="day" />
            ))
          )}
        </div>
      );
    }

    if (calendarViewMode === 'week') {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
      
      return (
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map(day => {
            const dayCourses = courses.filter(course => {
              const categoryMatch = categoryFilter === 'all' || course.category === categoryFilter;
              const levelMatch = levelFilter === 'all' || course.level === levelFilter;
              return categoryMatch && levelMatch && isSameDay(parseISO(course.startDate), day);
            });
            
            return (
              <div key={day.toISOString()} className="border rounded-lg p-2 min-h-[200px]">
                <div className="font-medium text-sm mb-2 text-center">
                  {format(day, 'EEE d')}
                </div>
                <div className="space-y-1">
                  {dayCourses.map(course => (
                    <CourseCalendarEvent key={course.id} course={course} viewMode="week" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Month view
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    
    const calendarDays = [];
    let day = calendarStart;
    
    while (day <= calendarEnd) {
      calendarDays.push(new Date(day));
      day = addDays(day, 1);
    }
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Week headers */}
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(dayName => (
          <div key={dayName} className="p-2 text-center font-medium text-sm text-muted-foreground">
            {dayName}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map(day => {
          const dayCourses = courses.filter(course => {
            const categoryMatch = categoryFilter === 'all' || course.category === categoryFilter;
            const levelMatch = levelFilter === 'all' || course.level === levelFilter;
            return categoryMatch && levelMatch && isSameDay(parseISO(course.startDate), day);
          });
          
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = isSameDay(day, new Date());
          
          return (
            <div 
              key={day.toISOString()} 
              className={`border rounded p-1 min-h-[100px] ${
                isCurrentMonth ? 'bg-background' : 'bg-muted/30'
              } ${isToday ? 'ring-2 ring-primary' : ''}`}
            >
              <div className={`text-xs font-medium mb-1 ${
                isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayCourses.slice(0, 3).map(course => (
                  <CourseCalendarEvent key={course.id} course={course} viewMode="month" />
                ))}
                {dayCourses.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayCourses.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <span className="font-medium">View:</span>
            <ToggleGroup type="single" value={viewMode} onValueChange={value => value && setViewMode(value)}>
              <ToggleGroupItem value="card" aria-label="Card view">
                <LayoutGrid className="h-4 w-4" />
                Card
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4" />
                List
              </ToggleGroupItem>
              <ToggleGroupItem value="calendar" aria-label="Calendar view">
                <CalendarIcon className="h-4 w-4" />
                Calendar
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Calendar Navigation - only show when in calendar view */}
          {viewMode === 'calendar' && (
            <div className="flex items-center gap-2">
              <ToggleGroup type="single" value={calendarViewMode} onValueChange={value => value && setCalendarViewMode(value)}>
                <ToggleGroupItem value="day" aria-label="Day view">Day</ToggleGroupItem>
                <ToggleGroupItem value="week" aria-label="Week view">Week</ToggleGroupItem>
                <ToggleGroupItem value="month" aria-label="Month view">Month</ToggleGroupItem>
              </ToggleGroup>
              <Button variant="outline" size="sm" onClick={() => navigatePeriod('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="min-w-[200px] text-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {getViewTitle()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={currentDate}
                    onSelect={(date) => date && setCurrentDate(date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="sm" onClick={() => navigatePeriod('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
            </div>
          )}
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
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[150px]">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {viewMode !== 'calendar' && (
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
            )}
          </div>

          <div className="ml-auto text-sm text-muted-foreground">
            {viewMode === 'calendar' 
              ? `${getCoursesForPeriod.length} course${getCoursesForPeriod.length !== 1 ? 's' : ''} in this ${calendarViewMode}`
              : `${filteredAndSortedCourses.length} course${filteredAndSortedCourses.length !== 1 ? 's' : ''} found`
            }
          </div>
        </div>

        {/* Card View */}
        {viewMode === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredAndSortedCourses.map(course => (
              <LongCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-card rounded-lg border p-4">
            {renderCalendarView()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
