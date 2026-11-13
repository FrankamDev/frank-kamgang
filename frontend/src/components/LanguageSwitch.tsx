import { useState } from "react";
import { FiGlobe } from "react-icons/fi";

export default function LanguageSwitch() {
  const [language, setLanguage] = useState<"fr" | "en">(
    (localStorage.getItem("language") as "fr" | "en") || "fr"
  );

  const changeLanguage = (lang: "fr" | "en") => {
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;

    if (!select) {
      console.log("Google Translate n'est pas encore chargé");
      return;
    }

    select.value = lang;
    select.dispatchEvent(new Event("change"));

    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div
      className="
        relative flex items-center
        h-10 w-[104px]
        rounded-full
        border border-slate-200
        bg-slate-100/80
        p-1
        shadow-sm
        backdrop-blur-md
        dark:border-white/10
        dark:bg-white/[0.06]
      "
    >
      {/* Indicateur */}
      <div
        className={`
          absolute top-1 h-8 w-[48px]
          rounded-full
          bg-white
          shadow-md
          transition-all duration-300
          dark:bg-emerald-500
          ${
            language === "fr"
              ? "left-1"
              : "left-[54px]"
          }
        `}
      />

      {/* Globe */}
      <div
        className="
          relative z-10
          flex h-8 w-8
          items-center justify-center
          text-slate-500
          dark:text-emerald-950
        "
      >
        <FiGlobe size={14} />
      </div>

      {/* FR */}
      <button
        type="button"
        onClick={() => changeLanguage("fr")}
        className={`
          relative z-10
          h-8 w-12
          text-[11px] font-bold
          tracking-wide
          transition-colors duration-300
          ${
            language === "fr"
              ? "text-slate-900 dark:text-emerald-950"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }
        `}
      >
        FR
      </button>

      {/* EN */}
      <button
        type="button"
        onClick={() => changeLanguage("en")}
        className={`
          relative z-10
          h-8 w-12
          text-[11px] font-bold
          tracking-wide
          transition-colors duration-300
          ${
            language === "en"
              ? "text-white"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }
        `}
      >
        EN
      </button>
    </div>
  );
}