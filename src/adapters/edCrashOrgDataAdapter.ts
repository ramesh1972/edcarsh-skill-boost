import { instructorCourses } from '../data/coursesData/instructorCourses';
import { courseSchedules } from '../data/coursesData/courseSchedules';
import { instructors } from '../data/usersData/instructors';
import { orgs } from '../data/orgData/orgs';
import { learners } from '../data/usersData/learners';
import { learnerCourses, learnersGuestJoins } from '../data/coursesData/learnerCourses';
import { CourseSchedule } from '../types/courseTypes/courseSchedule.type';
import { InstructorCourse } from '../types/courseTypes/InstructorCourse.type';
import { Org, OrgInfo, OrgType, SuperOrgInfo } from '../types/coreTypes/org.type';
import { getOrgCourseStats, getOrgFullInfo } from './orgDataAdapter';
import { Instructor, Learner, LearnerCourse, LearnerGuestJoin, User } from '@/types';
import { users } from '@/data/usersData/users';
import { courses } from '@/data/coursesData/courses';
import { superOrgs } from '@/data/orgData/superOrgs';

// Get all info for a superorg (all orgs under it)
export function getSuperOrgInfo(superOrgId: number): SuperOrgInfo {
  const superOrg = superOrgs.find(o => o.superOrgId === superOrgId);
  if (!superOrg) return null;

  superOrg.orgInfo = getOrgFullInfo(superOrg.orgId);
  superOrg.arrayOfOrgs = superOrg.arrayOfOrgIds.map(orgId => { return getOrgFullInfo(orgId) });
}
