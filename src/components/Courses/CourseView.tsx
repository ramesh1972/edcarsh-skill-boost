import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/hooks/useTheme';
import { ArrowLeft, Wifi, WifiOff, Wrench, Calendar, Clock } from 'lucide-react';
import CourseInfoCard from './CourseInfoCard';
import ActionButtons from './ActionButtons';
import InstructorCard from '@/components/instructors/InstructorCard';
import { getInstructor, getUserName } from '@/adapters/userDataAdapter';
import { getCourseInfo, getCourseInfoDeep, getNextNCourseSchedules, getStatsForCourses } from '@/adapters/coursesDataAdapter';
import { CourseSchedule, Instructor, CourseStats } from '@/types';
import { getSubjectById, getIndustryById } from '@/adapters/industrySubjectAdpator';
import { set, sub } from 'date-fns';
import { getInstructorDeepCourseInfo } from '@/adapters/instructorDataAdapter';
import CourseSchedules from './CourseSchedules';
import CourseTopics from './CourseTopics';

const CourseView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, getBackground } = useTheme();
  const [referrerRoute, setReferrerRoute] = useState('/courses');
  const [referrerName, setReferrerName] = useState('Courses');
  const [nextNSchedules, setNextNSchedules] = useState<CourseSchedule[]>([]);

  const courseInfoDeep = getCourseInfoDeep(parseInt(id)) || null;

  const instructors = courseInfoDeep?.schedules?.map(schedule => getInstructor(schedule.byInstructorId)) || [];

  const subject = getSubjectById(courseInfoDeep.industryId, courseInfoDeep.subjectId) || { name: "Subject Not Set", color: '#000' };
  const industry = getIndustryById(courseInfoDeep.industryId) || { name: "Industry Not Set" };

  const { getIcon } = useTheme();
  useEffect(() => {
    // Get the referrer from location state or session storage
    const state = location.state as { from?: string; fromName?: string } | null;
    const storedReferrer = sessionStorage.getItem('courseViewReferrer');
    const storedReferrerName = sessionStorage.getItem('courseViewReferrerName');

    setNextNSchedules(getNextNCourseSchedules(parseInt(id)));

    if (state?.from) {
      setReferrerRoute(state.from);
      setReferrerName(state.fromName || 'Back');
      sessionStorage.setItem('courseViewReferrer', state.from);
      sessionStorage.setItem('courseViewReferrerName', state.fromName || 'Back');
    } else if (storedReferrer) {
      setReferrerRoute(storedReferrer);
      setReferrerName(storedReferrerName || 'Back');
    }
  }, [id, location]);

  const handleBackClick = () => {
    // Clear the stored referrer
    sessionStorage.removeItem('courseViewReferrer');
    sessionStorage.removeItem('courseViewReferrerName');
    navigate(referrerRoute);
  };

  if (!courseInfoDeep || !instructors) {
    return (
      <div className={`min-h-full bg-background ${getBackground()} flex items-center justify-center`}>
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="mb-4">The course you're looking for doesn't exist.</p>
          <Button onClick={handleBackClick}>Back to {referrerName}</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-full bg-background ${getBackground()}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {referrerName}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Main content - left side */}
          <div className="lg:col-span-4 space-y-6">
            {/* Course header */}
            <Card>
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <img
                  src={courseInfoDeep.image}
                  alt={courseInfoDeep.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge variant="outline" className="bg-white/90 text-black">
                    {industry?.name || 'Industry Not Set'}
                  </Badge>
                  <Badge customColor={subject?.color} className="text-white">
                    {subject?.name || 'Subject Not Set'}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 flex-col">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {courseInfoDeep.level}
                  </Badge>
                  <Badge variant="outline" className={`${courseInfoDeep.mode === 'live' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {courseInfoDeep.mode === 'live' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
                    {courseInfoDeep.mode}
                  </Badge>
                  {courseInfoDeep.hasTools && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      <Wrench className="w-3 h-3 mr-1" />
                      Tools
                    </Badge>
                  )}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">{courseInfoDeep.title}</CardTitle>
                <p className="text-md text-muted-foreground">{courseInfoDeep.longDescription}</p>
              </CardHeader>
            </Card>

            {/* Topics covered as prominent chips */}
            <Card>
              <CardHeader>
                <CardTitle>Topics Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <CourseTopics deepCourseInfo={courseInfoDeep} showHeader={false} />
              </CardContent>
            </Card>

            {/* Instructor details using InstructorCard */}
            <Card>
              <CardHeader>
                {instructors.length > 1 && (
                  <CardTitle>This Course is taught by different Instructors</CardTitle>
                ) || (
                    <CardTitle>Your Instructor</CardTitle>
                  )}
              </CardHeader>
              <CardContent>
                {instructors.length === 0 ? (
                  <p className="text-muted-foreground">No instructor assigned yet.</p>
                ) : (
                  <div className="flex flex-col flex-wrap gap-8">

                    {instructors.map((instructor, index) => (
                      <>
                        <InstructorCard
                          key={index}
                          instructor={instructor}
                          size="lg"
                          layout="horizontal"
                          showTitle={false}
                          referrerRoute={`/courses/${courseInfoDeep.id}`}
                          referrerName={courseInfoDeep.title}

                        />

                        {instructors.length > 1 && <hr className="border-b border-muted-foreground my-2" />}
                      </>
                    ))}
                  </div>
                )}
          
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - right side */}
          <div className="space-y-6 lg:col-span-3" >
            {/* Course info card */}
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent>
                <CourseInfoCard
                  deepCourseInfo={courseInfoDeep}
                />
              </CardContent>
            </Card>


            {/* Additional course details */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CourseSchedules
                  courseInfoDeep={courseInfoDeep}
                  showWishList={false}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CourseView;
