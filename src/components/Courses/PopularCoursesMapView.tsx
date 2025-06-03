
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

  // Dynamic range calculation helper
  const calculateDynamicRanges = (values: number[], rangeCount: number = 9) => {
    if (values.length === 0) return [];
    
    const sortedValues = [...values].sort((a, b) => a - b);
    const min = sortedValues[0];
    const max = sortedValues[sortedValues.length - 1];
    
    if (min === max) {
      return [{ min, max, label: `${min}` }];
    }
    
    const ranges = [];
    const step = (max - min) / rangeCount;
    
    for (let i = 0; i < rangeCount; i++) {
      const rangeMin = Math.floor(min + (step * i));
      const rangeMax = i === rangeCount - 1 ? max : Math.floor(min + (step * (i + 1)) - 1);
      
      let label;
      if (i === rangeCount - 1) {
        label = `${rangeMin}+`;
      } else if (rangeMin === rangeMax) {
        label = `${rangeMin}`;
      } else {
        label = `${rangeMin}-${rangeMax}`;
      }
      
      ranges.push({ min: rangeMin, max: rangeMax, label });
    }
    
    return ranges.reverse(); // Highest first for inside-out positioning
  };

  // Calculate data based on view mode
  const mapData = useMemo(() => {
    if (viewMode === 'courses') {
      // Get student values and calculate dynamic ranges
      const studentValues = courses.map(course => course.students);
      const ranges = calculateDynamicRanges(studentValues, 9);
      
      const allCourseData: any[] = [];
      const colors = [
        '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
        '#059669', '#0891b2', '#0284c7', '#3b82f6'
      ];

      ranges.forEach((range, rangeIndex) => {
        const rangeCourses = courses.filter(course => {
          if (rangeIndex === 0) {
            return course.students >= range.min;
          } else {
            return course.students >= range.min && course.students <= range.max;
          }
        });

        rangeCourses.forEach((course, index) => {
          const angleOffset = (index / Math.max(rangeCourses.length, 1)) * 2 * Math.PI;
          const angle = angleOffset + (Math.random() * 0.8 - 0.4);
          
          // Inside-out positioning: higher student count = closer to center
          const baseDistance = 120 + (rangeIndex * 80);
          const distance = (baseDistance * zoomLevel);
          
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          const maxStudents = Math.max(...studentValues);
          const minStudents = Math.min(...studentValues);
          const studentRatio = (course.students - minStudents) / (maxStudents - minStudents) || 0;
          const fontSize = 8 + (studentRatio * 6);
          
          allCourseData.push({
            id: course.id,
            title: course.title,
            students: course.students,
            industry: course.industry,
            subject: course.subject,
            topics: course.topics,
            x,
            y,
            fontSize,
            color: colors[rangeIndex] || '#6b7280',
            studentRatio,
            range: range.label
          });
        });
      });

      return { data: allCourseData, ranges };
    }

    if (viewMode === 'industry') {
      // Group by industry and calculate dynamic ranges
      const industryData = getAllIndustries().map(industry => {
        const industryCourses = courses.filter(course => course.industry === industry);
        const totalStudents = industryCourses.reduce((sum, course) => sum + course.students, 0);
        return {
          id: industry,
          title: industry,
          students: totalStudents,
          courseCount: industryCourses.length,
          type: 'industry'
        };
      }).filter(item => item.students > 0);

      const studentValues = industryData.map(item => item.students);
      const ranges = calculateDynamicRanges(studentValues, 9);
      const colors = [
        '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
        '#059669', '#0891b2', '#0284c7', '#3b82f6'
      ];

      const mappedData = industryData.map((item, index) => {
        const rangeIndex = ranges.findIndex(range => {
          if (ranges.indexOf(range) === 0) {
            return item.students >= range.min;
          } else {
            return item.students >= range.min && item.students <= range.max;
          }
        });

        const angle = (index / industryData.length) * 2 * Math.PI;
        const baseDistance = 150 + (rangeIndex * 60);
        const distance = baseDistance * zoomLevel;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        const maxStudents = Math.max(...studentValues);
        const fontSize = Math.min(16, 10 + (item.students / maxStudents) * 6);
        
        return {
          ...item,
          x,
          y,
          fontSize,
          color: colors[rangeIndex] || '#1e40af',
          range: ranges[rangeIndex]?.label || ''
        };
      });

      return { data: mappedData, ranges };
    }

    if (viewMode === 'subject') {
      // Group by subject and calculate dynamic ranges
      const subjectData = getAllSubjects().map(subject => {
        const subjectCourses = courses.filter(course => course.subject === subject);
        const totalStudents = subjectCourses.reduce((sum, course) => sum + course.students, 0);
        const industry = subjectCourses[0]?.industry || '';
        
        return {
          id: subject,
          title: subject,
          students: totalStudents,
          industry,
          courseCount: subjectCourses.length,
          type: 'subject'
        };
      }).filter(item => item.students > 0);

      const studentValues = subjectData.map(item => item.students);
      const ranges = calculateDynamicRanges(studentValues, 9);
      const colors = [
        '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
        '#059669', '#0891b2', '#0284c7', '#3b82f6'
      ];

      const mappedData = subjectData.map((item, index) => {
        const rangeIndex = ranges.findIndex(range => {
          if (ranges.indexOf(range) === 0) {
            return item.students >= range.min;
          } else {
            return item.students >= range.min && item.students <= range.max;
          }
        });

        const angle = (index / subjectData.length) * 2 * Math.PI;
        const baseDistance = 120 + (rangeIndex * 50);
        const distance = baseDistance * zoomLevel;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        const maxStudents = Math.max(...studentValues);
        const fontSize = Math.min(14, 8 + (item.students / maxStudents) * 4);
        
        return {
          ...item,
          x,
          y,
          fontSize,
          color: colors[rangeIndex] || '#7c3aed',
          range: ranges[rangeIndex]?.label || ''
        };
      });

      return { data: mappedData, ranges };
    }

    if (viewMode === 'topic') {
      // Group by topics and calculate dynamic ranges
      const allTopics = Array.from(new Set(courses.flatMap(course => course.topics || [])));
      const topicData = allTopics.map(topic => {
        const topicCourses = courses.filter(course => course.topics?.includes(topic));
        const totalStudents = topicCourses.reduce((sum, course) => sum + course.students, 0);
        const industry = topicCourses[0]?.industry || '';
        const subject = topicCourses[0]?.subject || '';
        
        return {
          id: topic,
          title: topic,
          students: totalStudents,
          industry,
          subject,
          courseCount: topicCourses.length,
          type: 'topic'
        };
      }).filter(item => item.students > 0);

      const studentValues = topicData.map(item => item.students);
      const ranges = calculateDynamicRanges(studentValues, 9);
      const colors = [
        '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
        '#059669', '#0891b2', '#0284c7', '#3b82f6'
      ];

      const mappedData = topicData.map((item, index) => {
        const rangeIndex = ranges.findIndex(range => {
          if (ranges.indexOf(range) === 0) {
            return item.students >= range.min;
          } else {
            return item.students >= range.min && item.students <= range.max;
          }
        });

        const angle = (index / topicData.length) * 2 * Math.PI;
        const baseDistance = 100 + (rangeIndex * 40);
        const distance = baseDistance * zoomLevel;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        const maxStudents = Math.max(...studentValues);
        const fontSize = Math.min(12, 8 + (item.students / maxStudents) * 3);
        
        return {
          ...item,
          x,
          y,
          fontSize,
          color: colors[rangeIndex] || '#059669',
          range: ranges[rangeIndex]?.label || ''
        };
      });

      return { data: mappedData, ranges };
    }

    return { data: [], ranges: [] };
  }, [courses, viewMode, zoomLevel]);

  const getDisplayContent = (item: any) => {
    if (viewMode === 'courses') {
      return (
        <div className="text-center p-3 bg-white/90 border-2 border-gray-300 rounded-lg shadow-sm max-w-[100px]">
          <div className="font-bold leading-tight mb-1 break-words">
            {item.title}
          </div>
          <div className="text-xs font-medium">
            {item.students.toLocaleString()} students
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
          <div className="font-bold leading-tight mb-1 break-words">
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
          <div className="font-bold leading-tight mb-1 break-words">
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
          <div className="font-bold leading-tight mb-1 break-words">
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

  const getTooltipContent = (item: any) => {
    if (viewMode === 'courses') {
      return (
        <div className="max-w-[200px]">
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
            <RadioGroupItem value="industry" id="industry" />
            <Label htmlFor="industry" className="text-sm cursor-pointer">By Industry</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="subject" id="subject" />
            <Label htmlFor="subject" className="text-sm cursor-pointer">By Subject</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="courses" id="courses" />
            <Label htmlFor="courses" className="text-sm cursor-pointer">Individual Courses</Label>
          </div>
        </RadioGroup>
      </div>
    
      {/* Dynamic Legend */}
      {mapData.ranges && mapData.ranges.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-4 justify-center text-sm">
          {mapData.ranges.map((range, index) => {
            const colors = [
              '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
              '#059669', '#0891b2', '#0284c7', '#3b82f6'
            ];
            return (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded" 
                  style={{ backgroundColor: colors[index] || '#6b7280' }}
                ></div>
                <span>{range.label} students {index === 0 ? '(center)' : index === mapData.ranges.length - 1 ? '(outer)' : ''}</span>
              </div>
            );
          })}
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
      <div className="flex justify-center items-center w-full h-full flex-1 bg-gradient-to-br from-blue-50 to-purple-50  overflow-hidden"
        style={{border: 6px solid primary, borderRadius: '6px'}}>
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
              const colors = [
                '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
                '#059669', '#0891b2', '#0284c7', '#3b82f6'
              ];
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
                    borderColor: colors[index] || '#6b7280'
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
                {getDisplayContent(item)}
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20 max-w-[200px] break-words">
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
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
