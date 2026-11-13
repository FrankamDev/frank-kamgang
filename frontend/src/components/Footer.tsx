import { Link } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";

export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-white/[0.08]
        bg-[#080d17]
        text-slate-400
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-6xl
          flex-col
          items-center
          gap-5
          px-4
          pb-28
          pt-8
          sm:flex-row
          sm:justify-between
          sm:px-6
          sm:pb-8
          lg:px-8
        "
      >
        {/* LOGO */}
        <Link
          to="/"
          className="
            text-lg
            font-bold
            text-white
          "
        >
          Frank<span className="text-emerald-400">.</span>
        </Link>

        {/* NAVIGATION */}
        <nav
          className="
            flex
            flex-wrap
            justify-center
            gap-5
            text-xs
          "
        >
          <Link
            to="/about"
            className="transition hover:text-emerald-400"
          >
            À propos
          </Link>

          <Link
            to="/expertise"
            className="transition hover:text-emerald-400"
          >
            Expertise
          </Link>

          <Link
            to="/projects"
            className="transition hover:text-emerald-400"
          >
            Projets
          </Link>

          <Link
            to="/blog"
            className="transition hover:text-emerald-400"
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className="transition hover:text-emerald-400"
          >
            Contact
          </Link>
        </nav>

        {/* COPYRIGHT + TOP */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-600">
            © {new Date().getFullYear()} Frank Kamgang
          </span>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-md
              border
              border-white/[0.08]
              bg-[#101827]
              text-slate-400
              transition
              hover:border-emerald-400/40
              hover:text-emerald-400
            "
            aria-label="Retour en haut"
          >
            <FiArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}