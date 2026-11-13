import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCode,
  FaDatabase,
  FaMobileAlt,
  FaPalette,
  FaServer,
  FaReact,
  FaLaravel,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaWhatsapp,
  FaCheck,
  FaBolt,
  FaLayerGroup,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileBottomNav from "../components/MobileBottomNav";

const services = [
  {
    icon: FaCode,
    number: "01",
    title: "Ingénierie Full Stack",
    description:
      "Conception et développement d'applications web modernes, performantes et évolutives, de l'interface utilisateur jusqu'à l'API.",
    technologies: ["React", "TypeScript", "Laravel", "Node.js"],
  },
  {
    icon: FaServer,
    number: "02",
    title: "Architecture Backend & APIs",
    description:
      "Conception d'APIs RESTful robustes, sécurisées et pensées pour accompagner la croissance de vos applications et services numériques.",
    technologies: ["PHP", "Laravel", "MySQL", "REST API"],
  },
  {
    icon: FaMobileAlt,
    number: "03",
    title: "Applications Multiplateformes",
    description:
      "Conception d'expériences mobiles modernes et réactives avec une approche orientée performance et expérience utilisateur.",
    technologies: ["Flutter", "Android", "iOS", "API"],
  },
  {
    icon: FaPalette,
    number: "04",
    title: "Design & Identité Visuelle",
    description:
      "Création d'univers visuels cohérents pour renforcer votre image de marque : identité, interfaces, supports et contenus digitaux.",
    technologies: ["UI Design", "Photoshop", "Branding", "Social Media"],
  },
];

const technologies = [
  {
    icon: FaReact,
    name: "React",
    category: "Frontend",
  },
  {
    icon: FaLaravel,
    name: "Laravel",
    category: "Backend",
  },
  {
    icon: FaNodeJs,
    name: "Node.js",
    category: "Backend",
  },
  {
    icon: FaDatabase,
    name: "MySQL",
    category: "Database",
  },
  {
    icon: FaGitAlt,
    name: "Git",
    category: "Versioning",
  },
  {
    icon: FaDocker,
    name: "Docker",
    category: "DevOps",
  },
];

const advantages = [
  {
    icon: FaBolt,
    title: "Performance",
    text: "Des solutions rapides, optimisées et pensées pour offrir une expérience fluide.",
  },
  {
    icon: FaShieldAlt,
    title: "Fiabilité",
    text: "Une architecture propre, maintenable et conçue pour évoluer avec votre activité.",
  },
  {
    icon: FaLayerGroup,
    title: "Vision globale",
    text: "Une approche qui relie développement, design, produit et stratégie digitale.",
  },
  {
    icon: FaRocket,
    title: "Orientation résultat",
    text: "Chaque choix technique doit servir un objectif concret et mesurable.",
  },
];

const process = [
  {
    number: "01",
    title: "Comprendre",
    description:
      "Analyse du besoin, des objectifs, des utilisateurs et des contraintes du projet.",
  },
  {
    number: "02",
    title: "Concevoir",
    description:
      "Architecture technique, parcours utilisateur, interface et choix technologiques.",
  },
  {
    number: "03",
    title: "Développer",
    description:
      "Construction progressive avec une attention particulière portée à la qualité du code.",
  },
  {
    number: "04",
    title: "Optimiser",
    description:
      "Tests, performances, sécurité, responsive design et amélioration continue.",
  },
];

const program = [
  "Ingénierie Full Stack : architectures robustes Laravel & APIs RESTful scalables",
  "Interfaces Web Modernes : React, TypeScript, Tailwind CSS et expériences réactives",
  "Développement Mobile Multiplateforme : applications Android & iOS",
  "Identité Visuelle & Direction Artistique : logos, interfaces et supports digitaux",
  "Accompagnement Tech : conception, optimisation et montée en compétences",
];

