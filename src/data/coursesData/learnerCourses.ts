import { LearnerCourse, LearnerWishlistItem, LearnerGuestJoin } from '../../types/courseTypes/learnerCourses.type';

export const learnerCourses: Partial<LearnerCourse>[] = [
  // Learner 1 (Amit Sharma, org 1)
  { learnerId: 1, courseId: 3, id: 3, enrolledAt: '2025-05-01T09:00:00Z', courseScheduleIds: [105] },
  { learnerId: 1, courseId: 5, id: 5, enrolledAt: '2025-05-10T09:00:00Z', courseScheduleIds: [107] },
  // Learner 2 (Priya Desai, org 2)
  { learnerId: 2, courseId: 2, id: 2, enrolledAt: '2025-04-15T10:00:00Z', courseScheduleIds: [103] },
  { learnerId: 2, courseId: 7, id: 7, enrolledAt: '2025-05-20T10:00:00Z', courseScheduleIds: [108] },
  // Learner 3 (Rahul Mehta, org 3, cross-org)
  { learnerId: 3, courseId: 1, id: 1, enrolledAt: '2025-06-01T10:00:00Z', courseScheduleIds: [101] },
  { learnerId: 3, courseId: 8, id: 8, enrolledAt: '2025-06-02T10:00:00Z', courseScheduleIds: [109] },
  // Learner 4 (Sneha Kapoor, org 4)
  { learnerId: 4, courseId: 9, id: 9, enrolledAt: '2025-06-03T10:00:00Z', courseScheduleIds: [110] },
  // Learner 5 (Vikram Singh, org 5, cross-org)
  { learnerId: 5, courseId: 6, id: 6, enrolledAt: '2025-06-04T10:00:00Z', courseScheduleIds: [107] },
  // Org 0 learners (example IDs: 6, 7, 8, 9, 10)
  { learnerId: 6, courseId: 3, id: 3, enrolledAt: '2025-06-06T09:00:00Z', courseScheduleIds: [105] },
  { learnerId: 7, courseId: 4, id: 4, enrolledAt: '2025-06-07T09:00:00Z', courseScheduleIds: [106] },
  { learnerId: 8, courseId: 5, id: 5, enrolledAt: '2025-06-08T09:00:00Z', courseScheduleIds: [107] },
  { learnerId: 9, courseId: 6, id: 6, enrolledAt: '2025-06-09T09:00:00Z', courseScheduleIds: [108] },
  { learnerId: 10, courseId: 7, id: 7, enrolledAt: '2025-06-10T09:00:00Z', courseScheduleIds: [109] },
  { learnerId: 6, courseId: 4, id: 3, enrolledAt: '2025-06-06T09:00:00Z', courseScheduleIds: [105] },
  { learnerId: 7, courseId: 3, id: 4, enrolledAt: '2025-06-07T09:00:00Z', courseScheduleIds: [106] },
  { learnerId: 8, courseId: 6, id: 5, enrolledAt: '2025-06-08T09:00:00Z', courseScheduleIds: [107] },
  { learnerId: 9, courseId: 7, id: 6, enrolledAt: '2025-06-09T09:00:00Z', courseScheduleIds: [108] },
  { learnerId: 10, courseId: 8, id: 7, enrolledAt: '2025-06-10T09:00:00Z', courseScheduleIds: [109] },
  { learnerId: 6, courseId: 6, id: 3, enrolledAt: '2025-06-06T09:00:00Z', courseScheduleIds: [105] },
  { learnerId: 7, courseId: 7, id: 4, enrolledAt: '2025-06-07T09:00:00Z', courseScheduleIds: [106] },
  { learnerId: 8, courseId: 4, id: 5, enrolledAt: '2025-06-08T09:00:00Z', courseScheduleIds: [107] },
  { learnerId: 9, courseId: 8, id: 6, enrolledAt: '2025-06-09T09:00:00Z', courseScheduleIds: [108] },
  { learnerId: 10, courseId: 3, id: 7, enrolledAt: '2025-06-10T09:00:00Z', courseScheduleIds: [109] },
];

