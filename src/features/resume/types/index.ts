export type ResumeStatus = "pending" | "processing" | "completed" | "failed";

export interface Resume {
  id: string;
  userId: string;
  filename: string;
  filePath: string;
  fileSize: number;
  extractedText: string | null;
  status: ResumeStatus;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  name: string;
  category: string;
  confidence: number;
  evidence: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  skills: string[];
  duration?: string;
}

export interface Experience {
  company: string;
  title: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  skills: string[];
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate?: string;
  endDate?: string;
  achievements: string[];
}

export interface ResumeAnalysis {
  id: string;
  resumeId: string;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  summary: string | null;
  confidenceScore: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