export default function Expertise() {
  return (
    <main
      className="
        min-h-screen overflow-hidden
        bg-white text-slate-900
        transition-colors duration-300
        dark:bg-[#080d17] dark:text-white
      "
    >
      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_35%)]
            dark:bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_35%)]
          "
        />
        <div
          className="
          absolute inset-0 opacity-[0.18] dark:opacity-[0.3]
          [background-image:radial-gradient(rgba(100,116,139,0.22)_1px,transparent_1px)]
          [background-size:24px_24px]
          "
          />
          <Navbar/>

        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute left-[-250px] top-[20%]
            h-[400px] w-[400px]
            rounded-full
            bg-emerald-500/[0.025]
            blur-[120px]
            dark:bg-emerald-500/[0.04]
          "
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute right-[-250px] top-[45%]
            h-[400px] w-[400px]
            rounded-full
            bg-blue-500/[0.02]
            blur-[120px]
            dark:bg-blue-500/[0.035]
          "
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-5xl text-center">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
              mb-5 inline-flex items-center gap-2
              rounded-full
              border border-emerald-400/40
              bg-emerald-50 px-3 py-1.5
              text-[10px] font-bold uppercase tracking-wider
              text-emerald-600
              dark:bg-emerald-400/[0.04]
              dark:text-emerald-400
              sm:px-4 sm:py-2 sm:text-xs
            "
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

            Bientôt disponible
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="
              mx-auto max-w-4xl
              text-[2.65rem] font-black
              leading-[0.95]
              tracking-[-0.055em]
              sm:text-5xl
              md:text-6xl
              lg:text-8xl
            "
          >
            Mon Expertise
            <span className="block">
              &{" "}
              <span className="text-emerald-500 dark:text-emerald-400">
                Prestations
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="
              mx-auto mt-5 max-w-2xl
              text-xs leading-6
              text-slate-600
              dark:text-slate-400
              sm:mt-7 sm:text-base sm:leading-7
              lg:text-lg lg:leading-8
            "
          >
            Une présentation détaillée de mon offre d'ingénierie logicielle,
            de conception d'architectures modernes et d'accompagnement
            sur-mesure pour vos ambitions digitales.
          </motion.p>
        </div>
      </section>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <section className="px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mx-auto max-w-3xl
            rounded-xl
            border border-slate-200
            bg-white
            p-5
            shadow-lg shadow-slate-200/30
            dark:border-slate-800
            dark:bg-[#101827]
            dark:shadow-black/20
            sm:p-7
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Progression de conception
            </div>

            <span className="text-sm font-bold text-emerald-500 dark:text-emerald-400">
              70%
            </span>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{
                duration: 1.3,
                ease: "easeOut",
              }}
              className="
                h-full rounded-full
                bg-emerald-500
                shadow-[0_0_18px_rgba(52,211,153,0.35)]
              "
            />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 sm:text-xs">
            Au programme sur cette page
          </p>

          <div className="mt-3 space-y-2.5">
            {program.map((item) => (
              <div
                key={item}
                className="
                  flex items-start gap-2.5
                  text-xs leading-5
                  text-slate-600
                  dark:text-slate-300
                  sm:text-sm sm:leading-6
                "
              >
                <FaCheck className="mt-1 shrink-0 text-[10px] text-emerald-500 dark:text-emerald-400" />

                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <SectionHeader
            eyebrow="Ce que je propose"
            title="Des compétences transformées"
            highlight="en solutions."
            description="Une approche multidisciplinaire pour concevoir des produits numériques cohérents, performants et prêts à évoluer."
          />

          <div className="mt-9 grid gap-4 sm:mt-12 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.number}
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
                    amount: 0.1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="
                    group relative overflow-hidden
                    rounded-xl
                    border border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                    transition-all duration-300
                    hover:border-emerald-400/40
                    dark:border-slate-800
                    dark:bg-[#101827]
                    dark:shadow-none
                    sm:p-7
                  "
                >
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div
                        className="
                          flex h-10 w-10 items-center justify-center
                          rounded-lg
                          border border-slate-200
                          bg-slate-50
                          text-emerald-500
                          transition
                          group-hover:border-emerald-400/30
                          group-hover:bg-emerald-400/10
                          dark:border-slate-700
                          dark:bg-[#0b1220]
                          dark:text-emerald-400
                        "
                      >
                        <Icon className="text-sm" />
                      </div>

                      <span className="text-3xl font-black text-slate-100 dark:text-slate-800">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-bold tracking-tight sm:text-xl">
                      {service.title}
                    </h3>

                    <p
                      className="
                        mt-3 text-xs leading-6
                        text-slate-600
                        dark:text-slate-400
                        sm:text-sm sm:leading-7
                      "
                    >
                      {service.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5 sm:mt-7 sm:gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="
                            rounded-md
                            border border-slate-200
                            bg-slate-50
                            px-2.5 py-1
                            text-[10px] font-medium
                            text-slate-600
                            dark:border-slate-700
                            dark:bg-slate-900/50
                            dark:text-slate-300
                            sm:text-xs
                          "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="
                      absolute bottom-0 left-0
                      h-px w-0
                      bg-emerald-400
                      transition-all duration-500
                      group-hover:w-full
                    "
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ADVANTAGES
      ===================================================== */}

      <section
        className="
          border-y border-slate-200
          bg-slate-50/70
          px-4 py-14
          dark:border-slate-800/70
          dark:bg-[#0b1220]/40
          sm:px-6 sm:py-20
          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Ma façon de travailler"
            title="Plus qu'un développeur,"
            highlight="un partenaire."
            description="La technologie n'est qu'un moyen. L'objectif reste de construire une solution utile, fiable et réellement adaptée à votre projet."
          />

          <div className="mt-9 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
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
                  transition={{
                    delay: index * 0.07,
                  }}
                  className="
                    rounded-xl
                    border border-slate-200
                    bg-white
                    p-5
                    dark:border-slate-800
                    dark:bg-[#101827]
                    sm:p-6
                  "
                >
                  <div
                    className="
                      mb-4 flex h-9 w-9 items-center justify-center
                      rounded-lg
                      bg-emerald-500/10
                      text-emerald-500
                      dark:text-emerald-400
                    "
                  >
                    <Icon className="text-sm" />
                  </div>

                  <h3 className="text-sm font-bold sm:text-base">
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2 text-xs leading-6
                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGIES
      ===================================================== */}

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <SectionHeader
            eyebrow="Stack technique"
            title="Les outils derrière"
            highlight="mes solutions."
            description="Un écosystème moderne choisi en fonction des besoins du projet, et non l'inverse."
          />

          <div className="mt-9 grid grid-cols-2 gap-2.5 sm:mt-12 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;

              return (
                <motion.div
                  key={tech.name}
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
                    group rounded-xl
                    border border-slate-200
                    bg-white
                    p-4
                    text-center
                    transition
                    hover:border-emerald-400/30
                    dark:border-slate-800
                    dark:bg-[#101827]
                    sm:p-5
                  "
                >
                  <Icon
                    className="
                      mx-auto text-xl
                      text-slate-400
                      transition
                      group-hover:text-emerald-500
                      dark:group-hover:text-emerald-400
                    "
                  />

                  <p className="mt-2 text-xs font-semibold sm:text-sm">
                    {tech.name}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-500 sm:text-[11px]">
                    {tech.category}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <SectionHeader
            eyebrow="Méthodologie"
            title="De l'idée"
            highlight="à la solution."
            description="Un processus clair pour transformer progressivement une idée en produit numérique exploitable."
          />

          <div className="relative mt-10 grid gap-7 sm:mt-14 md:grid-cols-4 md:gap-5">
            <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-slate-200 dark:bg-slate-800 md:block" />

            {process.map((item, index) => (
              <motion.div
                key={item.number}
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
                transition={{
                  delay: index * 0.08,
                }}
                className="relative"
              >
                <div
                  className="
                    relative z-10
                    flex h-11 w-11 items-center justify-center
                    rounded-full
                    border border-emerald-400/30
                    bg-white
                    text-xs font-bold
                    text-emerald-500
                    dark:bg-[#080d17]
                    dark:text-emerald-400
                  "
                >
                  {item.number}
                </div>

                <h3 className="mt-4 text-base font-bold">
                  {item.title}
                </h3>

                <p
                  className="
                    mt-1.5 text-xs leading-6
                    text-slate-600
                    dark:text-slate-400
                  "
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-4 pb-16 pt-6 sm:px-6 sm:pb-24 lg:px-8">
        <motion.div
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
          className="
            relative mx-auto max-w-5xl overflow-hidden
            rounded-xl
            border border-emerald-400/20
            bg-emerald-50
            p-6
            text-center
            dark:bg-gradient-to-br
            dark:from-emerald-400/[0.08]
            dark:via-[#101827]
            dark:to-[#101827]
            sm:p-10
          "
        >
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-400/[0.07] blur-3xl" />

          <div className="relative">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Prêt à construire quelque chose ?
            </span>

            <h2
              className="
                mt-3 text-2xl font-black tracking-tight
                sm:text-4xl
              "
            >
              Parlons de votre{" "}
              <span className="text-emerald-500 dark:text-emerald-400">
                projet.
              </span>
            </h2>

            <p
              className="
                mx-auto mt-3 max-w-xl
                text-xs leading-6
                text-slate-600
                dark:text-slate-400
                sm:text-sm sm:leading-7
              "
            >
              Une idée, une application, un site ou un besoin technique ?
              Transformons votre vision en une solution concrète.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row sm:gap-3">
              <Link
                to="/contact"
                className="
                  group inline-flex items-center justify-center gap-2
                  rounded-lg
                  bg-emerald-500
                  px-5 py-3
                  text-xs font-bold text-slate-950
                  shadow-[0_0_30px_rgba(52,211,153,0.15)]
                  transition
                  hover:-translate-y-0.5
                  hover:bg-emerald-400
                  sm:text-sm
                "
              >
                Discuter d'un projet

                <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="https://wa.me/237690461830"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-lg
                  border border-slate-200
                  bg-white
                  px-5 py-3
                  text-xs font-bold
                  text-slate-800
                  transition
                  hover:-translate-y-0.5
                  hover:border-emerald-400/40
                  dark:border-slate-700
                  dark:bg-[#111827]
                  dark:text-white
                  sm:text-sm
                "
              >
                <FaWhatsapp className="text-emerald-500 dark:text-emerald-400" />

                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          BOTTOM NAV
      ===================================================== */}

      <div
        className="
          mx-auto flex max-w-5xl
          flex-col gap-3
          border-t border-slate-200
          px-4 py-6
          dark:border-slate-800
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <Link
          to="/about"
          className="
            group inline-flex items-center gap-2
            text-xs font-semibold
            text-slate-500
            transition hover:text-slate-900
            dark:text-slate-400
            dark:hover:text-white
          "
        >
          <FaArrowLeft className="text-[10px] transition-transform group-hover:-translate-x-1" />

          Retour à propos
        </Link>

        <Link
          to="/contact"
          className="
            group inline-flex items-center gap-2
            text-xs font-semibold
            text-emerald-600
            dark:text-emerald-400
          "
        >
          Discuter d'un projet

          <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <MobileBottomNav/>
    </main>
  );
}

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
          mb-3 flex items-center gap-2
          text-[10px] font-bold uppercase tracking-[0.18em]
          text-emerald-600
          dark:text-emerald-400
          sm:mb-4 sm:text-xs
        "
      >
        <span className="h-px w-6 bg-emerald-400 sm:w-8" />

        {eyebrow}
      </div>

      <h2
        className="
          text-2xl font-bold tracking-tight
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
          mt-3 text-xs leading-6
          text-slate-600
          dark:text-slate-400
          sm:mt-4 sm:text-sm sm:leading-7
          lg:text-base
        "
      >
        {description}
      </p>
    </motion.div>
  );
}