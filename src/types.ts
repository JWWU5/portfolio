export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  concept: string;
  interaction: string;
  challenges: { issue: string; solution: string }[];
  hardware: string[];
  software: string[];
  image: string;
  category: string;
  architecture?: {
    nodes: { id: string; label: string; type: 'hw' | 'sw' | 'bridge' }[];
    connections: { from: string; to: string }[];
  };
  results?: { label: string; value: string; description: string }[];
  contribution?: string[];
  inspiration?: string;
  background?: string | {
    painpoint: string;
    inspiration: string;
    goals: string;
  };
  features?: { title: string; detail: string; videoUrl?: string }[];
  evaluation?: string;
  future?: { title: string; content: string }[];
  reflection?: string;
  process?: {
    description: string;
    steps: { title: string; detail: string }[];
  };
  videoUrl?: string;
}
