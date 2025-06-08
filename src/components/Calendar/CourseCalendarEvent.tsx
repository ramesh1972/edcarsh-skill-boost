import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { getSubjectColor } from '@/data/masterData';
import { getInstructorById } from '@/data/instructors';
import { Clock, User, Wifi, WifiOff, Wrench } from 'lucide-react';
import { Course } from '@/types';
import { time } from 'console';

interface CourseCalendarEventProps {
  course: Course;
  viewMode: 'day' | 'week' | 'month';
  currentDay?: Date;
}

const CourseCalendarEvent: React.FC<CourseCalendarEventProps> = ({
  course,
  viewMode,
  currentDay
}) => {
  const navigate = useNavigate();
  const instructor = getInstructorById(course.instructorId);

  const handleClick = () => {
    navigate(`/courses/${course.id}`, {
      state: { from: '/calendar', fromName: 'Calendar' }
    });
  };

  if (!instructor) {
    return null; // Don't render if instructor not found
  }

  // TODO
  if (viewMode === 'month' || viewMode === 'week') {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const sessionDateStr = currentDay?.toISOString().split('T')[0] || course.startDate;
    const isToday = todayStr === sessionDateStr;
    const sessionTime = course.startTime || '00:00';
    // session start datetime for today
    const sessionStart = new Date(`${sessionDateStr}T${sessionTime}`);
    // session end = start + dailySessionDuration (in minutes)
    const sessionEnd = new Date(sessionStart.getTime() + (course.dailySessionDuration * 60 * 60 * 1000));
    // Join enabled from 10 mins before start to 10 mins after end, but only for today
    const joinActive = isToday && now >= new Date(sessionStart.getTime() - 10 * 60000) && now <= new Date(sessionEnd.getTime() + 10 * 60000);
    console.log ("border color", getSubjectColor(course.subject));
    return (
  
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full"
        style={{ borderLeft: `8px solid ${getSubjectColor(course.subject)} !important` }}
        onClick={handleClick}
      >
        <CardContent className="p-2 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-1 mb-1 h-[35px]">
              <Badge customColor={getSubjectColor(course.subject)} className="text-white text-xs">
                {course.subject}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {/* {course.mode === 'live' ? <Wifi className="w-4 h-4 mr-1" /> : <WifiOff className="w-4 h-4 mr-1" />} */}
                {course.tools === true ? <Wrench className="w-4 h-4 mr-1" /> : ''}
              </Badge>
            </div>
            <div className="min-h-[2.5rem] flex flex-col justify-start h-[45px]">
              <h4 className="font-medium text-xs leading-tight mb-0 line-clamp-2">{course.title}</h4>
              <div className="text-xs text-muted-foreground mt-0.5">{course.topics?.[0]}</div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Clock className="w-3 h-3" />
              <span>{course.startTime}</span>
              <span>• {course.dailySessionDuration} hrs</span>
            </div>
          </div>
          <div className="flex gap-1 mt-2">
            <button
              className="bg-white/20 hover:bg-white/30 text-xs px-2 py-1 rounded"
              onClick={e => { e.stopPropagation(); window.open(`/guest-join/${course.id}`); }}
            >
              Guest Join
            </button>
            <button
              className={`bg-green-500 hover:bg-green-600 text-xs px-2 py-1 rounded ${joinActive ? '' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!joinActive}
              onClick={e => { e.stopPropagation(); if (joinActive) window.open(`/join/${course.id}`); }}
            >
              Join
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }


  // Day view
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow h-44"
      onClick={handleClick}
    >
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div>
          <div className="flex gap-2 mb-1">
            <Badge
              customColor={getSubjectColor(course.subject)}
              className="text-white"
            >
              {course.subject}
            </Badge>
            <Badge variant="secondary">
              {course.level}
            </Badge>
            <Badge variant="outline" className={course.mode === 'live' ? 'text-green-600' : 'text-gray-600'}>
              {course.mode === 'live' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
              {course.mode}
            </Badge>
          </div>
          <div className="min-h-[2.5rem] flex flex-col justify-start">
            <h3 className="font-semibold text-lg mb-0 line-clamp-2">{course.title}</h3>
            <div className="text-sm text-muted-foreground mt-0.5">{course.topics?.[0]}</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.startTime}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {instructor.name}
            </span>
          </div>
          <div className="text-right">
            <div className="font-semibold">{course.price}</div>
            <div className="text-muted-foreground">{course.duration}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCalendarEvent;
