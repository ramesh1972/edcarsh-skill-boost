
import { Learner, Course, CourseSchedule, CourseScheduleSessionDay, ExpressCourseIntent, CourseStatusChange } from '../types';
import { LearnerCourse, LearnerWishlistItem, LearnerGuestJoin } from '../types/courseTypes/learnerCourses.type';

import { learners } from '../data/usersData/learners';
import { learnerCourses, learnersWishlist, learnersGuestJoins } from '../data/coursesData/learnerCourses';
import { courses } from '../data/coursesData/courses';
import { courseSchedules } from '../data/coursesData/courseSchedules';
import { expressCourseIntents } from '../data/coursesData/expressCourseIntents';

import { getAllCourseIntentsInfo, getCourseInfo, getCourseSchedule, getCourseSchedules, getCoursesSchedulesByIds } from './coursesDataAdapter';

/**
 * Get a learner by ID
 */
export function getLearnerById(learnerId: number): Partial<Learner> | undefined {
    return learners.find(l => l.id === learnerId);
}

/**
 * Get a course for a learner by courseId (enrolled)
 */
export function getLearnerCourse(learnerId: number, courseId: number): Course | undefined {
    const enrolled = learnerCourses.find(lc => lc.learnerId === learnerId && lc.id === courseId);
    if (!enrolled) return undefined;
    return courses.find(c => c.id === courseId);
}

/**
 * Get all courses for a learner (enrolled)
 */
export function getLearnerCourses(learnerId: number): Course[] {
    return learnerCourses
        .filter(lc => lc.learnerId === learnerId)
        .map(lc => courses.find(c => c.id === lc.id))
        .filter(Boolean) as Course[];
}

/**
 * Get all courses a learner has expressed intent for
 */
export function getLearnerIntentedCourses(learnerId: number): Course[] {
    const intents = getAllCourseIntentsInfo();
    const intentCourses = intents
        .filter(intent => intent.learnerId === learnerId);

    const promptIntentsCourses = intents.map(intent => {
        if (intent.expressedCourseIntent) {
            return getCourseInfo(intent.expressedCourseIntent.courseId);
        }
    }).filter(Boolean) as Course[];    
    
    const newIntentsCourses = intents.map(intent => {
        if (intent.newCourseIntent) {
            return getCourseInfo(intent.newCourseIntent.courseId);
        }
    }).filter(Boolean) as Course[];

    return [...promptIntentsCourses, ...newIntentsCourses].filter(Boolean);
}

/**
 * Get all session info for a learner's course
 */
export function getLearnerCourseSchedule(learnerId: number, courseId: number): (Course & { schedules: CourseSchedule[] }) {
    const enrolled = learnerCourses.find(lc => lc.learnerId === learnerId && lc.id === courseId);
    if (!enrolled) return { schedules: [] } as Course & { schedules: CourseSchedule[] };

    const courseWithSchedules = getCourseSchedules(courseId);
    return courseWithSchedules;
}

/**
 * Get all session info for all courses of a learner
 */
export function getLearnerAllCoursesSchedule(learnerId: number): (Course & { schedules: CourseSchedule[] })[] {
    const learner = getLearnerById(learnerId);
    if (!learner) return [];
    const learnerCourses2 = getLearnerCourses(learnerId);
    if (learnerCourses2.length === 0) return [];

    return getCoursesSchedulesByIds(learnerCourses2.map(c => c.id));
}

/**
 * Get the current (ongoing) session for a learner (if any)
 */
export function getLeanerCurrentSessions(learnerId: number): CourseScheduleSessionDay[] | undefined {
    const today = new Date();
    const courseSchedules = getLearnerAllCoursesSchedule(learnerId);

    const sessions = [];
    courseSchedules.forEach(cs => {
        cs.schedules.forEach(schedule => {
            schedule.sessionDays.forEach(session => {
                const sessionDate = new Date(session.sessionDate);
                // Treat session as 'current' if it's today
                if (sessionDate.getFullYear() === today.getFullYear() &&
                    sessionDate.getMonth() === today.getMonth() &&
                    sessionDate.getDate() === today.getDate() &&
                    session.sessionStatus === 'ongoing') {
                    session.scheduleId = schedule.scheduleId; // Add scheduleId to session
                    session.courseId = cs.id; // Add courseId to session
                    sessions.push(session);
                }
            });
        });
    });

    if (!sessions || sessions.length === 0) return null;

    return sessions.sort((a, b) => new Date(a.sessionDate + 'T' + a.actualSessionStartTime).getTime() - new Date(b.sessionDate + 'T' + b.actualSessionStartTime).getTime());
}

/**
 * Get all sessions for a learner that are scheduled for today
 */
export function getLearnersTodaysSessions(learnerId: number): CourseScheduleSessionDay[] {
    const today = new Date();
    const courseSchedules = getLearnerAllCoursesSchedule(learnerId);

    const sessions = [];
    courseSchedules.forEach(cs => {
        cs.schedules.forEach(schedule => {
            schedule.sessionDays.forEach(session => {
                const sessionDate = new Date(session.sessionDate);
                // Treat session as 'current' if it's today
                if (sessionDate.getFullYear() === today.getFullYear() &&
                    sessionDate.getMonth() === today.getMonth() &&
                    sessionDate.getDate() === today.getDate()) {
                    session.scheduleId = schedule.scheduleId; // Add scheduleId to session
                    session.courseId = cs.id; // Add courseId to session
                    sessions.push(session);
                }
            });
        });
    });

    if (!sessions || sessions.length === 0) return null;

    return sessions.sort((a, b) => new Date(a.sessionDate + 'T' + a.actualSessionStartTime).getTime() - new Date(b.sessionDate + 'T' + b.actualSessionStartTime).getTime());
}

