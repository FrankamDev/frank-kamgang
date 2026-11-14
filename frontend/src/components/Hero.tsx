import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiArrowDown,
  FiArrowRight,
  FiMessageCircle,
} from "react-icons/fi";
import Navbar from "./Navbar";
import MobileBottomNav from "./MobileBottomNav";
import { useTranslation } from "react-i18next";
export default function Hero() {
  const { t } = useTranslation();
  return (
    <section
      className="
        relative min-h-screen overflow-hidden
        bg-white text-slate-950
        dark:bg-[#070d16] dark:text-white
      "
    >
      <Navbar />

      {/* =========================
          BACKGROUND
      ========================= */}

      <div
        className="
          pointer-events-none absolute left-1/2 top-[42%]
          h-[380px] w-[380px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-emerald-500/[0.07]
          blur-[120px]
          sm:h-[550px] sm:w-[550px]
          dark:bg-emerald-500/[0.09]
        "
      />

      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.025]
          dark:opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
          [background-size:50px_50px]
        "
      />

      {/* =========================
          CONTENT
      ========================= */}

      <div
        className="
          relative mx-auto flex min-h-screen
          w-full max-w-7xl
          items-center
          px-4 pb-28 pt-28
          sm:px-6 sm:pb-24 sm:pt-32
          lg:px-10
        "
      >
        <div
          className="
            grid w-full items-center
            gap-8
            lg:grid-cols-[1fr_0.9fr]
            lg:gap-12
          "
        >

          {/* =========================
              PHOTO
          ========================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              order-1
              relative mx-auto
              flex w-full
              max-w-[330px]
              items-center justify-center
              lg:order-2
              lg:max-w-[430px]
            "
          >
            {/* Halo */}
            <div
              className="
                absolute
                h-[260px] w-[260px]
                rounded-full
                bg-emerald-500/[0.10]
                blur-[80px]
                sm:h-[380px] sm:w-[380px]
                dark:bg-emerald-500/[0.12]
              "
            />

            {/* Cercle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                h-[280px] w-[280px]
                rounded-full
                border border-emerald-500/10
                sm:h-[390px] sm:w-[390px]
              "
            />

            {/* Photo */}
            <div
              className="
                relative z-10
                h-[270px] w-[270px]
                overflow-hidden
                rounded-full
                border border-emerald-500/20
                bg-slate-100
                shadow-[0_0_80px_rgba(16,185,129,0.12)]
                dark:bg-[#0b1420]
                sm:h-[370px] sm:w-[370px]
              "
            >
              <img
                src="/images/me.png"
                alt="Frank Kamgang"
                className="
                  h-full w-full
                  object-cover
                  object-center
                "
              />
            </div>

            {/* Badge */}
            <div
              className="
                absolute bottom-1 left-1/2 z-20
                -translate-x-1/2
                whitespace-nowrap
                rounded-lg
                border border-white/10
                bg-[#08111b]/90
                px-3 py-1.5
                text-[9px] font-medium
                tracking-[0.16em]
                text-slate-300
                backdrop-blur-xl
              "
            >
              BUILD · DESIGN · CREATE
            </div>
          </motion.div>

          {/* =========================
              TEXT / CONTENT
          ========================= */}

          <div
            className="
              order-2
              relative z-10
              text-center
              lg:order-1
              lg:text-left
            "
          >
            {/* Greeting */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="
                mb-3
                text-[12px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-emerald-500
              "
            >
              {t("hero.greeting")}
            </motion.p>

            {/* Name */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="
                text-[2.7rem]
                font-bold
                leading-[0.95]
                tracking-[-0.055em]
                text-slate-950
                dark:text-white

                sm:text-5xl
                md:text-6xl
                lg:text-[70px]
              "
            >
              Frank{" "}
              <span className="text-emerald-500">
                Kamgang
              </span>
            </motion.h1>

            {/* Role */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="
                mt-4
                text-[16px]
                font-semibold
                leading-6
                text-slate-800
                dark:text-slate-200

                sm:text-lg
                lg:text-xl
              "
            >
              {t("hero.role")}
            </motion.p>

            {/* Description */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-[14px]
                leading-6
                text-slate-500
                dark:text-slate-400

                sm:text-[15px]
                sm:leading-7

                lg:mx-0
              "
            >
              Je transforme des idées complexes en
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {" "}
                applications web modernes
              </span>
              , rapides et évolutives grâce à
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {" "}
                Laravel, React, TypeScript
              </span>
              , Node.js et d'autres technologies modernes,
              tout en sublimant vos projets grâce au
              <span className="font-semibold text-emerald-500">
                {" "}
                Design Graphique.
              </span>
              {/* {t("hero.description")} */}
            </motion.p>

            {/* =========================
                BUTTONS
            ========================= */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              className="
                mt-7
                flex flex-col
                gap-3

                sm:flex-row
                sm:justify-center

                lg:justify-start
              "
            >
              {/* WhatsApp */}

              <a
                href="https://wa.me/237690461830"
                className="
                  group
                  flex h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-emerald-500
                  px-5
                  text-sm
                  font-semibold
                  text-[#03100a]
                  transition-all
                  duration-300
                  hover:bg-emerald-400
                  hover:shadow-[0_12px_35px_rgba(16,185,129,0.20)]
                "
              >
                <FiMessageCircle size={17} />

                <span>Discuter sur WhatsApp</span>
              </a>

              {/* Expertise */}

              <a
                href="/expertise"
                className="
                  group
                  flex h-12
                  items-center
                  justify-center
                  gap-3
                  rounded-lg
                  border
                  border-slate-200
                  bg-slate-50
                  px-5
                  text-sm
                  font-semibold
                  text-slate-800
                  transition-all
                  duration-300

                  hover:border-emerald-500/40
                  hover:bg-white

                  dark:border-white/10
                  dark:bg-[#111a29]
                  dark:text-white
                  dark:hover:border-emerald-500/30
                  dark:hover:bg-[#151f30]
                "
              >
                Découvrir mes compétences

                <FiArrowRight
                  size={18}
                  className="
                    text-emerald-500
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </a>
            </motion.div>

            {/* =========================
                SOCIAL
            ========================= */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.8,
              }}
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-2

                lg:justify-start
              "
            >
              <span
                className="
                  mr-1
                  text-[11px]
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Réseaux & Profils :
              </span>

              <a
                href="https://github.com/FrankamDev"
                aria-label="GitHub"
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  border border-slate-200
                  text-slate-500
                  transition
                  hover:border-emerald-500/40
                  hover:text-emerald-500

                  dark:border-white/10
                  dark:text-slate-500
                  dark:hover:text-emerald-400
                "
              >
                <FiGithub size={16} />
              </a>

              <a
                href="https://www.linkedin.com/in/frank-kamgang/"
                aria-label="LinkedIn"
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  border border-slate-200
                  text-slate-500
                  transition
                  hover:border-emerald-500/40
                  hover:text-emerald-500

                  dark:border-white/10
                  dark:text-slate-500
                  dark:hover:text-emerald-400
                "
              >
                <FiLinkedin size={16} />
              </a>

              <a
                href="/"
                aria-label="Twitter / X"
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  border border-slate-200
                  text-slate-500
                  transition
                  hover:border-emerald-500/40
                  hover:text-emerald-500

                  dark:border-white/10
                  dark:text-slate-500
                  dark:hover:text-emerald-400
                "
              >
                X
              </a>

              <a
                href="https://wa.me/237690461830"
                aria-label="WhatsApp"
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  border border-slate-200
                  text-slate-500
                  transition
                  hover:border-emerald-500/40
                  hover:text-emerald-500

                  dark:border-white/10
                  dark:text-slate-500
                  dark:hover:text-emerald-400
                "
              >
                <FiMessageCircle size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================
          SCROLL
      ========================= */}

      <motion.a
        href="/about"
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute bottom-24 left-1/2
          hidden -translate-x-1/2
          flex-col items-center gap-1.5
          text-[9px]
          uppercase
          tracking-[0.25em]
          text-slate-400
          dark:text-slate-600

          lg:flex
        "
      >
        <span>Explorer</span>
        <FiArrowDown
          size={14}
          className="text-emerald-500"
        />
      </motion.a>

      {/* =========================
          MOBILE BOTTOM NAV
      ========================= */}

      <MobileBottomNav />
    </section>
  );
}