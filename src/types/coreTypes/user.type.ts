import { RoleType } from './role.type';

export enum UserExpertiseLevel {
    BEGINNER = 1,   // Beginner level
    INTERMEDIATE = 2, // Intermediate level
    ADVANCED = 3    // Advanced level
}

export interface User {
    id: number;
    salutation?: string;
    firstName: string;
    lastName: string;
    gender?: string;
    dateOfBirth?: string;

    email: string;
    phone?: string;
    whatsAppNo?: string;
    preferredContactMethods: string[]   // e.g., ['email', 'phone', 'whatsapp']
    
    image: string;
    avatar?: string;

    about?: string;
    occupation: string;

    country?: string;
    city?: string;
    state?: string;
    address?: string;
    zipCode?: string;
    timezone: string; // Default to Indian Standard Time

    language?: string; // ISO 639-1 code, e.g., 'en', 'fr', 'es'

    preferredLanguage?: string; // ISO 639-1 code, e.g., 'en', 'fr', 'es'
    prefferredCurrency?: string; // ISO 4217 code, e.g., 'USD', 'EUR', 'INR'

    orgId: number;
    roleIds: RoleType[]; // 1: admin, 2: superadmin, 3: instructor, 4: guest, 5: learner

    userExpertiseLevel?: UserExpertiseLevel; // 1: beginner, 2: intermediate, 3: advanced

    interests: string[];
    preferredIndustries: number[];
    preferredSubjects: number[];
}

export interface UserRegistrationInfo extends User {
    userId?: number; // Optional, if this is a new user registration

    registeredOn?: string;
    isActive?: boolean;
    isDeleted?: boolean;

    isLocked?: boolean;
    lockedUntil?: string; // ISO date string
    lockedReason?: string;

    approved?: boolean; // true if approved, false if rejected
    approvedBy?: number; // userId of the approver
    approvedOn?: string; // ISO date string
    approvedReason?: string;
    rejectedBy?: number; // userId of the rejector
    rejectedOn?: string; // ISO date string
    rejectedReason?: string;

    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    isTwoFactorEnabled?: boolean;
    isTwoFactorVerified?: boolean;

    isEmailSubscribed?: boolean;
    isPhoneSubscribed?: boolean;
    isWhatsAppSubscribed?: boolean;

    createdOn?: string; // ISO date string, optional
    updatedOn?: string; // ISO date string, optional
    createdBy?: number; // User ID of the creator, optional
    updatedBy?: number; // User ID of the last updater, optional
}

export interface Learner extends User {
    userId?: number; // Optional, if this is a new user registration

    class?: string;
    degree?: string;
    yearOfStudy: number;
}

export interface Instructor extends User {
    userId?: number; // Optional, if this is a new user registration

    expertise: string;
    experience: string;
    specialty: string;

    description: string;
}

export interface Guest extends User {
    userId?: number; // Optional, if this is a new user registration

    description?: string; // Optional, for guests
}

export interface Admin extends User {
    userId?: number; // Optional, if this is a new user registration

    description?: string; // Optional, for admins
}

export interface HeadInstructor extends User {
    userId?: number; // Optional, if this is a new user registration

    description?: string; // Optional, for admins
}

export interface SuperAdmin extends User {
    userId?: number; // Optional, if this is a new user registration

    description?: string; // Optional, for super admins
}

