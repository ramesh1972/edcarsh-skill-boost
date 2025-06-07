
export interface Instructor {
  id?: number;
  name: string;
  image: string;
  experience: string;
  specialty: string;
  city: string;
  country: string;
  flag: string;
  description: string;
  rating?: number;
  students?: number;
  courses?: number;
  expertise?: string;
}

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
  industry: string;
  mode: 'live' | 'offline';
  tools: boolean;
  instructor: Instructor;
  instructorId?: number;
}
