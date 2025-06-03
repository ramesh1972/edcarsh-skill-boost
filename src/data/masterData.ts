
export interface IndustryData {
  id: string;
  name: string;
  subjects: string[];
}

export const industriesData: IndustryData[] = [
  {
    id: 'software',
    name: 'Software',
    subjects: ['Frontend', 'Backend', 'Mobile', 'Data Science', 'DevOps', 'Design']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    subjects: ['Digital Marketing', 'Content Marketing', 'Social Media', 'SEO', 'Analytics', 'Brand Strategy']
  }
];

export const getAllSubjects = (): string[] => {
  return industriesData.flatMap(industry => industry.subjects);
};

export const getSubjectsByIndustry = (industryId: string): string[] => {
  if (industryId === 'all') {
    return getAllSubjects();
  }
  const industry = industriesData.find(ind => ind.id === industryId);
  return industry ? industry.subjects : [];
};
