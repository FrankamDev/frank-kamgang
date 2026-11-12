import { motion } from "framer-motion";
import {
  FiCode,
  FiDatabase,
  FiPenTool,
  FiTrendingUp,
} from "react-icons/fi";
import Navbar from "../components/Navbar";

const skills = [
  {
    icon: FiCode,
    title: "Développement web",
    description:
      "Création d'applications modernes avec React, TypeScript, Laravel et Node.js.",
  },
  {
    icon: FiDatabase,
    title: "Backend & API",
    description:
      "Conception d'API, bases de données et architectures backend robustes.",
  },
  {
    icon: FiPenTool,
    title: "Design digital",
    description:
      "Création d'interfaces, visuels et identités graphiques avec une approche moderne.",
  },
  {
    icon: FiTrendingUp,
    title: "Business digital",
    description:
      "Création de produits numériques, automatisation et stratégies d'acquisition.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-white px-5 pb-24 pt-28 text-slate-900 dark:bg-[#070d16] dark:text-white">
      <div className="mx-auto max-w-5xl">

        {/* INTRO */}
        <Navbar/>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">
            À propos
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Je transforme mes idées en{" "}
            <span className="text-emerald-500">projets concrets.</span>
          </h1>

          <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
            Je suis Frank Kamgang, développeur web et créateur digital.
            J'aime construire des applications utiles, expérimenter de
            nouvelles technologies et transformer des idées en produits
            numériques.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
            Mon objectif est de progresser constamment, créer des solutions
            réellement utiles et développer des projets capables de générer
            de la valeur.
          </p>
        </motion.section>

        {/* SKILLS */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">
              Ce que je fais
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Mes domaines de prédilection
            </h2>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-colors dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {skill.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* STACK */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">
            Stack
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Technologies que j'utilise
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "React",
              "TypeScript",
              "Laravel",
              "PHP",
              "Node.js",
              "MySQL",
              "Tailwind CSS",
              "Git",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium dark:border-white/10 dark:bg-white/[0.04]"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  );
}