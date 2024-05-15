export interface GameObject {
  date: string;
  time: string;
  overallTime: number;
}

export interface DualObject extends GameObject {
  accuracy: number;
  goResponseTime: number;
  noGoResponseTime: number;
  scorePercent: number;
}

export interface MazeObject extends GameObject {
  level: number;
  numberOfHits: number;
}

export interface SessionTime {
  time: string;
  date: string;
}

export interface chartData {
  count: string;
  Time: number;
}
