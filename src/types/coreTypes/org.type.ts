import { CourseIntentInfo, DeepCourseInfo } from "../courseTypes/courseInfo.type";
import { CourseSchedule } from "../courseTypes/courseSchedule.type";
import { CourseStats } from "../courseTypes/courseStats.type";
import { InstructorCourse } from "../courseTypes/InstructorCourse.type";
import { LearnerCourse, LearnerGuestJoin, LearnerWishlistItem } from "../courseTypes/learnerCourses.type";
import { OrgCoursesInfo } from "../courseTypes/orgCourses.type";
import { Instructor, Learner, User } from "./user.type";

export enum OrgType {
    NOORG = 0,
    SCHOOL = 1,
    COLLEGE = 2,
    UNIVERSITY = 3,
    TRAINING_INSTITUTE = 4,
    CORPORATE = 5,
    GROUP = 6,
    SUPERORG = 7
}

export interface Org {
    id: number;
    name: string;
    orgTypeId: OrgType;

    address: string;
    city: string;
    country: string;

    contactEmail: string;
    contactPhone: string;

    isGuestOrg?: boolean; // Optional, true if this is a guest organization

    logoUrl?: string; // Optional, URL to the organization's logo
    description?: string; // Optional, description of the organization
    websiteUrl?: string; // Optional, URL to the organization's websit
}

export interface OrgRegistrationInfo {
    orgId?: number; // Optional, if this is a new organization registration

    isActive?: boolean; // Optional, true if the organization is active
    isDeleted?: boolean; // Optional, true if the organization is deleted

    isLocked?: boolean; // Optional, true if the organization is locked
    lockedUntil?: string; // ISO date string, optional
    lockedReason?: string; // Optional, reason for locking the organization

    approvedBy?: number; // User ID of the approver, optional
    approvedOn?: string; // ISO date string, optional
    approvedReason?: string; // Optional, reason for approval
    rejectedBy?: number; // User ID of the rejector, optional
    rejectedOn?: string; // ISO date string, optional
    rejectedReason?: string; // Optional, reason for rejection

    isEmailVerified?: boolean; // Optional, true if the organization's email is verified
    isPhoneVerified?: boolean; // Optional, true if the organization's phone is verified

    createdOn?: string; // ISO date string, optional
    updatedOn?: string; // ISO date string, optional
    createdBy?: number; // User ID of the creator, optional
    updatedBy?: number; // User ID of the last updater, optional
}

export interface OrgMemberInfo {
    orgId: number;
    org?: Org

    superAdminUserId?: number; // Optional, if this is a new organization registration
    superAdminUser?: User; // User ID from the users table

    adminUsers?: OrgAdminInfo[]; // Array of user IDs from the users table
    headInstructorUsers?: OrgHeadInstructorInfo[]; // Array of user IDs from the users table

    memberIntructorUsers?: Partial<Instructor>[]; // Array of user IDs from the users table
    memberLearnerUsers?: Partial<Learner>[]; // Array of user IDs from the users table

    primaryContactUserId: number; // User ID from the users table
    courseManagerUserId: number; // User ID from the users table
    grievanceContactUserId: number; // User ID from the users table

    primaryContactUser?: User; // User ID from the users table
    courseManagerUser?: User; // User ID from the users table
    grievanceContactUser?: User; // User ID from the users table
}

// -----------
export interface OrgAdminInfo  {
    orgId: number;
    adminUserId: number; // User ID from the users tabl
    intructorUserIds: number[]; // Array of user IDs from the users table
    learnerUserIds: number[]; // Array of user IDs from the users table

    coursesInfo?: OrgCoursesInfo; // Optional, if this is an admin's view
}

export interface OrgHeadInstructorInfo  {
    orgId: number;
    headInstructorUserId: number; // User ID from the users table
    intructorUserIds: number[]; // Array of user IDs from the users table
    learnerUserIds: number[]; // Array of userIDs from the users table
    coursesInfo?: OrgCoursesInfo; // Optional, if this is a head instructor's view
}

// ---- full Org info
export interface OrgInfo {
    orgId?: number; // Optional, if this is a new organization registration
    org: Org;

    registrationInfo?: OrgRegistrationInfo;
    memberInfo?: OrgMemberInfo;
    coursesInfo?: OrgCoursesInfo;
}

export interface SuperOrgInfo extends OrgInfo {
    superOrgId: number; // ID of the super organization, if applicable
    orgInfo?: OrgInfo; // Information about the super organization itself
    arrayOfOrgIds: number[]; // Array of organization IDs under the super organization
    arrayOfOrgs?: OrgInfo[]; // Array of organizations under the super organization
}






