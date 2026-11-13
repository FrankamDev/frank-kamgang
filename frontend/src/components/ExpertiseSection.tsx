import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCode,
  FaMobileAlt,
  FaPalette,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const expertise = [
  {
    icon: FaCode,
    title: "Architecture & Ingénierie Full Stack",
    description:
      "Conception d'APIs robustes, scalables et sécurisées avec Laravel, couplées à des interfaces utilisateur dynamiques et ultra-rapides avec React, Vue.js et Nuxt.",
  },
  {
    icon: FaMobileAlt,
    title: "Développement Mobile Multiplateforme",
    description:
      "Création d'applications mobiles iOS et Android natives avec Flutter. Expériences fluides à 60 FPS, interfaces réactives et intégrations backend transparentes.",
  },
  {
    icon: FaPalette,
    title: "Design Graphique & Identité Visuelle",
    description:
      "Une sensibilité artistique aiguisée pour sublimer vos marques : logotypes, chartes graphiques complètes, mockups d'interface UI et supports d'édition Print.",
  },
];

export default function ExpertiseSection() {
  return (
    <section
      className="
        relative overflow-hidden
        bg-white
        px-4 py-14
        text-slate-900
        transition-colors duration-300

        dark:bg-[#080d17]
        dark:text-white

        sm:px-6 sm:py-20
        lg:px-8 lg:py-24
      "
    >
      {/* =====================================================
          GLOW BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none absolute
          -left-40 top-20
          h-80 w-80
          rounded-full
          bg-emerald-500/[0.025]
          blur-[120px]
          dark:bg-emerald-500/[0.035]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -right-40 bottom-0
          h-72 w-72
          rounded-full
          bg-emerald-500/[0.015]
          blur-[120px]
          dark:bg-emerald-500/[0.025]
        "
      />

      <div className="relative mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

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
          transition={{
            duration: 0.7,
          }}
          className="mb-8 sm:mb-10"
        >

          {/* Badge */}

          <div
            className="
              mb-4 inline-flex items-center gap-2
              rounded-md
              border border-emerald-400/40
              bg-emerald-50
              px-3 py-1.5
              text-[10px] font-semibold
              text-emerald-600
              dark:bg-emerald-400/[0.04]
              dark:text-emerald-400

              sm:mb-5 sm:px-3.5 sm:py-1.5
              sm:text-xs
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />

            Savoir-Faire & Services
          </div>

          {/* TITLE */}

          <h2
            className="
              max-w-3xl
              text-[2.15rem]
              font-medium
              leading-[1.05]
              tracking-[-0.04em]

              sm:text-5xl
              lg:text-[56px]
            "
          >
            Domaines d'

            <span className="font-bold text-emerald-500 dark:text-emerald-400">
              Expertise
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-4 max-w-2xl
              text-xs leading-6
              text-slate-600
              dark:text-slate-400

              sm:mt-5
              sm:text-lg sm:leading-7
            "
          >
            Une maîtrise technique approfondie et une rigueur d’ingénierie
            logicielle pour transformer vos projets en succès mesurables.
          </p>

          {/* BUTTON */}

          <Link
            to="/expertise"
            className="
              group mt-5
              inline-flex items-center gap-2.5
              rounded-lg

              border border-slate-200
              bg-slate-50

              px-4 py-2.5
              text-xs font-semibold
              text-slate-700

              transition-all duration-300

              hover:-translate-y-0.5
              hover:border-emerald-400/50
              hover:bg-emerald-50

              dark:border-slate-700
              dark:bg-[#111827]
              dark:text-white
              dark:hover:bg-[#151f31]

              sm:mt-6
              sm:px-5 sm:py-3
              sm:text-sm
            "
          >
            Voir toute l'expertise

            <FaArrowRight
              className="
                text-emerald-500
                transition-transform duration-300
                group-hover:translate-x-1
                dark:text-emerald-400
              "
            />
          </Link>

        </motion.div>

        {/* =================================================
            CARDS
        ================================================= */}

        <div className="grid grid-cols-1 gap-3.5 sm:gap-6 md:grid-cols-3">

          {expertise.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -4,
                }}
                className="
                  group relative
                  min-h-[150px]
                  overflow-hidden
                  rounded-xl

                  border border-slate-200
                  bg-white

                  p-5

                  shadow-sm
                  transition-all duration-500

                  hover:border-emerald-400/30

                  dark:border-slate-800
                  dark:bg-[#101827]
                  dark:shadow-none

                  sm:min-h-[230px]
                  sm:p-7
                "
              >

                {/* Hover glow */}

                <div
                  className="
                    absolute
                    -right-20 -top-20
                    h-40 w-40
                    rounded-full
                    bg-emerald-400/[0.04]
                    blur-3xl
                    opacity-0
                    transition duration-500
                    group-hover:opacity-100
                    dark:bg-emerald-400/[0.05]
                  "
                />

                {/* ICON */}

                <div
                  className="
                    relative
                    mb-4
                    hidden
                    h-10 w-10
                    items-center justify-center
                    rounded-lg

                    border border-slate-200
                    bg-slate-50

                    text-emerald-500

                    transition-all duration-300

                    group-hover:border-emerald-400/30
                    group-hover:bg-emerald-400/10

                    dark:border-slate-700
                    dark:bg-[#0b1220]
                    dark:text-emerald-400

                    sm:flex
                  "
                >
                  <Icon className="text-base" />
                </div>

                {/* TITLE */}

                <h3
                  className="
                    relative
                    text-[16px]
                    font-semibold
                    leading-[1.3]
                    tracking-tight

                    text-slate-900

                    dark:text-white

                    sm:text-xl
                  "
                >
                  {item.title}
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    relative
                    mt-2.5
                    text-xs
                    leading-6

                    text-slate-600

                    dark:text-slate-400

                    sm:mt-4
                    sm:text-sm
                    sm:leading-7
                  "
                >
                  {item.description}
                </p>

                {/* Bottom accent */}

                <div
                  className="
                    absolute
                    bottom-0 left-0
                    h-px w-0
                    bg-emerald-500

                    transition-all duration-500

                    group-hover:w-full

                    dark:bg-emerald-400
                  "
                />

              </motion.article>
            );
          })}

        </div>
      </div>
    </section>
  );
}