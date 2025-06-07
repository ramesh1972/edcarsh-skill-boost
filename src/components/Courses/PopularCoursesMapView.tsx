import React, { useState, useMemo } from 'react';
import { Course } from '@/types';
import { ViewModeSelector } from './MapView/components/ViewModeSelector';
import { ZoomControls } from './MapView/components/ZoomControls';
import { ViewMode } from './MapView/types';
import { getIndustryNameById, getSubjectNameById } from '@/data/masterData';

interface PopularCoursesMapViewProps {
  courses: Course[];
}

const COLORS = [
  '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
  '#059669', '#0891b2', '#0284c7', '#3b82f6', '#7c3aed',
  '#be185d', '#374151', '#1f2937', '#0f172a'
];

const PopularCoursesMapView: React.FC<PopularCoursesMapViewProps> = ({ courses }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('industry');
  const [hoveredItem, setHoveredItem] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Helper function to wrap text
  const wrapText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return [text];
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    
    return lines.slice(0, 3); // Max 3 lines for better wrapping
  };

  // Function to create dynamic ranges based on data distribution
  const createDynamicRanges = (studentCounts: number[]) => {
    if (studentCounts.length === 0) return [];
    
    const sortedCounts = [...studentCounts].sort((a, b) => b - a);
    const max = sortedCounts[0];
    const min = sortedCounts[sortedCounts.length - 1];
    
    if (max === min) {
      return [{ min, max, label: `${min}`, radius: 450 }];
    }
    
    // Determine number of ranges based on data spread
    const dataRange = max - min;
    const uniqueValues = new Set(sortedCounts).size;
    const rangeCount = Math.min(Math.max(5, Math.min(uniqueValues, 7)), 7);
    
    const ranges = [];
    const step = dataRange / rangeCount;
    const baseRadius = 250;
    const radiusIncrement = 180;
    
    for (let i = 0; i < rangeCount; i++) {
      const rangeMin = i === rangeCount - 1 ? min : Math.ceil(max - (step * (i + 1)));
      const rangeMax = i === 0 ? max : Math.ceil(max - (step * i));
      
      let label;
      if (i === 0) {
        label = `${rangeMin}+`;
      } else if (rangeMin === rangeMax) {
        label = `${rangeMin}`;
      } else {
        label = `${rangeMin}-${rangeMax}`;
      }
      
      ranges.push({
        min: rangeMin,
        max: rangeMax,
        label,
        radius: baseRadius + (i * radiusIncrement)
      });
    }
    
    return ranges;
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.3));
  };

  const processedData = useMemo(() => {
    if (!courses.length) return { ranges: [], items: [] };

    let items: any[] = [];

    if (viewMode === 'industry') {
      const industryMap = new Map();
      
      courses.forEach(course => {
        const industryName = getIndustryNameById(course.industryId);
        if (!industryMap.has(industryName)) {
          industryMap.set(industryName, 0);
        }
        industryMap.set(industryName, industryMap.get(industryName) + course.students);
      });

      items = Array.from(industryMap.entries()).map(([name, students]) => ({
        name,
        students,
        type: 'industry'
      }));
    } else if (viewMode === 'subject') {
      const subjectMap = new Map();
      
      courses.forEach(course => {
        const subjectName = getSubjectNameById(course.industryId, course.subjectId);
        const industryName = getIndustryNameById(course.industryId);
        const fullName = `${subjectName} (${industryName})`;
        
        if (!subjectMap.has(fullName)) {
          subjectMap.set(fullName, 0);
        }
        subjectMap.set(fullName, subjectMap.get(fullName) + course.students);
      });

      items = Array.from(subjectMap.entries()).map(([name, students]) => ({
        name,
        students,
        type: 'subject'
      }));
    } else if (viewMode === 'topic') {
      const topicMap = new Map();
      
      courses.forEach(course => {
        course.topics?.forEach(topic => {
          if (!topicMap.has(topic)) {
            topicMap.set(topic, 0);
          }
          topicMap.set(topic, topicMap.get(topic) + course.students);
        });
      });

      items = Array.from(topicMap.entries()).map(([name, students]) => ({
        name,
        students,
        type: 'topic'
      }));
    } else if (viewMode === 'courses') {
      items = courses.map(course => ({
        name: course.title,
        students: course.students,
        type: 'course'
      }));
    }

    // Create dynamic ranges based on student counts
    const studentCounts = items.map(item => item.students);
    const ranges = createDynamicRanges(studentCounts);

    // Find global min and max for proportional circle sizing
    const globalMax = Math.max(...studentCounts);
    const globalMin = Math.min(...studentCounts);

    // Assign items to ranges and calculate positions
    const itemsWithPositions = items.map((item, index) => {
      const range = ranges.find(r => {
        if (ranges.indexOf(r) === 0) {
          return item.students >= r.min;
        } else {
          return item.students >= r.min && item.students <= r.max;
        }
      }) || ranges[ranges.length - 1];
      
      const rangeIndex = ranges.indexOf(range);
      
      // Items in the same range
      const itemsInRange = items.filter(i => {
        const r = ranges.find(rng => {
          if (ranges.indexOf(rng) === 0) {
            return i.students >= rng.min;
          } else {
            return i.students >= rng.min && i.students <= rng.max;
          }
        }) || ranges[ranges.length - 1];
        return r === range;
      });
      
      const angleStep = (2 * Math.PI) / itemsInRange.length;
      const itemIndexInRange = itemsInRange.indexOf(item);
      const angle = angleStep * itemIndexInRange;
      
      const x = Math.cos(angle) * range.radius;
      const y = Math.sin(angle) * range.radius;
      
      // Calculate circle radius based on student count proportionally across all data
      const studentRatio = globalMax === globalMin ? 1 : (item.students - globalMin) / (globalMax - globalMin);
      const minRadius = 50;
      const maxRadius = 140;
      const circleRadius = minRadius + (studentRatio * (maxRadius - minRadius));
      
      // Calculate font sizes based on circle radius
      const titleFontSize = Math.max(10, Math.min(18, (circleRadius / maxRadius) * 14 + 8));
      const countFontSize = Math.max(12, Math.min(20, (circleRadius / maxRadius) * 16 + 10));
      
      // Assign color based on range for different colors per range
      const itemColor = COLORS[rangeIndex % COLORS.length];
      
      return {
        ...item,
        x,
        y,
        range: range.label,
        color: itemColor,
        radius: range.radius,
        circleRadius,
        titleFontSize,
        countFontSize
      };
    });

    return { ranges, items: itemsWithPositions };
  }, [courses, viewMode]);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <div className="w-full space-y-6">
      <ViewModeSelector viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      
      <div className="relative w-full h-[1600px] rounded-lg overflow-hidden border">
        {/* Zoom Controls positioned in top right corner */}
        <div className="absolute top-4 right-4 z-10">
          <ZoomControls zoomLevel={zoomLevel} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </div>
        
        {/* Funky Grid Background with Radial Grid */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="opacity-30">
            <defs>
              <pattern id="funkyGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/30"/>
                <circle cx="20" cy="20" r="2" fill="currentColor" className="text-primary/20"/>
                <path d="M 10 10 L 30 30 M 30 10 L 10 30" stroke="currentColor" strokeWidth="0.5" className="text-accent/30"/>
              </pattern>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-secondary/40"/>
              </pattern>
              <radialGradient id="radialGrid" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="transparent"/>
                <stop offset="20%" stopColor="currentColor" stopOpacity="0.15"/>
                <stop offset="40%" stopColor="transparent"/>
                <stop offset="60%" stopColor="currentColor" stopOpacity="0.15"/>
                <stop offset="80%" stopColor="transparent"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.15"/>
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#funkyGrid)"/>
            <rect width="100%" height="100%" fill="url(#dots)"/>
            {/* Radial grid circles */}
            <g className="text-gray-400">
              <circle cx="50%" cy="50%" r="150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" opacity="0.6"/>
              <circle cx="50%" cy="50%" r="300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" opacity="0.5"/>
              <circle cx="50%" cy="50%" r="450" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" opacity="0.4"/>
              <circle cx="50%" cy="50%" r="600" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" opacity="0.3"/>
              <circle cx="50%" cy="50%" r="750" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" opacity="0.2"/>
              {/* Radial lines */}
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4"/>
              <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4"/>
              <line x1="14.6%" y1="14.6%" x2="85.4%" y2="85.4%" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" opacity="0.3"/>
              <line x1="85.4%" y1="14.6%" x2="14.6%" y2="85.4%" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" opacity="0.3"/>
            </g>
            <rect width="100%" height="100%" fill="url(#radialGrid)"/>
          </svg>
        </div>
        
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`${-1000 * zoomLevel} ${-800 * zoomLevel} ${2000 * zoomLevel} ${1600 * zoomLevel}`} 
          className="absolute inset-0"
        >
          {/* Range circles */}
          {processedData.ranges.map((range, index) => (
            <circle
              key={index}
              cx="0"
              cy="0"
              r={range.radius}
              fill="none"
              stroke="rgba(156, 163, 175, 0.3)"
              strokeWidth="2"
              strokeDasharray="8,8"
            />
          ))}
          
          {/* Data items */}
          {processedData.items.map((item, index) => {
            const wrappedLines = wrapText(item.name, 14);
            
            return (
              <g key={index}>
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={item.circleRadius}
                  fill={item.color}
                  stroke="white"
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  opacity="0.9"
                />
                
                {/* Multi-line title */}
                {wrappedLines.map((line, lineIndex) => (
                  <text
                    key={lineIndex}
                    x={item.x}
                    y={item.y - 12 + (lineIndex * (item.titleFontSize * 1.2))}
                    textAnchor="middle"
                    className="font-bold fill-white pointer-events-none"
                    style={{ fontSize: `${item.titleFontSize}px` }}
                  >
                    {line}
                  </text>
                ))}
                
                {/* Student count - positioned clearly below title */}
                <text
                  x={item.x}
                  y={item.y + (wrappedLines.length * (item.titleFontSize * 0.6)) + 15}
                  textAnchor="middle"
                  className="font-semibold fill-white pointer-events-none"
                  style={{ fontSize: `${item.countFontSize}px` }}
                >
                  {item.students.toLocaleString()}
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground capitalize">
              {viewMode === 'courses' ? 'Courses' : viewMode}
            </div>
            <div className="text-lg text-muted-foreground">
              {processedData.items.length} items • {processedData.ranges.length} ranges
            </div>
          </div>
        </div>
        
        {/* Hover tooltip */}
        {hoveredItem && (
          <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-sm">
            <p className="font-bold text-lg">{hoveredItem.name}</p>
            <p className="text-base text-muted-foreground">
              {hoveredItem.students.toLocaleString()} students
            </p>
            <p className="text-sm text-muted-foreground">
              Range: {hoveredItem.range}
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6">
        {processedData.ranges.map((range, index) => (
          <div key={index} className="flex items-center gap-3">
            <div 
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-base text-muted-foreground">
              {range.label} students
            </span>
          </div>
        ))}
      </div>

      <div className="text-base text-muted-foreground text-center">
        {processedData.items.length} {viewMode === 'courses' ? 'courses' : viewMode === 'industry' ? 'industries' : viewMode === 'subject' ? 'subjects' : 'topics'} displayed in {processedData.ranges.length} concentric ranges
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
