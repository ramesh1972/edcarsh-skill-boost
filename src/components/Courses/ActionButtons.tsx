import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, UserPlus } from 'lucide-react';
import { CourseSchedule, DeepCourseInfo } from '@/types';
import { getCourseNextSession, getNextNCourseSchedules } from '@/adapters/coursesDataAdapter';

interface ActionButtonsProps {
  deepCourseInfo?: DeepCourseInfo;
  schedule?: CourseSchedule; // Add the schedule prop
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

const ActionButtons: React.FC<ActionButtonsProps> = ({
  deepCourseInfo,
  schedule,
  showJoinNow = false,
  showJoinAsGuest = true,
  showView = true,
  showWishList = true,
  showEnrollNow = true,
  isDisabled = false,

  onViewClick = () => { }, // Default to empty function if not provided
  onJoinNowClick = () => { }, // Default to empty function if not provided
  onEnrollNowClick = () => { }, // Default to empty function if not provided 
  onJoinAsGuestClick = () => { }, // Default to empty function if not provided
  onWishListClick = () => { }, // Default to empty function if not provided
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleViewClick = () => {
    if (onViewClick) {
      onViewClick();
    } else if (deepCourseInfo) {
      navigate(`/courses/${deepCourseInfo.id}`);
    }
  };

  const handleJoinAsGuestClick = () => {
    if (onJoinAsGuestClick) {
      onJoinAsGuestClick();
    }
    // Additional logic for joining as guest can be added here
    console.log("Join as Guest clicked");
  };

  const handleWishListClick = () => {
    if (onWishListClick) {
      onWishListClick();
    }
    // Additional logic for adding to wishlist can be added here
    console.log("Wishlist clicked");
  };

  const handleJoinNowClick = () => {
    if (onJoinNowClick) {
      onJoinNowClick();
    }
    // Additional logic for joining now can be added here
    console.log("Join Now clicked");
  };

  const handleEnrollNowClick = () => {
    if (onEnrollNowClick) {
      onEnrollNowClick();
    }
  };

  // Check if Join Now button should be displayed based on session timing
  const shouldShowJoinNow = () => {
    if (!deepCourseInfo) return false;

    const now = new Date();
    const nextSession = getCourseNextSession(deepCourseInfo.id);
    if (!nextSession) return false;
    const sessionDateTime = nextSession?.sessionDate + "T" + nextSession?.actualSessionStartTime;
    const sessionDate = new Date(sessionDateTime);
    const timeDifference = sessionDate.getTime() - now.getTime();
    const minutesDifference = timeDifference / (1000 * 60);

    // Show Join Now button from 15 minutes before to 10 minutes after session start
    return minutesDifference <= 30 && minutesDifference >= -3;
  };

  const displayJoinNow = showJoinNow && shouldShowJoinNow();

  return (
    <div className="flex justify-between items-center gap-2 w-full flex-wrap min-w-0">
      {/* Left side - Join as Guest */}
      <div className="flex-shrink-0 min-w-0">
        {showJoinAsGuest && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-2 min-w-0 max-w-xs"
            disabled={isDisabled}
            onClick={handleJoinAsGuestClick}
          >
            <UserPlus className="h-3 w-3" />
            Join as Guest
          </Button>
        )}
      </div>

      {/* Right side - Other buttons */}
      <div className="flex flex-nowrap gap-2 min-w-0 flex-shrink flex-wrap">
        {displayJoinNow && (
          <Button
            size="sm"
            className={`flex items-center gap-1 border-2 min-w-0 max-w-xs ${showJoinNow && !isDisabled ?
              'bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg border-red-600 animate-flash' :
              ''
              }`}
            disabled={!showJoinNow || isDisabled}
            onClick={handleJoinNowClick}
          >
            Join Now
          </Button>
        )}
        {showView && (
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-1 min-w-0 max-w-xs"
            disabled={isDisabled}
            onClick={handleViewClick}
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
        )}
        {showEnrollNow && (
          <Button
            size="sm"
            className={`${theme.designSystem === 'material' ? 'rounded-none uppercase text-sm font-medium' : theme.designSystem === 'human' ? 'rounded-lg' : theme.designSystem === 'fluent' ? 'rounded-sm' : ''} min-w-0 max-w-xs`}
            disabled={isDisabled}
            onClick={handleEnrollNowClick}
          >
            Enroll Now
          </Button>
        )}
        {showWishList && (
          <Button
            variant="secondary"
            size="sm"
            className="px-2 min-w-0 max-w-xs"
            disabled={isDisabled}
            onClick={handleWishListClick}
          >
            <Heart className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
