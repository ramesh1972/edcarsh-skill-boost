import { User, Learner, Instructor, Guest, Admin, HeadInstructor, SuperAdmin } from '../types/coreTypes/user.type';
import { orgs } from '../data/orgData/orgs';
import { users } from '@/data/usersData/users';
import { instructors } from '@/data/usersData/instructors';

// Fetch all data for a given userId
export function getUserById(userId: number): User | undefined {
    // Replace with actual user data source
    return users.find(user => user.id === userId);
}

export function getUserName(userId: number): string | undefined {
    const user = getUserById(userId);
    if (!user) {
        return undefined;
    }
    return user.salutation + "" + user.firstName + " " + user.lastName;
}

// Fetch all users for a given orgId
export function getUsersByOrgId(orgId: number): User[] {
    // Replace with actual user data source
    return [];
}


export function getInstructor(userId: number): Instructor | undefined {
    const user = getUserById(userId);
    if (!user) {
        return undefined;
    }

    const instructor = instructors.find(i => i.userId === userId);
    if (!instructor) {
        return {
            ...user,
            expertise: '',
            experience: '',
            specialty: '',
            description: '',
            orgId: user.orgId, // Ensure orgId is set
        } as Instructor;
    }

    return {
        ...user,
        ...instructor,
        orgId: instructor.orgId, // Ensure orgId is set
    } as Instructor;
}


