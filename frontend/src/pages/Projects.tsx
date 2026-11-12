import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import api from "../services/api";

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
    <main className="min-h-screen bg-white px-5 pb-24 pt-28 text-slate-900 dark:bg-[#070d16] dark:text-white">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">
            Projets
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Ce que je{" "}
            <span className="text-emerald-500">construis.</span>
          </h1>

          <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
            Une sélection de projets personnels, professionnels et
            expérimentaux.
          </p>
        </motion.div>

        {/* LOADING */}
        {loading && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[420px] animate-pulse rounded-3xl bg-slate-100 dark:bg-white/5"
              />
            ))}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <p className="mt-12 text-red-500">
            {error}
          </p>
        )}

        {/* PROJECTS */}
        {!loading && !error && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]"
              >
                {/* IMAGE */}
                <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-900">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      Pas d'image
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-900 backdrop-blur dark:bg-black/60 dark:text-white">
                    {project.category}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h2 className="text-xl font-bold">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {project.description}
                  </p>

                  {/* TECHNOLOGIES */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* LINKS */}
                  <div className="mt-6 flex items-center gap-3">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600"
                      >
                        Voir le projet
                        <FiArrowUpRight size={15} />
                      </a>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-emerald-500 hover:text-emerald-500 dark:border-white/10 dark:text-slate-300"
                        aria-label="GitHub"
                      >
                        <FiGithub size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}