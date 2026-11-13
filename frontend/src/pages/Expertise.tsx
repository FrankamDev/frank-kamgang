
import { useMemo, useState } from "react";
import {
  FiArrowUpRight,
  FiChevronRight,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import type { Project } from "../types/projet";
// import TechnologyBadge from "../components/projets/TechnologyBadge";
import TechnologyBadge from "../components/projets/TechnologyBadge";
import ProjectModal from "../components/projets/ProjectModal";


const projects: Project[] = [
  {
    id: 1,
    title: "Obryl Platform",
    category: "Plateformes",
    status: "Client",
    description:
      "Écosystème digital tout-en-un pour réservations et gestion.",
    details:
      "Plateforme SaaS complète destinée à centraliser les réservations et la gestion.",
    technologies: [
      "Next.js",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Laravel",
      "PHP",
      "PostgreSQL",
      "Docker",
    ],
  },

  {
    id: 2,
    title: "ESCa Gestion",
    category: "Web & Applications",
    status: "Privé (Interne)",
    description:
      "Système intégré de gestion académique, pédagogique & financière.",
    details:
      "Application de gestion complète pour un établissement académique.",
    technologies: [
      "Laravel",
      "Livewire",
      "Tailwind CSS",
      "PHP",
      "PostgreSQL",
      "Vite",
    ],
  },

  {
    id: 3,
    title: "Obryl App Mobile",
    category: "Mobile iOS/Android",
    status: "Client",
    description:
      "Application mobile native multi-plateforme iOS & Android pour voyageurs et hôtes.",
    details:
      "Application mobile multi-plateforme avec géolocalisation et paiements.",
    technologies: ["Flutter", "Dart", "Laravel"],
  },

  {
    id: 4,
    title: "Devinsto Academy",
    category: "Plateformes",
    status: "Fondateur",
    description:
      "Plateforme d'apprentissage et de formation en ligne.",
    details:
      "Plateforme e-learning destinée à proposer des formations numériques.",
    technologies: [
      "Laravel",
      "Vue.js",
      "Inertia.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Linux Mint",
      "Nginx",
      "Docker",
    ],
  },

  {
    id: 5,
    title: "Système de Gestion des Évaluations",
    category: "Web & Applications",
    status: "Client",
    description:
      "Application web Laravel pour la gestion complète des évaluations.",
    details:
      "Solution permettant de gérer les évaluations, résultats et données associées.",
    technologies: [
      "Laravel",
      "Tailwind CSS",
      "Alpine.js",
      "PHP",
      "Chart.js",
    ],
  },

  {
    id: 6,
    title: "WebStage",
    category: "Web & Applications",
    status: "Promoteur",
    description:
      "Solution moderne et intuitive pour la gestion des présences et du suivi.",
    details:
      "Application web dédiée au suivi et à la gestion des stages.",
    technologies: [
      "Laravel",
      "Vue.js",
      "Inertia.js",
      "Tailwind CSS",
      "Chart.js",
      "PostgreSQL",
    ],
  },

  {
    id: 7,
    title: "ESCa – École Supérieure la Canadienne",
    category: "Web & Applications",
    status: "Client",
    description:
      "Portail institutionnel de l'École Supérieure la Canadienne.",
    details:
      "Portail institutionnel destiné à présenter l'établissement et ses services.",
    technologies: ["WordPress", "PHP", "CSS", "MySQL"],
  },

  {
    id: 8,
    title: "CFPC – Centre de Formation la Canadienne",
    category: "Web & Applications",
    status: "Client",
    description:
      "Portail officiel du Centre de Formation Professionnelle la Canadienne.",
    details:
      "Portail web institutionnel destiné à présenter les formations et services.",
    technologies: ["WordPress", "PHP", "CSS", "MySQL"],
  },

  {
    id: 9,
    title: "Event Style Entertainment",
    category: "Web & Applications",
    status: "Client",
    description:
      "Plateforme web pour l'agence événementielle EVENT STYLE ENTERTAINMENT.",
    details:
      "Site web destiné à présenter les services et activités de l'agence.",
    technologies: [
      "Laravel",
      "Vue.js",
      "Inertia.js",
      "Tailwind CSS",
      "MySQL",
    ],
  },

  {
    id: 10,
    title: "Theway Group",
    category: "Web & Applications",
    status: "Client",
    description:
      "Portail d'imprimerie générale numérique & offset avec catalogue interactif.",
    details:
      "Portail permettant de présenter les services d'impression et le catalogue.",
    technologies: ["WordPress", "CSS", "PHP", "MySQL"],
  },

  {
    id: 11,
    title: "Theway Print",
    category: "Web & Applications",
    status: "Client",
    description:
      "Plateforme d'imprimerie générale numérique & grand format.",
    details:
      "Solution web dédiée à la présentation des services d'impression.",
    technologies: ["WordPress", "PHP", "CSS", "MySQL"],
  },

  {
    id: 12,
    title: "IFP Theway Group",
    category: "Web & Applications",
    status: "Client",
    description:
      "Institut de Formation Professionnelle Theway Group.",
    details:
      "Plateforme institutionnelle dédiée à la présentation des formations.",
    technologies: ["WordPress", "PHP", "CSS", "MySQL"],
  },

  {
    id: 13,
    title: "Portfolio & Réalisations",
    category: "Web & Applications",
    status: "Personnel",
    description:
      "Portfolio professionnel présentant mes expertises, projets et réalisations.",
    details:
      "Portfolio moderne développé avec React, TypeScript et Tailwind CSS.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
  },
];

const categories = [
  "Tous",
  "Plateformes",
  "Mobile iOS/Android",
  "Web & Applications",
];

export default function Expertise() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <>
      <Navbar />

      <main
        className="
          min-h-screen
          bg-white
          px-4
          pb-20
          pt-28
          text-slate-900
          dark:bg-[#080d17]
          dark:text-white
        "
      >
        <div className="mx-auto max-w-[1320px]">

          {/* HEADER */}
          <div className="mb-7">
            <span
              className="
                inline-flex items-center gap-2
                rounded-md
                border border-emerald-500
                px-3 py-1.5
                text-[11px]
                font-medium
                text-emerald-400
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Portfolio & Réalisations
            </span>

            <h1
              className="
                mt-3
                text-4xl
                font-medium
                tracking-tight
                text-slate-900
                dark:text-white
                md:text-5xl
              "
            >
              Réalisations d'élite
            </h1>

            <p
              className="
                mt-3
                max-w-4xl
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Une sélection de nos plateformes numériques, applications
              mobiles et architectures web d'envergure.
            </p>
          </div>

          {/* FILTER BAR */}
          <div
            className="
              mb-3
              flex flex-col gap-3
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div
              className="
                inline-flex
                w-fit
                flex-wrap
                gap-1
                rounded-lg
                border border-slate-200
                bg-slate-100
                p-1
                dark:border-white/10
                dark:bg-[#111a29]
              "
            >
              {categories.map((category) => {
                const active = activeCategory === category;

                const count =
                  category === "Tous"
                    ? projects.length
                    : projects.filter(
                      (project) =>
                        project.category === category
                    ).length;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(category)
                    }
                    className={`
                      rounded-md
                      px-3 py-2
                      text-[11px]
                      font-medium
                      transition
                      ${active
                        ? "bg-white text-slate-900 shadow-sm dark:bg-[#26354b] dark:text-white"
                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }
                    `}
                  >
                    {category}

                    <span
                      className="
                        ml-1.5
                        text-[9px]
                        opacity-60
                      "
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="
                flex items-center gap-2
                text-[11px]
                text-slate-500
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />

              {filteredProjects.length} sur {projects.length} projets
              affichés

              <button
                type="button"
                onClick={() => setActiveCategory("Tous")}
                className="
                  ml-2
                  transition
                  hover:text-emerald-400
                "
              >
                Réduire ↑
              </button>
            </div>
          </div>

          {/* PROJECT LIST */}
          <div
            className="
              overflow-hidden
              rounded-lg
              border border-slate-200
              dark:border-white/[0.08]
            "
          >
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProject(project)}
                className="
      group
      flex w-full
      flex-col
      border-b border-slate-200
      bg-white
      p-4
      text-left
      transition
      last:border-b-0
      hover:bg-slate-50

      dark:border-white/[0.07]
      dark:bg-[#0b121e]
      dark:hover:bg-[#101a2a]

      md:flex-row
      md:items-center
      md:gap-4
    "
              >

                {/* TOP : CATÉGORIE + STATUT + ACTIONS */}
                <div
                  className="
        flex
        w-full
        items-center
        justify-between
        md:w-auto
      "
                >
                  <div className="flex items-center gap-2">

                    <span
                      className="
            rounded-md
            border border-slate-300
            bg-slate-100
            px-2 py-1
            text-[9px]
            font-bold
            uppercase
            text-slate-600

            dark:border-slate-700
            dark:bg-[#172236]
            dark:text-slate-300
          "
                    >
                      {project.category}
                    </span>

                    <span
                      className="
            rounded-md
            bg-slate-100
            px-2 py-1
            text-[9px]
            text-slate-500

            dark:bg-[#111c2d]
            dark:text-slate-400
          "
                    >
                      {project.status}
                    </span>

                  </div>

                  {/* ACTIONS MOBILE */}
                  <div className="flex items-center gap-1.5 md:hidden">

                    {project.demoUrl && (
                      <span
                        className="
              rounded-md
              bg-[#172236]
              p-2
              text-slate-400
            "
                      >
                        <FiArrowUpRight size={14} />
                      </span>
                    )}

                    <span
                      className="
            rounded-md
            bg-[#172236]
            p-2
            text-slate-400
            transition
            group-hover:text-emerald-400
          "
                    >
                      <FiChevronRight size={16} />
                    </span>

                  </div>
                </div>

                {/* TITRE */}
                <div className="mt-3 md:mt-0 md:w-[180px] md:shrink-0">
                  <h2
                    className="
          text-[14px]
          font-semibold
          text-slate-900
          dark:text-white
        "
                  >
                    {project.title}
                  </h2>
                </div>

                {/* DESCRIPTION — DESKTOP UNIQUEMENT */}
                <div className="hidden min-w-0 flex-1 md:block">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">•</span>

                    <p
                      className="
            truncate
            text-[11px]
            text-slate-500
            dark:text-slate-400
          "
                    >
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* TECHNOLOGIES */}
                <div
                  className="
        mt-3
        flex
        flex-wrap
        gap-1.5

        md:mt-0
        md:max-w-[550px]
        md:justify-end
      "
                >
                  {project.technologies.map((technology) => (
                    <TechnologyBadge
                      key={technology}
                      name={technology}
                    />
                  ))}
                </div>

                {/* ACTIONS DESKTOP */}
                <div
                  className="
        hidden
        shrink-0
        items-center
        gap-1.5
        md:flex
      "
                >
                  {project.demoUrl && (
                    <span
                      className="
            rounded-md
            bg-[#172236]
            p-2
            text-slate-400
            transition
            group-hover:text-emerald-400
          "
                    >
                      <FiArrowUpRight size={14} />
                    </span>
                  )}

                  <span
                    className="
          rounded-md
          bg-[#172236]
          p-2
          text-slate-400
          transition
          group-hover:bg-emerald-500/10
          group-hover:text-emerald-400
        "
                  >
                    <FiChevronRight size={16} />
                  </span>
                </div>

              </button>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredProjects.length === 0 && (
            <div
              className="
                py-16
                text-center
                text-sm
                text-slate-500
              "
            >
              Aucun projet dans cette catégorie.
            </div>
          )}

        </div>
      </main>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}