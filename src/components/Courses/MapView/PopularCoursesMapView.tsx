import React, { useState, useMemo } from 'react';
import { ViewModeSelector } from './components/ViewModeSelector';
import { ZoomControls } from './components/ZoomControls';
import { ViewMode } from './types';
import { getInstructor, getUserName } from '@/adapters/userDataAdapter';
import { Course, CourseSchedule, CourseStats, DeepCourseInfo, Instructor } from '@/types';
import { getNextNCourseSchedules, getStatsForCourse, getStatsForCourses, getStatsForIndustry, getStatsForSubject } from '@/adapters/coursesDataAdapter';
import { getSubjectById, getIndustryById } from '@/adapters/industrySubjectAdpator';

interface PopularCoursesMapViewProps {
  deepCourseInfos: DeepCourseInfo[];
}

const COLORS = [
  '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d',
  '#059669', '#0891b2', '#0284c7', '#3b82f6', '#7c3aed',
  '#be185d', '#374151', '#1f2937', '#0f172a'
];

const PopularCoursesMapView: React.FC<PopularCoursesMapViewProps> = ({ deepCourseInfos }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('industry');
  type MapViewItem =
    | { name: string; students: number; type: 'industry' | 'subject' | 'tag'; deepCourseInfos: DeepCourseInfo[] }
    | { name: string; students: number; type: 'course'; course: DeepCourseInfo }
    | null;

  const [hoveredItem, setHoveredItem] = useState<MapViewItem>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);


  // Helper function to wrap text with word breaking
  const wrapText = (text: string, maxLength: number, maxLines: number = 3) => {
    if (text.length <= maxLength) return [text];

    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length <= maxLength) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          if (lines.length >= maxLines - 1) {
            // Add ellipsis to the last line if we're at max lines
            const remainingWords = words.slice(words.indexOf(word));
            const lastLine = remainingWords.join(' ');
            if (lastLine.length > maxLength) {
              lines.push(lastLine.substring(0, maxLength - 3) + '...');
            } else {
              lines.push(lastLine);
            }
            break;
          }
        }
        currentLine = word;
      }
    }
    if (currentLine && lines.length < maxLines) lines.push(currentLine);

    return lines.slice(0, maxLines);
  };

  // Function to create dynamic ranges based on data distribution
  const createDynamicRanges = (studentCounts: number[]) => {
    if (studentCounts.length === 0) return [];

    const sortedCounts = [...studentCounts].sort((a, b) => b - a);
    const max = sortedCounts[0];
    const min = sortedCounts[sortedCounts.length - 1];

    if (max === min) {
      return [{ min, max, label: `${min}`, radius: 200 }];
    }

    // Determine number of ranges based on data spread
    const dataRange = max - min;
    const uniqueValues = new Set(sortedCounts).size;
    const rangeCount = Math.min(Math.max(5, Math.min(uniqueValues, 7)), 7);

    const ranges = [];
    const step = dataRange / rangeCount;
    const baseRadius = 120;
    const radiusIncrement = 100; // Increased spacing between ranges

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

  // Function to check if two circles overlap
  const circlesOverlap = (x1: number, y1: number, r1: number, x2: number, y2: number, r2: number) => {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance < (r1 + r2 + 20); // Added 20px buffer
  };

  // Function to find non-overlapping position
  const findNonOverlappingPosition = (
    baseAngle: number,
    radius: number,
    circleRadius: number,
    existingPositions: Array<{ x: number, y: number, radius: number }>
  ) => {
    const maxAttempts = 36; // Try every 10 degrees
    const angleStep = (2 * Math.PI) / maxAttempts;

    for (let i = 0; i < maxAttempts; i++) {
      const angle = baseAngle + (i * angleStep);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      let hasOverlap = false;
      for (const pos of existingPositions) {
        if (circlesOverlap(x, y, circleRadius, pos.x, pos.y, pos.radius)) {
          hasOverlap = true;
          break;
        }
      }

      if (!hasOverlap) {
        return { x, y };
      }
    }

    // If no non-overlapping position found, try slightly larger radius
    const newRadius = radius + 50;
    const x = Math.cos(baseAngle) * newRadius;
    const y = Math.sin(baseAngle) * newRadius;
    return { x, y };
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.3));
  };

  const processedData = useMemo(() => {
    if (!deepCourseInfos.length) return { ranges: [], items: [] };

    let items: MapViewItem[] = [];

    // ... keep existing code (viewMode processing logic)
    if (viewMode === 'industry') {
      const industryMap = new Map();

      deepCourseInfos.forEach(course => {
        if (course !== undefined && course !== null) {
          const industry = getIndustryById(course.industryId);
          const industryName = industry ? industry.name : 'Unknown Industry';
          if (!industryMap.has(industryName)) {
            industryMap.set(industryName, { students: 0, deepCourseInfos: [] });
          }

          const industryData = industryMap.get(industryName);

          const industryStats = getStatsForIndustry(course.industryId);
          industryData.students = industryStats.enrollments;
          industryData.deepCourseInfos.push(course);
          industryMap.set(industryName, industryData);
        }
      });

      items = Array.from(industryMap.entries()).map(([name, data]) => ({
        name,
        students: data.students,
        type: 'industry',
        deepCourseInfos: data.deepCourseInfos
      }));
    } else if (viewMode === 'subject') {
      const subjectMap = new Map();

      deepCourseInfos.forEach(course => {
        if (course !== undefined && course !== null) {
          const subject = getSubjectById(course.industryId, course.subjectId);
          const subjectName = subject ? subject.name : 'Unknown Subject';
          const industry = getIndustryById(course.industryId);
          const industryName = industry ? industry.name : 'Unknown Industry';
          const fullName = `${subjectName} (${industryName})`;

          if (!subjectMap.has(fullName)) {
            subjectMap.set(fullName, { students: 0, deepCourseInfos: [] });
          }
          const subjectData = subjectMap.get(fullName);

          const subjectStats = getStatsForSubject(course.subjectId);
          subjectData.students = subjectStats.enrollments;
          subjectData.deepCourseInfos.push(course);
          subjectMap.set(fullName, subjectData);
        }
      });

      items = Array.from(subjectMap.entries()).map(([name, data]) => ({
        name,
        students: data.students,
        type: 'subject',
        deepCourseInfos: data.deepCourseInfos
      }));
    } else if (viewMode === 'tag') {
      const topicMap = new Map();

      deepCourseInfos.forEach(course => {
        if (course !== undefined && course !== null) {
          course.tags?.forEach(tag => {
            if (!topicMap.has(tag)) {
              topicMap.set(tag, { students: 0, deepCourseInfos: [] });
            }
            const topicData = topicMap.get(tag);

            const courseStats = getStatsForCourse(course.id);
            topicData.students += courseStats.enrollments;
            topicData.deepCourseInfos.push(course);
            topicMap.set(tag, topicData);
          });
        }
      });

      items = Array.from(topicMap.entries()).map(([name, data]) => ({
        name,
        students: data.students,
        type: 'tag',
        deepCourseInfos: data.deepCourseInfos
      }));
    } else if (viewMode === 'courses') {

      items = deepCourseInfos.map(course => {
        if (course !== undefined && course !== null) {
          const courseStats = getStatsForCourse(course.id);

          return {
            name: course.title,
            students: courseStats.enrollments,
            type: 'course',
            course: course
          }
        }
        else
          return null;
      });
    }

    // Create dynamic ranges based on student counts
    const studentCounts = items.map(item => item != null ?item.students : 0);
    const ranges = createDynamicRanges(studentCounts);

    // Find global min and max for proportional circle sizing
    const globalMax = Math.max(...studentCounts);
    const globalMin = Math.min(...studentCounts);

    // Track positions to prevent overlaps
    const existingPositions: Array<{ x: number, y: number, radius: number }> = [];

    // Assign items to ranges and calculate positions
    const itemsWithPositions = items.map((item, index) => {
      if (item === null) {
        return null; // Skip null items
      }
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
        if (i === null) return false; // Skip null items
        const r = ranges.find(rng => {
          if (ranges.indexOf(rng) === 0) {
            return i.students >= rng.min;
          } else {
            return i.students >= rng.min && i.students <= rng.max;
          }
        }) || ranges[ranges.length - 1];
        return r === range;
      });

      const angleStep = (2 * Math.PI) / Math.max(itemsInRange.length, 1);
      const itemIndexInRange = itemsInRange.indexOf(item);
      const baseAngle = angleStep * itemIndexInRange;

      // Calculate circle radius based on student count proportionally across all data
      const studentRatio = globalMax === globalMin ? 1 : (item.students - globalMin) / (globalMax - globalMin);
      const minRadius = 25;
      const maxRadius = 60;
      const circleRadius = minRadius + (studentRatio * (maxRadius - minRadius));

      // Find non-overlapping position
      const position = findNonOverlappingPosition(baseAngle, range.radius, circleRadius, existingPositions);
      existingPositions.push({ x: position.x, y: position.y, radius: circleRadius });

      // Calculate font sizes based on circle radius
      const titleFontSize = Math.max(7, Math.min(12, (circleRadius / maxRadius) * 10 + 5));
      const countFontSize = Math.max(8, Math.min(14, (circleRadius / maxRadius) * 12 + 6));

      // Assign color based on item index for colorful variety
      const itemColor = COLORS[index % COLORS.length];

      return {
        ...item,
        x: position.x,
        y: position.y,
        range: range.label,
        color: itemColor,
        radius: range.radius,
        circleRadius,
        titleFontSize,
        countFontSize
      };
    });

    return { ranges, items: itemsWithPositions };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepCourseInfos, viewMode]);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleItemHover = (item: MapViewItem, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = (event.currentTarget as Element).closest('.relative')?.getBoundingClientRect();

    if (containerRect) {
      setTooltipPosition({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top
      });
    }

    setHoveredItem(item);
  };

  // ... keep existing code (getTooltipContent function)
  const getTooltipContent = (item: MapViewItem) => {
    if (
      viewMode === 'courses' &&
      item &&
      item.type === 'course' &&
      'course' in item &&
      item.course
    ) {
      const course: Course = item.course;
      const schedules: CourseSchedule[] = getNextNCourseSchedules(course.id, 1);
      const firstSchedule = schedules?.[0] || null;
      const instructor: Instructor = getInstructor(firstSchedule?.byInstructorId || course.ownerInstructorId) || null
      const courseStats: CourseStats = getStatsForCourse(course.id);

      const instructorName = instructor ? getUserName(instructor.userId) : "Unknown Instructor";

      const industry = getIndustryById(course.industryId);
      const subject = getSubjectById(course.industryId, course.subjectId);

      return (
        <div className="max-w-xs">
          <div className="font-bold text-base mb-2">{course.title}</div>
          <div className="space-y-1 text-sm">
            <div><span className="font-medium">Instructor:</span> {instructorName || 'TBA'}</div>
            <div><span className="font-medium">Price:</span> {firstSchedule?.price || 'Not Set'}</div>
            <div><span className="font-medium">Duration:</span> {course.durationHours} weeks</div>
            <div><span className="font-medium">Level:</span> {course.level}</div>
            <div><span className="font-medium">Students:</span> {courseStats.enrollments.toLocaleString()}</div>
            <div><span className="font-medium">Industry:</span> {industry ? industry.name : 'Unknown Industry'}</div>
            <div><span className="font-medium">Subject:</span> {subject ? subject.name : 'Unknown Subject'}</div>
            {course.tags && course.tags.length > 0 && (
              <div><span className="font-medium">Topics:</span> {course.tags.join(', ')}</div>
            )}
          </div>
        </div>
      );
    }

    if (item && 'deepCourseInfos' in item && item.deepCourseInfos && item.deepCourseInfos.length > 0) {
      const sampleCourses = item.deepCourseInfos.slice(0, 3);
      return (
        <div className="max-w-sm">
          <div className="font-bold text-base mb-2">{item.name}</div>
          <div className="text-sm mb-2">
            <span className="font-medium">Total Students:</span> {item.students.toLocaleString()}
          </div>
          <div className="text-sm mb-2">
            <span className="font-medium">Courses ({item.deepCourseInfos.length}):</span>
          </div>
          <div className="space-y-1 text-xs">
            {sampleCourses.map((course: DeepCourseInfo, index: number) => {
              const courseStats: CourseStats = getStatsForCourse(course.id);
              const schedules: CourseSchedule[] = getNextNCourseSchedules(course.id, 1);
              const firstSchedule = schedules?.[0] || null;
              return (
                <div key={course.id} className="border-l-2 border-primary/30 pl-2">
                  <div className="font-medium">{course.title}</div>
                  <div className="text-muted-foreground">
                    {courseStats.enrollments.toLocaleString()} students • {firstSchedule?.price || "Not Set"} • {course.durationHours} weeks
                  </div>
                </div>
              )
            })}
            {item.deepCourseInfos.length > 3 && (
              <div className="text-muted-foreground italic">...and {item.deepCourseInfos.length - 3} more deepCourseInfos</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-xs">
        <div className="font-bold text-base">{item.name}</div>
        <div className="text-sm">
          <span className="font-medium">Students:</span> {item.students.toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      <ViewModeSelector viewMode={viewMode} onViewModeChange={handleViewModeChange} />
{/* DeepCourseInfo count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {processedData.items.length} items • {processedData.ranges.length} ranges
        </div>

      <div className="relative w-full h-[1360px] rounded-lg overflow-hidden border">
        {/* Zoom Controls positioned in top right corner */}
        <div className="absolute top-4 right-4 z-10">
          <ZoomControls zoomLevel={zoomLevel} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </div>

        {/* Funky Grid Background */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="opacity-30">
            <defs>
              <pattern id="funkyGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
                <path d="M 10 10 L 30 30 M 30 10 L 10 30" stroke="currentColor" strokeWidth="0.5" className="text-accent/30" />
              </pattern>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-primary/50" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#funkyGrid)" />
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <svg
          width="100%"
          height="100%"
          viewBox={`${-700 * zoomLevel} ${-480 * zoomLevel} ${1400 * zoomLevel} ${960 * zoomLevel}`}
          className="absolute inset-0"
        >
          {/* Radial lines from center */}
          <g className="opacity-30">
            {Array.from({ length: 16 }, (_, i) => {
              const angle = (i * 22.5) * (Math.PI / 180); // 16 lines at 22.5° intervals
              const length = 800; // Line length
              const x2 = Math.cos(angle) * length;
              const y2 = Math.sin(angle) * length;

              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="8,4"
                  className="text-foreground/60"
                />
              );
            })}
          </g>

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
              className="text-foreground/60"
            />
          ))}

          {/* Data items */}
          {processedData.items.map((item, index) => {
            if (!item) return null; // Skip null items
            const wrappedLines = wrapText(item.name, 12, 2); // Max 12 chars per line, 2 lines max

            return (
              <g key={index}>
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={item.circleRadius}
                  fill={item.color}
                  stroke="white"
                  strokeWidth="4"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onMouseEnter={(e) => handleItemHover(item, e)}
                  onMouseLeave={() => setHoveredItem(null)}
                  opacity="0.9"
                />

                {/* Multi-line title with word breaking */}
                {wrappedLines.map((line, lineIndex) => (
                  <text
                    key={lineIndex}
                    x={item.x}
                    y={item.y - 6 + (lineIndex * (item.titleFontSize * 1.1))}
                    textAnchor="middle"
                    className="font-bold fill-white pointer-events-none"
                    style={{ fontSize: `${item.titleFontSize}px` }}
                  >
                    {line}
                  </text>
                ))}

                {/* Student count - positioned with proper spacing below title */}
                <text
                  x={item.x}
                  y={item.y + (wrappedLines.length * (item.titleFontSize * 0.6)) + 12}
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

        {/* Enhanced hover tooltip positioned next to circle */}
        {hoveredItem && (
          <div
            className="absolute bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-md z-50 pointer-events-none"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y - 10}px`,
              transform: 'translateX(-50%) translateY(-100%)'
            }}
          >
            {getTooltipContent(hoveredItem)}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-8">
        <div className="bg-white/80 dark:bg-gray-900/80 border border-primary/20 rounded-xl shadow-md px-6 py-4 min-w-[320px] max-w-xl w-full">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg font-semibold text-primary-700 dark:text-primary-300">Legend</span>
            <span className="text-xs text-muted-foreground">(Student count ranges)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {processedData.ranges.map((range, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-full border border-primary/30 shadow-sm"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-foreground font-medium">
                  {range.label}
                  <span className="text-xs text-muted-foreground ml-1">students</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-base text-muted-foreground text-center">
        {processedData.items.length} {viewMode === 'courses' ? 'deepCourseInfos' : viewMode === 'industry' ? 'industries' : viewMode === 'subject' ? 'subjects' : 'topics'} displayed in {processedData.ranges.length} concentric ranges
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
