import { Org } from "../coreTypes/org.type";
import { Course } from "./course.type";
import { CourseIntentInfo, DeepCourseInfo } from "./courseInfo.type";
import { CourseRevision, CourseComment } from "./courseRevisionHistory.type";
import { CourseSchedule } from "./courseSchedule.type";
import { CourseStats } from "./courseStats.type";
import { InstructorCourse } from "./InstructorCourse.type";
import { LearnerCourse, LearnerGuestJoin, LearnerWishlistItem } from "./learnerCourses.type";

export interface OrgCoursesInfo {
  orgId: number; // The organization ID

  learnerUserIds: number[]; // Array of user IDs from the users table
  instructorUserIds: number[]; // Array of user IDs from the users table

  learnerCourses: Partial<LearnerCourse>[]; // Array of course IDs from the courses table
  instructorCourses: Partial<InstructorCourse>[]; // Array of course IDs from the courses table

  learnerCoursesSchedules: CourseSchedule[]; // Array of course schedule IDs from the course_schedules table
  lnstructorCoursesSchedules: CourseSchedule[]; // Array of course schedule IDs from the course_schedules table

  learnerCoursesStats: CourseStats; // Array of course stats from the courses_stats table
  instructorCoursesStats: CourseStats; // Array of course stats from the courses_stats table

  guestCourses: Partial<LearnerGuestJoin>[]; // Array of course IDs from the courses table
  learnerWishlistCourses: LearnerWishlistItem[]; // Array of course IDs from the courses table
  learnerLearningIntentCourseIds: CourseIntentInfo[]; // Array of course IDs from the courses table

  // TO DO add schedule info for instructor courses
}

export interface OrgCoursesSchedules {
  org: Org; // The organization ID  
  schedules: CourseSchedule[]; 
  courses: Course[]; 
}

export interface OrgCourse extends InstructorCourse {
  courseId: number;
  instructorId: number;
  orgId: number;
}

export interface OrgDeepCourseInfo  extends DeepCourseInfo {
  orgId: number; // The organization ID
  courseId: number;
}