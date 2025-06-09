import { Course } from "./course.type";
import { CourseRevision, CourseComment } from "./courseRevisionHistory.type";

export interface InstructorCourse extends Course {
  courseId: number;
  instructorId: number;
  whenStartedToCreate: string;
  revisionHistory: CourseRevision[];
  comments: CourseComment[];
  whenPublished?: string;
  courseScheduleIds: number[];
}
