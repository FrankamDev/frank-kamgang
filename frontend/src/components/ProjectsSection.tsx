import { useState } from "react";
import {
  FiArrowRight,
  FiExternalLink,
} from "react-icons/fi";
import type { Project } from "../types/projet";
import TechnologyBadge from "./projets/TechnologyBadge";
import ProjectModal from "./projets/ProjectModal";
import { Link } from "react-router-dom";



/* =====================================================
   DONNÉES DES PROJETS
===================================================== */

const projects: Project[] = [
  {
    id: 1,
    title: "Obryl Platform",
    category: "Plateformes",
    status: "Client",
    description:
      "Écosystème digital tout-en-un pour réservations, hébergements, véhicules et circuits touristiques.",
    details:
      "Architecture moderne complète combinant marketplace de locations d'hébergements, gestion de flottes de véhicules et circuits touristiques sécurisés par paiements séquestrés avec GeniusPay.",
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
    architecture: {
      frontend: [
        "Nuxt",
        "Vue.js",
        "TypeScript",
        "Tailwind CSS",
      ],
      backend: [
        "Laravel",
        "PHP",
        "PostgreSQL",
        "Docker",
      ],
    },
    modules: [
      {
        title: "Réservations d'Hébergements",
        description:
          "Gestion dynamique des disponibilités, calendrier interactif, tarification saisonnière et messagerie intégrée hôte-voyageur.",
      },
      {
        title: "Location de Véhicules & Chauffeurs",
        description:
          "Flotte géolocalisée, réservation avec ou sans chauffeur, vérification des permis et caution automatisée.",
      },
      {
        title: "Circuits Touristiques & Guides",
        description:
          "Réservation d'expériences guidées, itinéraires cartographiques et gestion des créneaux horaires.",
      },
      {
        title: "Paiements Sécurisés & Séquestre GeniusPay",
        description:
          "Paiement en ligne par cartes bancaires et Mobile Money avec déblocage des fonds à la validation du séjour.",
      },
    ],
    demoUrl: "#",
  },

  {
    id: 2,
    title: "ESCa Gestion",
    category: "Web & Applications",
    status: "Privé (Interne)",
    description:
      "Système Intégré de Gestion Académique, Pédagogique & Financière pour l'école.",
    details:
      "Plateforme permettant de centraliser la gestion académique, pédagogique, administrative et financière d'un établissement scolaire.",
    technologies: [
      "Laravel",
      "Livewire",
      "Tailwind CSS",
      "PHP",
      "PostgreSQL",
      "Vite",
    ],
    architecture: {
      frontend: [
        "Livewire",
        "Tailwind CSS",
        "Vite",
      ],
      backend: [
        "Laravel",
        "PHP",
        "PostgreSQL",
      ],
    },
    modules: [
      {
        title: "Gestion académique",
        description:
          "Gestion des étudiants, classes, matières, enseignants et informations académiques.",
      },
      {
        title: "Gestion pédagogique",
        description:
          "Suivi des enseignements, évaluations, notes et résultats des étudiants.",
      },
      {
        title: "Gestion financière",
        description:
          "Suivi des inscriptions, paiements, frais de scolarité et opérations financières.",
      },
    ],
    demoUrl: "#",
  },

  {
    id: 3,
    title: "Obryl App Mobile",
    category: "Mobile iOS/Android",
    status: "Client",
    description:
      "Application mobile native multi-plateforme iOS & Android pour voyageurs et hôtes.",
    details:
      "Application mobile permettant aux voyageurs et aux hôtes d'accéder aux principales fonctionnalités de l'écosystème Obryl depuis leurs appareils mobiles.",
    technologies: [
      "Flutter",
      "Dart",
      "Laravel",
    ],
    architecture: {
      frontend: [
        "Flutter",
        "Dart",
      ],
      backend: [
        "Laravel",
      ],
    },
    modules: [
      {
        title: "Réservations mobiles",
        description:
          "Recherche, consultation et réservation des hébergements directement depuis l'application.",
      },
      {
        title: "Gestion des véhicules",
        description:
          "Accès aux véhicules disponibles et gestion des réservations.",
      },
      {
        title: "Paiements",
        description:
          "Intégration des mécanismes de paiement sécurisés de la plateforme.",
      },
    ],
    demoUrl: "#",
  },

  {
    id: 4,
    title: "Devinsto Academy",
    category: "Plateformes",
    status: "Fondateur",
    description:
      "Plateforme d'apprentissage numérique destinée à la formation.",
    details:
      "Plateforme d'apprentissage permettant de centraliser les contenus pédagogiques, les utilisateurs, les parcours de formation et le suivi de progression.",
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
    architecture: {
      frontend: [
        "Vue.js",
        "Inertia.js",
        "Tailwind CSS",
      ],
      backend: [
        "Laravel",
        "PostgreSQL",
        "Nginx",
        "Docker",
      ],
    },
    modules: [
      {
        title: "Gestion des formations",
        description:
          "Création et organisation des formations, modules et contenus pédagogiques.",
      },
      {
        title: "Gestion des apprenants",
        description:
          "Gestion des comptes utilisateurs et suivi de la progression.",
      },
      {
        title: "Tableau de bord",
        description:
          "Visualisation des données principales liées aux formations et aux utilisateurs.",
      },
    ],
    demoUrl: "#",
  },

  {
    id: 5,
    title: "Système de Gestion des Évaluations",
    category: "Web & Applications",
    status: "Client",
    description:
      "Application web Laravel pour la gestion complète des évaluations.",
    details:
      "Application web permettant de centraliser la création, la gestion et le suivi des évaluations ainsi que la visualisation des résultats.",
    technologies: [
      "Laravel",
      "Tailwind CSS",
      "Alpine.js",
      "PHP",
      "Chart.js",
    ],
    architecture: {
      frontend: [
        "Tailwind CSS",
        "Alpine.js",
        "Chart.js",
      ],
      backend: [
        "Laravel",
        "PHP",
      ],
    },
    modules: [
      {
        title: "Création des évaluations",
        description:
          "Création et organisation des évaluations selon les classes et les matières.",
      },
      {
        title: "Gestion des résultats",
        description:
          "Centralisation des notes et génération des résultats.",
      },
      {
        title: "Statistiques",
        description:
          "Visualisation graphique des performances et résultats.",
      },
    ],
    demoUrl: "#",
  },
];

