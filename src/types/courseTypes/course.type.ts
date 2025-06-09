export type CourseStatusType =
  | 'userIntentAccepted'
  | 'userIntentRejected'
  | 'courseCreationNotStarted'
  | 'courseCreationInProgress'
  | 'courseUpdationInProgress'
  | 'courseDeleted'
  | 'courseNotInSchedule'
  | 'courseExpired'
  | 'couseInActive'
  | 'coursemadePublic'
  | 'courseMadePrivate'
  | 'courseUndeleted'
  | 'couseActive';

export interface CourseStatusChange {
  status: CourseStatusType;
  reasonForStatusChange?: string;
  statusChangedBy?: number; // userId or adminId
  date: string; // ISO date string
}

export const courseStatusTypes: CourseStatusType[] = [
  'userIntentAccepted',
  'userIntentRejected',
  'courseCreationNotStarted',
  'courseCreationInProgress',
  'courseUpdationInProgress',
  'courseDeleted',
  'courseNotInSchedule',
  'courseExpired',
  'couseInActive',
  'coursemadePublic',
  'courseMadePrivate',
  'courseUndeleted',
  'couseActive',
];

export interface Course {
  id: number;
  title: string;
  description: string;
  mediumDescription: string;
  longDescription: string;
  tags: string[];
  courseTopics: Array<{
    title: string;
    children: Array<{ title: string }>;

  }>;

  subjectId: number;
  industryId: number;
  image: string;
  createdBy: number;
  createdOn: string;
  modifiedBy: number;
  modifiedOn: string;
  durationHours: number;
  dailySessionDuration: number;
  level: string;
  mode: string;
  hasTools: boolean;
  isNewCourse?: boolean;
  isIntentCourse?: boolean;
  isActiveCourse?: boolean;
  isExpiredCourse?: boolean;
  isActive: boolean;
  isPublic: boolean;
  isDeleted: boolean;
  courseStatusHistory: CourseStatusChange[];

  ownerOrgId: number;
  ownerInstructorId: number;
  ownedByOrg: boolean;
}

