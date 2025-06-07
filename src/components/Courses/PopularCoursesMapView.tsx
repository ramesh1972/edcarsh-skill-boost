import React, { useState, useRef, useEffect } from 'react';
import { Course } from '@/types';
import { getInstructorById } from '@/data/instructors';
import { ViewModeSelector } from '../common/ViewModeSelector';
import { MapPin } from 'lucide-react';

interface PopularCoursesMapViewProps {
  courses: Course[];
}

const PopularCoursesMapView: React.FC<PopularCoursesMapViewProps> = ({ courses }) => {
  const [viewMode, setViewMode] = useState<'geo' | 'network'>('geo');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipContent, setTooltipContent] = useState<{ title: string; instructor: string; } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleViewModeChange = (mode: 'geo' | 'network') => {
    setViewMode(mode);
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setTransform(prev => ({
      ...prev,
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;

    setTransform(prev => ({
      ...prev,
      scale: Math.max(0.5, Math.min(2, prev.scale * scaleFactor)),
    }));
  };

  const handleNodeHover = (e: React.MouseEvent<SVGCircleElement>, course: Course) => {
    const instructor = getInstructorById(course.instructorId);
    if (!instructor) return;

    setTooltipContent({
      title: course.title,
      instructor: instructor.name,
    });

    const svgRect = svgRef.current?.getBoundingClientRect();
    if (!svgRect) return;

    setTooltipPosition({
      x: e.clientX - svgRect.left + 10,
      y: e.clientY - svgRect.top - 20,
    });

    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '1';
      tooltipRef.current.style.visibility = 'visible';
    }
  };

  const handleNodeLeave = () => {
    setTooltipContent(null);
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '0';
      tooltipRef.current.style.visibility = 'hidden';
    }
  };

  const processedCourses = courses.map(course => {
    const instructor = getInstructorById(course.instructorId);
    return {
      ...course,
      instructor: instructor || {
        id: 0,
        name: 'Unknown Instructor',
        image: '/placeholder.svg',
        experience: '',
        specialty: '',
        city: '',
        country: '',
        flag: '',
        description: ''
      }
    };
  });

  return (
    <div className="w-full h-[600px] relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden">
      <ViewModeSelector viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      
      <div className="absolute inset-0 pt-16">
        <svg
          ref={svgRef}
          className="w-full h-full cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40H40 0ZM0 0L40 40M0 40L40 0" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Course nodes */}
          {processedCourses.map((course, index) => {
            const angle = (index / processedCourses.length) * 2 * Math.PI;
            const radius = 200;
            const nodeX = 300 + radius * Math.cos(angle);
            const nodeY = 300 + radius * Math.sin(angle);
            
            return (
              <g key={course.id} transform={`translate(${nodeX}, ${nodeY})`}>
                <circle
                  cx={0}
                  cy={0}
                  r={10}
                  fill="rgba(255, 255, 255, 0.8)"
                  stroke="rgba(0, 0, 0, 0.7)"
                  strokeWidth="2"
                  style={{
                    transform: `scale(${transform.scale}) translate(${transform.x}px, ${transform.y}px)`,
                    transition: 'transform 0.3s ease-out',
                  }}
                  onMouseEnter={(e) => handleNodeHover(e, course)}
                  onMouseLeave={handleNodeLeave}
                />
              </g>
            );
          })}
          
          {/* Connections rendering */}
        </svg>
        
        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className="absolute z-10 bg-white border border-gray-300 rounded shadow-md p-2 text-sm opacity-0 transition-opacity duration-200 pointer-events-none"
          style={{
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            visibility: 'hidden',
          }}
        >
          {tooltipContent && (
            <>
              <div className="font-semibold">{tooltipContent.title}</div>
              <div>Instructor: {tooltipContent.instructor}</div>
            </>
          )}
        </div>
        
        {/* Zoom Controls */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-70 rounded-md shadow-md p-2 flex flex-col gap-2">
          <button
            className="p-1 rounded-full hover:bg-gray-200"
            onClick={() => setTransform(prev => ({ ...prev, scale: Math.min(2, prev.scale * 1.1) }))}
          >
            +
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-200"
            onClick={() => setTransform(prev => ({ ...prev, scale: Math.max(0.5, prev.scale * 0.9) }))}
          >
            -
          </button>
        </div>
        
        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-70 rounded-md shadow-md p-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Course Location</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
