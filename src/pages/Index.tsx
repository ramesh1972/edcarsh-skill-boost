import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calendar } from '@/components/ui/calendar';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';
import { Course } from '@/types';
import { List, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, addWeeks, addMonths, subDays, subWeeks, subMonths, isSameDay, isAfter, parseISO } from 'date-fns';
import CourseCalendarEvent from '@/components/Calendar/CourseCalendarEvent';

const Index = () => {
  const {
    theme,
    getIcon,
    getBackground
  } = useTheme();
  const [calendarViewMode, setCalendarViewMode] = useState('month'); // Changed from 'list' to 'month'
  const [currentDate, setCurrentDate] = useState(new Date());

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
      case 'list':
        startDate = new Date();
        endDate = addDays(new Date(), 30);
        break;
      case 'month':
        startDate = startOfMonth(currentDate);
        endDate = endOfMonth(currentDate);
        break;
      default:
        startDate = new Date();
        endDate = addDays(new Date(), 30);
    }

    const coursesInPeriod = [];
    
    courses.forEach(course => {
      const sessionDays = getCourseSessionDays(course);
      
      sessionDays.forEach(sessionDay => {
        if (calendarViewMode === 'list') {
          if (sessionDay >= startDate && sessionDay <= endDate) {
            coursesInPeriod.push({ ...course, sessionDay });
          }
        } else {
          if (sessionDay >= startDate && sessionDay <= endDate) {
            coursesInPeriod.push({ ...course, sessionDay });
          }
        }
      });
    });

    return coursesInPeriod;
  }, [calendarViewMode, currentDate]);

  const navigatePeriod = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      switch (calendarViewMode) {
        case 'month':
          return direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1);
        default:
          return prev;
      }
    });
  };

  const renderCalendarView = () => {
    if (calendarViewMode === 'list') {
      const upcomingCourses = getCoursesForPeriod.slice(0, 5);
      
      return (
        <div className="space-y-4">
          {upcomingCourses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No courses scheduled for the next 30 days
            </div>
          ) : (
            upcomingCourses.map((courseWithSession, index) => (
              <CourseCalendarEvent 
                key={`${courseWithSession.id}-${index}`} 
                course={courseWithSession} 
                viewMode="day" 
                currentDay={courseWithSession.sessionDay}
              />
            ))
          )}
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
          const dayCourses = getCoursesForPeriod.filter(courseWithSession => 
            isSameDay(courseWithSession.sessionDay, day)
          );
          
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = isSameDay(day, new Date());
          
          return (
            <div 
              key={day.toISOString()} 
              className={`border border-gray-300 rounded p-1 min-h-[100px] ${
                isCurrentMonth ? 'bg-background' : 'bg-muted/30'
              } ${isToday ? 'ring-2 ring-primary' : ''}`}
            >
              <div className={`text-xs font-medium mb-1 ${
                isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayCourses.slice(0, 3).map((courseWithSession, index) => (
                  <CourseCalendarEvent 
                    key={`${courseWithSession.id}-${index}`} 
                    course={courseWithSession} 
                    viewMode="month" 
                    currentDay={courseWithSession.sessionDay}
                  />
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
    <div className={`min-h-screen bg-background ${getBackground()}`}>
      {/* Hero Section */}
      <section className={`py-24 ${theme.layout === 'compact' ? 'py-12' : theme.layout === 'spacious' ? 'py-32' : 'py-24'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className={`text-5xl font-bold mb-6 ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
                {getIcon('hero')} Unlock Your Potential with Expert-Led Courses
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join a community of lifelong learners and gain in-demand skills through our curated selection of courses.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/courses">Explore Courses</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div>
              <img
                src="/placeholder-hero.png"
                alt="Hero Image"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${theme.layout === 'compact' ? 'py-8' : theme.layout === 'spacious' ? 'py-24' : 'py-16'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
              {getIcon('feature')} Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a range of features designed to enhance your learning experience and help you achieve your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards - Replace with actual data */}
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-muted-foreground">Learn from industry experts with real-world experience.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
              <p className="text-muted-foreground">Study at your own pace with on-demand video courses.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-muted-foreground">Connect with fellow learners and get your questions answered.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className={`py-16 ${theme.layout === 'compact' ? 'py-8' : theme.layout === 'spacious' ? 'py-24' : 'py-16'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
              {getIcon('course')} Featured Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore some of our most popular courses and start learning today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course Cards - Replace with actual course data */}
            {courses.slice(0, 3).map(course => (
              <div key={course.id} className="p-4 bg-card rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground">{course.description.substring(0, 100)}...</p>
                <Button asChild variant="link" className="mt-4">
                  <Link to={`/course/${course.id}`}>Learn More</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/courses">
                View All Courses
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Schedule Section */}
      <section className={`py-16 ${theme.layout === 'compact' ? 'py-8' : theme.layout === 'spacious' ? 'py-24' : 'py-16'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
              {getIcon('calendar')} Upcoming Schedule
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              View courses scheduled for the next 30 days and plan your learning journey
            </p>
          </div>

          {/* Calendar Navigation */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <ToggleGroup type="single" value={calendarViewMode} onValueChange={value => value && setCalendarViewMode(value)}>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4 mr-2" />
                List
              </ToggleGroupItem>
              <ToggleGroupItem value="month" aria-label="Month view">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Month
              </ToggleGroupItem>
            </ToggleGroup>
            
            {calendarViewMode === 'month' && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigatePeriod('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[150px] text-center">
                  {format(currentDate, 'MMMM yyyy')}
                </span>
                <Button variant="outline" size="sm" onClick={() => navigatePeriod('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
              </div>
            )}
          </div>

          {/* Calendar Content */}
          <div className="bg-card rounded-lg border p-6">
            {renderCalendarView()}
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/calendar">
                <CalendarIcon className="h-5 w-5 mr-2" />
                View Full Calendar
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${theme.layout === 'compact' ? 'py-8' : theme.layout === 'spacious' ? 'py-24' : 'py-16'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme.designSystem === 'material' ? 'font-medium' : theme.designSystem === 'human' ? 'font-semibold' : 'font-bold'}`}>
              {getIcon('stats')} Our Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're proud to have helped thousands of students achieve their learning goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat Cards - Replace with actual data */}
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">10,000+</h3>
              <p className="text-muted-foreground">Students Enrolled</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">500+</h3>
              <p className="text-muted-foreground">Courses Available</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">95%</h3>
              <p className="text-muted-foreground">Positive Reviews</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">24/7</h3>
              <p className="text-muted-foreground">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className={`py-16 ${theme.layout === 'compact' ? 'py-8' : theme.layout === 'spacious' ? 'py-24' : 'py-16'}`}>
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">Stay Up-to-Date</h2>
              <p className="text-lg">Subscribe to our newsletter and never miss a new course or update.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button size="lg">Subscribe Now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
