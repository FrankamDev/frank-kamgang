import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiMessageCircle,
} from "react-icons/fi";

interface AboutHeroProps {
  image?: string;
}

export default function AboutHero({
  image = "/images/me.png",
}: AboutHeroProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#080e17]
        px-4
        pb-10
        pt-24
        text-white
        md:px-8
        md:pb-20
        md:pt-32
      "
    >
      {/* =========================
          BACKGROUND EFFECTS
      ========================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-[55%]
            h-[420px]
            w-[420px]
            -translate-x-1/2
            rounded-full
            bg-emerald-500/[0.06]
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            left-[5%]
            top-[50%]
            h-[300px]
            w-[300px]
            rounded-full
            bg-cyan-500/[0.04]
            blur-[100px]
          "
        />

        {/* petites étoiles */}
        <span className="absolute left-[12%] top-[40%] h-1 w-1 rounded-full bg-emerald-400" />
        <span className="absolute left-[20%] top-[52%] h-1 w-1 rounded-full bg-white/70" />
        <span className="absolute right-[18%] top-[43%] h-1 w-1 rounded-full bg-emerald-400" />
        <span className="absolute right-[10%] top-[60%] h-1 w-1 rounded-full bg-white/50" />
        <span className="absolute left-[40%] top-[75%] h-1 w-1 rounded-full bg-emerald-400" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* =========================
            BADGE
        ========================= */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-md
            border
            border-emerald-400
            bg-emerald-500/[0.03]
            px-3
            py-1.5
            text-[10px]
            font-semibold
            text-white
          "
        >
          <span
            className="
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-sm
              bg-emerald-500
              px-1
              text-[9px]
              font-bold
              text-[#06110d]
            "
          >
            01
          </span>

          <span className="text-slate-200">
            Profil & Vision
          </span>
        </motion.div>

        {/* =========================
            TITLE
        ========================= */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="
            mt-5
            max-w-[600px]
            text-[29px]
            font-black
            leading-[1.08]
            tracking-[-0.8px]

            sm:text-4xl
            md:text-5xl
            lg:text-6xl
          "
        >
          L’alliance rare de la rigueur
          <br />

          technique et du{" "}
          <span className="text-emerald-400">
            design visuel.
          </span>
        </motion.h1>

        {/* =========================
            DESCRIPTION
        ========================= */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mt-5
            max-w-[650px]
            text-[14px]
            leading-7
            text-slate-300

            md:text-base
            md:leading-8
          "
        >
          Je suis{" "}
          <span className="font-semibold text-white">
            Waffo Lele Rostand
          </span>
          , créateur de{" "}
          <span className="font-semibold text-emerald-400">
            Devinsto
          </span>
          , Développeur Full Stack et Designer. Depuis plus de
          5 ans, je conçois et bâtis des plateformes web et
          mobiles complètes (
          <span className="font-semibold text-white">
            Laravel, Vue.js / Nuxt, Flutter
          </span>
          ) alliant rigueur d’ingénierie, haute performance et
          identité visuelle soignée.
        </motion.p>

        {/* =========================
            BUTTONS
        ========================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          className="
            mt-6
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <a
            href="https://wa.me/237690461830"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              rounded-md
              bg-emerald-500
              px-4
              py-3
              text-xs
              font-semibold
              text-[#04110b]
              transition
              hover:bg-emerald-400
              hover:-translate-y-0.5
            "
          >
            <FiMessageCircle size={15} />

            Discuter d’un projet
          </a>

          <a
            href="/projects"
            className="
              inline-flex
              items-center
              gap-2
              rounded-md
              border
              border-white/10
              bg-[#101a2b]
              px-4
              py-3
              text-xs
              font-semibold
              text-white
              transition
              hover:border-emerald-500/40
              hover:bg-[#142238]
            "
          >
            Voir mes réalisations

            <FiArrowRight size={15} />
          </a>
        </motion.div>

        {/* =========================
            PROFILE IMAGE
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
          className="
            relative
            mx-auto
            mt-8
            w-full
            max-w-[320px]
          "
        >

          {/* HALO */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[300px]
              w-[300px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-emerald-400/[0.08]
              blur-[70px]
            "
          />

          {/* PARTICULES */}
          <div
            className="
              pointer-events-none
              absolute
              -inset-12
            "
          >
            <span className="absolute left-[12%] top-[45%] h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]" />
            <span className="absolute left-[4%] top-[60%] h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="absolute left-[18%] top-[72%] h-1 w-1 rounded-full bg-emerald-400" />
            <span className="absolute right-[10%] top-[35%] h-1 w-1 rounded-full bg-emerald-400" />
            <span className="absolute right-[4%] top-[55%] h-1.5 w-1.5 rounded-full bg-white/60" />
            <span className="absolute right-[18%] top-[75%] h-1 w-1 rounded-full bg-emerald-400" />
          </div>

          {/* PHOTO CARD */}
          <div
            className="
              relative
              z-10
              overflow-hidden
              rounded-lg
              border
              border-white/10
              bg-[#131e32]
              p-2
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-md
                bg-[#18243a]
              "
            >
              <img
                src={image}
                alt="Portrait de Waffo Lele Rostand"
                className="
                  block
                  w-full
                  object-cover
                "
              />

              {/* LÉGER DÉGRADÉ */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-24
                  bg-gradient-to-t
                  from-[#111a2b]
                  to-transparent
                "
              />
            </div>

            {/* STATUS */}
            <div
              className="
                absolute
                bottom-4
                left-4
                right-4
                z-20

                flex
                items-center
                justify-center

                rounded-md
                border
                border-white/10

                bg-[#101827]/95
                px-3
                py-2

                text-[9px]
                font-semibold
                text-slate-200

                backdrop-blur-md
              "
            >
              <span
                className="
                  mr-1.5
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_8px_#10b981]
                "
              />

              Disponible pour projets{" "}
              <span className="ml-1 text-emerald-400">
                Freelance & Conseil
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}