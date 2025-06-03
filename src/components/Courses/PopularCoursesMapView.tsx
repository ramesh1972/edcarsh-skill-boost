
import React, { useMemo } from 'react';
import { Course } from '@/types';

interface PopularCoursesMapViewProps {
  courses: Course[];
}

const PopularCoursesMapView: React.FC<PopularCoursesMapViewProps> = ({ courses }) => {
  // Calculate positioning and styling for each course
  const courseData = useMemo(() => {
    const maxStudents = Math.max(...courses.map(course => course.students));
    const minStudents = Math.min(...courses.map(course => course.students));
    
    // Group courses by student ranges
    const ranges = {
      '300+': courses.filter(course => course.students >= 300),
      '200-299': courses.filter(course => course.students >= 200 && course.students < 300),
      '150-199': courses.filter(course => course.students >= 150 && course.students < 200),
      '100-149': courses.filter(course => course.students >= 100 && course.students < 150),
      '<100': courses.filter(course => course.students < 100)
    };

    const allCourseData: any[] = [];

    // Process each range
    Object.entries(ranges).forEach(([rangeName, rangeCourses]) => {
      rangeCourses.forEach((course, index) => {
        // Calculate angle for even distribution within the range
        const angle = (index / rangeCourses.length) * 2 * Math.PI;
        
        // Calculate distance from center based on student ranges (increased for full width/height)
        let distance = 450; // outermost ring (increased from 350)
        if (course.students >= 300) {
          distance = 80; // innermost ring
        } else if (course.students >= 200) {
          distance = 160; // second ring (increased from 120)
        } else if (course.students >= 150) {
          distance = 240; // third ring (increased from 180)
        } else if (course.students >= 100) {
          distance = 320; // fourth ring (increased from 240)
        }
        
        // Calculate position
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Calculate font size based on student count
        const studentRatio = (course.students - minStudents) / (maxStudents - minStudents) || 0;
        const fontSize = 8 + (studentRatio * 8); // Range from 8px to 16px
        
        // Determine color based on student ranges
        let color = '#6b7280'; // gray-500 (default)
        if (course.students >= 300) {
          color = '#dc2626'; // red-600 (high enrollment)
        } else if (course.students >= 200) {
          color = '#ea580c'; // orange-600 (medium-high enrollment)
        } else if (course.students >= 150) {
          color = '#d97706'; // amber-600 (medium enrollment)
        } else if (course.students >= 100) {
          color = '#65a30d'; // lime-600 (low-medium enrollment)
        } else {
          color = '#059669'; // emerald-600 (low enrollment)
        }
        
        allCourseData.push({
          ...course,
          x,
          y,
          fontSize,
          color,
          studentRatio
        });
      });
    });

    return allCourseData;
  }, [courses]);

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Popular Courses Map</h2>
    
      {/* Legend */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span>300+ students</span>
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
          <span>Less than 100 students</span>
        </div>
      </div>
      
      {/* Radial Course Map */}
      <div className="flex justify-center items-center w-full h-full flex-1">
        <div className="relative w-full h-full min-h-[800px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-gray-200 overflow-visible">
          {/* Center point */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full z-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-gray-800 mt-6 whitespace-nowrap">
            Courses Center
          </div>
          
          {/* Concentric circles for each range (full width/height spacing) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-red-300 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-orange-300 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border-2 border-amber-300 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] border-2 border-lime-300 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border-2 border-emerald-300 rounded-full opacity-30"></div>
          
          {/* Course titles positioned radially */}
          {courseData.map((course) => (
            <div
              key={course.id}
              className="absolute cursor-pointer hover:opacity-80 transition-opacity group"
              style={{
                left: `calc(50% + ${course.x}px)`,
                top: `calc(50% + ${course.y}px)`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${course.fontSize}px`,
                color: course.color,
                fontWeight: course.studentRatio > 0.7 ? 'bold' : course.studentRatio > 0.4 ? 'semibold' : 'medium',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <div className="text-center w-fit p-2 bg-white/90 border-2 border-gray-300 rounded-lg shadow-sm">
                <div className="font-inherit leading-tight mb-1 break-words">
                  {course.title}
                </div>
                <div className="text-xs opacity-80 font-normal">
                  {course.students} students
                </div>
              </div>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                {course.title} - {course.students} students
                <div className="text-xs opacity-75">{course.level} • {course.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary stats */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Total Courses: {courses.length}</p>
        <p>Total Students: {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}</p>
        <p>Average Students per Course: {Math.round(courses.reduce((sum, course) => sum + course.students, 0) / courses.length)}</p>
      </div>
    </div>
  );
};

export default PopularCoursesMapView;
