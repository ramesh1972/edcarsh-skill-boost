import { instructorCourses } from '../data/coursesData/instructorCourses';
import { courseSchedules } from '../data/coursesData/courseSchedules';
import { instructors } from '../data/usersData/instructors';
import { learners } from '../data/usersData/learners';
import { learnerCourses, learnersGuestJoins } from '../data/coursesData/learnerCourses';
import { CourseSchedule } from '../types/courseTypes/courseSchedule.type';
import { InstructorCourse } from '../types/courseTypes/InstructorCourse.type';
import { Org, OrgInfo, OrgMemberInfo, OrgType } from '../types/coreTypes/org.type';
import { orgs } from '../data/orgData/orgs';
import { Admin, Instructor, Learner } from '../types/coreTypes/user.type';
import { LearnerCourse, LearnerGuestJoin } from '../types/courseTypes/learnerCourses.type';
import { OrgCourse, OrgCoursesInfo, OrgCoursesSchedules } from '@/types/courseTypes/orgCourses.type';
import { OrgAdminInfo } from '@/types/coreTypes/org.type'
import { OrgHeadInstructorInfo } from '@/types/coreTypes/org.type'
import { Course, CourseStats, RoleType } from '@/types';
import { courses } from '@/data/coursesData/courses';
import { orgRegistration } from '@/data/orgData/orgRegistration';
import { orgMemberInfo } from '@/data/orgData/orgMemberInfo';
import { orgAdminInfo } from '@/data/orgData/orgAdminInfo';
import { users } from '@/data/usersData/users';
import { getLearnerAllCoursesSchedule, getLearnerCourses, getLearnerCourseSchedule, getLearnerGuestJoins, getLearnerIntentedCourses, getLearnerWishlist } from './learnerDataAdapter';
import { getInstructorCourses, getInstructorCourseStats, getInstructorsCourses } from './instructorDataAdapter';
import { getAllCourseSchedules, getCourseIntentInfo, getStatsForCourses } from './coursesDataAdapter';
import { orgHeadInstructorInfo } from '@/data/orgData/orgHeadInstructorInfo';

// Get all instructors for an org
export function getOrgInstructors(orgId: number): Instructor[] {
  return instructors.filter(i => i.orgId === orgId).map(i => {
    const user = users.find(u => u.id === i.userId);

    if (!user) {
      return null; // Skip if user not found
    }

    return {
      ...i,
      ...user,
      orgId: orgId, // Ensure orgId is set

    } as Instructor;
  }).filter(i => i !== null);     
}
// Get all learners for an org
export function getOrgLearners(orgId: number): Learner[] {
  return learners.filter(l => l.orgId === orgId).map(l => {
    const user = users.find(u => u.id === l.userId);

    if (!user) {
      return null; // Skip if user not found
    }

    return {
      ...l,
      ...user,
      orgId: orgId, // Ensure orgId is set
    } as Learner;
  }).filter(l => l !== null); 
}

export function getOrgAdminInfo(orgId: number): OrgAdminInfo[] {
  return orgAdminInfo.filter(a => a.orgId === orgId).map(a1 => {
    return {
      ...a1,
      orgId: orgId, // Ensure orgId is set
      coursesInfo: getCoursesInfo(orgId, a1.intructorUserIds, a1.learnerUserIds)
    };
  });
}

export function getOrgHeadInstructorInfo(orgId: number): OrgHeadInstructorInfo[] {
  return orgHeadInstructorInfo.filter(h => h.orgId === orgId).map(h1 => {
    return {
      ...h1,
      orgId: orgId, // Ensure orgId is set
      coursesInfo: getCoursesInfo(orgId, h1.intructorUserIds, h1.learnerUserIds)
    };
  });
}

export function getOrgMemberInfo(orgId: number): OrgMemberInfo | null {
  const orgMemberInfo2 = orgMemberInfo.find(o => o.orgId === orgId);
  if (!orgMemberInfo2) return null;

  orgMemberInfo2.orgId = orgId; // Ensure orgId is set
  orgMemberInfo2.org = orgs.find(o => o.id === orgId) || null; // Get the org details
  orgMemberInfo2.superAdminUserId = users.find(u => u.orgId === orgId && u.roleIds.includes(RoleType.SUPER_ADMIN))?.id || null;
  orgMemberInfo2.superAdminUser = users.find(u => u.id == orgMemberInfo2.superAdminUserId);

  orgMemberInfo2.primaryContactUser = users.find(u => u.id == orgMemberInfo2.primaryContactUserId);
  orgMemberInfo2.courseManagerUser = users.find(u => u.id == orgMemberInfo2.courseManagerUserId);
  orgMemberInfo2.grievanceContactUser = users.find(u => u.id == orgMemberInfo2.grievanceContactUserId);

  orgMemberInfo2.adminUsers = getOrgAdminInfo(orgId);
  orgMemberInfo2.headInstructorUsers = getOrgHeadInstructorInfo(orgId);

  orgMemberInfo2.memberIntructorUsers = getOrgInstructors(orgId);
  orgMemberInfo2.memberLearnerUsers = getOrgLearners(orgId);
}

// Get all courses for an org
export function getOrgCourses(orgId: number): Course[] {
  // Courses where any schedule is for this org
  return instructorCourses.filter(c => c.ownerOrgId === orgId && c.ownedByOrg).map(c => {
    return courses.find(c1 => c1.id === c.courseId);
  });
}

// Get all course schedules for an org
export function getOrgCourseSchedules(orgId: number): CourseSchedule[] {
  return courseSchedules.filter(cs => cs.forOrgId === orgId);
}

