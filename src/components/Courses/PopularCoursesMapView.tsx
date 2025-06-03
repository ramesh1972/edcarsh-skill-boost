
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
    
    return courses.map((course, index) => {
      // Calculate angle for radial positioning
      const angle = (index / courses.length) * 2 * Math.PI;
      
      // Calculate distance from center (inversely proportional to students)
      const studentRatio = (course.students - minStudents) / (maxStudents - minStudents) || 0;
      const distance = 180 - (studentRatio * 120); // Range from 60px to 180px from center
      
      // Calculate position
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      // Calculate font size based on student count
      const fontSize = 12 + (studentRatio * 16); // Range from 12px to 28px
      
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
      
      return {
        ...course,
        x,
        y,
        fontSize,
        color,
        studentRatio
      };
    });
  }, [courses]);

  return (
    <div className="flex flex-col items-center p-8">
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
      <div className="relative w-[500px] h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-full border-2 border-gray-200 overflow-hidden">
        {/* Center point */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full z-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-gray-800 mt-6 whitespace-nowrap">
          Courses Center
        </div>
        
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
            <div className="text-center max-w-32">
              <div className="font-inherit leading-tight mb-1">
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
        
        {/* Concentric circles for visual reference */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-gray-300 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-gray-300 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-gray-300 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-gray-300 rounded-full opacity-20"></div>
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
