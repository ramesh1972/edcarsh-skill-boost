import React, { useMemo, useState } from 'react';
import { Course } from '@/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { getAllIndustries, getSubjectsByIndustry, getAllSubjects } from '@/data/masterData';

interface PopularCoursesMapViewProps {
  courses: Course[];
}

type ViewMode = 'courses' | 'industry' | 'subject' | 'topic';

const PopularCoursesMapView: React.FC<PopularCoursesMapViewProps> = ({ courses }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('courses');
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.3));
  };

  // Function to check if two positions overlap
  const checkOverlap = (x1: number, y1: number, x2: number, y2: number, minDistance: number = 80) => {
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance < minDistance;
  };

  // Function to adjust position to avoid overlap
  const adjustPosition = (x: number, y: number, existingPositions: Array<{x: number, y: number}>, distance: number) => {
    let newX = x;
    let newY = y;
    let attempts = 0;
    const maxAttempts = 20;

    while (attempts < maxAttempts) {
      let hasOverlap = false;
      
      for (const pos of existingPositions) {
        if (checkOverlap(newX, newY, pos.x, pos.y)) {
          hasOverlap = true;
          break;
        }
      }
      
      if (!hasOverlap) {
        break;
      }
      
      // Try a new position within the same distance ring
      const angle = Math.random() * 2 * Math.PI;
      const radiusVariation = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2 variation
      newX = Math.cos(angle) * distance * radiusVariation;
      newY = Math.sin(angle) * distance * radiusVariation;
      attempts++;
    }
    
    return { x: newX, y: newY };
  };

  // Calculate data based on view mode with zoom-responsive positioning
  const mapData = useMemo(() => {
    // Zoom multiplier: higher zoom = more spread out
    const zoomMultiplier = 0.5 + (zoomLevel * 0.8); // Range from 0.74 to 2.9

    if (viewMode === 'courses') {
      const studentCounts = courses.map(course => course.students).sort((a, b) => b - a);
      const maxStudents = Math.max(...studentCounts);
      const minStudents = Math.min(...studentCounts);
      
      // Calculate dynamic ranges based on percentiles
      const percentile20 = studentCounts[Math.floor(studentCounts.length * 0.2)];
      const percentile40 = studentCounts[Math.floor(studentCounts.length * 0.4)];
      const percentile60 = studentCounts[Math.floor(studentCounts.length * 0.6)];
      const percentile80 = studentCounts[Math.floor(studentCounts.length * 0.8)];

      // Dynamic ranges with zoom-responsive distances
      const ranges = [
        { name: `${percentile20}+`, min: percentile20, distance: 100 * zoomMultiplier, color: '#dc2626' },
        { name: `${percentile40}-${percentile20-1}`, min: percentile40, max: percentile20-1, distance: 200 * zoomMultiplier, color: '#ea580c' },
        { name: `${percentile60}-${percentile40-1}`, min: percentile60, max: percentile40-1, distance: 300 * zoomMultiplier, color: '#d97706' },
        { name: `${percentile80}-${percentile60-1}`, min: percentile80, max: percentile60-1, distance: 400 * zoomMultiplier, color: '#65a30d' },
        { name: `<${percentile80}`, max: percentile80-1, distance: 500 * zoomMultiplier, color: '#059669' }
      ];

      const allCourseData: any[] = [];
      const existingPositions: Array<{x: number, y: number}> = [];

      ranges.forEach((range, rangeIndex) => {
        const rangeCourses = courses.filter(course => {
          if (range.min && range.max) {
            return course.students >= range.min && course.students <= range.max;
          } else if (range.min) {
            return course.students >= range.min;
          } else if (range.max) {
            return course.students <= range.max;
          }
          return false;
        });

        rangeCourses.forEach((course, index) => {
          const angleOffset = (index / Math.max(rangeCourses.length, 1)) * 2 * Math.PI;
          const angle = angleOffset + (Math.random() * 0.6 - 0.3);
          
          const baseX = Math.cos(angle) * range.distance;
          const baseY = Math.sin(angle) * range.distance;
          
          // Adjust position to avoid overlap
          const adjustedPosition = adjustPosition(baseX, baseY, existingPositions, range.distance);
          existingPositions.push(adjustedPosition);
          
          const studentRatio = (course.students - minStudents) / (maxStudents - minStudents) || 0;
          const fontSize = 8 + (studentRatio * 8);
          
          allCourseData.push({
            id: course.id,
            title: course.title,
            students: course.students,
            industry: course.industry,
            subject: course.subject,
            topics: course.topics,
            x: adjustedPosition.x,
            y: adjustedPosition.y,
            fontSize,
            color: range.color,
            studentRatio,
            range: range.name
          });
        });
      });

      return { data: allCourseData, ranges };
    }

    if (viewMode === 'industry') {
      const industryData = getAllIndustries().map(industry => {
        const industryCourses = courses.filter(course => course.industry === industry);
        return {
          industry,
          totalStudents: industryCourses.reduce((sum, course) => sum + course.students, 0),
          courseCount: industryCourses.length
        };
      }).filter(item => item.totalStudents > 0).sort((a, b) => b.totalStudents - a.totalStudents);

      const maxStudents = Math.max(...industryData.map(item => item.totalStudents));
      const existingPositions: Array<{x: number, y: number}> = [];

      const mappedData = industryData.map((item, index) => {
        const angle = (index / industryData.length) * 2 * Math.PI;
        const distance = Math.max(150, 400 - (item.totalStudents / maxStudents) * 250) * zoomMultiplier;
        
        const baseX = Math.cos(angle) * distance;
        const baseY = Math.sin(angle) * distance;
        
        const adjustedPosition = adjustPosition(baseX, baseY, existingPositions, distance);
        existingPositions.push(adjustedPosition);
        
        return {
          id: item.industry,
          title: item.industry,
          students: item.totalStudents,
          courseCount: item.courseCount,
          x: adjustedPosition.x,
          y: adjustedPosition.y,
          fontSize: Math.min(16, 10 + (item.totalStudents / maxStudents) * 6),
          color: '#1e40af',
          type: 'industry'
        };
      });

      return { data: mappedData, ranges: [] };
    }

    if (viewMode === 'subject') {
      const subjectData = getAllSubjects().map(subject => {
        const subjectCourses = courses.filter(course => course.subject === subject);
        return {
          subject,
          totalStudents: subjectCourses.reduce((sum, course) => sum + course.students, 0),
          courseCount: subjectCourses.length,
          industry: subjectCourses[0]?.industry || ''
        };
      }).filter(item => item.totalStudents > 0).sort((a, b) => b.totalStudents - a.totalStudents);

      const maxStudents = Math.max(...subjectData.map(item => item.totalStudents));
      const existingPositions: Array<{x: number, y: number}> = [];

      const mappedData = subjectData.map((item, index) => {
        const angle = (index / subjectData.length) * 2 * Math.PI;
        const distance = Math.max(120, 350 - (item.totalStudents / maxStudents) * 200) * zoomMultiplier;
        
        const baseX = Math.cos(angle) * distance;
        const baseY = Math.sin(angle) * distance;
        
        const adjustedPosition = adjustPosition(baseX, baseY, existingPositions, distance);
        existingPositions.push(adjustedPosition);
        
        return {
          id: item.subject,
          title: item.subject,
          students: item.totalStudents,
          industry: item.industry,
          courseCount: item.courseCount,
          x: adjustedPosition.x,
          y: adjustedPosition.y,
          fontSize: Math.min(14, 8 + (item.totalStudents / maxStudents) * 4),
          color: '#7c3aed',
          type: 'subject'
        };
      });

      return { data: mappedData, ranges: [] };
    }

    if (viewMode === 'topic') {
      const allTopics = Array.from(new Set(courses.flatMap(course => course.topics || [])));
      const topicData = allTopics.map(topic => {
        const topicCourses = courses.filter(course => course.topics?.includes(topic));
        return {
          topic,
          totalStudents: topicCourses.reduce((sum, course) => sum + course.students, 0),
          courseCount: topicCourses.length,
          industry: topicCourses[0]?.industry || '',
          subject: topicCourses[0]?.subject || ''
        };
      }).filter(item => item.totalStudents > 0).sort((a, b) => b.totalStudents - a.totalStudents);

      const maxStudents = Math.max(...topicData.map(item => item.totalStudents));
      const existingPositions: Array<{x: number, y: number}> = [];

      const mappedData = topicData.map((item, index) => {
        const angle = (index / topicData.length) * 2 * Math.PI;
        const distance = Math.max(100, 300 - (item.totalStudents / maxStudents) * 150) * zoomMultiplier;
        
        const baseX = Math.cos(angle) * distance;
        const baseY = Math.sin(angle) * distance;
        
        const adjustedPosition = adjustPosition(baseX, baseY, existingPositions, distance);
        existingPositions.push(adjustedPosition);
        
        return {
          id: item.topic,
          title: item.topic,
          students: item.totalStudents,
          industry: item.industry,
          subject: item.subject,
          courseCount: item.courseCount,
          x: adjustedPosition.x,
          y: adjustedPosition.y,
          fontSize: Math.min(12, 8 + (item.totalStudents / maxStudents) * 3),
          color: '#059669',
          type: 'topic'
        };
      });

      return { data: mappedData, ranges: [] };
    }

    return { data: [], ranges: [] };
  }, [courses, viewMode, zoomLevel]);

  // Function to get display content based on view mode
  const getDisplayContent = (item: any) => {
    if (viewMode === 'courses') {
      return (
        <div className="text-center p-3 bg-white/90 border-2 border-gray-300 rounded-lg shadow-sm max-w-[100px]">
          <div className="font-bold leading-tight mb-1 break-words text-xs">
            {item.title}
          </div>
          <div className="text-xs font-medium">
            {item.students} students
          </div>
          <div className="text-xs opacity-70">
            {item.industry}
          </div>
          <div className="text-xs opacity-70">
            {item.subject}
          </div>
        </div>
      );
    }

    if (viewMode === 'industry') {
      return (
        <div className="text-center p-3 bg-blue-50/90 border-2 border-blue-300 rounded-lg shadow-sm max-w-[100px]">
          <div className="font-bold leading-tight mb-1 break-words text-xs">
            {item.title}
          </div>
          <div className="text-xs font-medium">
            {item.students.toLocaleString()} students
          </div>
          <div className="text-xs opacity-70">
            {item.courseCount} courses
          </div>
        </div>
      );
    }

    if (viewMode === 'subject') {
      return (
        <div className="text-center p-3 bg-purple-50/90 border-2 border-purple-300 rounded-lg shadow-sm max-w-[100px]">
          <div className="font-bold leading-tight mb-1 break-words text-xs">
            {item.title}
          </div>
          <div className="text-xs font-medium mb-1">
            {item.industry}
          </div>
          <div className="text-xs font-medium">
            {item.students.toLocaleString()} students
          </div>
          <div className="text-xs opacity-70">
            {item.courseCount} courses
          </div>
        </div>
      );
    }

    if (viewMode === 'topic') {
      return (
        <div className="text-center p-3 bg-green-50/90 border-2 border-green-300 rounded-lg shadow-sm max-w-[100px]">
          <div className="font-bold leading-tight mb-1 break-words text-xs">
            {item.title}
          </div>
          <div className="text-xs font-medium mb-1">
            {item.industry} • {item.subject}
          </div>
          <div className="text-xs font-medium">
            {item.students.toLocaleString()} students
          </div>
          <div className="text-xs opacity-70">
            {item.courseCount} courses
          </div>
        </div>
      );
    }

    return null;
  };

  // Function to get tooltip content based on view mode
  const getTooltipContent = (item: any) => {
    if (viewMode === 'courses') {
      return (
        <div>
          {item.title} - {item.students} students
          <div className="text-xs opacity-75">{item.topics?.join(', ')} • {item.subject}</div>
        </div>
      );
    }

    if (viewMode === 'industry') {
      return `${item.title} - ${item.students.toLocaleString()} students across ${item.courseCount} courses`;
    }

    if (viewMode === 'subject') {
      return `${item.title} (${item.industry}) - ${item.students.toLocaleString()} students across ${item.courseCount} courses`;
    }

    if (viewMode === 'topic') {
      return `${item.title} (${item.industry} • ${item.subject}) - ${item.students.toLocaleString()} students across ${item.courseCount} courses`;
    }

    return '';
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {viewMode === 'courses' && 'Popular Courses Map'}
        {viewMode === 'industry' && 'Industry Overview Map'}
        {viewMode === 'subject' && 'Subject Distribution Map'}
        {viewMode === 'topic' && 'Topic Categories Map'}
      </h2>

      {/* View Mode Filter */}
      <div className="mb-6 p-4 bg-card rounded-lg border">
        <h3 className="text-sm font-medium mb-3">View Mode:</h3>
        <RadioGroup value={viewMode} onValueChange={(value: ViewMode) => setViewMode(value)} className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="courses" id="courses" />
            <Label htmlFor="courses" className="text-sm cursor-pointer">Individual Courses</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="industry" id="industry" />
            <Label htmlFor="industry" className="text-sm cursor-pointer">By Industry</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="subject" id="subject" />
            <Label htmlFor="subject" className="text-sm cursor-pointer">By Subject</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="topic" id="topic" />
            <Label htmlFor="topic" className="text-sm cursor-pointer">By Topic</Label>
          </div>
        </RadioGroup>
      </div>
    
      {/* Dynamic Legend - only show for courses view */}
      {viewMode === 'courses' && mapData.ranges && (
        <div className="mb-8 flex flex-wrap gap-4 justify-center text-sm">
          {mapData.ranges.map((range, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: range.color }}></div>
              <span>{range.name} students {index === 0 ? '(center)' : index === mapData.ranges.length - 1 ? '(outer)' : ''}</span>
            </div>
          ))}
        </div>
      )}

      {/* Zoom Controls */}
      <div className="mb-4 flex gap-2 items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
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
          onClick={handleZoomIn}
          disabled={zoomLevel >= 3}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Radial Map */}
      <div className="flex justify-center items-center w-full h-full flex-1">
        <div className="relative w-full h-full min-h-[1000px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-gray-200 overflow-hidden">
          <div className="absolute inset-0">
            {/* Center point */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full z-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-gray-800 mt-6 whitespace-nowrap">
              Center
            </div>
            
            {/* Dynamic Concentric circles - only show for courses view */}
            {viewMode === 'courses' && mapData.ranges && (
              <>
                {mapData.ranges.map((range, index) => (
                  <div 
                    key={index}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full opacity-30"
                    style={{
                      width: `${range.distance * 2}px`,
                      height: `${range.distance * 2}px`,
                      borderColor: range.color
                    }}
                  ></div>
                ))}
              </>
            )}
            
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
                  fontWeight: viewMode === 'courses' 
                    ? (item.studentRatio > 0.7 ? 'bold' : item.studentRatio > 0.4 ? 'semibold' : 'medium')
                    : 'bold',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                  maxWidth: viewMode === 'courses' ? '100px' : '150px',
                  height: 'auto'
                }}
              >
                {getDisplayContent(item)}
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                  {getTooltipContent(item)}
                </div>
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
            <p>Total Industries: {getAllIndustries().length}</p>
            <p>Total Students: {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}</p>
          </>
        )}
        {viewMode === 'subject' && (
          <>
            <p>Total Subjects: {mapData.data.length}</p>
            <p>Total Students: {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}</p>
          </>
        )}
        {viewMode === 'topic' && (
          <>
            <p>Total Topics: {mapData.data.length}</p>
            <p>Total Students: {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
