
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({ zoomLevel, onZoomIn, onZoomOut }) => {
  return (
    <div className="mb-4 flex gap-2 items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.3}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <span className="text-sm text-muted-foreground min-w-[60px] text-center">
        {Math.round(zoomLevel * 100)}%
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomIn}
        disabled={zoomLevel >= 3}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
    </div>
  );
};
