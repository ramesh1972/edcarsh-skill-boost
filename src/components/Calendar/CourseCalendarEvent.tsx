import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { Clock, Users, DollarSign, UserPlus, Eye } from 'lucide-react';
import { parseISO, addDays, isSameDay, parse, addMinutes, subMinutes, isWithinInterval, addHours, isAfter, isBefore } from 'date-fns';
import ActionButtons from '@/components/Courses/ActionButtons';
import { getSubjectColor as getSubjectColorHex } from '@/data/masterData';

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
  subject: string;
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

  // Vibrant subject color chips for calendar
  const getSubjectColor = (subject: string) => {
    const color = getSubjectColorHex(subject);
    // Map hex color to glassmorphism/gradient classes
    switch (subject) {
      case 'Frontend':
        return 'bg-gradient-to-r from-blue-290 via-blue-200 to-blue-100 text-blue-900 shadow-sm';
      case 'Backend':
        return 'bg-gradient-to-r from-green-290 via-green-200 to-green-100 text-green-900 shadow-sm';
      case 'Data Science':
        return 'bg-gradient-to-r from-purple-290 via-purple-200 to-purple-100 text-purple-900 shadow-sm';
      case 'Marketing':
        return 'bg-gradient-to-r from-orange-290 via-orange-200 to-orange-100 text-orange-900 shadow-sm';
      case 'Design':
        return 'bg-gradient-to-r from-pink-290 via-pink-200 to-pink-100 text-pink-900 shadow-sm';
      case 'Mobile':
        return 'bg-gradient-to-r from-cyan-290 via-cyan-200 to-cyan-100 text-cyan-900 shadow-sm';
      case 'DevOps':
        return 'bg-gradient-to-r from-red-290 via-red-200 to-red-100 text-red-900 shadow-sm';
      default:
        // Fallback: use the color from masterData as a border/outline
        return `border-2 border-[${color}] text-[${color}] bg-white/60`;
    }
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
    
    // Calculate the time window: 15 mins before session start
    const enableTime = subMinutes(sessionDateTime, 15);
    
    // Show join button from 15 mins before until session ends
    const showTimeWindow = isWithinInterval(now, { start: enableTime, end: sessionEndTime });
    // Enable join button from 15 mins before until session ends (entire session duration)
    const isEnabled = isWithinInterval(now, { start: enableTime, end: sessionEndTime });
    
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

  // Fix: Ensure all blocks above are properly closed before variable declarations

  const cardBase =
    'relative overflow-hidden rounded-xl shadow-xl border-0 bg-[rgba(255,255,255,0.15)] backdrop-blur-lg transition-transform duration-200 hover:scale-[1.015]';
  const calendarGlow =
    'shadow-[0_4px_32px_0_rgba(80,120,255,0.18),0_1.5px_8px_0_rgba(0,0,0,0.10)]';
  const jazzyBar =
    'absolute left-0 top-0 h-full w-2 rounded-l-xl bg-gradient-to-b from-primary via-pink-290 to-violet-500 animate-pulse';

  if (viewMode === 'month') {
    return (
      <div 
        className={`relative ${cardBase} ${calendarGlow} px-2 py-1 min-h-[48px] flex flex-col gap-0.5 ${getSubjectColor(course.subject)} ${isSessionPast ? 'opacity-50 grayscale' : ''}`}
        style={{ minHeight: `${Math.max(40, cardHeight / 3)}px`, justifySelf:'normal' }}
      >
        <div className={jazzyBar} style={{ opacity: 0.7}} />
        <div className="font-semibold truncate text-sm drop-shadow-sm pl-2">{course.title}</div>
        <div className="flex items-center gap-1 text-xs opacity-80 pl-2">
          <Clock className="h-3 w-3" />
          {course.startTime}
          <span className="ml-2">{course.dailySessionDuration}h</span>
        </div>
        <div className={`text-xs font-semibold pl-2 mt-0.5 ${isSessionPast ? 'text-gray-500' : 'text-pink-600'}`}>Session {sessionNumber}</div>
        <div className="flex gap-1 mt-1 pl-2">
          {joinButtonState.show && (
            <Button 
              size="sm" 
              className="text-xs h-5 px-2 bg-gradient-to-r from-pink-290 to-violet-500 text-white shadow-md hover:scale-105"
              disabled={!joinButtonState.enabled || isSessionPast}
            >
              Join
            </Button>
          )}
          {showJoinAsGuest && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-5 px-1 flex items-center gap-1 border-pink-300 hover:bg-pink-50"
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
        className={`relative ${cardBase} ${calendarGlow} px-3 py-2 min-h-[80px] flex flex-col gap-1 ${getSubjectColor(course.subject)} ${isSessionPast ? 'opacity-50 grayscale' : ''}`}
        style={{ minHeight: `${Math.max(80, cardHeight / 2)}px` }}
      >
        <div className={jazzyBar} style={{ opacity: 0.7 }} />
        <div className="font-semibold text-base mb-1 line-clamp-2 drop-shadow-sm">{course.title}</div>
        <div className="flex items-center gap-2 text-xs opacity-80">
          <Clock className="h-3 w-3" />
          {course.startTime}
          <span className="ml-2">{course.dailySessionDuration}h</span>
          <Users className="h-3 w-3 ml-2" />
          {course.students}
        </div>
        <Badge variant="outline" className="text-xs mt-1 border-pink-300 bg-white/60 text-pink-700 shadow-sm">
          {course.level}
        </Badge>
        <div className={`text-xs font-semibold mt-1 px-1 py-0.5 rounded ${isSessionPast ? 'text-gray-500 bg-gray-50' : 'text-pink-600 bg-pink-50'}`}>Session {sessionNumber}</div>
        <div className="flex gap-1 mt-1">
          {joinButtonState.show && (
            <Button 
              size="sm" 
              className="text-xs h-6 px-2 flex-1 bg-gradient-to-r from-pink-290 to-violet-500 text-white shadow-md hover:scale-105"
              disabled={!joinButtonState.enabled || isSessionPast}
            >
              Join
            </Button>
          )}
          {showJoinAsGuest && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-6 px-1 flex-1 flex items-center gap-1 border-pink-300 hover:bg-pink-50"
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
    <Card className={`relative ${cardBase} ${calendarGlow} w-full min-h-[${cardHeight}px] ${isSessionPast ? 'opacity-60 grayscale' : ''}`}> 
      <div className={jazzyBar} style={{ opacity: 0.7 }} />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight font-bold drop-shadow-sm">{course.title}</CardTitle>
          <div className="flex flex-col gap-1">
            <Badge variant="secondary" className="bg-white/60 text-pink-700 border-pink-300 shadow-sm">{course.level}</Badge>
            <Badge className={`font-semibold ${isSessionPast ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-pink-100 text-pink-800 border-pink-200'}`}>Session {sessionNumber}</Badge>
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
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{course.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={`font-semibold shadow-md ${getSubjectColor(course.subject)}`}>{course.subject}</Badge>
            <span className="text-sm text-muted-foreground">{course.durationHours}h total duration</span>
          </div>
          <div className="flex items-center gap-2">
            <img 
              src={course.instructor.image} 
              alt={course.instructor.name}
              className="w-7 h-7 rounded-full border-2 border-pink-300 shadow-md"
            />
            <span className="text-sm font-medium text-pink-700">{course.instructor.name}</span>
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
