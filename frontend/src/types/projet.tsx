export interface ProjectModule {
  title: string;
  description: string;
}

export interface ProjectArchitecture {
  frontend: string[];
  backend: string[];
}

export interface Project {
  id: number;

  title: string;

  category:
    | "Plateformes"
    | "Mobile iOS/Android"
    | "Web & Applications";

  status: string;

  description: string;

  details: string;

  technologies: string[];

  architecture?: ProjectArchitecture;

  modules?: ProjectModule[];

  demoUrl?: string;

  githubUrl?: string;
}