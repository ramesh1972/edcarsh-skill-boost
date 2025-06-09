import { Course } from './course.type';
import { CourseSchedule } from './courseSchedule.type';
import { CourseStats } from './courseStats.type';
import { ExpiredCourseIntent } from './expiredCourse.type';
import { ExpressCourseIntent } from './expressCourseIntent.type';
import { NewCourse, NewCourseIntent } from './newCourse.type';

export interface DeepCourseInfo extends Course {
    schedules: CourseSchedule[] | null;
    intents: CourseIntentInfo[] | null;
    stats: CourseStats;
}

export interface CourseIntentInfo  {
    learnerId: number;
    newCourseIntent: NewCourseIntent | null;
    expressedCourseIntent: ExpressCourseIntent | null;
    expiredCourseIntent: ExpiredCourseIntent | null;
}
