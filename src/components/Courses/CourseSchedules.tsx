import React from 'react';
import { Calendar } from 'lucide-react';
import ActionButtons from './ActionButtons';
import { CardTitle } from '@/components/ui/card';
import { DeepCourseInfo } from '@/types';
import { get } from 'http';
import { getNextNCourseSchedules } from '@/adapters/coursesDataAdapter';
import { getInstructor, getUserName } from '@/adapters/userDataAdapter';
import { useTheme } from '@/hooks/useTheme';

interface CourseSchedulesProps {
    courseInfoDeep: DeepCourseInfo;
    nSchedules?: number;
    showJoinNow?: boolean;
    showJoinAsGuest?: boolean;
    showView?: boolean;
    showWishList?: boolean;
    showEnrollNow?: boolean;
    isDisabled?: boolean;
    onViewClick?: () => void;
    onJoinNowClick?: () => void;
    onEnrollNowClick?: () => void;
    onJoinAsGuestClick?: () => void;
    onWishListClick?: () => void;
}

const CourseSchedules: React.FC<CourseSchedulesProps> = ({
    courseInfoDeep,
    nSchedules = -1,
    showJoinNow = false,
    showJoinAsGuest = true,
    showView = true,
    showWishList = true,
    showEnrollNow = true,
    isDisabled = false,
    onViewClick = () => { },
    onJoinNowClick = () => { },
    onEnrollNowClick = () => { },
    onJoinAsGuestClick = () => { },
    onWishListClick = () => { },
}) => {
    const nextNSchedules = getNextNCourseSchedules(courseInfoDeep.id, nSchedules);
    const { getIcon } = useTheme();
    return (
        <>
            {nextNSchedules && nextNSchedules.length > 0 ? (
                <div className="space-y-2">
                    {nextNSchedules.map((_, index) => (
                        <>
                        <div key={index} className="flex items-center gap-2  p-2 rounded-lg transition-colors">
                            <div className="flex items-start gap-1 w-[150px]">
                                <span className='text-sm'>{getIcon('calendar')}</span>
                                <span className="text-sm">
                                    {courseInfoDeep.schedules[index]?.startDate}<br/>
                                    {courseInfoDeep.schedules[index]?.byInstructorId && (
                                        <span className="text-muted-foreground text-xs">
                                            by {getUserName(courseInfoDeep.schedules[index]?.byInstructorId)}
                                        </span>
                                    )}
                                </span>
                            </div>
                            <ActionButtons
                                deepCourseInfo={courseInfoDeep}
                                schedule={nextNSchedules[index]}
                                showJoinNow={showJoinNow}
                                showJoinAsGuest={showJoinAsGuest}
                                showView={showView}
                                showWishList={showWishList}
                                isDisabled={isDisabled}
                                onViewClick={onViewClick}
                                onJoinNowClick={onJoinNowClick}
                                onEnrollNowClick={onEnrollNowClick}
                                onJoinAsGuestClick={onJoinAsGuestClick}
                                onWishListClick={onWishListClick}
                            />
                        </div>
                        {nextNSchedules.length > 1 && <hr className="border-b border-muted-foreground my-2" />}
                        </>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">No upcoming sessions scheduled.</p>
            )}
        </>
    );
};

export default CourseSchedules;
