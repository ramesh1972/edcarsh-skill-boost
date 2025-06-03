
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, Eye, UserPlus } from 'lucide-react';

interface ActionButtonsProps {
  showJoinNow?: boolean;
  joinNowEnabled?: boolean;
  showJoinAsGuest?: boolean;
  isDisabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  showJoinNow = false, 
  joinNowEnabled = false,
  showJoinAsGuest = false,
  isDisabled = false
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex gap-2 justify-between items-center">
      <div className="flex gap-2">
        {showJoinNow && (
          <Button 
            size="sm" 
            className="flex items-center gap-1 border-2"
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
      </div>
      <div className="flex gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          className="flex items-center gap-1"
          disabled={isDisabled}
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
    </div>
  );
};

export default ActionButtons;
