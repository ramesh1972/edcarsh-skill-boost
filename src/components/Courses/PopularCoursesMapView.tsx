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

  // Calculate data based on view mode
  const mapData = useMemo(() => {
    if (viewMode === 'courses') {
      // Original course data with inside-out positioning (more students = closer to center)
      const maxStudents = Math.max(...courses.map(course => course.students));
      const minStudents = Math.min(...courses.map(course => course.students));
      
      const ranges = {
        '300+': courses.filter(course => course.students >= 300),
        '200-299': courses.filter(course => course.students >= 200 && course.students < 300),
        '150-199': courses.filter(course => course.students >= 150 && course.students < 200),
        '100-149': courses.filter(course => course.students >= 100 && course.students < 150),
        '<100': courses.filter(course => course.students < 100)
      };

      const allCourseData: any[] = [];

      Object.entries(ranges).forEach(([rangeName, rangeCourses]) => {
        rangeCourses.forEach((course, index) => {
          const angleOffset = (index / Math.max(rangeCourses.length, 1)) * 2 * Math.PI;
          const angle = angleOffset + (Math.random() * 0.8 - 0.4);
          
          // Inside-out positioning: higher student count = closer to center (smaller distance)
          let distance = 100;
          if (course.students >= 300) {
            distance = 100; // Closest to center
          } else if (course.students >= 200) {
            distance = 250;
          } else if (course.students >= 150) {
            distance = 400;
          } else if (course.students >= 100) {
            distance = 550;
          } else {
            distance = 700; // Furthest from center
          }
          
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          const studentRatio = (course.students - minStudents) / (maxStudents - minStudents) || 0;
          const fontSize = 8 + (studentRatio * 8);
          
          let color = '#6b7280';
          if (course.students >= 300) {
            color = '#dc2626';
          } else if (course.students >= 200) {
            color = '#ea580c';
          } else if (course.students >= 150) {
            color = '#d97706';
          } else if (course.students >= 100) {
            color = '#65a30d';
          } else {
            color = '#059669';
          }
          
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
            color,
            studentRatio
          });
        });
      });

      return allCourseData;
    }

    if (viewMode === 'industry') {
      // Group by industry with inside-out positioning
      const industryData = getAllIndustries().map((industry, index) => {
        const industryCourses = courses.filter(course => course.industry === industry);
        const totalStudents = industryCourses.reduce((sum, course) => sum + course.students, 0);
        
        const angle = (index / getAllIndustries().length) * 2 * Math.PI;
        // Inside-out: more students = closer to center
        const distance = Math.max(150, 500 - (totalStudents / 50));
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return {
          id: industry,
          title: industry,
          students: totalStudents,
          courseCount: industryCourses.length,
          x,
          y,
          fontSize: Math.min(16, 10 + (totalStudents / 1000) * 6),
          color: '#1e40af',
          type: 'industry'
        };
      });

      return industryData;
    }

    if (viewMode === 'subject') {
      // Group by subject with inside-out positioning
      const subjectData = getAllSubjects().map((subject, index) => {
        const subjectCourses = courses.filter(course => course.subject === subject);
        const totalStudents = subjectCourses.reduce((sum, course) => sum + course.students, 0);
        const industry = subjectCourses[0]?.industry || '';
        
        const angle = (index / getAllSubjects().length) * 2 * Math.PI;
        // Inside-out: more students = closer to center
        const distance = Math.max(120, 400 - (totalStudents / 30));
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return {
          id: subject,
          title: subject,
          students: totalStudents,
          industry,
          courseCount: subjectCourses.length,
          x,
          y,
          fontSize: Math.min(14, 8 + (totalStudents / 500) * 4),
          color: '#7c3aed',
          type: 'subject'
        };
      }).filter(item => item.students > 0);

      return subjectData;
    }

    if (viewMode === 'topic') {
      // Group by topics with inside-out positioning
      const allTopics = Array.from(new Set(courses.flatMap(course => course.topics || [])));
      const topicData = allTopics.map((topic, index) => {
        const topicCourses = courses.filter(course => course.topics?.includes(topic));
        const totalStudents = topicCourses.reduce((sum, course) => sum + course.students, 0);
        const industry = topicCourses[0]?.industry || '';
        const subject = topicCourses[0]?.subject || '';
        
        const angle = (index / allTopics.length) * 2 * Math.PI;
        // Inside-out: more students = closer to center
        const distance = Math.max(100, 350 - (totalStudents / 20));
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return {
          id: topic,
          title: topic,
          students: totalStudents,
          industry,
          subject,
          courseCount: topicCourses.length,
          x,
          y,
          fontSize: Math.min(12, 8 + (totalStudents / 300) * 3),
          color: '#059669',
          type: 'topic'
        };
      }).filter(item => item.students > 0);

      return topicData;
    }

    return [];
  }, [courses, viewMode]);

  const getDisplayContent = (item: any) => {
    if (viewMode === 'courses') {
      return (
        <div className="text-center p-2 bg-white/90 border-2 border-gray-300 rounded-lg shadow-sm">
          <div className="font-inherit leading-tight mb-1 break-words">
            {item.title}
          </div>
          <div className="text-xs opacity-80 font-normal">
            {item.students} students
          </div>
        </div>
      );
    }

    if (viewMode === 'industry') {
      return (
        <div className="text-center p-3 bg-blue-50/90 border-2 border-blue-300 rounded-lg shadow-sm">
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
        <div className="text-center p-3 bg-purple-50/90 border-2 border-purple-300 rounded-lg shadow-sm">
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
        <div className="text-center p-3 bg-green-50/90 border-2 border-green-300 rounded-lg shadow-sm">
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
        <div className="max-w-">
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
    
      {/* Legend - only show for courses view */}
      {viewMode === 'courses' && (
        <div className="mb-8 flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span>300+ students (center)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-600 rounded"></div>
            <span>200-299 students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-600 rounded"></div>
            <span>150-199 students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-lime-600 rounded"></div>
            <span>100-149 students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-600 rounded"></div>
            <span>Less than 100 students (outer)</span>
          </div>
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
      <div className="flex justify-center items-center w-full h-full flex-1 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-6 border-gray-200 overflow-hidden">
        <div className="relative w-full h-full min-h-[1000px]">
          <div 
            className="absolute inset-0 transition-transform duration-500 ease-out"
            style={{ 
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center'
            }}
          >
            {/* Center point */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full z-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-gray-800 mt-6 whitespace-nowrap">
              Center
            </div>
            
            {/* Concentric circles - only show for courses view */}
            
              <>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border-2 border-red-300 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-orange-300 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-amber-300 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border-2 border-lime-300 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] border-2 border-emerald-300 rounded-full opacity-30"></div>
              </>
            
            
            {/* Map items positioned radially */}
            {mapData.map((item) => (
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
            <p>Total Subjects: {mapData.length}</p>
            <p>Total Students: {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
