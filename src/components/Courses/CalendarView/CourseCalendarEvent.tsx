import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { getInstructor, getUserName } from '@/adapters/userDataAdapter';
import { Clock, User, Wifi, WifiOff } from 'lucide-react';
import { Course, CourseSchedule, DeepCourseInfo } from '@/types';
import { getSubjectById, getIndustryById } from '@/adapters/industrySubjectAdpator';
import { Button } from '@/components/ui/button';


interface CourseCalendarEventProps {
  deepCourseInfo: DeepCourseInfo;
  viewMode: 'day' | 'week' | 'month';
  currentDay?: Date;
  schedule?: CourseSchedule;
  sessionDay?: import('@/types/courseTypes/courseSchedule.type').CourseScheduleSessionDay;
}

const CourseCalendarEvent: React.FC<CourseCalendarEventProps> = ({
  deepCourseInfo,
  viewMode,
  currentDay,
  schedule,
  sessionDay
}) => {
  // Place hooks at the very top of the component, before any early returns
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    let blink = true;
    const interval = setInterval(() => {
      blink = !blink;
      setIsBlinking(blink);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${deepCourseInfo.id}`, {
      state: { from: '/calendar', fromName: 'Calendar' }
    });
  };

  const subject = getSubjectById(deepCourseInfo.industryId, deepCourseInfo.subjectId) || { name: "Subject Not Set", color: '#000' };
  const industry = getIndustryById(deepCourseInfo.industryId) || { name: "Industry Not Set" };
  let instructorName = "";
  let price = "";

  // Use passed schedule/sessionDay if available
  let foundSchedule = schedule || null;
  let foundSessionDay = sessionDay || null;
  let sessionDateStr = foundSessionDay?.sessionDate || "";
  let sessionTime = foundSchedule?.normalSessionStart || "00:00";
  let joinActive = false;

  if (foundSchedule && foundSessionDay) {
    const now = new Date();
    const scheduleDate = new Date(foundSchedule.startDate);
    const scheduleEnd = new Date(foundSchedule.endDate);
    joinActive = now >= new Date(scheduleDate.getTime() - 10 * 60000) && now <= new Date(scheduleEnd.getTime() + 10 * 60000);
    instructorName = getUserName(foundSchedule.byInstructorId) || "Unknown Instructor";
    price = foundSchedule.price || "TBD";
  } else {
    // fallback: try to find schedule/sessionDay for currentDay
    const currentDayStr = currentDay ? currentDay.toISOString().split('T')[0] : null;
    if (currentDayStr === null) {
      console.error("Current day is not set. Please provide a valid date.");
      return null;
    }
    deepCourseInfo.schedules.find(schedule => {
      const scheduleDate = new Date(schedule.startDate);
      const scheduleEnd = new Date(schedule.endDate);
      const scheduleStr = scheduleDate.toISOString().split('T')[0];
      const session = schedule.sessionDays.find(sessionDay => {
        if (sessionDay.sessionDate === currentDayStr) {
          sessionDateStr = scheduleStr;
          sessionTime = schedule.normalSessionStart || "00:00";
          joinActive = new Date() >= new Date(scheduleDate.getTime() - 10 * 60000) && new Date() <= new Date(scheduleEnd.getTime() + 10 * 60000);
          foundSchedule = schedule;
          foundSessionDay = sessionDay;
          return true;
        }
      });
      instructorName = getUserName(schedule.byInstructorId) || "Unknown Instructor";
      price = schedule.price || "TBD";
      if (sessionDateStr !== "") return true;
    });
  }

  if (viewMode === 'month' || viewMode === 'week') {
    return (
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full"
        style={{ borderLeft: `8px solid ${subject.color} !important` }}
        onClick={handleClick}
      >
        <CardContent className={`p-2 h-full flex flex-col justify-between${(foundSchedule && foundSessionDay && (() => {
          const now = new Date();
          const sessionDateTime = new Date(foundSessionDay.sessionDate + 'T' + (foundSchedule.normalSessionStart || '00:00'));
          const joinEnd = new Date(sessionDateTime.getTime() + 30 * 60000);
          if (now > joinEnd) {
            return ' opacity-50 grayscale';
          }
          return '';
        })()) || ''}`}>
          <div>
            <div className="flex items-start gap-1 mb-1 h-[35px] relative ]">
              <Badge customColor={subject?.color || '#000'} className="text-white text-xs break-all" style={{ maxWidth: '100px', wordBreak: 'break-word', overflow: 'hidden' }}>
                {subject.name}
              </Badge>
              {/* Schedule ID aligned right */}
              {foundSchedule && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-gray-200 text-gray-800 ml-1 absolute right-0 top-0"
                  style={{ right: 0 }}
                >
                  #{foundSchedule.scheduleId}
                </Badge>
              )}
            </div>
            <div className="min-h-[2.5rem] flex flex-col justify-start h-[45px]">
              <h4 className="font-medium text-xs leading-tight mb-0 line-clamp-2 break-all">{deepCourseInfo.title}</h4>
              {/* Tag removed */}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Clock className="w-3 h-3" />
              <span>{sessionDateStr}</span>
              <span>• {deepCourseInfo.dailySessionDuration} hrs</span>
            </div>
          </div>
          <div className="flex gap-1 mt-2">
            {/* Only show Join/Enroll/Guest Join for day view, and only if session is not in the past */}
            {foundSchedule && foundSessionDay ? (() => {
              const now = new Date();
              const sessionDateTime = new Date(foundSessionDay.sessionDate + 'T' + (foundSessionDay.actualSessionStartTime || '00:00'));
              const joinStart = new Date(sessionDateTime.getTime() - 30 * 60000);
              const joinEnd = new Date(sessionDateTime.getTime() + (foundSessionDay.actualDuration*60 + 30) * 60000);
              const isPast = now > joinEnd;
              if (isPast) {
                // Past session: grey out, no buttons
                return null;
              }
              return <>
                <Button
                  className="bg-primary/20 hover:bg-white/30 text-xs  rounded flex items-center p-[0.6rem] h-6"
                  title="Guest Join"
                  onClick={e => { e.stopPropagation(); window.open(`/guest-join/${deepCourseInfo.id}`); }}
                >
                  Guest
                </Button>
                {now >= joinStart && now <= joinEnd ? (
                  <Button
                    className={`bg-green-500 hover:bg-green-600 text-xs rounded p-[0.6rem] h-6 ${isBlinking ? 'animate-blink' : ''}`}
                    style={isBlinking ? { opacity: 0.5 } : {}}
                    onClick={e => { e.stopPropagation(); window.open(`/join/${deepCourseInfo.id}`); }}
                  >
                    Join
                  </Button>
                ) : (
                  <Button
                    className="bg-green-300 hover:bg-gray-400 text-xs rounded h-6" variant='outline'
                    onClick={e => { e.stopPropagation(); window.open(`/enroll/${deepCourseInfo.id}`); }}
                  >
                    Enroll
                  </Button>
                )}
              </>;
            })() : null}
            {/* Always show view button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-xs px-2 py-1 rounded flex items-center gap-1"
              title="View Course Details"
              onClick={e => { e.stopPropagation(); window.open(`/courses/${deepCourseInfo.id}`); }}
            >
              {/* Eye icon for view */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12zm10.5 3a3 3 0 100-6 3 3 0 000 6z" /></svg>
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
          <div className="flex gap-2 mb-1 items-center">
            <Badge customColor={subject.color} className="text-white">
              {subject.name}
            </Badge>
            <Badge variant="secondary">
              {deepCourseInfo.level}
            </Badge>
            <Badge variant="outline" className={deepCourseInfo.mode === 'live' ? 'text-green-600' : 'text-gray-600'}>
              {deepCourseInfo.mode === 'live' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
              {deepCourseInfo.mode}
            </Badge>
            {foundSchedule && (
              <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-800 ml-1">
                #{foundSchedule.scheduleId}
              </Badge>
            )}
          </div>
          <div className="min-h-[2.5rem] flex flex-col justify-start">
            <h3 className="font-semibold text-lg mb-0 line-clamp-2">{deepCourseInfo.title}</h3>
            {/* Tag removed */}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {sessionDateStr}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {instructorName}
            </span>
          </div>
          
        </div>
        <div className="flex gap-1 mt-2">
            {/* Only show Join/Enroll/Guest Join for day view, and only if session is not in the past */}
            {foundSchedule && foundSessionDay ? (() => {
              const now = new Date();
              const sessionDateTime = new Date(foundSessionDay.sessionDate + 'T' + (foundSessionDay.actualSessionStartTime || '00:00'));
              const joinStart = new Date(sessionDateTime.getTime() - 30 * 60000);
              const joinEnd = new Date(sessionDateTime.getTime() + (foundSessionDay.actualDuration*60 + 30) * 60000);
              const isPast = now > joinEnd;
              if (isPast) {
                // Past session: grey out, no buttons
                return null;
              }
              return <>
                <Button
                  className="bg-primary/20 hover:bg-white/30 text-xs  rounded flex items-center p-[0.6rem] h-6"
                  title="Guest Join"
                  onClick={e => { e.stopPropagation(); window.open(`/guest-join/${deepCourseInfo.id}`); }}
                >
                  Guest
                </Button>
                {now >= joinStart && now <= joinEnd ? (
                  <Button
                    className={`bg-green-500 hover:bg-green-600 text-xs rounded p-[0.6rem] h-6 ${isBlinking ? 'animate-blink' : ''}`}
                    style={isBlinking ? { opacity: 0.5 } : {}}
                    onClick={e => { e.stopPropagation(); window.open(`/join/${deepCourseInfo.id}`); }}
                  >
                    Join
                  </Button>
                ) : (
                  <Button
                    className="bg-green-300 hover:bg-gray-400 text-xs rounded h-6" variant='outline'
                    onClick={e => { e.stopPropagation(); window.open(`/enroll/${deepCourseInfo.id}`); }}
                  >
                    Enroll
                  </Button>
                )}
              </>;
            })() : null}
            {/* Always show view button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-xs px-2 py-1 rounded flex items-center gap-1"
              title="View Course Details"
              onClick={e => { e.stopPropagation(); window.open(`/courses/${deepCourseInfo.id}`); }}
            >
              {/* Eye icon for view */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12zm10.5 3a3 3 0 100-6 3 3 0 000 6z" /></svg>
            </button>
          </div>
      </CardContent>
    </Card>
  );
}


export default CourseCalendarEvent;

/* Add this to your CSS (e.g., App.css or a global stylesheet):
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-blink {
  animation: blink 1s steps(1, end) infinite;
}
*/
