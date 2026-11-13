import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiBox,
  FiLayers,
  FiX,
} from "react-icons/fi";

import TechnologyBadge from "./TechnologyBadge";
import type { Project } from "../../types/project";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            p-4
            md:p-8
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          {/* POPUP */}
          <motion.div
            initial={{
              opacity: 0,
              y: 45,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              w-full
              max-w-[560px]
              max-h-[85vh]

              overflow-y-auto

              rounded-2xl

              border
              border-white/[0.10]

              bg-[#111a2b]

              text-white

              shadow-[0_30px_100px_rgba(0,0,0,0.55)]

              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-slate-600

              md:max-w-[620px]
            "
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            {/* ================================
                HEADER
            ================================= */}

            <div
              className="
                border-b
                border-white/[0.07]
                px-5
                pb-4
                pt-5

                md:px-6
                md:pt-6
              "
            >
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >
                {/* INFOS PROJET */}
                <div className="min-w-0">

                  {/* CATÉGORIE + STATUT */}
                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        rounded-md
                        border
                        border-slate-600
                        bg-[#18243a]
                        px-2
                        py-1
                        text-[9px]
                        font-bold
                        uppercase
                        text-slate-300
                      "
                    >
                      {project.category}
                    </span>

                    <span
                      className="
                        rounded-md
                        bg-[#18243a]
                        px-2
                        py-1
                        text-[9px]
                        text-slate-400
                      "
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* TITRE */}
                  <h2
                    className="
                      mt-2
                      text-xl
                      font-semibold
                      tracking-tight
                      text-white
                    "
                  >
                    {project.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      mt-1
                      text-[11px]
                      leading-5
                      text-slate-400
                      md:text-xs
                    "
                  >
                    {project.description}
                  </p>
                </div>

                {/* BOUTON FERMER */}
                <motion.button
                  type="button"
                  aria-label="Fermer"
                  onClick={onClose}
                  whileHover={{
                    scale: 1.1,
                    rotate: 90,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="
                    shrink-0
                    rounded-md
                    p-1.5
                    text-slate-400

                    transition

                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  <FiX size={21} />
                </motion.button>
              </div>
            </div>

            {/* ================================
                CONTENU
            ================================= */}

            <div className="px-5 py-5 md:px-6 md:py-6">

              {/* ================================
                  PRÉSENTATION
              ================================= */}

              <section
                className="
                  rounded-lg
                  border
                  border-white/[0.06]
                  bg-[#101827]
                  p-4
                "
              >
                <h3
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    text-slate-200
                  "
                >
                  Présentation du projet
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-slate-300
                  "
                >
                  {project.details}
                </p>
              </section>

              {/* ================================
                  ARCHITECTURE
              ================================= */}

              {project.architecture && (
                <section className="mt-6">

                  {/* TITRE */}
                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <FiLayers
                      size={17}
                      className="text-white"
                    />

                    <h3
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        text-slate-200
                      "
                    >
                      Architecture & Stack technique
                    </h3>
                  </div>

                  <div className="space-y-3">

                    {/* FRONTEND */}
                    <div
                      className="
                        rounded-md
                        bg-[#080e18]
                        p-3.5
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-xs
                          font-semibold
                        "
                      >
                        <span
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-emerald-400
                          "
                        />

                        Frontend Web
                      </div>

                      <div
                        className="
                          mt-2
                          flex
                          flex-wrap
                          gap-1.5
                        "
                      >
                        {project.architecture.frontend.map(
                          (technology) => (
                            <TechnologyBadge
                              key={technology}
                              name={technology}
                            />
                          )
                        )}
                      </div>
                    </div>

                    {/* BACKEND */}
                    <div
                      className="
                        rounded-md
                        bg-[#080e18]
                        p-3.5
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-xs
                          font-semibold
                        "
                      >
                        <span
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-emerald-400
                          "
                        />

                        Backend & Base de données
                      </div>

                      <div
                        className="
                          mt-2
                          flex
                          flex-wrap
                          gap-1.5
                        "
                      >
                        {project.architecture.backend.map(
                          (technology) => (
                            <TechnologyBadge
                              key={technology}
                              name={technology}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ================================
                  MODULES
              ================================= */}

              {project.modules &&
                project.modules.length > 0 && (
                  <section className="mt-6">

                    {/* TITRE */}
                    <div
                      className="
                        mb-3
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <FiBox
                        size={17}
                        className="text-white"
                      />

                      <h3
                        className="
                          text-xs
                          font-semibold
                          uppercase
                          text-slate-200
                        "
                      >
                        Modules fonctionnels clés
                      </h3>
                    </div>

                    {/* LISTE MODULES */}
                    <div className="space-y-2.5">

                      {project.modules.map(
                        (module, index) => (
                          <div
                            key={module.title}
                            className="
                              rounded-md
                              bg-[#080e18]
                              p-3.5

                              transition
                              duration-200

                              hover:bg-[#0d1624]
                            "
                          >
                            <h4
                              className="
                                text-xs
                                font-semibold
                                text-white
                              "
                            >
                              {index + 1}.{" "}
                              {module.title}
                            </h4>

                            <p
                              className="
                                mt-1.5
                                text-[11px]
                                leading-5
                                text-slate-400
                              "
                            >
                              {module.description}
                            </p>
                          </div>
                        )
                      )}

                    </div>
                  </section>
                )}

              {/* ================================
                  TECHNOLOGIES
              ================================= */}

              <div
                className="
                  mt-6
                  border-t
                  border-white/[0.07]
                  pt-4
                "
              >
                <div
                  className="
                    flex
                    flex-wrap
                    gap-1.5
                  "
                >
                  {project.technologies.map(
                    (technology) => (
                      <TechnologyBadge
                        key={technology}
                        name={technology}
                      />
                    )
                  )}
                </div>
              </div>

              {/* ================================
                  FOOTER
              ================================= */}

              <div
                className="
                  mt-4
                  border-t
                  border-white/[0.07]
                  pt-4
                "
              >
                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {/* ACCÉDER AU SITE */}
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="
                        inline-flex
                        items-center
                        gap-2

                        rounded-md

                        border
                        border-slate-600

                        bg-[#17243a]

                        px-4
                        py-2

                        text-xs
                        font-semibold
                        text-white

                        transition

                        hover:border-emerald-500/40
                        hover:text-emerald-400
                      "
                    >
                      Accéder au site

                      <FiArrowUpRight
                        size={14}
                      />
                    </motion.a>
                  )}

                  {/* FERMER */}
                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      rounded-md

                      border
                      border-white/10

                      bg-[#17243a]

                      px-4
                      py-2

                      text-xs
                      font-semibold

                      text-slate-300

                      transition

                      hover:text-white
                    "
                  >
                    Fermer
                  </motion.button>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}