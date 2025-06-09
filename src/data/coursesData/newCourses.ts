import { NewCourse } from '../../types/courseTypes/newCourse.type';

export const newCourses: Partial<NewCourse>[] = [
  // Org 1
  { courseId: 1, intents: [ { learnerId: 1, expressedOn: "2025-06-01" }, { learnerId: 1, expressedOn: "2025-06-02" } ] },
  { courseId: 2, intents: [ { learnerId: 1, expressedOn: "2025-06-03" } ] },
  // Org 2
  { courseId: 7, intents: [ { learnerId: 2, expressedOn: "2025-06-04" }, { learnerId: 2, expressedOn: "2025-06-05" } ] },
  { courseId: 8, intents: [ { learnerId: 2, expressedOn: "2025-06-06" } ] },
  // Org 3
  { courseId: 12, intents: [ { learnerId: 3, expressedOn: "2025-06-07" } ] },
  { courseId: 13, intents: [ { learnerId: 3, expressedOn: "2025-06-08" } ] },
  // Org 4
  { courseId: 16, intents: [ { learnerId: 4, expressedOn: "2025-06-09" } ] },
  { courseId: 17, intents: [ { learnerId: 4, expressedOn: "2025-06-10" } ] },
  // Org 5
  { courseId: 14, intents: [ { learnerId: 5, expressedOn: "2025-06-11" } ] },
  { courseId: 19, intents: [ { learnerId: 5, expressedOn: "2025-06-12" } ] },
  // Org 6
  { courseId: 15, intents: [ { learnerId: 24, expressedOn: "2025-06-13" } ] },
  { courseId: 16, intents: [ { learnerId: 24, expressedOn: "2025-06-14" } ] },
  // Org 7
  { courseId: 18, intents: [ { learnerId: 27, expressedOn: "2025-06-15" } ] },
  { courseId: 19, intents: [ { learnerId: 27, expressedOn: "2025-06-16" } ] }
];
