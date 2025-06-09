import { Course } from "./course.type";

export interface NewCourseIntent {
  courseId?: number;
  learnerId: number;
  expressedOn: string; // ISO date string
}

export interface NewCourse extends Course {
  courseId: number;
  intents: NewCourseIntent[];
}
