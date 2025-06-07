import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, addWeeks, addMonths, subDays, subWeeks, subMonths, isSameDay, parseISO } from 'date-fns';
import CourseCalendarEvent from '@/components/calendar/CourseCalendarEvent';
import { Course } from '@/types';
import CoursesCalendarBackground from './CoursesCalendarBackground';

interface CoursesCalendarViewProps {
  courses: Course[];
  industryFilter: string;
  subjectFilter: string;
  levelFilter: string;
  calendarViewMode: string;
  setCalendarViewMode: (mode: string) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const CoursesCalendarView: React.FC<CoursesCalendarViewProps> = ({
  courses,
  industryFilter,
  subjectFilter,
  levelFilter,
  calendarViewMode,
  setCalendarViewMode,
  currentDate,
  setCurrentDate,
}) => {
  // Helper function to get all session days for a course
  const getCourseSessionDays = (course: Course) => {
    const startDate = parseISO(course.startDate);
    const endDate = parseISO(course.endDate);
    const sessionDays = [];
    let currentDay = startDate;
    while (currentDay <= endDate) {
      sessionDays.push(new Date(currentDay));
      currentDay = addDays(currentDay, 1);
    }
    return sessionDays;
  };

  // Get courses for current calendar view period - now includes all session days
  const getCoursesForPeriod = useMemo(() => {
    let startDate, endDate;
    switch (calendarViewMode) {
      case 'day':
        startDate = new Date(currentDate);
        endDate = new Date(currentDate);
        break;
      case 'week':
        startDate = startOfWeek(currentDate, {
          weekStartsOn: 1
        });
        endDate = endOfWeek(currentDate, {
          weekStartsOn: 1
        });
        break;
      case 'month':
        startDate = startOfMonth(currentDate);
        endDate = endOfMonth(currentDate);
        break;
      default:
        startDate = new Date(currentDate);
        endDate = new Date(currentDate);
    }
    const coursesInPeriod = [];
    courses.forEach(course => {
      const industryMatch = industryFilter === 'all' || course.industry === industryFilter;
      const subjectMatch = subjectFilter === 'all' || course.subject === subjectFilter;
      const levelMatch = levelFilter === 'all' || course.level === levelFilter;
      if (industryMatch && subjectMatch && levelMatch) {
        const sessionDays = getCourseSessionDays(course);
        sessionDays.forEach(sessionDay => {
          if (calendarViewMode === 'day') {
            if (isSameDay(sessionDay, currentDate)) {
              coursesInPeriod.push({
                ...course,
                sessionDay
              });
            }
          } else {
            if (sessionDay >= startDate && sessionDay <= endDate) {
              coursesInPeriod.push({
                ...course,
                sessionDay
              });
            }
          }
        });
      }
    });
    return coursesInPeriod;
  }, [calendarViewMode, currentDate, industryFilter, subjectFilter, levelFilter, courses]);

  const navigatePeriod = (direction: 'prev' | 'next') => {
    let newDate: Date;
    switch (calendarViewMode) {
      case 'day':
        newDate = direction === 'next' ? addDays(currentDate, 1) : subDays(currentDate, 1);
        break;
      case 'week':
        newDate = direction === 'next' ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1);
        break;
      case 'month':
        newDate = direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1);
        break;
      default:
        newDate = currentDate;
    }
    setCurrentDate(newDate);
  };

  const getViewTitle = () => {
    switch (calendarViewMode) {
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy');
      case 'week': {
        const weekStart = startOfWeek(currentDate, {
          weekStartsOn: 1
        });
        const weekEnd = endOfWeek(currentDate, {
          weekStartsOn: 1
        });
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      }
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      default:
        return '';
    }
  };

  const renderCalendarView = () => {
    if (calendarViewMode === 'day') {
      const daysCourses = getCoursesForPeriod;
      return <div className="space-y-4">
          {daysCourses.length === 0 ? <div className="text-center py-8 text-muted-foreground">
              No courses scheduled for this day
            </div> : daysCourses.map((courseWithSession, index) => <CourseCalendarEvent key={`${courseWithSession.id}-${index}`} course={courseWithSession} viewMode="day" currentDay={courseWithSession.sessionDay} />)}
        </div>;
    }
    if (calendarViewMode === 'week') {
      const weekStart = startOfWeek(currentDate, {
        weekStartsOn: 1
      });
      const weekDays = Array.from({
        length: 7
      }, (_, i) => addDays(weekStart, i));
      return <div className="w-full">
          {/* Week header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(dayName => <div key={dayName} className="p-2 text-center font-medium text-sm border-b border-gray-300">
                {dayName}
              </div>)}
          </div>
          
          {/* Week days with courses */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(day => {
            const dayCourses = getCoursesForPeriod.filter(courseWithSession => isSameDay(courseWithSession.sessionDay, day));
            return <div key={day.toISOString()} className="border border-gray-300 rounded-lg p-2 min-h-[200px] bg-background">
                  <div className="font-medium text-sm mb-2 text-center">
                    {format(day, 'EEE d')}
                  </div>
                  <div className="space-y-1">
                    {dayCourses.map((courseWithSession, index) => <CourseCalendarEvent key={`${courseWithSession.id}-${index}`} course={courseWithSession} viewMode="week" currentDay={courseWithSession.sessionDay} />)}
                  </div>
                </div>;
          })}
          </div>
        </div>;
    }

    // Month view
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, {
      weekStartsOn: 1
    });
    const calendarEnd = endOfWeek(monthEnd, {
      weekStartsOn: 1
    });
    const calendarDays = [];
    let day = calendarStart;
    while (day <= calendarEnd) {
      calendarDays.push(new Date(day));
      day = addDays(day, 1);
    }
    return <div className="grid grid-cols-7 gap-2">
        {/* Week headers */}
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(dayName => <div key={dayName} className="p-2 text-center font-medium text-sm text-muted-foreground">
            {dayName}
          </div>)}
        
        {/* Calendar days */}
        {calendarDays.map(day => {
        const dayCourses = getCoursesForPeriod.filter(courseWithSession => isSameDay(courseWithSession.sessionDay, day));
        const isCurrentMonth = day.getMonth() === currentDate.getMonth();
        const isToday = isSameDay(day, new Date());
        return <div key={day.toISOString()} className={`border border-gray-300 rounded p-1 min-h-[100px] ${isCurrentMonth ? 'bg-background' : 'bg-muted/30'} ${isToday ? 'ring-2 ring-primary' : ''}`}>
              <div className={`text-xs font-medium mb-1 ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}`}>
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayCourses.slice(0, 3).map((courseWithSession, index) => <CourseCalendarEvent key={`${courseWithSession.id}-${index}`} course={courseWithSession} viewMode="month" currentDay={courseWithSession.sessionDay} />)}
                {dayCourses.length > 3 && <div className="text-xs text-muted-foreground">
                    +{dayCourses.length - 3} more
                  </div>}
              </div>
            </div>;
      })}
      </div>;
  };

  return (
    <div className="relative min-h-[600px]">
      <div className="relative z-10">
        {/* Calendar Navigation */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <ToggleGroup type="single" className="gap-2 mr-5 bg-transparent !border-none !shadow-none" value={calendarViewMode} onValueChange={value => value && setCalendarViewMode(value)}>
            <ToggleGroupItem className="bg-secondary" value="day" aria-label="Day view">Day</ToggleGroupItem>
            <ToggleGroupItem className="bg-secondary" value="week" aria-label="Week view">Week</ToggleGroupItem>
            <ToggleGroupItem className="bg-secondary"  value="month" aria-label="Month view">Month</ToggleGroupItem>
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
              <Calendar mode="single" selected={currentDate} onSelect={date => date && setCurrentDate(date)} initialFocus className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm" onClick={() => navigatePeriod('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button className="ml-5" variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
        </div>

        {/* Course count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {getCoursesForPeriod.length} course{getCoursesForPeriod.length !== 1 ? 's' : ''} in this {calendarViewMode}
        </div>

        {/* Calendar View */}
        <div className="bg-card rounded-lg border p-4">
          {renderCalendarView()}
        </div>
      </div>
    </div>
  );
};

export default CoursesCalendarView;
