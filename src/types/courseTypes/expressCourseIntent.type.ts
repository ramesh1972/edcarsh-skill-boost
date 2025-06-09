import { UserExpertiseLevel } from "../coreTypes/user.type";
import { Course } from "./course.type";

export interface ExpressCourseIntent extends Course {
    courseId: number;
    orgId: number; // organizationId
    intentId: number;
    intentBy: number; // userId (instructor, admin, etc.)
    intent: string; // e.g., "create", "update", "delete"
    intentDate: string; // ISO date string
    intentStatus: 'pending' | 'accepted' | 'rejected'; // status of the intent
    intentTopics: string[]; // topics the intent is related to
    intentDescription?: string; // optional description of the intent
    intentGoal?: string; // optional goal of the intent
    intentExpertiseLevel?: UserExpertiseLevel; // expertise level required for the intent
    preferredTime?: string; // preferred time for the intent, ISO date string
    preferredDuration?: number; // preferred duration in hours
};