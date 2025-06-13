import { Course } from "./course.type";

export interface CourseScheduleSessionDay {
  scheduleId?: number; // Optional for future sessions
  courseId?: number; // Optional for future sessions

  sessionDate: string;
  actualSessionStartTime: string; // New: actual start time for the session

  recordingLink: string | null;
  actualDuration: number;
  sessionStatus: string; // New: status of the session (e.g. 'completed', 'missed', 'upcoming')

  numberOfStudentsEnrolled: number;
  numberOfStudentsAttended: number;
  absentStudentIds: number[];
  attendedStudentIds: number[];
}

export interface CourseSchedule {
  scheduleId: number;
  course?: Course;
  courseId: number;
  byInstructorId: number;
  forOrgId: number;

  startDate: string;
  endDate: string;
  nextSession: string;
  normalSessionStart: string; // New: normal session start time (e.g. '09:00')
  daysOfWeek: string[]; // New: days of week (0=Sunday, 1=Monday, ...)

  mode: string;
  price: string;

  learnersEnrolledIds: number[];
  guestLearnersEnrolledIds: number[];
  sessionDays: CourseScheduleSessionDay[];

  isPast?: boolean; // New: indicates if the schedule is for past sessions
  isActive?: boolean;
  isFuture?: boolean; // New: indicates if the schedule is for future sessions
}
