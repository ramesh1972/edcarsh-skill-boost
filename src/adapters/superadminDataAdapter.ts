import { instructorCourses } from '../data/coursesData/instructorCourses';
import { courseSchedules } from '../data/coursesData/courseSchedules';
import { instructors } from '../data/usersData/instructors';
import { orgs } from '../data/orgData/orgs';
import { learners } from '../data/usersData/learners';
import { learnerCourses, learnersGuestJoins } from '../data/coursesData/learnerCourses';
import { CourseSchedule } from '../types/courseTypes/courseSchedule.type';
import { InstructorCourse } from '../types/courseTypes/InstructorCourse.type';
import { Org, OrgType, SuperOrgInfo } from '../types/coreTypes/org.type';
import { getOrgCourses, getOrgCourseStats, getOrgFullInfo } from './orgDataAdapter';
import { Instructor, Learner, OrgCoursesSchedules, User } from '@/types';
import { users } from '../data/usersData/users';
import { courses } from '../data/coursesData/courses';
import { getCourseSchedules } from './coursesDataAdapter';

// Get all instructors in the system
export function getAllInstructors(): Instructor[] {
  return instructors.map(i => {
    const user: User = users.find(u => u.id === i.userId);
    if (!user) {
      return null; // Skip if user not found
    }
    return {
      ...user,
      ...i,
      orgId: i.orgId, // Ensure orgId is set
    } as Instructor;
  }).filter(i => i !== null);
}

// Get all learners in the system
export function getAllLearners(): Learner[] {
  return learners.map(l => {
    const user: User = users.find(u => u.id === l.userId);
    if (!user) {
      return null; // Skip if user not found
    }
    return {
      ...user,
      ...l,
      orgId: l.orgId, // Ensure orgId is set
    } as Learner;
  }).filter(l => l !== null);
}

// Get all organizations (all types)
export function getAllOrgs(): Org[] {
  return orgs;
}

// Get all superorgs
export function getAllSuperOrgs(): Org[] {
  return orgs.filter(o => o.orgTypeId === OrgType.SUPERORG);
}

// Get all courses (instructor courses)
export function getAllCourses(): InstructorCourse[] {
  return instructorCourses.map(c => {
    const courseInfo = courses.find(co => co.id === c.courseId);
    return {
      ...c,
      ...courseInfo, // Include course info if available
    } as InstructorCourse;
  }).filter(c => c !== null);
}

// Get all course schedules
export function getAllCourseSchedules(): CourseSchedule[] {
  return courseSchedules.map(cs => {
    const course = instructorCourses.find(c => c.courseScheduleIds.includes(cs.scheduleId));
    return {
      ...cs,
      courseId: course ? course.courseId : null, // Include course ID if available
    } as CourseSchedule;
  }).filter(cs => cs !== null);
}

// Get all learner enrollments
export function getAllLearnerCourses(): typeof learnerCourses {
  return learnerCourses;
}

// Get all guest joins
export function getAllLearnerGuestJoins(): typeof learnersGuestJoins {
  return learnersGuestJoins;
}

// TODO: Implement stats aggregation logic
// Get all course stats (aggregate, for superadmin)
export function getAllCourseStats(): ReturnType<typeof getOrgCourseStats> {
  return getOrgCourseStats(0);
}

// Get all info for a superorg (all orgs under it)
export function getSuperOrgInfo(superOrgId: number): SuperOrgInfo | null {
  const superOrg = orgs.find(o => o.id === superOrgId && o.orgTypeId === OrgType.SUPERORG);
  if (!superOrg) return null;
  // For demo, assume all orgs except NOORG and SUPERORG are under the superorg
  const arrayOfOrgs = orgs.filter(o => o.orgTypeId !== OrgType.NOORG && o.orgTypeId !== OrgType.SUPERORG).map(o => {
    return getOrgFullInfo(o.id);
  });

  return {
    org: superOrg,
    orgInfo: getOrgFullInfo(superOrg.id),
    superOrgId: superOrg.id,
    arrayOfOrgs: arrayOfOrgs,
    arrayOfOrgIds: arrayOfOrgs.map(o => o.org.id),
  };

}
