import { ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  tags: string[];
  category: 'ai' | 'systems' | 'fullstack' | 'tool';
  githubUrl: string;
  liveUrl?: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  architecture: string[];
  icon: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Proficient"
    iconName?: string;
    description: string;
  }[];
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'file' | 'concept' | 'model' | 'mcp' | 'tool';
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  connections: string[];
  details: string;
}

export interface CommandOutput {
  command: string;
  output: string | ReactNode;
  timestamp: string;
  type?: 'system' | 'user' | 'agent' | 'error';
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  timeline: string;
  status: string;
  coursework: string[];
}
