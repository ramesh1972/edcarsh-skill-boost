
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, UserPlus } from 'lucide-react';

interface ActionButtonsProps {
  showJoinNow?: boolean;
  joinNowEnabled?: boolean;
  showJoinAsGuest?: boolean;
  isDisabled?: boolean;
  courseId?: number;
  nextSession?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  showJoinNow = false, 
  joinNowEnabled = false,
  showJoinAsGuest = true,
  isDisabled = false,
  courseId,
  nextSession
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleViewClick = () => {
    if (courseId) {
      navigate(`/courses/${courseId}`);
    }
  };

  // Check if Join Now button should be displayed based on session timing
  const shouldShowJoinNow = () => {
    if (!nextSession) return false;
    
    const now = new Date();
    const sessionDate = new Date(nextSession);
    const timeDifference = sessionDate.getTime() - now.getTime();
    const minutesDifference = timeDifference / (1000 * 60);
    
    // Show Join Now button from 15 minutes before to 10 minutes after session start
    return minutesDifference <= 15 && minutesDifference >= -10;
  };

  const displayJoinNow = showJoinNow && shouldShowJoinNow();

  return (
    <div className="flex flex-wrap gap-2">
      {displayJoinNow && (
        <Button 
          size="sm" 
          className={`flex items-center gap-1 border-2 ${
            joinNowEnabled && !isDisabled ? 
              'bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg border-red-600 animate-flash' : 
              ''
          }`}
          disabled={!joinNowEnabled || isDisabled}
        >
          Join Now
        </Button>
      )}
      {showJoinAsGuest && (
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 border-2"
          disabled={isDisabled}
        >
          <UserPlus className="h-3 w-3" />
          Join as Guest
        </Button>
      )}
      <Button 
        variant="secondary" 
        size="sm" 
        className="flex items-center gap-1"
        disabled={isDisabled}
        onClick={handleViewClick}
      >
        <Eye className="h-3 w-3" />
        View
      </Button>
      <Button 
        size="sm" 
        className={`${theme.designSystem === 'material' ? 'rounded-none uppercase text-sm font-medium' : theme.designSystem === 'human' ? 'rounded-lg' : theme.designSystem === 'fluent' ? 'rounded-sm' : ''}`}
        disabled={isDisabled}
      >
        Enroll Now
      </Button>
      <Button 
        variant="secondary" 
        size="sm" 
        className="px-2"
        disabled={isDisabled}
      >
        <Heart className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default ActionButtons;
