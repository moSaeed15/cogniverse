export interface GameObject {
  date: string;
  time: string;
  overallTime: number;
  level: number;
}

export interface SharedGameObject extends GameObject {
  accuracy: number;
  goResponseTime: number;
  noGoResponseTime: number;
  scorePercent: number;
}

export interface MazeObject extends GameObject {
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

export interface TriesData {
  numberOfHits?: number;
  accuracy?: number;
  numberOfTrials: number;
  totalTime: number;
  goResponseTime?: number;
  noGoResponseTime?: number;
  scorePercent?: number;
}
