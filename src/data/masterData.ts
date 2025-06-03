
export interface Subject {
  name: string;
  color: string;
}

export interface Industry {
  name: string;
  subjects: Subject[];
}

export const masterData: Industry[] = [
  {
    name: "Software",
    subjects: [
      { name: "Frontend", color: "#3b82f6" }, // blue
      { name: "Backend", color: "#059669" }, // emerald
      { name: "Mobile", color: "#8b5cf6" }, // violet
      { name: "Data Science", color: "#dc2626" }, // red
      { name: "DevOps", color: "#ea580c" }, // orange
      { name: "Design", color: "#db2777" }, // pink
    ]
  },
  {
    name: "Marketing",
    subjects: [
      { name: "Marketing", color: "#0891b2" }, // cyan
      { name: "Digital Marketing", color: "#0d9488" }, // teal
      { name: "Content Marketing", color: "#7c3aed" }, // violet
      { name: "Social Media", color: "#be185d" }, // pink
    ]
  },
  {
    name: "Business",
    subjects: [
      { name: "Management", color: "#374151" }, // gray
      { name: "Finance", color: "#065f46" }, // emerald
      { name: "Strategy", color: "#1e40af" }, // blue
      { name: "Operations", color: "#7c2d12" }, // amber
    ]
  },
  {
    name: "Healthcare",
    subjects: [
      { name: "Medical", color: "#dc2626" }, // red
      { name: "Nursing", color: "#059669" }, // emerald
      { name: "Healthcare IT", color: "#3b82f6" }, // blue
    ]
  },
  {
    name: "Education",
    subjects: [
      { name: "Teaching", color: "#7c3aed" }, // violet
      { name: "Educational Technology", color: "#0891b2" }, // cyan
      { name: "Curriculum Design", color: "#ea580c" }, // orange
    ]
  }
];

// Helper functions to get data
export const getAllIndustries = (): string[] => {
  return masterData.map(industry => industry.name);
};

export const getAllSubjects = (): string[] => {
  return masterData.flatMap(industry => industry.subjects.map(subject => subject.name));
};

export const getSubjectsByIndustry = (industryName: string): Subject[] => {
  const industry = masterData.find(ind => ind.name === industryName);
  return industry ? industry.subjects : [];
};

export const getSubjectColor = (subjectName: string): string => {
  for (const industry of masterData) {
    const subject = industry.subjects.find(sub => sub.name === subjectName);
    if (subject) {
      return subject.color;
    }
  }
  return "#6b7280"; // default gray color
};

export const getIndustryBySubject = (subjectName: string): string | null => {
  for (const industry of masterData) {
    const subject = industry.subjects.find(sub => sub.name === subjectName);
    if (subject) {
      return industry.name;
    }
  }
  return null;
};