// Get all learner enrollments for an org
export function getOrgLearnerCourses(orgId: number): Partial<LearnerCourse>[] {
  const orgLearnerIds = learners.filter(l => l.orgId === orgId).map(l => l.userId);
  return learnerCourses.filter(lc => orgLearnerIds.includes(lc.learnerId));
}

// Get all guest joins for an org
export function getOrgLearnerGuestJoins(orgId: number): LearnerGuestJoin [] {
  const orgLearnerIds = learners.filter(l => l.orgId === orgId).map(l => l.userId);
  return learnersGuestJoins.filter(lg => orgLearnerIds.includes(lg.learnerId)) as LearnerGuestJoin[];
}

// Get all course stats for an org (aggregate)
export function getOrgCourseStats(orgId: number): CourseStats {
  // Placeholder: return all instructorCourses for this org with stats fields if available
  const courses = getOrgCourses(orgId);
  return courses.reduce((acc, course) => {
    const courseStats = getStatsForCourses([course.id]);
    acc.enrollments += courseStats.enrollments || 0;
    acc.completions += courseStats.completions || 0;
    acc.attended += courseStats.attended || 0;
    acc.absentees += courseStats.absentees || 0;
    acc.totalSessions += courseStats.totalSessions || 0;
    acc.totalSessionsCompleted += courseStats.totalSessionsCompleted || 0;
    acc.totalFutureSessions += courseStats.totalFutureSessions || 0;
    return acc;
  }, {
    id: 0, // Placeholder ID
    type: 'org', // Custom type for org stats
    enrollments: 0,
    completions: 0,
    attended: 0,
    absentees: 0,
    totalSessions: 0,
    totalSessionsCompleted: 0,
    totalFutureSessions: 0,
  });
}


// Get all orgs with their courses and schedules (deep info)
export function getOrgsWithCoursesAndSchedules(orgid: number): OrgCoursesSchedules {
  const org = orgs.find(o => o.id === orgid);
  if (!org) {
    return null
  }

  const courses2 = getOrgCourses(orgid);
  const schedules2 = getAllCourseSchedules().filter(cs => cs.course.ownerOrgId === orgid);

  return {
    org: org,
    courses: courses2,
    schedules: schedules2
  };
}

// Get all course info for an org
export function getOrgCourseInfo(orgId: number): Partial<OrgCourse>[] {
  return instructorCourses.filter(c => c.ownerOrgId === orgId && c.ownedByOrg).map(c => ({
    ...c,
    orgId: orgId,
    courseId: c.id,
    industryId: c.ownerInstructorId,
    whenStartedToCreate: c.whenStartedToCreate || new Date().toISOString(),
    revisionHistory: c.revisionHistory || [],
    comments: c.comments || [],
    whenPublished: c.whenPublished || null,
  }));
}

export function getCoursesInfo(orgid: number, instructorIds: number[], learnerIds: number[]): OrgCoursesInfo {
  const org = orgs.find(o => o.id === orgid);

  if (!org) return null;
  const orgId = org.id;

  const learnerCoursesStats = getStatsForCourses(learnerIds.map(learnerId => getLearnerCourses(learnerId)).flat().map(lc => lc.id));
  learnerCoursesStats.type = 'course';
  const instructorCoursesStats = getStatsForCourses(instructorIds.map(instructorId => getInstructorsCourses([instructorId])).flat().map(ic => ic.id));
  instructorCoursesStats.type = 'course';

  return {
    orgId: orgId,
    learnerUserIds: learnerIds,
    instructorUserIds: instructorIds,

    learnerCourses: learnerIds.map(learnerId => getLearnerCourses(learnerId)).flat(),
    instructorCourses: instructorIds.map(instructorId => getInstructorsCourses([instructorId])).flat(),

    learnerCoursesSchedules: learnerIds.map(learnerId => getLearnerAllCoursesSchedule(learnerId)).flat().map(s => s.schedules).flat(),
    lnstructorCoursesSchedules: instructorIds.map(instructorId => getInstructorCourses(instructorId)).flat().map(c => c.courseScheduleIds).flat().map(id => courseSchedules.find(cs => cs.scheduleId === id)).filter(s => s !== undefined),

    learnerCoursesStats: learnerCoursesStats,

    instructorCoursesStats: instructorCoursesStats,

    guestCourses: learnerIds.map(learnerId => getLearnerGuestJoins(learnerId)).flat(),
    learnerWishlistCourses: learnerIds.map(learnerId => getLearnerWishlist(learnerId)).flat(),
    learnerLearningIntentCourseIds: learnerIds.map(learnerId => getLearnerCourses(learnerId)).flat().map(lc => {
      return getCourseIntentInfo(lc.id);
    }).flat()
  };
}

// Get all info for an org (deep)
export function getOrgFullInfo(orgId: number): OrgInfo {
  const org = orgs.find(o => o.id === orgId);
  if (!org) return null;

  const memberInfo: OrgMemberInfo = orgMemberInfo.find(o => o.orgId === orgId) || {
    orgId: orgId,
    primaryContactUserId: null,
    courseManagerUserId: null,
    grievanceContactUserId: null,
  };


  return {
    orgId: orgId,
    org,
    registrationInfo: orgRegistration.find(o => o.orgId == orgId),
    memberInfo:memberInfo,
    coursesInfo: getCoursesInfo(orgId,
      getOrgInstructors(orgId).map(i => i.userId),
      getOrgLearners(orgId).map(l => l.userId)
    )
  };
}


