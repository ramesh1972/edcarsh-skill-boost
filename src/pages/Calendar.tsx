import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';
import { Calendar as CalendarIcon, LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, addWeeks, addMonths, subDays, subWeeks, subMonths, isSameDay, isAfter, isBefore, parseISO } from 'date-fns';
import CourseCalendarEvent from '@/components/Calendar/CourseCalendarEvent';
import TitleComponent from '@/components/TitleComponent';

const Calendar = () => {
  const { theme, getIcon, getBackground } = useTheme();
  const [viewMode, setViewMode] = useState('month'); // 'day', 'week', 'month'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [subjectFilter, setSubjectFilter] = useState('all');

  // Get unique subjects for filter options
  const subjects = ['all', ...Array.from(new Set(courses.map(course => course.subject)))];

  // Filter courses that are today or in the future
  const futureCourses = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return courses.filter(course => {
      const courseStartDate = parseISO(course.startDate);
      const subjectMatch = subjectFilter === 'all' || course.subject === subjectFilter;
      return subjectMatch && (isSameDay(courseStartDate, today) || isAfter(courseStartDate, today));
    });
  }, [subjectFilter]);

  // Get courses for current view period
  const getCoursesForPeriod = useMemo(() => {
    let startDate, endDate;
    
    switch (viewMode) {
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

    return futureCourses.filter(course => {
      const courseStartDate = parseISO(course.startDate);
      return courseStartDate >= startDate && courseStartDate <= endDate;
    });
  }, [viewMode, currentDate, futureCourses]);

  const navigatePeriod = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      switch (viewMode) {
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
    switch (viewMode) {
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy');
      case 'week':
        { const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`; }
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      default:
        return '';
    }
  };

  const renderDayView = () => {
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
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    
    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map(day => {
          const dayCourses = futureCourses.filter(course => 
            isSameDay(parseISO(course.startDate), day) &&
            (subjectFilter === 'all' || course.subject === subjectFilter)
          );
          
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
  };

  const renderMonthView = () => {
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
          const dayCourses = futureCourses.filter(course => 
            isSameDay(parseISO(course.startDate), day) &&
            (subjectFilter === 'all' || course.subject === subjectFilter)
          );
          
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
    <div className="min-h-full bg-background bg-gradient-to-br from-background/100 to-primary/55 dark:from-background dark:to-primary/80 duration-500">
      <div className="container mx-auto px-4 py-12 space-y-8">
        <TitleComponent
          title="Course Calendar"
          subtitle="View upcoming course schedules and plan your learning journey."
          iconName="time"
        />
        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 rounded-xl p-8 hover:scale-[1.025] transition-transform duration-200">
          {/* View Mode Toggle and Navigation */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <span className="font-medium">View:</span>
              <ToggleGroup type="single" value={viewMode} onValueChange={value => value && setViewMode(value)}>
                <ToggleGroupItem value="day" aria-label="Day view">
                  Day
                </ToggleGroupItem>
                <ToggleGroupItem value="week" aria-label="Week view">
                  Week
                </ToggleGroupItem>
                <ToggleGroupItem value="month" aria-label="Month view">
                  Month
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigatePeriod('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-medium min-w-[200px] text-center">
                {getViewTitle()}
              </div>
              <Button variant="outline" size="sm" onClick={() => navigatePeriod('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 rounded-xl hover:scale-[1.025] transition-transform duration-200">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <div className="min-w-[150px]">
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>
                      {subject === 'all' ? 'All Subjects' : subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto text-sm text-muted-foreground">
              {getCoursesForPeriod.length} course{getCoursesForPeriod.length !== 1 ? 's' : ''} in this {viewMode}
            </div>
          </div>

          {/* Calendar Views */}
          <div className="bg-card rounded-lg border p-4">
            {viewMode === 'day' && renderDayView()}
            {viewMode === 'week' && renderWeekView()}
            {viewMode === 'month' && renderMonthView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
