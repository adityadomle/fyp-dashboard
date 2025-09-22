export interface Project {
  id: string;
  title: string;
  description: string;
  members: string[];
  techStack: string[];
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStats {
  total: number;
  completed: number;
  inProgress: number;
  planning: number;
  onHold: number;
}