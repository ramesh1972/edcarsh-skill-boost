import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import ActionButtons from '../ActionButtons';
import CourseInfoCard from '../CourseInfoCard';
import InstructorCard from '@/components/instructors/InstructorCard';
import { getInstructor, getUserName } from '@/adapters/userDataAdapter';
import { Wifi, WifiOff, Wrench } from 'lucide-react';
import { Course, CourseSchedule, CourseStats, DeepCourseInfo, Instructor } from '@/types';
import { getNextNCourseSchedules, getStatsForCourses } from '@/adapters/coursesDataAdapter';
import { getSubjectById, getIndustryById } from '@/adapters/industrySubjectAdpator';
import CourseTopics from '../CourseTopics';

interface LongCourseCardProps {
  deepCourseInfo: DeepCourseInfo;
  referrerRoute?: string;
  referrerName?: string;
  cardClassName?: string;
}

const LongCourseCard: React.FC<LongCourseCardProps> = ({
  deepCourseInfo,
  referrerRoute = '/courses',
  referrerName = 'Courses',
  cardClassName = '',
}) => {
  const { theme, getIcon } = useTheme();
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
      state: { from: referrerRoute, fromName: referrerName }
    });
  };

  if (!instructor) {
    return null; // Don't render if instructor not found
  }

  return (
    <Card className={`hover:shadow-lg transition-all duration-200 items-start justify-between ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : cardClassName}`}>
      <div className="flex flex-row gap-4">
        {/* Left side - Image and stats */}
        <div className="w-64 flex-shrink-0 flex flex-col bg-primary/5">
          <div className="relative h-48 overflow-hidden">
            <img src={deepCourseInfo.image} alt={deepCourseInfo.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 " />
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              <Badge variant="outline" className="bg-white/90 text-black text-xs">
                {industry.name || 'Industry Not Set'}
              </Badge>
              <Badge customColor={subject?.color} className="text-white text-xs">
                {subject.name || 'Subject Not Set'}
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
              {deepCourseInfo.hasTools && (
                <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                  <Wrench className="w-3 h-3 mr-1" />
                  Tools
                </Badge>
              )}
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

          {/* Spacer to push stats and price to bottom */}
          <div className="flex-1 p-4">

            {/* Course Info Card - aligned to bottom */}
            <CourseInfoCard
              deepCourseInfo={deepCourseInfo}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Main content columns: Description, Topics, Instructor */}
          <div>
            <div className="flex flex-1 min-w-0 items-stretch gap-1" style={{ maxHeight: '320px' }}>
              {/* Column 1: Title and Description */}
              <div className="flex-1 min-w-0 flex flex-col p-4" style={{ maxWidth: '330px' }}>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`text-xl font-semibold ${theme.designSystem === 'material' ? 'text-lg font-medium' : 'text-xl'}`}>
                    {deepCourseInfo.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground overflow-hidden">{deepCourseInfo.longDescription}</p>
              </div>

              <div className="flex-1 min-w-0 flex flex-col p-4" style={{ maxWidth: '330px' }}>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-medium mb-2">
                    Topics Covered
                  </h4>
                </div>
                <CourseTopics deepCourseInfo={deepCourseInfo} level={1} showHeader={false} textStyle={{ color: 'hsl(var(--muted-foreground)', fontSize: '0.800rem' }} />
              </div>
              {/* Column 2: Topics as bulleted list - max 8 topics */}

              {/* Column 3: Instructor Details */}
              <div className="flex-1 min-w-0 flex flex-col h-full p-4 bg-primary/5 rounded-lg ">
                <InstructorCard instructor={instructor} />
              </div>
            </div>
          </div>
          {/* Action Buttons Row - right aligned under the 3 columns */}
          <div className="flex justify-end px-6 pb-4 pt-2">
            <ActionButtons
              deepCourseInfo={deepCourseInfo}
              onViewClick={handleViewClick}
            />
          </div>
        </div>
        </div>
    </Card>
  );
};

export default LongCourseCard;
