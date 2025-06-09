export interface ExpiredCourseIntent {
  courseId?: number;
  learnerId: number;
  expressedOn: string; // ISO date string
}

export interface ExpiredCourse {
  courseId: number;
  intents: ExpiredCourseIntent[];
}
