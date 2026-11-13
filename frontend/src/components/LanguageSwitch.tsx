import { useTranslation } from "react-i18next";

export default function LanguageSwitch() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === "fr" ? "en" : "fr";

    i18n.changeLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="
        flex items-center gap-1.5
        rounded-lg border border-slate-200
        bg-slate-50 px-2.5 py-1.5
        text-[11px] font-bold
        text-slate-700
        transition
        hover:border-emerald-500/40
        dark:border-white/10
        dark:bg-white/[0.04]
        dark:text-slate-300
      "
      aria-label="Changer de langue"
    >
      <span
        className={
          i18n.language === "fr"
            ? "text-emerald-500"
            : "text-slate-400"
        }
      >
        FR
      </span>

      <span className="text-slate-300 dark:text-slate-600">
        /
      </span>

      <span
        className={
          i18n.language === "en"
            ? "text-emerald-500"
            : "text-slate-400"
        }
      >
        EN
      </span>
    </button>
  );
}