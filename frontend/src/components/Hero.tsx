import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiArrowDown } from "react-icons/fi";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section
      className="
        relative flex min-h-screen items-center justify-center
        overflow-hidden bg-white px-5 pb-24 pt-28
        dark:bg-[#070d16]
      "
    >
      <Navbar/>
      {/* HALO */}
      <div
        className="
          absolute left-1/2 top-1/2 h-[320px] w-[320px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-emerald-500/10 blur-[100px]
          sm:h-[450px] sm:w-[450px]
        "
      />

      <div className="relative mx-auto w-full max-w-5xl text-center">

        {/* PHOTO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative mx-auto mb-7 h-60 w-60 sm:h-72 sm:w-72"
        >
          <div
            className="
              absolute inset-0 rounded-full
              bg-gradient-to-r from-emerald-500/30
              via-blue-500/20 to-purple-500/30
              blur-3xl
            "
          />

          <div
            className="
              relative h-full w-full overflow-hidden rounded-full
              border border-white/10
            "
          >
            <img
              src="/images/frank.png"
              alt="Frank Kamgang"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* TEXTE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-emerald-500 sm:text-sm">
            Bonjour, je suis
          </p>

          <h1
            className="
              text-4xl font-bold tracking-tight
              text-slate-950 sm:text-5xl md:text-7xl
              dark:text-white
            "
          >
            Frank Kamgang
          </h1>

          <p
            className="
              mx-auto mt-5 max-w-2xl text-sm leading-7
              text-slate-500 sm:text-base md:text-lg
              dark:text-slate-400
            "
          >
            Développeur web, créateur digital et passionné par
            la technologie, l'intelligence artificielle et la création
            de produits numériques.
          </p>
        </motion.div>

        {/* BOUTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className="
              rounded-full bg-emerald-500 px-7 py-3
              text-sm font-semibold text-black
              transition hover:bg-emerald-400
            "
          >
            Voir mes projets
          </a>

          <a
            href="#contact"
            className="
              rounded-full border border-slate-200
              bg-slate-100 px-7 py-3
              text-sm font-semibold text-slate-800
              transition hover:bg-slate-200
              dark:border-white/10 dark:bg-white/5
              dark:text-white dark:hover:bg-white/10
            "
          >
            Me contacter
          </a>
        </motion.div>

        {/* SOCIAL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex justify-center gap-3"
        >
          <a
            href="#"
            className="
              flex h-10 w-10 items-center justify-center rounded-full
              border border-slate-200 text-slate-500
              transition hover:border-emerald-500 hover:text-emerald-500
              dark:border-white/10 dark:text-slate-400
            "
          >
            <FiGithub size={18} />
          </a>

          <a
            href="#"
            className="
              flex h-10 w-10 items-center justify-center rounded-full
              border border-slate-200 text-slate-500
              transition hover:border-emerald-500 hover:text-emerald-500
              dark:border-white/10 dark:text-slate-400
            "
          >
            <FiLinkedin size={18} />
          </a>
        </motion.div>

        {/* SCROLL */}
        <motion.a
          href="#about"
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            mx-auto mt-10 flex w-fit flex-col items-center gap-2
            text-xs text-slate-400 dark:text-slate-500
          "
        >
          Découvrir
          <FiArrowDown className="text-emerald-500" size={17} />
        </motion.a>
      </div>
    </section>
  );
}