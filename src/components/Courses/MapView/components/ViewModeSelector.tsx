
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ViewMode } from '../types';

interface ViewModeSelectorProps {
  viewMode: ViewMode;
  onViewModeChange: (value: ViewMode) => void;
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="mb-6 p-4 bg-card rounded-lg border">
      <h3 className="text-sm font-medium mb-3">View Mode:</h3>
      <RadioGroup 
        value={viewMode} 
        onValueChange={(value: ViewMode) => onViewModeChange(value)} 
        className="flex flex-wrap gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="industry" id="industry" />
          <Label htmlFor="industry" className="text-sm cursor-pointer">By Industry</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="subject" id="subject" />
          <Label htmlFor="subject" className="text-sm cursor-pointer">By Subject</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="topic" id="topic" />
          <Label htmlFor="topic" className="text-sm cursor-pointer">By Topic</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="courses" id="courses" />
          <Label htmlFor="courses" className="text-sm cursor-pointer">Individual Courses</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
