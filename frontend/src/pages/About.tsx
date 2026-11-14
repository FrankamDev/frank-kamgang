import { motion } from "framer-motion";

import {
  FiCode,
  FiDatabase,
  FiPenTool,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import MobileBottomNav from "../components/MobileBottomNav";
import AboutHero from "../components/AboutHero";


const skills = [
  {
    icon: FiCode,
    number: "01",
    title: "Développement web",
    description:
      "Création d'applications modernes avec React, TypeScript, Laravel et Node.js.",
  },
  {
    icon: FiDatabase,
    number: "02",
    title: "Backend & API",
    description:
      "Conception d'API, bases de données et architectures backend robustes.",
  },
  {
    icon: FiPenTool,
    number: "03",
    title: "Design digital",
    description:
      "Création d'interfaces, visuels et identités graphiques avec une approche moderne.",
  },
  {
    icon: FiTrendingUp,
    number: "04",
    title: "Business digital",
    description:
      "Création de produits numériques, automatisation et stratégies d'acquisition.",
  },
];

const technologies = [
  "React",
  "TypeScript",
  "Laravel",
  "PHP",
  "Node.js",
  "MySQL",
  "Tailwind CSS",
  "Git",
];

export default function About() {
  return (
    
      <main
        className="
      min-h-screen
      overflow-hidden
        bg-white
        text-slate-900
        transition-colors
        duration-300
        dark:bg-[#080d17]
        dark:text-white
      "
      >
        {/* =====================================================
          BACKGROUND
      ===================================================== */}

        <div
          className="
          pointer-events-none
          fixed
          inset-0
          -z-0
          overflow-hidden
        "
        >
          <div
            className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.04),transparent_35%)]
            dark:bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_35%)]
          "
          />

          <div
            className="
            absolute
            inset-0
            opacity-[0.15]
            dark:opacity-[0.3]
            [background-image:radial-gradient(rgba(100,116,139,0.2)_1px,transparent_1px)]
            [background-size:24px_24px]
          "
          />
        </div>

        {/* =====================================================
          NAVBAR
      ===================================================== */}

        <Navbar />

        {/* =====================================================
          CONTENU
      ===================================================== */}

        <div
          className="
          mx-auto
          max-w-7xl
          px-4
          pb-28
          pt-28
          sm:px-6
          sm:pb-20
          sm:pt-36
          lg:px-8
        "
        >
          {/* =====================================================
            ABOUT HERO
        ===================================================== */}

          <AboutHero />

          {/* =====================================================
            DOMAINES
        ===================================================== */}

          <section className="mt-16 sm:mt-24">
            <SectionHeader
              eyebrow="Ce que je fais"
              title="Mes domaines de"
              highlight="prédilection."
              description="Un profil polyvalent qui combine développement, design et compréhension des enjeux business."
            />

            <div
              className="
              mt-8
              grid
              gap-3
              sm:mt-10
              sm:grid-cols-2
              sm:gap-4
            "
            >
              {skills.map((skill, index) => {
                const Icon = skill.icon;

                return (
                  <motion.article
                    key={skill.title}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.07,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                    className="
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-emerald-400/40
                    dark:border-slate-800
                    dark:bg-[#101827]
                    dark:shadow-none
                    sm:p-7
                  "
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        bg-slate-50
                        text-emerald-500
                        dark:border-slate-700
                        dark:bg-[#0b1220]
                        dark:text-emerald-400
                      "
                      >
                        <Icon className="text-sm" />
                      </div>

                      <span
                        className="
                        text-3xl
                        font-black
                        text-slate-100
                        dark:text-slate-800
                      "
                      >
                        {skill.number}
                      </span>
                    </div>

                    <h3
                      className="
                      mt-6
                      text-lg
                      font-bold
                      tracking-tight
                      sm:text-xl
                    "
                    >
                      {skill.title}
                    </h3>

                    <p
                      className="
                      mt-2.5
                      text-xs
                      leading-6
                      text-slate-600
                      dark:text-slate-400
                      sm:text-sm
                      sm:leading-7
                    "
                    >
                      {skill.description}
                    </p>

                    {/* Ligne animée */}
                    <span
                      className="
                      absolute
                      bottom-0
                      left-0
                      h-px
                      w-0
                      bg-emerald-400
                      transition-all
                      duration-500
                      group-hover:w-full
                    "
                    />
                  </motion.article>
                );
              })}
            </div>
          </section>

          {/* =====================================================
            STACK TECHNIQUE
        ===================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mt-16 sm:mt-24"
          >
            <SectionHeader
              eyebrow="Stack technique"
              title="Les technologies que"
              highlight="j'utilise."
              description="Des outils modernes sélectionnés selon les besoins et les contraintes de chaque projet."
            />

            <div
              className="
              mt-7
              grid
              grid-cols-2
              gap-2.5
              sm:mt-9
              sm:grid-cols-3
              sm:gap-3
              md:grid-cols-4
            "
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-3.5
                  text-center
                  transition
                  hover:border-emerald-400/40
                  dark:border-slate-800
                  dark:bg-[#101827]
                  sm:px-4
                  sm:py-4
                "
                >
                  <span
                    className="
                    text-xs
                    font-semibold
                    text-slate-700
                    dark:text-slate-200
                    sm:text-sm
                  "
                  >
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* =====================================================
            VISION
        ===================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mt-16 sm:mt-24"
          >
            <div
              className="
              relative
              overflow-hidden
              rounded-xl
              border
              border-emerald-400/20
              bg-emerald-50
              p-6
              dark:bg-gradient-to-br
              dark:from-emerald-400/[0.07]
              dark:via-[#101827]
              dark:to-[#101827]
              sm:p-9
            "
            >
              <div
                className="
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-emerald-400/[0.08]
                blur-3xl
              "
              />

              <div className="relative max-w-3xl">
                <span
                  className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-emerald-600
                  dark:text-emerald-400
                  sm:text-xs
                "
                >
                  Ma vision
                </span>

                <h2
                  className="
                  mt-3
                  text-2xl
                  font-black
                  tracking-tight
                  sm:text-3xl
                  lg:text-4xl
                "
                >
                  Apprendre. Construire.
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {" "}
                    Évoluer.
                  </span>
                </h2>

                <p
                  className="
                  mt-3
                  text-xs
                  leading-6
                  text-slate-600
                  dark:text-slate-400
                  sm:text-sm
                  sm:leading-7
                "
                >
                  Je considère chaque projet comme une occasion d'apprendre
                  quelque chose de nouveau. Mon ambition est de construire des
                  produits utiles tout en développant continuellement mes
                  compétences techniques et créatives.
                </p>

                <Link
                  to="/expertise"
                  className="
                  group
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  text-emerald-600
                  dark:text-emerald-400
                  sm:text-sm
                "
                >
                  Découvrir mon expertise

                  <FiArrowRight
                    className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  />
                </Link>
              </div>
            </div>
          </motion.section>

          {/* =====================================================
            CTA
        ===================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mt-16 pb-4 sm:mt-24"
          >
            <div className="text-center">
              <p
                className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-emerald-600
                dark:text-emerald-400
                sm:text-xs
              "
              >
                Un projet en tête ?
              </p>

              <h2
                className="
                mt-3
                text-2xl
                font-black
                tracking-tight
                sm:text-4xl
              "
              >
                Construisons quelque chose
                <span className="text-emerald-500 dark:text-emerald-400">
                  {" "}
                  d'utile.
                </span>
              </h2>

              <p
                className="
                mx-auto
                mt-3
                max-w-xl
                text-xs
                leading-6
                text-slate-600
                dark:text-slate-400
                sm:text-sm
                sm:leading-7
              "
              >
                Découvrez mes projets ou contactez-moi pour discuter de votre
                prochaine idée.
              </p>

              <div
                className="
                mt-5
                flex
                flex-col
                justify-center
                gap-2.5
                sm:flex-row
              "
              >
                <Link
                  to="/projects"
                  className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-emerald-500
                  px-5
                  py-3
                  text-xs
                  font-bold
                  text-slate-950
                  transition
                  hover:-translate-y-0.5
                  hover:bg-emerald-400
                  sm:text-sm
                "
                >
                  Explorer mes projets

                  <FiArrowRight />
                </Link>

                <Link
                  to="/contact"
                  className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3
                  text-xs
                  font-bold
                  text-slate-700
                  dark:border-slate-800
                  dark:bg-[#101827]
                  dark:text-slate-200
                  sm:text-sm
                "
                >
                  Me contacter
                </Link>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Navigation mobile */}
        <MobileBottomNav />
      </main>
      );
}

      /* ==========================================================
         SECTION HEADER
      ========================================================== */

      function SectionHeader({
        eyebrow,
        title,
        highlight,
        description,
}: {
        eyebrow: string;
      title: string;
      highlight: string;
      description: string;
}) {
  return (
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        className="max-w-2xl"
      >
        <div
          className="
          mb-3
          flex
          items-center
          gap-2
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-emerald-600
          dark:text-emerald-400
          sm:mb-4
          sm:text-xs
        "
        >
          <span className="h-px w-6 bg-emerald-400 sm:w-8" />

          {eyebrow}
        </div>

        <h2
          className="
          text-2xl
          font-bold
          tracking-tight
          sm:text-3xl
          lg:text-5xl
        "
        >
          {title}{" "}
          <span className="text-emerald-500 dark:text-emerald-400">
            {highlight}
          </span>
        </h2>

        <p
          className="
          mt-3
          text-xs
          leading-6
          text-slate-600
          dark:text-slate-400
          sm:mt-4
          sm:text-sm
          sm:leading-7
          lg:text-base
        "
        >
          {description}
        </p>
        
      </motion.div>
    );
}