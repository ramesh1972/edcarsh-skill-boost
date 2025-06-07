
export interface Instructor {
  id: number;
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
  industries: number[]; // Array of industry IDs the instructor can teach
  subjects: { industryId: number; subjectIds: number[] }[]; // Array of subjects by industry
}
