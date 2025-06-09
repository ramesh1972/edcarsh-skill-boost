// Adapter to combine normalized course data into a shape compatible with the legacy Course[] type
import { courses } from '../data/coursesData/courses';
import { courseSchedules } from '../data/coursesData/courseSchedules';
import { newCourses } from '../data/coursesData/newCourses';
import { expressCourseIntents } from '../data/coursesData/expressCourseIntents.ts';
import { expiredCourses } from '../data/coursesData/expiredCourses';
import { Course, CourseStatusChange } from '../types/courseTypes/course.type';
import { CourseSchedule } from '../types/courseTypes/courseSchedule.type';
import { ExpressCourseIntent } from '../types/courseTypes/expressCourseIntent.type.ts'
import { NewCourse, NewCourseIntent } from '../types/courseTypes/newCourse.type';
import { ExpiredCourse, ExpiredCourseIntent } from '../types/courseTypes/expiredCourse.type';
import { CourseStats, StatsType } from '../types/courseTypes/courseStats.type';
import { DeepCourseInfo, CourseIntentInfo } from '../types/courseTypes/courseInfo.type';

// =====================
// 1. Course Info Section
// =====================
export function getCourseInfo(courseId: number): Course | null {
    const meta = courses.find((m: Course) => m.id === courseId);
    if (!meta) return null;
    // Check if courseId is in newCourses or expiredCourses
    const isNewCourse = newCourses.some((nc: NewCourse) => nc.courseId === courseId);
    const isIntentCourse = expressCourseIntents.some((ei: ExpressCourseIntent) => ei.courseId === courseId);
    const isActiveCourse = courseSchedules.some((s: CourseSchedule) => s.courseId === courseId && new Date(s.startDate) <= new Date() && new Date(s.endDate) >= new Date());
    const isExpiredCourse = expiredCourses.some((ec: ExpiredCourse) => ec.courseId === courseId);
    return {
        ...meta,
        isNewCourse,
        isIntentCourse,
        isActiveCourse,
        isExpiredCourse,
    };
}

export function getCourseInfoByIds(courseIds: number[]): Course[] {
    return courseIds.map(id => {
        const meta = courses.find((m: Course) => m.id === id);
        return meta || null;
    }).filter(Boolean) as Course[];
}

export function getCourseInfoByIndustryAndSubject(industryId?: number, subjectId?: number): Course[] {
    let filtered = courses as Course[];
    if (industryId) filtered = filtered.filter(m => m.industryId === industryId);
    if (subjectId) filtered = filtered.filter(m => m.subjectId === subjectId);
    return filtered;
}

export function getAllCourseInfo(): Course[] {
    return courses as Course[];
}

// =====================
// 1b. Deep Info Section
// =====================
export function getCourseInfoDeep(courseId: number): DeepCourseInfo | null {
    const meta = getCourseInfo(courseId);
    if (!meta) return null;
    return {
        ...meta,
        schedules: courseSchedules.filter((s: CourseSchedule) => s.courseId === courseId) || null,
        intents: getCourseIntentInfo(courseId),
        stats: getStatsForCourse(courseId)
    };
}

export function getCoursesInfoDeep(courseIds: number[]): DeepCourseInfo[] {
    return courseIds.map(id => getCourseInfoDeep(id)).filter(Boolean) as DeepCourseInfo[];
}

export function getCoursesInfoDeepByIndustryAndSubject(industryId?: number, subjectId?: number): DeepCourseInfo[] {
    let filtered = courses as Course[];
    if (industryId) filtered = filtered.filter(m => m.industryId === industryId);
    if (subjectId) filtered = filtered.filter(m => m.subjectId === subjectId);
    return filtered.map(meta => getCourseInfoDeep(meta.id)).filter(Boolean) as DeepCourseInfo[];
}

