
export type ViewMode = 'courses' | 'industry' | 'subject' | 'topic';

export interface MapRange {
  min: number;
  max: number;
  label: string;
}

export interface MapDataItem {
  id: string;
  title: string;
  students: number;
  industry?: string;
  subject?: string;
  topics?: string[];
  x: number;
  y: number;
  fontSize: number;
  color: string;
  studentRatio?: number;
  range: string;
  courseCount?: number;
  type?: string;
}

export interface MapData {
  data: MapDataItem[];
  ranges: MapRange[];
}
