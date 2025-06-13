import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import ActionButtons from '../ActionButtons';
import CourseInfoCard from '../CourseInfoCard';
import InstructorCard from '@/components/instructors/InstructorCard';
import { getInstructor, getUserName } from '@/adapters/userDataAdapter';

import { Heart, Eye, UserPlus, Wifi, WifiOff, Wrench, Tag } from 'lucide-react';
import { Course } from '@/types/courseTypes/course.type';
import { CourseSchedule, CourseStats, DeepCourseInfo, Instructor } from '@/types';
import { getNextNCourseSchedules, getStatsForCourses } from '@/adapters/coursesDataAdapter';
import { getSubjectById, getIndustryById } from '@/adapters/industrySubjectAdpator';

interface CourseCardProps {
  deepCourseInfo: DeepCourseInfo;
  referrerRoute?: string;
  referrerName?: string;
  cardClassName?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  deepCourseInfo,
  referrerRoute = '/courses',
  referrerName = 'Courses',
  cardClassName = ''
}) => {
  const {
    theme,
    getIcon
  } = useTheme();
  const navigate = useNavigate();

  const schedules: CourseSchedule[] = getNextNCourseSchedules(deepCourseInfo.id, 1);
  const firstSchedule = schedules?.[0] || null;
  const instructor: Instructor = getInstructor(firstSchedule?.byInstructorId || deepCourseInfo.ownerInstructorId) || null
  const instructorName = instructor !== null ? getUserName(instructor.userId) : "Unknown Instructor";

  const subject = getSubjectById(deepCourseInfo.industryId, deepCourseInfo.subjectId) || { name: "Subject Not Set", color: '#000' };
  const industry = getIndustryById(deepCourseInfo.industryId) || { name: "Industry Not Set" };

  const courseStats: CourseStats = getStatsForCourses([deepCourseInfo.id]);
  
  const handleViewClick = () => {
    navigate(`/courses/${deepCourseInfo.id}`, {
      state: {
        from: referrerRoute,
        fromName: referrerName
      }
    });
  };

 /*  if (!schedules || schedules.length === 0) {
    return null; // Don't render if no schedules found  
  } */

  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''} ${cardClassName}`}>
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 rounded-b-0">
        <img src={deepCourseInfo.image} alt={deepCourseInfo.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-b-0" />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge variant="outline" className="bg-white/90 text-black text-xs">
            {industry.name || 'Industry Not Set'}
          </Badge>
          <Badge customColor={subject?.color} className="text-white text-xs">
            {subject?.name || 'Subject Not Set'}
          </Badge>
        </div>
        <div className="absolute top-2 right-2 flex gap-1 flex-col">
          <Badge variant="secondary" className="bg-white/90 text-black text-xs">
            {deepCourseInfo.level}
          </Badge>
          <Badge variant="outline" className={`text-xs ${deepCourseInfo.mode === 'live' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {deepCourseInfo.mode === 'live' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
            {deepCourseInfo.mode}
          </Badge>
          {deepCourseInfo.hasTools && <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
            <Wrench className="w-3 h-3 mr-1" />
            Tools
          </Badge>}
        </div>
        <div className="absolute bottom-2 left-2 flex flex-col gap-1">
          {/* Course Status Badge */}
          {(() => {
            let status = 'future';
            if (schedules && schedules.length > 0) {
              const lastSchedule = schedules[schedules.length - 1];
              if (lastSchedule.isPast) status = 'past';
              else if (lastSchedule.isActive) status = 'active';
              else if (lastSchedule.isFuture) status = 'future';
            }

            let badgeClass = '';
            if (status === 'active') badgeClass = 'bg-green-600 text-white';
            else if (status === 'past') badgeClass = 'bg-gray-400 text-white';
            else badgeClass = 'bg-blue-500 text-white';
            
            return (
              <Badge className={`text-xs ${badgeClass}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
            );
          })()}
        </div>
      </div>

      <CardHeader className="pb-2 mb-1 h-32 flex flex-col justify-start flex-shrink-0">
        <div className="flex items-start justify-between">
          <CardTitle className={`text-lg leading-tight line-clamp-2 ${theme.designSystem === 'material' ? 'text-base font-medium' : 'text-lg'}`}>
            {deepCourseInfo.title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm line-clamp-2 flex-1 flex items-start max-h-30 overflow-hidden">{deepCourseInfo.mediumDescription}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col pt-0 pb-0">
        {/* Topics Covered - Fixed height for alignment, max 6 topics */}
        <div className="mb-2">
          <h4 className="text-sm font-medium mb-2">Topics Covered</h4>
          <div className="flex flex-wrap mb- gap-1 h-[40px] content-start overflow-hidden">
            {deepCourseInfo.tags.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Instructor Section - aligned to top */}
        <div className="mb-2">
          <InstructorCard instructor={instructor} hideDescription={true} size="sm" />
        </div>

        {/* Spacer to push content to bottom */}
        <div className="flex-1"></div>

        {/* Bottom section - Course Info and Action Buttons */}
        <div className="mt-4 space-y-3 pb-3">
          <CourseInfoCard
            deepCourseInfo={deepCourseInfo}
          />
        </div>
        <div className="mt-4 pb-6">

          <ActionButtons
            deepCourseInfo={deepCourseInfo}
            onViewClick={handleViewClick}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