// =====================
// 2. Intended Course Info Section
// =====================
export function getCourseIntentInfo(courseId: number): CourseIntentInfo[] | null {
    const intent = expressCourseIntents.find((i: ExpressCourseIntent) => i.courseId === courseId);
    const newCourse = newCourses.find((nc: NewCourse) => nc.courseId === courseId);
    const expiredCourse = expiredCourses.find((ex: ExpiredCourse) => ex.courseId === courseId);

    const meta = courses.find((m: Course) => m.id === courseId);

    if (!meta) return null;

    const totalIntents: CourseIntentInfo[] = [];

    if (intent) {
        totalIntents.push({
            learnerId: intent.intentBy,
            expressedCourseIntent: { ...meta, ...intent },
            newCourseIntent: null,
            expiredCourseIntent: null
        });
    }

    if (newCourse) {
        const intents2 = newCourse.intents.map((i: NewCourseIntent) => ({
            learnerId: i.learnerId,
            courseId: i.courseId,
            expressedCourseIntent: null,
            expiredCourseIntent: null,
            newCourseIntent: { ...meta, ...i }
        }));

        if (intents2 && intents2.length > 0)
            totalIntents.push(...intents2);
    }

    if (expiredCourse) {
        const intents2 = expiredCourse.intents.map((i: ExpiredCourseIntent) => ({
            learnerId: i.learnerId,
            courseId: i.courseId,
            expressedCourseIntent: null,
            newCourseIntent: null,
            expiredCourseIntent: { ...meta, ...i }
        }));

        if (intents2 && intents2.length > 0)
            totalIntents.push(...intents2);
    }

    return totalIntents;
}

export function getAllCourseIntentsInfo(): CourseIntentInfo[] {
    const intents = expressCourseIntents.map((intent: ExpressCourseIntent) => {
        const meta = courses.find((m: Course) => m.id === intent.courseId);
        if (!meta) return null;
        return [{
            learnerId: intent.intentBy,
            courseId: meta.id,
            expressedCourseIntent: null,
            expiredCourseIntent: null,
            newCourseIntent: { ...meta, ...intent }
        }]
    });

    const newCourseIntents = newCourses.map((newCourse: NewCourse) => {
        const meta = courses.find((m: Course) => m.id === newCourse.courseId);
        if (!meta) return null;
        return newCourse.intents.map((i: NewCourseIntent) => ({
            learnerId: i.learnerId,
            courseId: meta.id,
            expressedCourseIntent: null,
            expiredCourseIntent: null,
            newCourseIntent: { ...meta, ...i }
        }));
    });

    const expiredCourseIntents = expiredCourses.map((expiredCourse: ExpiredCourse) => {
        const meta = courses.find((m: Course) => m.id === expiredCourse.courseId);
        if (!meta) return null;
        return expiredCourse.intents.map((i: ExpiredCourseIntent) => ({
            learnerId: i.learnerId,
            courseId: meta.id,
            expressedCourseIntent: null,
            expiredCourseIntent: null,
            newCourseIntent: { ...meta, ...i }
        }));
    });

    return ([...intents, ...newCourseIntents, ...expiredCourseIntents]
        .filter(Boolean)
        .flat() as CourseIntentInfo[]);
}

// =====================
// 3. Course Schedule Section
// =====================
export function getCourseSchedule(scheduleId: number): (Course & CourseSchedule) | null {
    const sch = courseSchedules.find((s: CourseSchedule) => s.scheduleId === scheduleId) || null;
    if (!sch) return null;
    const meta = courses.find((m: Course) => m.id === sch.courseId);
    if (!meta) return null;
    return {
        ...meta,
        ...sch,
    };
}

export function getCourseSchedules(courseId: number): (Course & { schedules: CourseSchedule[] }) | null {
    const schs = courseSchedules.filter((s: CourseSchedule) => s.courseId === courseId);
    if (schs.length === 0) return null;
    const meta = courses.find((m: Course) => m.id === courseId);
    if (!meta) return null;
    return { ...meta, schedules: schs };
}

export function getCoursesSchedulesByIds(courseIds: number[]): (Course & { schedules: CourseSchedule[] })[] {
    return courseIds.map(id => getCourseSchedules(id)).filter(Boolean) as (Course & { schedules: CourseSchedule[] })[];
}

export function getAllCourseSchedules(): CourseSchedule[] {
    return (courses as Course[]).map(meta => {
        const schedules = courseSchedules.filter((s: CourseSchedule) => s.courseId === meta.id);

        return schedules.map(s => ({

            courseId: meta.id,
            course: meta,
            ...s,
        }));
    }).flat();

}

export function getAlLCoursesScheduleForIndustryAndSubject(industryId?: number, subjectId?: number): (Course & { schedules: CourseSchedule[] | null })[] {
    let filtered = courses as Course[];
    if (industryId) filtered = filtered.filter(m => m.industryId === industryId);
    if (subjectId) filtered = filtered.filter(m => m.subjectId === subjectId);
    return filtered.map(meta => {
        const schedules = courseSchedules.filter((s: CourseSchedule) => s.courseId === meta.id);
        return {
            ...meta,
            schedules: schedules.length > 0 ? schedules : null
        };
    });
}

