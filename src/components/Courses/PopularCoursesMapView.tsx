
import React, { useState, useMemo } from 'react';
import { Course } from '@/types';

interface PopularCoursesMapViewProps {
  courses: Course[];
}

const PopularCoursesMapView: React.FC<PopularCoursesMapViewProps> = ({ courses }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  // Process courses for map display
  const mapData = useMemo(() => {
    const sortedCourses = [...courses].sort((a, b) => b.students - a.students);
    const maxStudents = Math.max(...courses.map(c => c.students));
    const minStudents = Math.min(...courses.map(c => c.students));
    
    return sortedCourses.map((course, index) => {
      // Position courses in a spiral pattern
      const angle = (index * 0.5) % (2 * Math.PI);
      const radius = 50 + (index * 20);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      // Calculate size based on student count
      const studentRatio = (course.students - minStudents) / (maxStudents - minStudents) || 0;
      const size = 20 + (studentRatio * 30);
      
      // Color based on industry
      const colors = {
        'Software': '#3b82f6',
        'Marketing': '#10b981',
        'Finance': '#f59e0b',
        'Healthcare': '#ef4444',
        'Education': '#8b5cf6'
      };
      
      return {
        ...course,
        x,
        y,
        size,
        color: colors[course.industry as keyof typeof colors] || '#6b7280'
      };
    });
  }, [courses]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(3, prev + 0.2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0.5, prev - 0.2));
  };

  return (
    <div className="w-full space-y-6">
      {/* Zoom Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Zoom Out
          </button>
          <span className="text-sm text-gray-600">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Zoom In
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {courses.length} courses displayed
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500"></div>
          <span>Software</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500"></div>
          <span>Marketing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500"></div>
          <span>Finance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          <span>Healthcare</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500"></div>
          <span>Education</span>
        </div>
      </div>

      {/* Map View */}
      <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ transform: `scale(${zoomLevel})` }}>
            {mapData.map((course) => (
              <div
                key={course.id}
                className="absolute group cursor-pointer"
                style={{
                  left: `${400 + course.x}px`,
                  top: `${300 + course.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredCourse(course.id.toString())}
                onMouseLeave={() => setHoveredCourse(null)}
              >
                {/* Course bubble */}
                <div
                  className="rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    width: `${course.size}px`,
                    height: `${course.size}px`,
                    backgroundColor: course.color,
                  }}
                >
                  {course.students}
                </div>
                
                {/* Tooltip */}
                {hoveredCourse === course.id.toString() && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                    <div className="font-semibold">{course.title}</div>
                    <div>{course.students} students • {course.industry}</div>
                    <div>{course.subject} • {course.price}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center point indicator */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
