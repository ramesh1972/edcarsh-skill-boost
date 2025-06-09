import { User, Learner, Instructor, Guest, Admin, HeadInstructor, SuperAdmin } from '../types/coreTypes/user.type';
import { orgs } from '../data/orgData/orgs';

// Fetch all data for a given userId
export function getUserById(userId: number): User | undefined {
  // Replace with actual user data source
  return undefined;
}

// Fetch all users for a given orgId
export function getUsersByOrgId(orgId: number): User[] {
  // Replace with actual user data source
  return [];
}

// Fetch org data for a given orgId
export function getOrgById(orgId: number) {
  return orgs.find(org => org.id === orgId);
}


