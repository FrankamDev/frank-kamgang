import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaPen,
  FaHeart,
  FaCog,
} from "react-icons/fa";

const navigation = [
  // {
  //   label: "Accueil",
  //   path: "/",
  //   icon: FaHome,
  // },
  {
    label: "À propos",
    path: "/about",
    icon: FaUser,
  },
  {
    label: "Projets",
    path: "/projects",
    icon: FaBriefcase,
  },
  {
    label: "Blog",
    path: "/blog",
    icon: FaPen,
  },
  {
    label: "Passions",
    path: "/passions",
    icon: FaHeart,
  },
  {
    label: "Setup",
    path: "/setup",
    icon: FaCog,
  },
];

export default function MobileBottomNav() {
  return (
    <nav
      className="
        fixed bottom-3 left-1/2 z-50
        w-[calc(100%-24px)]
        max-w-md
        -translate-x-1/2
        md:hidden

        rounded-2xl
        border border-slate-200/80
        bg-white/90
        px-2 py-2
        shadow-[0_10px_40px_rgba(15,23,42,0.15)]
        backdrop-blur-xl

        dark:border-slate-700/70
        dark:bg-[#0d1422]/90
        dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)]
      "
    >
      <div className="flex items-center justify-around">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                group relative flex min-w-0 flex-1
                flex-col items-center justify-center
                gap-1
                rounded-xl
                px-1 py-2
                text-[9px] font-medium
                transition-all duration-300

                ${
                  isActive
                    ? `
                      text-emerald-500
                      dark:text-emerald-400
                    `
                    : `
                      text-slate-400
                      hover:text-slate-700
                      dark:text-slate-500
                      dark:hover:text-slate-200
                    `
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="
                        absolute -top-2
                        h-0.5 w-5
                        rounded-full
                        bg-emerald-500
                        shadow-[0_0_10px_rgba(16,185,129,0.7)]
                      "
                    />
                  )}

                  <Icon
                    className={`
                      text-sm
                      transition-transform duration-300
                      ${isActive ? "scale-110" : "group-hover:scale-110"}
                    `}
                  />

                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}