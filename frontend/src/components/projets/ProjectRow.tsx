import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import type { Project } from "../../types/projet";

interface ProjectRowProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectRow({
  project,
  onOpen,
}: ProjectRowProps) {
  return (
    <div
      onClick={() => onOpen(project)}
      className="
        group grid cursor-pointer grid-cols-1 gap-3
        border-b border-slate-200/80
        px-3 py-3
        transition-colors duration-200
        last:border-b-0
        hover:bg-slate-50/80
        dark:border-white/[0.06]
        dark:hover:bg-white/[0.025]
        sm:grid-cols-[auto_auto_minmax(180px,1fr)_auto_auto]
        sm:items-center
        sm:gap-2
        sm:px-4
        sm:py-3.5
      "
    >
      {/* CATEGORY */}
      <div className="flex items-center gap-2">
        <span
          className="
            inline-flex shrink-0 items-center
            rounded-md
            border border-slate-300
            bg-slate-100
            px-2.5 py-1
            text-[9px] font-bold uppercase
            tracking-wide text-slate-600
            dark:border-slate-700
            dark:bg-[#172235]
            dark:text-slate-300
          "
        >
          {project.categoryLabel}
        </span>

        {/* STATUS MOBILE */}
        <span
          className="
            rounded-md
            bg-slate-100
            px-2 py-1
            text-[9px] font-medium
            text-slate-500
            dark:bg-[#172235]
            dark:text-slate-400
            sm:hidden
          "
        >
          {project.status}
        </span>
      </div>

      {/* STATUS DESKTOP */}
      <span
        className="
          hidden shrink-0
          rounded-md
          bg-slate-100
          px-2 py-1
          text-[9px] font-medium
          text-slate-500
          dark:bg-[#172235]
          dark:text-slate-400
          sm:inline-flex
        "
      >
        {project.status}
      </span>

      {/* PROJECT INFORMATION */}
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <h3
            className="
              truncate
              text-sm font-bold
              text-slate-900
              transition-colors
              group-hover:text-emerald-500
              dark:text-slate-100
            "
          >
            {project.title}
          </h3>

          <span className="hidden text-slate-600 sm:inline">
            •
          </span>

          <p
            className="
              hidden truncate
              text-xs
              text-slate-500
              dark:text-slate-400
              sm:block
            "
          >
            {project.shortDescription}
          </p>
        </div>

        {/* MOBILE DESCRIPTION */}
        <p
          className="
            mt-1 line-clamp-2
            text-[10px] leading-4
            text-slate-500
            dark:text-slate-500
            sm:hidden
          "
        >
          {project.shortDescription}
        </p>
      </div>

      {/* TECHNOLOGIES */}
      <div
        className="
          flex min-w-0 flex-wrap
          items-center gap-1.5
        "
      >
        {project.technologies
          .slice(0, 8)
          .map((technology) => (
            <span
              key={technology}
              className="
                inline-flex shrink-0 items-center
                rounded-md
                border border-slate-200
                bg-slate-100
                px-2 py-1
                text-[9px] font-medium
                text-slate-500
                dark:border-white/[0.06]
                dark:bg-[#111b2b]
                dark:text-slate-400
              "
            >
              {technology}
            </span>
          ))}
      </div>

      {/* EXTERNAL LINK */}
      {project.demoUrl && project.demoUrl !== "#" ? (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          aria-label={`Visiter ${project.title}`}
          className="
            hidden h-7 w-7
            shrink-0 items-center justify-center
            rounded-md
            border border-slate-200
            bg-slate-100
            text-slate-500
            transition-all
            hover:border-emerald-500/30
            hover:bg-emerald-500/10
            hover:text-emerald-500
            dark:border-white/[0.06]
            dark:bg-[#111b2b]
            dark:text-slate-400
            sm:flex
          "
        >
          <FiExternalLink size={13} />
        </a>
      ) : (
        <div
          className="
            hidden h-7 w-7
            shrink-0
            sm:block
          "
        />
      )}

      {/* OPEN PROJECT */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onOpen(project);
        }}
        aria-label={`Voir les détails de ${project.title}`}
        className="
          hidden h-7 w-7
          shrink-0 items-center justify-center
          rounded-md
          border border-slate-200
          bg-slate-100
          text-slate-500
          transition-all
          hover:border-emerald-500/30
          hover:bg-emerald-500/10
          hover:text-emerald-500
          dark:border-white/[0.06]
          dark:bg-[#111b2b]
          dark:text-slate-400
          sm:flex
        "
      >
        <FiArrowRight
          size={14}
          className="
            transition-transform
            group-hover:translate-x-0.5
          "
        />
      </button>

      {/* MOBILE OPEN INDICATOR */}
      <div
        className="
          flex items-center justify-end
          sm:hidden
        "
      >
        <span
          className="
            inline-flex items-center gap-1
            text-[10px] font-semibold
            text-emerald-500
          "
        >
          Voir le projet
          <FiArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}