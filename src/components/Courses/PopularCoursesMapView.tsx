
import React, { useState } from 'react';
import { Course } from '@/types';
import { ViewMode } from './MapView/types';
import { useMapData } from './MapView/hooks/useMapData';
import { ViewModeSelector } from './MapView/components/ViewModeSelector';
import { MapLegend } from './MapView/components/MapLegend';
import { ZoomControls } from './MapView/components/ZoomControls';
import { MapItemCard } from './MapView/components/MapItemCard';
import { MapTooltip } from './MapView/components/MapTooltip';

interface PopularCoursesMapViewProps {
  courses: Course[];
}

const COLORS = [
  '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
  '#059669', '#0891b2', '#0284c7', '#3b82f6'
];

const PopularCoursesMapView: React.FC<PopularCoursesMapViewProps> = ({ courses }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('courses');
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.3));
  };

  const mapData = useMapData(courses, viewMode, zoomLevel);

  const getTitle = () => {
    switch (viewMode) {
      case 'courses': return 'Popular Courses Map';
      case 'industry': return 'Industry Overview Map';
      case 'subject': return 'Subject Distribution Map';
      case 'topic': return 'Topic Categories Map';
      default: return 'Courses Map';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {getTitle()}
      </h2>

      <ViewModeSelector viewMode={viewMode} onViewModeChange={setViewMode} />
      
      <MapLegend ranges={mapData.ranges} />

      <ZoomControls 
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
      
      {/* Radial Map */}
      <div className="flex justify-center items-center w-full h-full flex-1 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden" style={{border: '6px solid gray', borderRadius: '6px'}}>
        <div 
          className="relative inset-0 transition-transform duration-500 ease-out"
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
        >
          <div className="relative w-full h-full min-h-[1000px]">
            {/* Center point */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full z-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-gray-800 mt-6 whitespace-nowrap">
              Center
            </div>
            
            {/* Dynamic concentric circles */}
            {mapData.ranges && mapData.ranges.map((_, index) => {
              const baseDistance = viewMode === 'courses' ? 120 + (index * 80) :
                                  viewMode === 'industry' ? 150 + (index * 60) :
                                  viewMode === 'subject' ? 120 + (index * 50) :
                                  100 + (index * 40);
              const diameter = (baseDistance * 2) * zoomLevel;
              
              return (
                <div 
                  key={index}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full opacity-30"
                  style={{
                    width: `${diameter}px`,
                    height: `${diameter}px`,
                    borderColor: COLORS[index] || '#6b7280'
                  }}
                ></div>
              );
            })}
            
            {/* Map items positioned radially */}
            {mapData.data.map((item) => (
              <div
                key={item.id}
                className="absolute cursor-pointer hover:opacity-80 transition-opacity group"
                style={{
                  left: `calc(50% + ${item.x}px)`,
                  top: `calc(50% + ${item.y}px)`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: `${item.fontSize}px`,
                  color: item.color,
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                  maxWidth: '100px',
                  height: 'auto'
                }}
              >
                <MapItemCard item={item} viewMode={viewMode} />
                <MapTooltip item={item} viewMode={viewMode} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Summary stats */}
      <div className="mt-6 text-center text-sm text-gray-600">
        {viewMode === 'courses' && (
          <>
            <p>Total Courses: {courses.length}</p>
            <p>Total Students: {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}</p>
            <p>Average Students per Course: {Math.round(courses.reduce((sum, course) => sum + course.students, 0) / courses.length)}</p>
          </>
        )}
        {viewMode === 'industry' && (
          <>
            <p>Total Students: {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}</p>
          </>
        )}
        {viewMode === 'subject' && (
          <>
            <p>Total Subjects: {mapData.data.length}</p>
            <p>Total Students: {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
