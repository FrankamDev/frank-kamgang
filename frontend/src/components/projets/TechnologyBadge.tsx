import type { IconType } from "react-icons";

import {
//   SiNuxtdotjs,
  SiVuedotjs,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiPhp,
  SiPostgresql,
  SiDocker,
  SiLivewire,
  SiVite,
  SiFlutter,
  SiDart,
  SiInertia,
  SiAlpinedotjs,
  SiChartdotjs,
  SiWordpress,
  SiCss,
  SiMysql,
  SiLinuxmint,
  SiNginx,
  SiNextdotjs,
} from "react-icons/si";

interface TechnologyBadgeProps {
  name: string;
}

interface TechnologyConfig {
  icon: IconType;
  color: string;
}

const technologies: Record<
  string,
  TechnologyConfig
> = {
//   Nuxt: {
//     icon: SiNuxtdotjs,
//     color: "#00DC82",
//   },
"Next.js": {
  icon: SiNextdotjs,
  color: "#000000",
},
  "Vue.js": {
    icon: SiVuedotjs,
    color: "#42B883",
  },

  TypeScript: {
    icon: SiTypescript,
    color: "#3178C6",
  },

  "Tailwind CSS": {
    icon: SiTailwindcss,
    color: "#06B6D4",
  },

  Laravel: {
    icon: SiLaravel,
    color: "#FF2D20",
  },

  PHP: {
    icon: SiPhp,
    color: "#777BB4",
  },

  PostgreSQL: {
    icon: SiPostgresql,
    color: "#4169E1",
  },

  Docker: {
    icon: SiDocker,
    color: "#2496ED",
  },

  Livewire: {
    icon: SiLivewire,
    color: "#FB70A9",
  },

  Vite: {
    icon: SiVite,
    color: "#646CFF",
  },

  Flutter: {
    icon: SiFlutter,
    color: "#02569B",
  },

  Dart: {
    icon: SiDart,
    color: "#0175C2",
  },

  "Inertia.js": {
    icon: SiInertia,
    color: "#9553E9",
  },

  "Alpine.js": {
    icon: SiAlpinedotjs,
    color: "#77C1D2",
  },

  "Chart.js": {
    icon: SiChartdotjs,
    color: "#FF6384",
  },

  WordPress: {
    icon: SiWordpress,
    color: "#21759B",
  },

  CSS: {
    icon: SiCss,
    color: "#1572B6",
  },

  MySQL: {
    icon: SiMysql,
    color: "#4479A1",
  },

  "Linux Mint": {
    icon: SiLinuxmint,
    color: "#87CF3E",
  },

  Nginx: {
    icon: SiNginx,
    color: "#009639",
  },
};

export default function TechnologyBadge({
  name,
}: TechnologyBadgeProps) {
  const technology = technologies[name];

  if (!technology) {
    return (
      <span
        className="
          inline-flex shrink-0
          items-center
          rounded-md
          border border-white/[0.05]
          bg-[#111b2b]
          px-2 py-1
          text-[9px]
          font-medium
          text-slate-400
        "
      >
        {name}
      </span>
    );
  }

  const Icon = technology.icon;

  return (
    <span
      className="
        inline-flex
        shrink-0
        items-center
        gap-1.5
        rounded-md
        border border-white/[0.05]
        bg-[#111b2b]
        px-2 py-1
        text-[9px]
        font-medium
        text-slate-400
        transition-all
        duration-200
        hover:border-white/10
        hover:bg-[#162238]
      "
    >
      <Icon
        size={12}
        color={technology.color}
        className="shrink-0"
      />

      <span>{name}</span>
    </span>
  );
}