export const learnersWishlist: Partial<LearnerWishlistItem>[] = [
  // Org 1 (Amit Sharma, learnerId: 1, orgId: 1)
  { learnerId: 1, courseId: 3, id: 3, addedAt: '2025-05-05T09:00:00Z', isRemoved: false },
  { learnerId: 1, courseId: 5, id: 5, addedAt: '2025-05-12T09:00:00Z', isRemoved: true, whenRemoved: '2025-06-01T09:00:00Z' },
  { learnerId: 1, courseId: 6, id: 6, addedAt: '2025-05-15T09:00:00Z', isRemoved: false },
  // Org 2 (Priya Desai, learnerId: 2, orgId: 2)
  { learnerId: 2, courseId: 2, id: 2, addedAt: '2025-04-18T10:00:00Z', isRemoved: false },
  { learnerId: 2, courseId: 7, id: 7, addedAt: '2025-05-25T10:00:00Z', isRemoved: false },
  { learnerId: 2, courseId: 8, id: 8, addedAt: '2025-05-28T10:00:00Z', isRemoved: false },
  // Org 3 (Rahul Mehta, learnerId: 3, orgId: 3)
  { learnerId: 3, courseId: 1, id: 1, addedAt: '2025-06-02T10:00:00Z', isRemoved: true, whenRemoved: '2025-06-07T10:00:00Z' },
  { learnerId: 3, courseId: 8, id: 8, addedAt: '2025-03-15T11:00:00Z', isRemoved: false },
  { learnerId: 3, courseId: 12, id: 12, addedAt: '2025-06-03T10:00:00Z', isRemoved: false },
  // Org 4 (Sneha Kapoor, learnerId: 4, orgId: 4)
  { learnerId: 4, courseId: 9, id: 9, addedAt: '2025-04-25T12:00:00Z', isRemoved: false },
  { learnerId: 4, courseId: 16, id: 16, addedAt: '2025-05-01T12:00:00Z', isRemoved: false },
  { learnerId: 4, courseId: 17, id: 17, addedAt: '2025-05-10T12:00:00Z', isRemoved: false },
  // Org 5 (Vikram Singh, learnerId: 5, orgId: 5)
  { learnerId: 5, courseId: 6, id: 6, addedAt: '2025-05-18T12:00:00Z', isRemoved: false },
  { learnerId: 5, courseId: 14, id: 14, addedAt: '2025-05-20T12:00:00Z', isRemoved: false },
  { learnerId: 5, courseId: 19, id: 19, addedAt: '2025-05-22T12:00:00Z', isRemoved: false },
  // Org 6 (example learnerId: 24, orgId: 6)
  { learnerId: 24, courseId: 15, id: 15, addedAt: '2025-05-25T12:00:00Z', isRemoved: false },
  { learnerId: 24, courseId: 16, id: 16, addedAt: '2025-05-27T12:00:00Z', isRemoved: false },
  { learnerId: 24, courseId: 17, id: 17, addedAt: '2025-05-29T12:00:00Z', isRemoved: false },
  // Org 7 (example learnerId: 27, orgId: 7)
  { learnerId: 27, courseId: 18, id: 18, addedAt: '2025-06-01T12:00:00Z', isRemoved: false },
  { learnerId: 27, courseId: 19, id: 19, addedAt: '2025-06-03T12:00:00Z', isRemoved: false },
  { learnerId: 27, courseId: 20, id: 20, addedAt: '2025-06-05T12:00:00Z', isRemoved: false }
];

export const learnersGuestJoins: Partial<LearnerGuestJoin>[] = [
  // Org 1 (Amit Sharma, learnerId: 1, orgId: 1)
  { learnerId: 1, courseId: 6, id: 6, whenDecidedToJoinAsGuest: '2025-05-17T09:00:00Z', joined: true },
  // Org 2 (Priya Desai, learnerId: 2, orgId: 2)
  { learnerId: 2, courseId: 2, id: 2, whenDecidedToJoinAsGuest: '2025-05-28T10:00:00Z', joined: false },
  { learnerId: 2, courseId: 7, id: 7, whenDecidedToJoinAsGuest: '2025-05-29T10:00:00Z', joined: true },
  { learnerId: 2, courseId: 8, id: 8, whenDecidedToJoinAsGuest: '2025-05-30T10:00:00Z', joined: false },
  // Org 3 (Rahul Mehta, learnerId: 3, orgId: 3)

  { learnerId: 3, courseId: 12, id: 12, whenDecidedToJoinAsGuest: '2025-06-05T10:00:00Z', joined: true },
  // Org 4 (Sneha Kapoor, learnerId: 4, orgId: 4)

  { learnerId: 4, courseId: 17, id: 17, whenDecidedToJoinAsGuest: '2025-06-04T12:00:00Z', joined: false },
  // Org 5 (Vikram Singh, learnerId: 5, orgId: 5)

  { learnerId: 5, courseId: 19, id: 19, whenDecidedToJoinAsGuest: '2025-06-18T09:00:00Z', joined: true },
  // Org 6 (example learnerId: 24, orgId: 6)
  { learnerId: 24, courseId: 17, id: 17, whenDecidedToJoinAsGuest: '2025-06-21T09:00:00Z', joined: false },
  // Org 7 (example learnerId: 27, orgId: 7)

  { learnerId: 27, courseId: 20, id: 20, whenDecidedToJoinAsGuest: '2025-06-24T09:00:00Z', joined: true }
];
