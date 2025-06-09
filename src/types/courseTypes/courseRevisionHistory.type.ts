export interface CourseRevision {
  revisionId: number;
  date: string;
  changes: string;
}

export interface CourseComment {
  courseId: number;
  instructorId: number; // userId of the instructor
  orgId: number; // organizationId
  commentId: number;
  revisionId: number;
  commentBy: number; // userId (instructor, admin, etc.)
  comment: string;
  resolved: boolean;
  commentOverComment?: number; // commentId this is replying to
  date: string;
}