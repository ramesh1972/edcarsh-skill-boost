export interface Subject {
  id: number;
  name: string;
  color: string;
}

export interface Industry {
  id: number;
  name: string;
  subjects: Subject[];
}
