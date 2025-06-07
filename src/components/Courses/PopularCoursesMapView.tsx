
import React, { useState, useMemo } from 'react';
import { Course } from '@/types';
import { ViewModeSelector } from './MapView/components/ViewModeSelector';
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

    // Create ranges based on student counts
    const studentCounts = items.map(item => item.students).sort((a, b) => b - a);
    const max = studentCounts[0] || 0;
    const min = studentCounts[studentCounts.length - 1] || 0;
    
    const ranges = [
      { min: Math.ceil(max * 0.75), max: max, label: 'High', radius: 180 },
      { min: Math.ceil(max * 0.5), max: Math.ceil(max * 0.75) - 1, label: 'Medium-High', radius: 280 },
      { min: Math.ceil(max * 0.25), max: Math.ceil(max * 0.5) - 1, label: 'Medium', radius: 380 },
      { min: min, max: Math.ceil(max * 0.25) - 1, label: 'Low', radius: 480 }
    ];

    // Assign items to ranges and calculate positions
    const itemsWithPositions = items.map((item, index) => {
      const range = ranges.find(r => item.students >= r.min && item.students <= r.max) || ranges[ranges.length - 1];
      const rangeIndex = ranges.indexOf(range);
      
      // Items in the same range
      const itemsInRange = items.filter(i => {
        const r = ranges.find(rng => i.students >= rng.min && i.students <= rng.max) || ranges[ranges.length - 1];
        return r === range;
      });
      
      const angleStep = (2 * Math.PI) / itemsInRange.length;
      const itemIndexInRange = itemsInRange.indexOf(item);
      const angle = angleStep * itemIndexInRange;
      
      const x = Math.cos(angle) * range.radius;
      const y = Math.sin(angle) * range.radius;
      
      return {
        ...item,
        x,
        y,
        range: range.label,
        color: COLORS[rangeIndex % COLORS.length],
        radius: range.radius
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
      
      <div className="relative w-full h-[1000px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border">
        <svg width="100%" height="100%" viewBox="-600 -500 1200 1000" className="absolute inset-0">
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
          {processedData.items.map((item, index) => (
            <g key={index}>
              <circle
                cx={item.x}
                cy={item.y}
                r={Math.max(35, Math.min(55, item.students / 2.5))}
                fill={item.color}
                stroke="white"
                strokeWidth="3"
                className="cursor-pointer transition-all duration-200 hover:opacity-80"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                opacity="0.9"
              />
              <text
                x={item.x}
                y={item.y - 8}
                textAnchor="middle"
                className="font-bold fill-white pointer-events-none"
                style={{ fontSize: '12px' }}
              >
                {item.name.length > 18 ? `${item.name.substring(0, 15)}...` : item.name}
              </text>
              <text
                x={item.x}
                y={item.y + 12}
                textAnchor="middle"
                className="font-semibold fill-white pointer-events-none"
                style={{ fontSize: '11px' }}
              >
                {item.students.toLocaleString()}
              </text>
            </g>
          ))}
        </svg>
        
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground capitalize">
              {viewMode === 'courses' ? 'Courses' : viewMode}
            </div>
            <div className="text-lg text-muted-foreground">
              {processedData.items.length} items
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
              {range.label} ({range.min}-{range.max === processedData.ranges[0].max ? `${range.max}+` : range.max})
            </span>
          </div>
        ))}
      </div>

      <div className="text-base text-muted-foreground text-center">
        {processedData.items.length} {viewMode === 'courses' ? 'courses' : viewMode === 'industry' ? 'industries' : viewMode === 'subject' ? 'subjects' : 'topics'} displayed in concentric circles
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
