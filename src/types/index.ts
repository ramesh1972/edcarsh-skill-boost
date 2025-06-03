
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  category: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  startDate: string;
  endDate: string;
  schedule: string;
  prerequisites: string[];
  learningOutcomes: string[];
  syllabus: Array<{
    week: number;
    topic: string;
    description: string;
  }>;
}
