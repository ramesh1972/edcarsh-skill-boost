
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import ActionButtons from '../ActionButtons';
import CourseInfoCard from '../CourseInfoCard';
import { Wifi, WifiOff, Wrench } from 'lucide-react';
import { getInstructor, getUserName } from '@/adapters/userDataAdapter';
import { DeepCourseInfo, CourseSchedule, CourseStats, Instructor } from '@/types';
import { getNextNCourseSchedules, getStatsForCourses } from '@/adapters/coursesDataAdapter';
import { getSubjectById, getIndustryById } from '@/adapters/industrySubjectAdpator';

interface ShortCourseCardProps {
  deepCourseInfo: DeepCourseInfo;
  referrerRoute?: string;
  referrerName?: string;
}

const ShortCourseCard: React.FC<ShortCourseCardProps> = ({
  deepCourseInfo,
  referrerRoute = '/courses',
  referrerName = 'Courses'
}) => {
  const { theme } = useTheme();
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

  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col gap-1 w-fit ${theme.designSystem === 'material' ? 'shadow-md' : theme.designSystem === 'fluent' ? 'border-2' : 'hover:shadow-lg'} ${theme.skin === 'gradient' ? 'bg-gradient-to-br from-card to-card/80' : ''}`}>
      {/* DeepCourseInfo Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 rounded-b-none">
        <img src={deepCourseInfo.image} alt={deepCourseInfo.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-b-none" />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge variant="outline" className="bg-white/90 text-black text-xs">
            {industry?.name || 'Industry Not Set'}
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
          {deepCourseInfo.hasTools && (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
              <Wrench className="w-3 h-3 mr-1" />
              Tools
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="flex flex-col justify-start flex-shrink-0 gap-1">
        <div className="flex items-start justify-between">
          <CardTitle className={`text-base leading-tight line-clamp-2 ${theme.designSystem === 'material' ? 'text-sm font-medium' : 'text-base'}`}>
            {deepCourseInfo.title}
          </CardTitle>
        </div>
        <CardDescription className="text-xs line-clamp-2 flex-1 flex items-start max-h-4 overflow-hidden">{deepCourseInfo.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-1">
        {/* Topics Covered - Reduced height for alignment, max 6 topics */}
        <div className="flex-shrink-0 p-0">
          <h4 className="text-xs font-medium mb-1">Topics Covered:</h4>
          <div className="flex flex-wrap mb-2 gap-1 content-start overflow-hidden">
            {deepCourseInfo.tags.slice(0, 6).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* DeepCourseInfo Info Card - moved below image */}
        <div className='mt-4'>
          <CourseInfoCard deepCourseInfo={deepCourseInfo} />
        </div>

        {/* Action Buttons aligned to bottom */}
        <div className="mt-6 p-0">
          <ActionButtons
            deepCourseInfo={deepCourseInfo}
            onViewClick={handleViewClick}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortCourseCard;
