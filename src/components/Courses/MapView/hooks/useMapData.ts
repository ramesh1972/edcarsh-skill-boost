
import { useMemo } from 'react';
import { Course } from '@/types';
import { ViewMode, MapData, MapDataItem } from '../types';
import { calculateDynamicRanges } from '../utils/rangeCalculator';
import { getStatsForCourse, getStatsForCourses, getStatsForIndustry, getStatsForSubject } from '@/adapters/coursesDataAdapter';
import { getIndustries, getIndustryById, getSubjectById, getSubjects } from '@/adapters/industrySubjectAdpator';
import { sub } from 'date-fns';


const COLORS = [
  '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
  '#059669', '#0891b2', '#0284c7', '#3b82f6', '#7c3aed',
  '#be185d', '#374151', '#1f2937', '#0f172a'
];

export const useMapData = (courses: Course[], viewMode: ViewMode, zoomLevel: number): MapData => {
  return useMemo(() => {
    if (viewMode === 'courses') {
      const studentValues = courses.map(course => getStatsForCourse(course.id).enrollments || 0);
      const ranges = calculateDynamicRanges(studentValues, 9);
      
      const allCourseData: MapDataItem[] = [];

      ranges.forEach((range, rangeIndex) => {
        
        const rangeCourses = courses.filter(course => {
          const courseStats = getStatsForCourse(course.id);
          if (rangeIndex === 0) {
            return courseStats.enrollments >= range.min;
          } else {
            return courseStats.enrollments >= range.min && courseStats.enrollments <= range.max;
          }
        });

        rangeCourses.forEach((course, index) => {
          const courseStats = getStatsForCourse(course.id);

          
          const industryName = getIndustryById(course.industryId)?.name || 'Unknown Industry';
          const subjectName = getSubjectById(course.industryId, course.subjectId)?.name || 'Unknown Subject';

          const angleOffset = (index / Math.max(rangeCourses.length, 1)) * 2 * Math.PI;
          const angle = angleOffset + (Math.random() * 0.8 - 0.4);
          
          const baseDistance = 120 + (rangeIndex * 80);
          const distance = (baseDistance * zoomLevel);
          
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          const maxStudents = Math.max(...studentValues);
          const minStudents = Math.min(...studentValues);
          const studentRatio = (courseStats.enrollments - minStudents) / (maxStudents - minStudents) || 0;
          const fontSize = 8 + (studentRatio * 6);
          
          allCourseData.push({
            id: String(course.id),
            title: course.title,
            students: courseStats.enrollments,
            industry: industryName,
            subject: subjectName,
            tags: course.tags || [],
            x,
            y,
            fontSize,
            color: COLORS[allCourseData.length % COLORS.length],
            studentRatio,
            range: range.label
          });
        });
      });

      return { data: allCourseData, ranges };
    }

    if (viewMode === 'industry') {
      const industryData = getIndustries().map(industry => {
        const industryCourses = courses.filter(course => course.industryId === industry.id);
        const industryStats = getStatsForIndustry(industry.id);

        return {
          id: String(industry.id),
          title: industry.name,
          students: industryStats.enrollments || 0,
          courseCount: industryCourses.length,
          type: 'industry'
        };
      }).filter(item => item.students > 0);

      const studentValues = industryData.map(item => item.students);
      const ranges = calculateDynamicRanges(studentValues, 9);

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
          color: COLORS[(index + 2) % COLORS.length], // Offset by 2 for industry
          range: ranges[rangeIndex]?.label || ''
        };
      });

      return { data: mappedData, ranges };
    }

    if (viewMode === 'subject') {
      const subjectData = getSubjects().map(subject => {
        const subjectCourses = courses.filter(course => course.subjectId === subject.id);
        const subjectStats = getStatsForSubject(subject.id);
        const industryId = subjectCourses[0]?.industryId || null;
        const industryName = getIndustryById(industryId)?.name || '';
        const subjectName = subject.name || 'Unknown Subject';
        
        return {
          id: String(subject.id),
          title: subjectName,
          students: subjectStats.enrollments || 0,
          industry: industryName || '',
          courseCount: subjectCourses.length,
          type: 'subject'
        };
      }).filter(item => item.students > 0);

      const studentValues = subjectData.map(item => item.students);
      const ranges = calculateDynamicRanges(studentValues, 9);

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
          color: COLORS[(index + 5) % COLORS.length], // Offset by 5 for subjects
          range: ranges[rangeIndex]?.label || ''
        };
      });

      return { data: mappedData, ranges };
    }

    if (viewMode === 'tag') {
      const alltags = Array.from(new Set(courses.flatMap(course => course.tags || [])));
      const tagData = alltags.map(tag => {
        const tagCourses = courses.filter(course => course.tags?.includes(tag));
        const courseStats = getStatsForCourses(tagCourses.map(course => course.id));
        const industryId = tagCourses[0]?.industryId || null;
        const subjectId = tagCourses[0]?.subjectId || null;
      
        const industryName = getIndustryById(industryId)?.name || '';
        const subjectName = getSubjectById(industryId, subjectId)?.name || '';
        
        return {
          id: tag,
          title: tag,
          students: courseStats.enrollments || 0,
          industry: industryName,
          subject:subjectName,
          courseCount: tagCourses.length,
          type: 'tag'
        };
      }).filter(item => item.students > 0);

      const studentValues = tagData.map(item => item.students);
      const ranges = calculateDynamicRanges(studentValues, 9);

      const mappedData = tagData.map((item, index) => {
        const rangeIndex = ranges.findIndex(range => {
          if (ranges.indexOf(range) === 0) {
            return item.students >= range.min;
          } else {
            return item.students >= range.min && item.students <= range.max;
          }
        });

        const angle = (index / tagData.length) * 2 * Math.PI;
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
          color: COLORS[(index + 8) % COLORS.length], // Offset by 8 for tags
          range: ranges[rangeIndex]?.label || ''
        };
      });

      return { data: mappedData, ranges };
    }

    return { data: [], ranges: [] };
  }, [courses, viewMode, zoomLevel]);
};

