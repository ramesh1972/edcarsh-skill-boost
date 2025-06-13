import { Course } from "./course.type";

export interface ExpiredCourseIntent {
  courseId?: number;
  learnerId: number;
  expressedOn: string; // ISO date string
}

export interface ExpiredCourse extends Partial<Course> {
  courseId: number;
  intents: ExpiredCourseIntent[];
}
