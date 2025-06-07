
export interface Course {
  id: number;
  title: string;
  description: string;
  mediumDescription: string;
  longDescription: string;
  duration: string;
  durationHours: number;
  dailySessionDuration: number;
  price: string;
  students: number;
  nextSession: string;
  startDate: string;
  endDate: string;
  startTime: string;
  image: string;
  topics: string[];
  longTopics: string[];
  level: string;
  subject: string; // This is the category
  subjectId: number; // New field
  industry: string;
  industryId: number; // New field
  mode: 'live' | 'offline';
  tools: boolean;
  instructorId: number;
}
