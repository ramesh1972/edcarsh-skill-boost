import { Subject, Industry } from '../../types/coreTypes/IndustrySubject.type';

export const industriesSubjects: Industry[] = [
  {
    id: 1,
    name: "Software",
    subjects: [
      { id: 1, name: "Frontend", color: "#3b82f6" }, // blue
      { id: 2, name: "Backend", color: "#059669" }, // emerald
      { id: 3, name: "Mobile", color: "#8b5cf6" }, // violet
      { id: 4, name: "Data Science", color: "#dc2626" }, // red
      { id: 5, name: "DevOps", color: "#ea580c" }, // orange
      { id: 6, name: "Design", color: "#db2777" }, // pink
    ]
  },
  {
    id: 2,
    name: "Marketing",
    subjects: [
      { id: 1, name: "Marketing", color: "#0891b2" }, // cyan
      { id: 2, name: "Digital Marketing", color: "#0d9488" }, // teal
      { id: 3, name: "Content Marketing", color: "#7c3aed" }, // violet
      { id: 4, name: "Social Media", color: "#be185d" }, // pink
    ]
  },
  {
    id: 3,
    name: "Business",
    subjects: [
      { id: 1, name: "Management", color: "#374151" }, // gray
      { id: 2, name: "Finance", color: "#065f46" }, // emerald
      { id: 3, name: "Strategy", color: "#1e40af" }, // blue
      { id: 4, name: "Operations", color: "#7c2d12" }, // amber
    ]
  },
  {
    id: 4,
    name: "Healthcare",
    subjects: [
      { id: 1, name: "Medical", color: "#dc2626" }, // red
      { id: 2, name: "Nursing", color: "#059669" }, // emerald
      { id: 3, name: "Healthcare IT", color: "#3b82f6" }, // blue
    ]
  },
  {
    id: 5,
    name: "Education",
    subjects: [
      { id: 1, name: "Teaching", color: "#7c3aed" }, // violet
      { id: 2, name: "Educational Technology", color: "#0891b2" }, // cyan
      { id: 3, name: "Curriculum Design", color: "#ea580c" }, // orange
    ]
  }
];

// Helper functions to get data
export const getAllIndustries = (): string[] => {
  return industriesSubjects.map(industry => industry.name);
};

export const getAllSubjects = (): string[] => {
  return industriesSubjects.flatMap(industry => industry.subjects.map(subject => subject.name));
};

export const getSubjectsByIndustry = (industryName: string): Subject[] => {
  const industry = industriesSubjects.find(ind => ind.name === industryName);
  return industry ? industry.subjects : [];
};

export const getSubjectColor = (subjectName: string): string => {
  for (const industry of industriesSubjects) {
    const subject = industry.subjects.find(sub => sub.name === subjectName);
    if (subject) {
      return subject.color;
    }
  }
  return "#6b7280"; // default gray color
};

export const getIndustryBySubject = (subjectName: string): string | null => {
  for (const industry of industriesSubjects) {
    const subject = industry.subjects.find(sub => sub.name === subjectName);
    if (subject) {
      return industry.name;
    }
  }
  return null;
};

// New helper functions for ID-based lookups
export const getIndustryById = (id: number): Industry | undefined => {
  return industriesSubjects.find(industry => industry.id === id);
};

export const getSubjectById = (industryId: number, subjectId: number): Subject | undefined => {
  const industry = getIndustryById(industryId);
  return industry?.subjects.find(subject => subject.id === subjectId);
};

export const getIndustryNameById = (id: number): string => {
  const industry = getIndustryById(id);
  return industry ? industry.name : 'Unknown Industry';
};

export const getSubjectNameById = (industryId: number, subjectId: number): string => {
  const subject = getSubjectById(industryId, subjectId);
  return subject ? subject.name : 'Unknown Subject';
};
