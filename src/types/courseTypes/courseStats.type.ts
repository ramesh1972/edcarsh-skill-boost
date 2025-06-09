export type StatsType = 'schedule' | 'course' | 'subject' | 'industry' | 'learner' |'instructor' | 'org' | 'all';

export interface CourseStats {
    id: number;
    type: StatsType;
    enrollments: number;
    completions: number;
    attended:number;
    absentees: number;
    totalSessions: number;
    totalSessionsCompleted: number;
    totalFutureSessions: number;
}
