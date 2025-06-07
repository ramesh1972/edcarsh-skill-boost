
import React, { useState } from 'react';
import { Course } from '@/types';
import { ViewModeSelector } from './MapView/components/ViewModeSelector';
import { MapLegend } from './MapView/components/MapLegend';
import { ZoomControls } from './MapView/components/ZoomControls';
import { MapItemCard } from './MapView/components/MapItemCard';
import { MapTooltip } from './MapView/components/MapTooltip';
import { useMapData } from './MapView/hooks/useMapData';
import { ViewMode } from './MapView/types';

interface PopularCoursesMapViewProps {
  courses: Course[];
}

const PopularCoursesMapView: React.FC<PopularCoursesMapViewProps> = ({ courses }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('courses');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const { data: mapData, ranges } = useMapData(courses, viewMode, zoomLevel);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(3, prev + 0.2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0.3, prev - 0.2));
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <div className="w-full space-y-6">
      <ViewModeSelector viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      
      <div className="flex justify-between items-start">
        <ZoomControls 
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      </div>

      <MapLegend ranges={ranges} />

      <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ transform: `scale(${zoomLevel})` }}>
            {mapData.map((item) => (
              <div
                key={item.id}
                className="absolute group"
                style={{
                  left: `${400 + item.x}px`,
                  top: `${300 + item.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <MapItemCard item={item} viewMode={viewMode} />
                {hoveredItem === item.id && (
                  <MapTooltip item={item} viewMode={viewMode} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center point indicator */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
      </div>

      <div className="text-sm text-muted-foreground text-center">
        {mapData.length} {viewMode === 'courses' ? 'courses' : viewMode} displayed
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