// =====================
// 4. Course Stats Section
// =====================
export function getStatsFromSchedule(schedule: CourseSchedule): CourseStats {
    if (!schedule.sessionDays) return {
        id: schedule.scheduleId,
        type: 'schedule',
        enrollments: 0,
        completions: 0,
        attended: 0,
        absentees: 0,
        totalSessions: 0,
        totalSessionsCompleted: 0,
        totalFutureSessions: 0,
    };
    return {
        id: schedule.scheduleId,
        type: 'schedule',
        enrollments: schedule.sessionDays.reduce((acc, d) => acc + (d.numberOfStudentsEnrolled || 0), 0),
        completions: schedule.sessionDays.reduce((acc, d) => acc + (d.sessionStatus === 'Completed' ? 1 : 0), 0),
        absentees: schedule.sessionDays.reduce((acc, d) => acc + (d.absentStudentIds?.length || 0), 0),
        attended: schedule.sessionDays.reduce((acc, d) => acc + (d.attendedStudentIds?.length || 0), 0),
        totalSessions: schedule.sessionDays.length,
        totalSessionsCompleted: schedule.sessionDays.filter(d => d.sessionStatus === 'Completed').length,
        totalFutureSessions: schedule.sessionDays.filter(d => new Date(d.sessionDate) > new Date()).length,
    };
}

export function getStatsForCourse(courseId: number): CourseStats {
    const schs = courseSchedules.filter((sch: CourseSchedule) => sch.courseId === courseId);
    const stats = schs.reduce((acc: Omit<CourseStats, 'id' | 'type'>, sch: CourseSchedule) => {
        const stat = getStatsFromSchedule(sch);
        return {
            enrollments: acc.enrollments + stat.enrollments,
            completions: acc.completions + stat.completions,
            attended: acc.attended + stat.attended,
            absentees: acc.absentees + stat.absentees,
            totalSessions: acc.totalSessions + stat.totalSessions,
            totalSessionsCompleted: acc.totalSessionsCompleted + stat.totalSessionsCompleted,
            totalFutureSessions: acc.totalFutureSessions + stat.totalFutureSessions,
        };
    }, {
        enrollments: 0,
        completions: 0,
        attended: 0,
        absentees: 0,
        totalSessions: 0,
        totalSessionsCompleted: 0,
        totalFutureSessions: 0,
    });
    return {
        id: courseId,
        type: 'course',
        ...stats
    };
}

export function getStatsForCourses(courseIds: number[]): CourseStats {
    // Aggregate stats for multiple courses (used for subject/industry)
    const schs = courseSchedules.filter((sch: CourseSchedule) => courseIds.includes(sch.courseId));
    const stats = schs.reduce((acc: Omit<CourseStats, 'id' | 'type'>, sch: CourseSchedule) => {
        const stat = getStatsFromSchedule(sch);
        return {
            enrollments: acc.enrollments + stat.enrollments,
            completions: acc.completions + stat.completions,
            attended: acc.attended + stat.attended,
            absentees: acc.absentees + stat.absentees,
            totalSessions: acc.totalSessions + stat.totalSessions,
            totalSessionsCompleted: acc.totalSessionsCompleted + stat.totalSessionsCompleted,
            totalFutureSessions: acc.totalFutureSessions + stat.totalFutureSessions,
        };
    }, {
        enrollments: 0,
        completions: 0,
        attended: 0,
        absentees: 0,
        totalSessions: 0,
        totalSessionsCompleted: 0,
        totalFutureSessions: 0,
    });
    // id and type will be set by the caller (subject/industry)
    return {
        id: -1, // placeholder, should be set by subject/industry functions
        type: 'course', // placeholder, should be set by subject/industry functions
        ...stats
    };
}

export function getStatsForSubject(subjectId: number): CourseStats {
    const courseIds = (courses as Course[]).filter(meta => meta.subjectId === subjectId).map(meta => meta.id);
    const stats = getStatsForCourses(courseIds);
    return {
        ...stats,
        id: subjectId,
        type: 'subject'
    };
}

export function getStatsForIndustry(industryId: number): CourseStats {
    const courseIds = (courses as Course[]).filter(meta => meta.industryId === industryId).map(meta => meta.id);
    const stats = getStatsForCourses(courseIds);
    return {
        ...stats,
        id: industryId,
        type: 'industry'
    };
}

export function getAllCoursesStats(): CourseStats {
    const courseIds = (courses as Course[]).map(m => m.id);
    const stats = getStatsForCourses(courseIds);
    return {
        ...stats,
        id: 0,
        type: 'all'
    };
}
