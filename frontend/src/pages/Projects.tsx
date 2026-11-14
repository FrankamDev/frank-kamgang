import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiGithub,
  FiExternalLink,
} from "react-icons/fi";
import api from "../services/api";
import MobileBottomNav from "../components/MobileBottomNav";
import Navbar from "../components/Navbar";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  category: string;
  technologies: string[] | null;
  demo_url: string | null;
  github_url: string | null;
  is_featured: boolean;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Project[]>("/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch(() => {
        setError("Impossible de charger les projets.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main
      className="
        min-h-screen
        bg-white
        px-4
        pb-28
        pt-24
        text-slate-900
        dark:bg-[#070d16]
        dark:text-white

        sm:px-6
        sm:pt-28

        lg:px-8
      "
    >
      <Navbar/>
      <div className="mx-auto max-w-6xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-2xl"
        >
          {/* Label */}

          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              border
              border-emerald-500/20
              bg-emerald-500/[0.04]
              px-3
              py-1.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-emerald-500
              sm:text-xs
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            Projets
          </div>

          {/* Title */}

          <h1
            className="
              text-[2.35rem]
              font-semibold
              leading-[1]
              tracking-[-0.055em]

              sm:text-5xl
              lg:text-6xl
            "
          >
            Ce que je{" "}
            <span className="text-emerald-500">
              construis.
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-4
              max-w-xl
              text-[14px]
              leading-6
              text-slate-500
              dark:text-slate-400

              sm:mt-5
              sm:text-base
              sm:leading-7
            "
          >
            Une sélection de projets personnels, professionnels
            et expérimentaux transformés en solutions digitales
            concrètes.
          </p>
        </motion.header>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div
            className="
              mt-9
              grid
              gap-4

              sm:mt-12
              sm:gap-6

              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  h-[390px]
                  animate-pulse
                  border
                  border-slate-200
                  bg-slate-100

                  dark:border-white/5
                  dark:bg-white/[0.04]

                  sm:h-[420px]
                "
              />
            ))}
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (
          <div
            className="
              mt-10
              border
              border-red-500/20
              bg-red-500/[0.05]
              px-4
              py-3
              text-sm
              text-red-500
            "
          >
            {error}
          </div>
        )}

        {/* =================================================
            PROJECTS
        ================================================= */}

        {!loading && !error && projects.length > 0 && (
          <div
            className="
              mt-9
              grid
              gap-4

              sm:mt-12
              sm:gap-6

              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -5,
                }}
                className="
                  group
                  overflow-hidden
                  border
                  border-slate-200
                  bg-white
                  transition-all
                  duration-300

                  hover:border-emerald-500/30
                  hover:shadow-xl
                  hover:shadow-emerald-500/[0.04]

                  dark:border-white/[0.08]
                  dark:bg-[#0d1623]
                  dark:hover:border-emerald-500/20

                  lg:rounded-xl
                "
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div
                  className="
                    relative
                    aspect-[16/10]
                    overflow-hidden
                    bg-slate-100

                    dark:bg-[#0a111c]
                  "
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.04]
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-full
                        items-center
                        justify-center
                        text-xs
                        text-slate-400
                      "
                    >
                      Pas d'image
                    </div>
                  )}

                  {/* Gradient */}

                  <div
                    className="
                      pointer-events-none
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/30
                      via-transparent
                      to-transparent
                      opacity-60
                    "
                  />

                  {/* Category */}

                  <span
                    className="
                      absolute
                      left-3
                      top-3
                      border
                      border-white/10
                      bg-black/50
                      px-2.5
                      py-1
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-white
                      backdrop-blur-md

                      sm:left-4
                      sm:top-4
                      sm:text-[10px]
                    "
                  >
                    {project.category}
                  </span>

                  {/* Featured */}

                  {project.is_featured && (
                    <span
                      className="
                        absolute
                        right-3
                        top-3
                        bg-emerald-500
                        px-2.5
                        py-1
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.1em]
                        text-[#03100a]

                        sm:right-4
                        sm:top-4
                      "
                    >
                      Featured
                    </span>
                  )}
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="p-4 sm:p-5">

                  {/* Title */}

                  <h2
                    className="
                      text-[17px]
                      font-semibold
                      tracking-tight

                      sm:text-xl
                    "
                  >
                    {project.title}
                  </h2>

                  {/* Description */}

                  <p
                    className="
                      mt-2.5
                      line-clamp-3
                      text-[13px]
                      leading-6
                      text-slate-500

                      dark:text-slate-400

                      sm:mt-3
                      sm:text-sm
                    "
                  >
                    {project.description}
                  </p>

                  {/* =================================================
                      TECHNOLOGIES
                  ================================================= */}

                  {project.technologies &&
                    project.technologies.length > 0 && (
                      <div
                        className="
                          mt-4
                          flex
                          flex-wrap
                          gap-1.5
                        "
                      >
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="
                              border
                              border-slate-200
                              bg-slate-50
                              px-2
                              py-1
                              text-[9px]
                              font-medium
                              text-slate-500

                              dark:border-white/[0.07]
                              dark:bg-white/[0.04]
                              dark:text-slate-400

                              sm:text-[10px]
                            "
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                  {/* =================================================
                      LINKS
                  ================================================= */}

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                    "
                  >
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group/link
                          inline-flex
                          items-center
                          gap-1.5
                          bg-emerald-500
                          px-3.5
                          py-2
                          text-[10px]
                          font-bold
                          text-[#03100a]
                          transition

                          hover:bg-emerald-400

                          sm:px-4
                          sm:py-2.5
                          sm:text-xs
                        "
                      >
                        Voir le projet

                        <FiArrowUpRight
                          size={14}
                          className="
                            transition-transform
                            group-hover/link:-translate-y-0.5
                            group-hover/link:translate-x-0.5
                          "
                        />
                      </a>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Code source de ${project.title}`}
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          border
                          border-slate-200
                          text-slate-500
                          transition

                          hover:border-emerald-500/40
                          hover:text-emerald-500

                          dark:border-white/10
                          dark:text-slate-400
                          dark:hover:text-emerald-400
                        "
                      >
                        <FiGithub size={15} />
                      </a>
                    )}

                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ouvrir ${project.title}`}
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          border
                          border-slate-200
                          text-slate-500
                          transition

                          hover:border-emerald-500/40
                          hover:text-emerald-500

                          dark:border-white/10
                          dark:text-slate-400
                          dark:hover:text-emerald-400
                        "
                      >
                        <FiExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Aucun projet */}

        {!loading && !error && projects.length === 0 && (
          <div
            className="
              mt-10
              border
              border-slate-200
              px-5
              py-10
              text-center
              text-sm
              text-slate-500

              dark:border-white/10
              dark:text-slate-400
            "
          >
            Aucun projet disponible pour le moment.
          </div>
        )}
      </div>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
      ===================================================== */}

      <MobileBottomNav />
    </main>
  );
}