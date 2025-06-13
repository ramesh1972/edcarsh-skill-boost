import { industriesSubjects } from "@/data/masterData/industriesSubjects";

import { Industry, Subject } from "@/types/coreTypes/IndustrySubject.type";
import { get } from "http";

export function getIndustryById(industryId: number): Industry | undefined {
  return industriesSubjects.find(industry => industry.id === industryId);
}

export function getIndustryByName(industryName: string): Industry | undefined {
  return industriesSubjects.find(industry => industry.name.toLowerCase() === industryName.toLowerCase());
}

export function getIndustryByForSubjectId(subjectId: number): Industry | undefined {
  return industriesSubjects.find(industry => industry.subjects.some(subject => subject.id === subjectId));
}

export function getSubjectById(industryId: number, subjectId: number): Subject | undefined {
  const industry = getIndustryById(industryId);
  if (!industry) return undefined;
  return industry.subjects.find(subject => subject.id === subjectId);
}

export function getSubjectByName(industryName: string, subjectName: string): Subject | undefined {
  const industry = getIndustryByName(industryName);
  if (!industry) return undefined;
  return industry.subjects.find(subject => subject.name.toLowerCase() === subjectName.toLowerCase());
}

export function getSubjectBySubjectId(subjectId: number): Subject | undefined {
  const industry = getIndustryByForSubjectId(subjectId);
  if (!industry) return undefined;
  return industry.subjects.find(subject => subject.id === subjectId);
}

export function getSubjectBySubjectName(subjectName: string): Subject | undefined {
  const subjects = industriesSubjects.flatMap(industry => industry.subjects);
  return subjects.find(subject => subject.name.toLowerCase() === subjectName.toLowerCase());
}

export function getIndustries(): Industry[] {
  return industriesSubjects;
}

export function getSubjectsByIndustryId(industryId: number): Subject[] {
  const industry = getIndustryById(industryId);
  if (!industry) return [];
  return industry.subjects;
}

export function getSubjectsByIndustryName(industryName: string): Subject[] {
  const industry = getIndustryByName(industryName);
  if (!industry) return [];
  return industry.subjects;
}

export function getSubjects(): Subject[] {
  return industriesSubjects.flatMap(industry => industry.subjects);
}