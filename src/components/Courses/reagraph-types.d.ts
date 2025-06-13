// Type declarations for reagraph GraphNode and GraphEdge (for local dev assist)
declare module 'reagraph' {
  export interface GraphNode {
    id: string;
    label?: string;
    type?: string;
    fill?: string;
    [key: string]: any;
  }
  export interface GraphEdge {
    id: string;
    source: string;
    target: string;
    label?: string;
    [key: string]: any;
  }
}
