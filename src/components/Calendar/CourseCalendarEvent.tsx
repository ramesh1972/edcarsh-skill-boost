import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { Clock, Users, DollarSign, UserPlus, Eye } from 'lucide-react';
import { parseISO, addDays, isSameDay, parse, addMinutes, subMinutes, isWithinInterval, addHours, isAfter, isBefore } from 'date-fns';
import ActionButtons from '@/components/Courses/ActionButtons';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  durationHours: number;
  dailySessionDuration: number;
  price: string;
  students: number;
  startDate: string;
  endDate: string;
  startTime: string;
  category: string;
  level: string;
  instructor: {
    name: string;
    image: string;
    specialty: string;
  };
}

interface CourseCalendarEventProps {
  course: Course;
  viewMode: 'day' | 'week' | 'month';
  currentDay?: Date;
}

const CourseCalendarEvent: React.FC<CourseCalendarEventProps> = ({ course, viewMode, currentDay }) => {
  const { getIcon } = useTheme();

  const getCategoryColor = (category: string) => {
    const colors = {
      'Frontend': 'bg-blue-100 text-blue-800',
      'Backend': 'bg-green-100 text-green-800',
      'Data Science': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-orange-100 text-orange-800',
      'Design': 'bg-pink-100 text-pink-800',
      'Mobile': 'bg-cyan-100 text-cyan-800',
      'DevOps': 'bg-red-100 text-red-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Calculate session number if currentDay is provided
  const getSessionNumber = () => {
    if (!currentDay) return 1;
    
    const startDate = parseISO(course.startDate);
    const endDate = parseISO(course.endDate);
    
    let sessionCount = 1;
    let checkDate = startDate;
    
    while (checkDate <= endDate) {
      if (isSameDay(checkDate, currentDay)) {
        return sessionCount;
      }
      checkDate = addDays(checkDate, 1);
      sessionCount++;
    }
    
    return 1;
  };

  // Check if current session should show Join Now button and if it should be enabled
  const getJoinButtonState = () => {
    if (!currentDay) return { show: false, enabled: false };
    
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Only show for today's sessions
    if (!isSameDay(currentDay, today)) {
      return { show: false, enabled: false };
    }
    
    // Parse the session time for today
    const sessionDateTime = parse(course.startTime, 'HH:mm', currentDay);
    const sessionEndTime = addHours(sessionDateTime, course.dailySessionDuration);
    
    // Calculate the time window: 15 mins before to 10 mins after session start
    const enableTime = subMinutes(sessionDateTime, 15);
    const disableTime = addMinutes(sessionDateTime, 10);
    
    // Show join button from 15 mins before until session ends
    const showTimeWindow = isWithinInterval(now, { start: enableTime, end: sessionEndTime });
    // Enable join button from 15 mins before until session starts
    const isEnabled = isWithinInterval(now, { start: enableTime, end: sessionDateTime });
    
    return { 
      show: showTimeWindow, 
      enabled: isEnabled 
    };
  };

  // Check if session is current or future for Join as Guest button
  const isCurrentOrFutureSession = () => {
    if (!currentDay) return false;
    
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Show for today's sessions or future sessions
    return isSameDay(currentDay, today) || isAfter(currentDay, today);
  };

  // Check if session is in the past
  const isPastSession = () => {
    if (!currentDay) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return isBefore(currentDay, today);
  };

  // Calculate card height based on daily session duration
  const getCardHeight = () => {
    const baseHeight = 60; // Base height in pixels
    const heightPerHour = 20; // Additional height per hour
    return Math.max(baseHeight, baseHeight + (course.dailySessionDuration * heightPerHour));
  };

  const sessionNumber = getSessionNumber();
  const joinButtonState = getJoinButtonState();
  const showJoinAsGuest = isCurrentOrFutureSession();
  const cardHeight = getCardHeight();
  const isSessionPast = isPastSession();

  if (viewMode === 'month') {
    return (
      <div 
        className={`text-xs p-1 !rounded !border-4 !border-black ${getCategoryColor(course.category)} ${
          isSessionPast ? 'opacity-50 bg-gray-100' : ''
        }`}
        style={{ minHeight: `${Math.max(40, cardHeight / 3)}px`, border: '2px solid black !important' }}
      >
        <div className="font-medium truncate">{course.title}</div>
        <div className="text-xs opacity-75">{course.startTime}</div>
        <div className="text-xs opacity-75">{course.dailySessionDuration}h</div>
        <div className={`text-xs font-semibold mt-1 ${isSessionPast ? 'text-gray-500' : 'text-red-600'}`}>
          Session - {sessionNumber}
        </div>
        <div className="flex gap-1 mt-1">
          {joinButtonState.show && (
            <Button 
              size="sm" 
              className="text-xs h-5 px-2"
              disabled={!joinButtonState.enabled || isSessionPast}
            >
              Join Now
            </Button>
          )}
          {showJoinAsGuest && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-5 px-1 flex items-center gap-1"
              disabled={isSessionPast}
            >
              <UserPlus className="h-2 w-2" />
              Guest
            </Button>
          )}
          <Button 
            variant="secondary" 
            size="sm" 
            className="text-xs h-5 px-1 flex items-center gap-1"
            disabled={isSessionPast}
          >
            <Eye className="h-2 w-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (viewMode === 'week') {
    return (
      <div 
        className={`text-xs p-2 rounded border-4 border-black ${getCategoryColor(course.category)} ${
          isSessionPast ? 'opacity-50 bg-gray-100' : ''
        }`}
        style={{ minHeight: `${Math.max(80, cardHeight / 2)}px` }}
      >
        <div className="font-medium text-xs mb-1 line-clamp-2">{course.title}</div>
        <div className="flex items-center gap-1 text-xs opacity-75">
          <Clock className="h-3 w-3" />
          {course.startTime}
        </div>
        <div className="flex items-center gap-1 text-xs opacity-75">
          <span>{course.dailySessionDuration}h duration</span>
        </div>
        <div className="flex items-center gap-1 text-xs opacity-75">
          <Users className="h-3 w-3" />
          {course.students}
        </div>
        <Badge variant="outline" className="text-xs mt-1">
          {course.level}
        </Badge>
        <div className={`text-xs font-semibold mt-1 px-1 py-0.5 rounded ${
          isSessionPast ? 'text-gray-500 bg-gray-50' : 'text-red-600 bg-red-50'
        }`}>
          Session - {sessionNumber}
        </div>
        <div className="flex gap-1 mt-1">
          {joinButtonState.show && (
            <Button 
              size="sm" 
              className="text-xs h-6 px-1 flex-1"
              disabled={!joinButtonState.enabled || isSessionPast}
            >
              Join
            </Button>
          )}
          {showJoinAsGuest && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-6 px-1 flex-1 flex items-center gap-1"
              disabled={isSessionPast}
            >
              <UserPlus className="h-2 w-2" />
              Guest
            </Button>
          )}
          <Button 
            variant="secondary" 
            size="sm" 
            className="text-xs h-6 px-1 flex items-center gap-1"
            disabled={isSessionPast}
          >
            <Eye className="h-2 w-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Day view - full detail
  return (
    <Card className={`w-full border-4 border-black ${isSessionPast ? 'opacity-60 bg-gray-50' : ''}`} style={{ minHeight: `${cardHeight}px` }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
          <div className="flex flex-col gap-1">
            <Badge variant="secondary">{course.level}</Badge>
            <Badge className={`font-semibold ${
              isSessionPast ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-red-100 text-red-800 border-red-200'
            }`}>
              Session - {sessionNumber}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.startTime}
          </div>
          <div className="flex items-center gap-1">
            <span>{course.dailySessionDuration}h duration</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.students} enrolled
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            ${course.price}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={getCategoryColor(course.category)}>
              {course.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {course.durationHours}h total duration
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <img 
              src={course.instructor.image} 
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">{course.instructor.name}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <ActionButtons 
            showJoinNow={joinButtonState.show}
            joinNowEnabled={joinButtonState.enabled && !isSessionPast}
            showJoinAsGuest={showJoinAsGuest}
            isDisabled={isSessionPast}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCalendarEvent;