/**
 * Get the next N upcoming sessions for a learner
 */
export function getLearnerNextNsession(learnerId: number, n: number): CourseScheduleSessionDay[] {
    const now = new Date();
    const sessions = getLearnersTodaysSessions(learnerId)
        .filter(s => new Date(s.sessionDate) > now)
        .sort((a, b) => new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime());

    if (!sessions || sessions.length === 0) return [];

    const sessions2 = sessions.sort((a, b) => new Date(a.sessionDate + 'T' + a.actualSessionStartTime).getTime() - new Date(b.sessionDate + 'T' + b.actualSessionStartTime).getTime());
    return sessions2.slice(0, n);
}

/**
 * Get all cancelled sessions for a learner (not supported by current CourseStatusChange type)
 * Not implemented: always returns empty array.
 */
export function getLearnerCancelledSessions(learnerId: number): CourseScheduleSessionDay[] {
    const today = new Date();
    const courseSchedules = getLearnerAllCoursesSchedule(learnerId);

    const sessions = [];
    courseSchedules.forEach(cs => {
        cs.schedules.forEach(schedule => {
            schedule.sessionDays.forEach(session => {
                const sessionDate = new Date(session.sessionDate);
                // Treat session as 'current' if it's today
                if (session.sessionStatus === 'cancelled') {
                    sessions.push(session);
                }
            });
        });
    });

    if (!sessions || sessions.length === 0) return null;

    return sessions.sort((a, b) => new Date(a.sessionDate + 'T' + a.actualSessionStartTime).getTime() - new Date(b.sessionDate + 'T' + b.actualSessionStartTime).getTime());
}


/**
 * Get all upcoming sessions for a learner
 */
export function getLearnerUpcomingSessions(learnerId: number): CourseScheduleSessionDay[] {
    const now = new Date();
    const courseSchedules = getLearnerAllCoursesSchedule(learnerId);

    const sessions = [];
    courseSchedules.forEach(cs => {
        cs.schedules.forEach(schedule => {
            schedule.sessionDays.forEach(session => {
                const startTime = new Date(session.sessionDate + 'T' + session.actualSessionStartTime);
                // Treat session as 'upcoming' if it's in the future
                if (startTime >= now && session.sessionStatus !== 'cancelled') {
                    session.scheduleId = schedule.scheduleId; // Add scheduleId to session
                    session.courseId = cs.id; // Add courseId to session
                    sessions.push(session);
                }
            });
        });
    });

    if (!sessions || sessions.length === 0) return [];

    return sessions.sort((a, b) => new Date(a.sessionDate + 'T' + a.actualSessionStartTime).getTime() - new Date(b.sessionDate + 'T' + b.actualSessionStartTime).getTime());
}

/**
 * Get all enrolled courses for a learner (with resolved Course and CourseSchedule objects)
 */
export function getLearnerEnrolledCourses(learnerId: number): LearnerCourse[] {
    const learnerCourses2 = learnerCourses
        .filter(lc => lc.learnerId === learnerId);
    if (learnerCourses2.length === 0) return [];

    return learnerCourses2.map(lc => {
        const course = courses.find(c => c.id === lc.id);
        if (!course) return null;

        return {
            ...course,
            learnerId: lc.learnerId,
            enrolledAt: lc.enrolledAt,
            courseScheduleIds: lc.courseScheduleIds || []
        } as LearnerCourse;
    }).filter(Boolean) as LearnerCourse[];
}

/**
 * Get a learner's wishlist (resolved Course objects)
 */
export function getLearnerWishlist(learnerId: number): LearnerWishlistItem[] {
    const learnerWishListCourses2 = learnersWishlist
        .filter(lc => lc.learnerId === learnerId);
    if (learnerWishListCourses2.length === 0) return [];

    return learnerWishListCourses2.map(wl => {
        const course = courses.find(c => c.id === wl.id);
        if (!course) return null;

        return {
            ...course,
            learnerId: wl.learnerId,
            addedAt: wl.addedAt,
            isRemoved: wl.isRemoved,
            whenRemoved: wl.whenRemoved,
            courseScheduleIds: wl.courseScheduleIds || []
        } as LearnerWishlistItem;
    }).filter(Boolean) as LearnerWishlistItem[];
}

/**
 * Get all guest join events for a learner (resolved Course and CourseSchedule objects)
 */
export function getLearnerGuestJoins(learnerId: number): LearnerGuestJoin[] {
    return learnersGuestJoins
        .filter(gj => gj.learnerId === learnerId)
        .map(gj => {
            const course = courses.find(c => c.id === gj.id);
            if (!course) return null;
            return {
                ...course,
                learnerId: gj.learnerId,
                whenDecidedToJoinAsGuest: gj.whenDecidedToJoinAsGuest,
                joined: gj.joined,
                courseScheduleId: gj.courseScheduleId || null
            } as LearnerGuestJoin;
        }).filter(Boolean) as LearnerGuestJoin[];
}
