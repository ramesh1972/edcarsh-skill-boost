
import { useMemo } from 'react';
import { Course } from '@/types';
import { getAllIndustries, getAllSubjects } from '@/data/masterData';
import { ViewMode, MapData } from '../types';
import { calculateDynamicRanges } from '../utils/rangeCalculator';

const COLORS = [
  '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', 
  '#059669', '#0891b2', '#0284c7', '#3b82f6'
];

export const useMapData = (courses: Course[], viewMode: ViewMode, zoomLevel: number): MapData => {
  return useMemo(() => {
    if (viewMode === 'courses') {
      const studentValues = courses.map(course => course.students);
      const ranges = calculateDynamicRanges(studentValues, 9);
      
      const allCourseData: any[] = [];

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
            color: COLORS[rangeIndex] || '#6b7280',
            studentRatio,
            range: range.label
          });
        });
      });

      return { data: allCourseData, ranges };
    }

    if (viewMode === 'industry') {
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
          color: COLORS[rangeIndex] || '#1e40af',
          range: ranges[rangeIndex]?.label || ''
        };
      });

      return { data: mappedData, ranges };
    }

    if (viewMode === 'subject') {
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
          color: COLORS[rangeIndex] || '#7c3aed',
          range: ranges[rangeIndex]?.label || ''
        };
      });

      return { data: mappedData, ranges };
    }

    if (viewMode === 'topic') {
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
          color: COLORS[rangeIndex] || '#059669',
          range: ranges[rangeIndex]?.label || ''
        };
      });

      return { data: mappedData, ranges };
    }

    return { data: [], ranges: [] };
  }, [courses, viewMode, zoomLevel]);
};
