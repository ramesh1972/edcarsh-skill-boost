
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ViewMode } from '../types';

interface ViewModeSelectorProps {
  viewMode: ViewMode;
  onViewModeChange: (value: ViewMode) => void;
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="mb-6 flex items-center gap-2 w-full justify-center">
      <ToggleGroup
        type="single"
        className="gap-2 bg-transparent !border-none !shadow-none items-center"
        value={viewMode}
        onValueChange={value => value && onViewModeChange(value as ViewMode)}
      >
        <ToggleGroupItem className="bg-secondary" value="industry" aria-label="By Industry">Industry</ToggleGroupItem>
        <ToggleGroupItem className="bg-secondary" value="subject" aria-label="By Subject">Subject</ToggleGroupItem>
        <ToggleGroupItem className="bg-secondary" value="courses" aria-label="Individual Courses">Courses</ToggleGroupItem>
        <ToggleGroupItem className="bg-secondary" value="topic" aria-label="By Topic">Topic</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
