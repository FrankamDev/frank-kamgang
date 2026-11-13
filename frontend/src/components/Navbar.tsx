import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiUser,
  FiFileText,
  FiFolder,
  FiHeart,
  FiSettings,
} from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";
import LanguageSwitch from "./LanguageSwitch";
import MobileBottomNav from "./MobileBottomNav";


const navItems = [
  { label: "À propos", path: "/about", icon: FiUser },
  { label: "Blog", path: "/blog", icon: FiFileText },
  { label: "Projets", path: "/projects", icon: FiFolder },
  { label: "Passions", path: "/passions", icon: FiHeart },
  { label: "Setup", path: "/setup", icon: FiSettings },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <header className="fixed left-1/2 top-3 z-150 w-[calc(100%-24px)] max-w-[720px] -translate-x-1/2">
      <nav
        className="
          flex h-14 items-center justify-between rounded-full
          border border-slate-200/70 bg-white/85 px-3
          shadow-xl backdrop-blur-xl
          dark:border-white/10 dark:bg-[#101827]/90
        "
      >
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2.5">
          <div
            className="
              relative flex h-10 w-10 items-center justify-center
              rounded-full border-2 border-emerald-500
              bg-slate-100 dark:bg-slate-800
            "
          >
            <span className="text-xs font-bold text-emerald-500">
              FK
            </span>

            <span
              className="
                absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full
                border-2 border-white bg-emerald-500
                dark:border-[#101827]
              "
            />
          </div>

          <span className="text-lg font-bold text-slate-900 dark:text-white">
            Frank <span className="text-emerald-500">Kamgang</span>
          </span>
        </NavLink>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-emerald-500"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* LANGUAGE */}
        <LanguageSwitch />

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="
              flex h-10 w-10 items-center justify-center rounded-full
              text-slate-600 transition hover:bg-slate-100
              dark:text-slate-300 dark:hover:bg-white/10
            "
            aria-label="Changer de thème"
          >
            {theme === "dark" ? (
              <FiSun size={18} />
            ) : (
              <FiMoon size={18} />
            )}
          </button>

          {/* MOBILE MENU */}
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="
              flex h-10 w-10 items-center justify-center rounded-full
              border border-slate-200 text-slate-700 md:hidden
              dark:border-white/10 dark:text-slate-200
            "
            aria-label="Menu"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div
          className="
            mt-2 rounded-2xl border border-slate-200
            bg-white/95 p-3 shadow-xl backdrop-blur-xl
            dark:border-white/10 dark:bg-[#101827]/95
            md:hidden
          "
        >
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "text-slate-600 dark:text-slate-300"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
    
    <MobileBottomNav/>
    </>
  );
}

