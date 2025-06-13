import { CourseSchedule } from '../types/courseTypes/courseSchedule.type';
import { InstructorCourse } from '../types/courseTypes/InstructorCourse.type';

import { instructorCourses } from '../data/coursesData/instructorCourses';
import { courseSchedules } from '../data/coursesData/courseSchedules';
import { getCourseInfoByIds, getStatsForCourses } from './coursesDataAdapter';
import { Course, CourseStats, DeepCourseInfo } from '@/types';

export function getInstructorCourses(instructorId: number): Partial<InstructorCourse>[] {
  return instructorCourses.filter(c => c.instructorId === instructorId).map(c => {
    const courseInfo = getCourseInfoByIds([c.courseId]);
    return {
      ...c,
      course: courseInfo[0] || null, // Ensure course info is included
    };
  });
}

export function getInstructorsCourses(instructorIds: number[]): Partial<InstructorCourse>[] {
  return instructorCourses.filter(c => instructorIds.includes(c.instructorId)).map(c => {
    const courseInfo = getCourseInfoByIds([c.courseId]);
    return {
      ...c,
      course: courseInfo[0] || null, // Ensure course info is included
    };
  });


}
export function getInstructorCourseSchedules(instructorId: number): CourseSchedule[] {
  const courseIds = instructorCourses.filter(c => c.instructorId === instructorId).flatMap(c => c.courseScheduleIds);
  return courseSchedules.filter(cs => courseIds.includes(cs.scheduleId));
}

export function getInstructorCourseStats(instructorId: number) : CourseStats {
  const courseIds = instructorCourses.filter(c => c.instructorId === instructorId).flatMap(c => c.courseId);
  const courseStats = getStatsForCourses(courseIds);
  courseStats.type = 'instructor';
  return courseStats;
}

export function getInstructorCourseInfo(instructorId: number) : Course[] {
  const courseIds = instructorCourses.filter(c => c.instructorId === instructorId).flatMap(c => c.courseId);
  return getCourseInfoByIds(courseIds);
}

export function getInstructorDeepCourseInfo(instructorId: number): DeepCourseInfo[] {
  const courseIds = instructorCourses.filter(c => c.instructorId === instructorId).flatMap(c => c.courseId);
  const courses = getCourseInfoByIds(courseIds);
  const courseStats = getStatsForCourses(courseIds);

  return courses.map(course => ({
    ...course,
    stats: courseStats,
    schedules: courseSchedules.filter(cs => cs.courseId === course.id),
    intents: null // Assuming intents are not needed here, can be modified as required
  }));
}
