
import React, { useState, useMemo } from 'react';
import { Course } from '@/types';
import { ViewModeSelector } from './MapView/components/ViewModeSelector';
import { MapLegend } from './MapView/components/MapLegend';
import { ZoomControls } from './MapView/components/ZoomControls';
import { MapItemCard } from './MapView/components/MapItemCard';
import { MapTooltip } from './MapView/components/MapTooltip';
import { ViewMode } from './MapView/types';
import { calculateDynamicRanges } from './MapView/utils/rangeCalculator';

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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const { mapData, ranges } = useMemo(() => {
    if (!courses.length) return { mapData: [], ranges: [] };

    // Get student values and calculate ranges
    const studentValues = courses.map(course => course.students);
    const ranges = calculateDynamicRanges(studentValues, 9);

    // Process courses into map data
    const processedData = courses.map((course) => {
      // Find which range this course belongs to
      const rangeIndex = ranges.findIndex((range, index) => {
        if (index === 0) {
          // Highest range (center)
          return course.students >= range.min;
        } else {
          return course.students >= range.min && course.students <= range.max;
        }
      });

      const validRangeIndex = rangeIndex !== -1 ? rangeIndex : ranges.length - 1;

      return {
        ...course,
        rangeIndex: validRangeIndex,
        range: ranges[validRangeIndex]
      };
    });

    // Group courses by range
    const coursesByRange = ranges.map((_, index) => 
      processedData.filter(course => course.rangeIndex === index)
    );

    // Position courses in concentric circles
    const mapData = coursesByRange.flatMap((rangeCourses, rangeIndex) => {
      if (rangeCourses.length === 0) return [];

      return rangeCourses.map((course, courseIndex) => {
        let x = 0, y = 0;

        if (rangeIndex === 0 && rangeCourses.length === 1) {
          // Single course in center range stays at center
          x = 0;
          y = 0;
        } else {
          // Calculate position in circle
          const angle = (courseIndex / rangeCourses.length) * 2 * Math.PI;
          const baseRadius = rangeIndex === 0 ? 40 : 60 + (rangeIndex * 50);
          const radius = baseRadius * zoomLevel;
          
          x = Math.cos(angle) * radius;
          y = Math.sin(angle) * radius;
        }

        // Calculate font size based on student count
        const maxStudents = Math.max(...studentValues);
        const minStudents = Math.min(...studentValues);
        const studentRatio = (course.students - minStudents) / (maxStudents - minStudents) || 0;
        const fontSize = 8 + (studentRatio * 6);

        return {
          id: course.id.toString(),
          title: course.title,
          students: course.students,
          industry: course.industry,
          subject: course.subject,
          topics: course.topics,
          x,
          y,
          fontSize,
          color: COLORS[rangeIndex] || '#6b7280',
          studentRatio,
          range: ranges[rangeIndex]?.label || ''
        };
      });
    });

    return { mapData, ranges };
  }, [courses, zoomLevel]);

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
          <div className="relative">
            {mapData.map((item) => (
              <div
                key={item.id}
                className="absolute group"
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
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
        {mapData.length} courses displayed
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