/* =====================================================
   CATÉGORIES
===================================================== */

const categories = [
  {
    label: "Tous",
    value: "Tous",
  },
  {
    label: "Plateformes",
    value: "Plateformes",
  },
  {
    label: "Mobile iOS/Android",
    value: "Mobile iOS/Android",
  },
  {
    label: "Web & Applications",
    value: "Web & Applications",
  },
] as const;

type Category =
  (typeof categories)[number]["value"];

/* =====================================================
   COMPOSANT PRINCIPAL
===================================================== */

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("Tous");

  const [showAll, setShowAll] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  /* ---------------------------------------------------
     FILTRAGE
  --------------------------------------------------- */

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter(
          (project) =>
            project.category ===
            activeCategory
        );

  /* ---------------------------------------------------
     AFFICHAGE
  --------------------------------------------------- */

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  /* ---------------------------------------------------
     CHANGEMENT DE FILTRE
  --------------------------------------------------- */

  const handleCategoryChange = (
    category: Category
  ) => {
    setActiveCategory(category);
    setShowAll(false);
  };

  return (
    <>
      <section
        className="
          relative
          overflow-hidden
          bg-[#080d17]
          px-4
          py-20
          text-white

          sm:px-6
          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl">

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="mb-8">

            {/* BADGE */}

            <span
              className="
                inline-flex
                items-center
                rounded-md
                border border-emerald-500
                px-3 py-1.5
                text-[10px]
                font-bold
                text-white

                sm:text-[11px]
              "
            >
              <span className="mr-2 text-emerald-500">
                |
              </span>

              Portfolio & Réalisations
            </span>

            {/* TITLE */}

            <h2
              className="
                mt-4
                text-4xl
                font-medium
                tracking-tight
                text-white

                sm:text-5xl
                lg:text-6xl
              "
            >
              Réalisations d'élite
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-3
                max-w-3xl
                text-sm
                leading-6
                text-slate-400

                sm:text-base
              "
            >
              Une sélection de nos plateformes
              numériques, applications mobiles
              et architectures web d'envergure.
            </p>
          </div>

          {/* ==========================================
              FILTERS
          ========================================== */}

          <div
            className="
              mb-4
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* FILTER BAR */}

            <div
              className="
                flex
                w-full
                max-w-full
                overflow-x-auto
                rounded-lg
                border border-white/[0.06]
                bg-[#101827]
                p-1

                sm:w-fit
              "
            >
              {categories.map(
                (category) => {
                  const count =
                    category.value ===
                    "Tous"
                      ? projects.length
                      : projects.filter(
                          (project) =>
                            project.category ===
                            category.value
                        ).length;

                  const active =
                    activeCategory ===
                    category.value;

                  return (
                    <button
                      key={
                        category.value
                      }
                      type="button"
                      onClick={() =>
                        handleCategoryChange(
                          category.value
                        )
                      }
                      className={`
                        whitespace-nowrap
                        rounded-md
                        px-3 py-2
                        text-[10px]
                        font-medium
                        transition

                        sm:px-4
                        sm:text-xs

                        ${
                          active
                            ? "bg-[#26364f] text-white shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }
                      `}
                    >
                      {category.label}

                      <span
                        className="
                          ml-1.5
                          text-[9px]
                          text-slate-500
                        "
                      >
                        ({count})
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            {/* COUNTER */}

            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                text-slate-400

                sm:text-[11px]
              "
            >
              <span
                className="
                  h-2 w-2
                  rounded-full
                  bg-slate-400
                "
              />

              <span>
                {displayedProjects.length}{" "}
                sur{" "}
                {filteredProjects.length}{" "}
                projets affichés
              </span>

              <button
                type="button"
                onClick={() =>
                  setShowAll(
                    (value) =>
                      !value
                  )
                }
                className="
                  font-medium
                  text-slate-300
                  transition
                  hover:text-emerald-400
                "
              >
                {showAll
                  ? "Réduire ↑"
                  : "Tout voir →"}
              </button>
            </div>
          </div>

          {/* ==========================================
              PROJECT LIST
          ========================================== */}

          <div
            className="
              overflow-hidden
              rounded-lg
              border border-white/[0.07]
              bg-[#080d17]
            "
          >
            {displayedProjects.map(
              (project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() =>
                    setSelectedProject(
                      project
                    )
                  }
                  className="
                    group
                    flex
                    w-full
                    flex-col
                    border-b
                    border-white/[0.06]
                    px-4
                    py-4
                    text-left
                    transition-colors
                    last:border-b-0
                    hover:bg-white/[0.025]

                    sm:grid
                    sm:grid-cols-[auto_auto_minmax(160px,1fr)_auto_auto]
                    sm:items-center
                    sm:gap-3
                    sm:px-4
                    sm:py-3.5
                  "
                >

                  {/* =================================
                      TOP MOBILE
                  ================================= */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2

                      sm:contents
                    "
                  >
                    {/* CATEGORY + STATUS */}

                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          shrink-0
                          rounded-md
                          border border-slate-600
                          bg-[#18253a]
                          px-2.5 py-1
                          text-[9px]
                          font-bold
                          uppercase
                          text-slate-300
                        "
                      >
                        {getCategoryLabel(
                          project.category
                        )}
                      </span>

                      <span
                        className="
                          shrink-0
                          rounded-md
                          bg-[#172235]
                          px-2 py-1
                          text-[9px]
                          text-slate-400
                        "
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* MOBILE ACTIONS */}

                    <div
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-1.5

                        sm:hidden
                      "
                    >
                      {project.demoUrl &&
                        project.demoUrl !==
                          "#" && (
                          <span
                            className="
                              flex
                              h-8 w-8
                              items-center
                              justify-center
                              rounded-md
                              border border-white/[0.06]
                              bg-[#111b2b]
                              text-slate-400
                            "
                          >
                            <FiExternalLink
                              size={13}
                            />
                          </span>
                        )}

                      <span
                        className="
                          flex
                          h-8 w-8
                          items-center
                          justify-center
                          rounded-md
                          border border-white/[0.06]
                          bg-[#111b2b]
                          text-slate-400
                        "
                      >
                        <FiArrowRight
                          size={14}
                        />
                      </span>
                    </div>
                  </div>

                  {/* =================================
                      TITLE
                  ================================= */}

                  <div
                    className="
                      mt-3
                      min-w-0

                      sm:mt-0
                    "
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-2
                      "
                    >
                      <h3
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-slate-100
                          transition-colors
                          group-hover:text-emerald-400
                        "
                      >
                        {project.title}
                      </h3>

                      {/* DESCRIPTION DESKTOP */}

                      <span
                        className="
                          hidden
                          text-slate-600

                          sm:block
                        "
                      >
                        •
                      </span>

                      <p
                        className="
                          hidden
                          truncate
                          text-[11px]
                          text-slate-500

                          sm:block
                        "
                      >
                        {
                          project.description
                        }
                      </p>
                    </div>

                    {/* DESCRIPTION MOBILE
                        MASQUÉE COMME SUR TA CAPTURE */}

                  </div>

                  {/* =================================
                      TECHNOLOGIES
                  ================================= */}

                  <div
                    className="
                      mt-3
                      flex
                      flex-wrap
                      gap-1.5

                      sm:mt-0
                      sm:max-w-[400px]
                      sm:justify-end
                    "
                  >
                    {project.technologies.map(
                      (technology) => (
                        <TechnologyBadge
                          key={
                            technology
                          }
                          name={
                            technology
                          }
                        />
                      )
                    )}
                  </div>

                  {/* =================================
                      DESKTOP ACTIONS
                  ================================= */}

                  <div
                    className="
                      hidden
                      items-center
                      gap-1.5

                      sm:flex
                    "
                  >
                    {project.demoUrl &&
                      project.demoUrl !==
                        "#" && (
                        <span
                          className="
                            flex
                            h-8 w-8
                            items-center
                            justify-center
                            rounded-md
                            border border-white/[0.06]
                            bg-[#111b2b]
                            text-slate-400
                            transition

                            group-hover:text-emerald-400
                          "
                        >
                          <FiExternalLink
                            size={13}
                          />
                        </span>
                      )}

                    <span
                      className="
                        flex
                        h-8 w-8
                        items-center
                        justify-center
                        rounded-md
                        border border-white/[0.06]
                        bg-[#111b2b]
                        text-slate-400
                        transition

                        group-hover:border-emerald-500/30
                        group-hover:text-emerald-400
                      "
                    >
                      <FiArrowRight
                        size={14}
                      />
                    </span>
                  </div>
                </button>
              )
            )}
          </div>

          {/* ==========================================
              BOTTOM ACTIONS
          ========================================== */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-5

              sm:gap-6
            "
          >
            {/* TOUT VOIR */}

            <button
              type="button"
              onClick={() =>
                setShowAll(
                  (value) =>
                    !value
                )
              }
              className="
                text-xs
                font-semibold
                text-slate-300
                transition

                hover:text-emerald-400
              "
            >
              {showAll
                ? "Réduire ↑"
                : "Tout voir →"}
            </button>

            {/* VOIR TOUS */}

           <Link
  to="/expertise"
  className="
    inline-flex items-center gap-2
    rounded-lg
    border border-emerald-500/30
    bg-emerald-500/10
    px-4 py-2
    text-sm font-medium
    text-emerald-400
    transition
    hover:bg-emerald-500/20
  "
>
  Voir tous les expertises
  <FiArrowRight size={16} />
</Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          POPUP
      ========================================== */}

      <ProjectModal
        project={selectedProject}
        onClose={() =>
          setSelectedProject(null)
        }
      />
    </>
  );
}

/* =====================================================
   CATEGORY LABEL
===================================================== */

function getCategoryLabel(
  category: Project["category"]
) {
  switch (category) {
    case "Mobile iOS/Android":
      return "MOBILE IOS/ANDROID";

    case "Web & Applications":
      return "APPLICATION WEB";

    case "Plateformes":
      return "PLATEFORME SAAS";

    default:
      return category;
  }
}