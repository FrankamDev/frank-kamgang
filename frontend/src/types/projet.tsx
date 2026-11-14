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
  slug?: string;

  category: string;
  categoryLabel?: string;

  status: string;

  description: string;
  shortDescription?: string;

  // Utilisé actuellement dans Expertise.tsx / ProjectsSection.tsx
  details?: string;

  // Utilisé par ProjectModal / nouvelle structure
  presentation?: string;

  architecture?: ProjectArchitecture;

  modules?: ProjectModule[];

  technologies: string[];

  demoUrl?: string;
  githubUrl?: string;

  featured?: boolean;
}