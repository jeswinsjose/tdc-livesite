export interface City {
  id: string;
  name: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export enum AiStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ProjectEstimate {
  serviceRecommended: string;
  estimatedDuration: string;
  complexityLevel: string;
  keyConsiderations: string[];
}
