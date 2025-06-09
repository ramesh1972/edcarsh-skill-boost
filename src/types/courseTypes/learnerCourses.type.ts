import { Course } from "./course.type";

export interface LearnerCourse extends Course {
    learnerId: number;
    courseId: number; // The course ID
    enrolledAt: string; // ISO date string
    courseScheduleIds?: number[];
}

export interface LearnerWishlistItem extends Course {
    learnerId: number;
    courseId: number; // The course ID
    addedAt: string; // ISO date string
    isRemoved: boolean;
    whenRemoved?: string; // ISO date string, if removed
    courseScheduleIds?: number[];
}

export interface LearnerGuestJoin extends Course {
    learnerId: number;
    courseId: number; // The course ID
    whenDecidedToJoinAsGuest: string; // ISO date string
    joined: boolean;
    courseScheduleId?: number; // The schedule when joined, if any
}
