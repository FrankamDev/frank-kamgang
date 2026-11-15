import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  FileText,
  Folder,
  Briefcase,
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
  Loader2,
} from "lucide-react";

import ProjectsManager from "./ProjectsManager";
import CategoriesManager from "./CategoriesManager";
import PostsManager from "./PostsManager";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../api/axios";

/* =========================================================
   TYPES
========================================================= */

type Section = "dashboard" | "posts" | "categories" | "projects";

interface Stats {
  posts: number;
  categories: number;
  projects: number;
}

interface NavigationItem {
  id: Section;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

/* =========================================================
   NAVIGATION
========================================================= */

const navigation: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "posts",
    label: "Articles",
    icon: FileText,
  },
  {
    id: "categories",
    label: "Catégories",
    icon: Folder,
  },
  {
    id: "projects",
    label: "Projets",
    icon: Briefcase,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AdminLayout() {
  const [activeSection, setActiveSection] =
    useState<Section>("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState<Stats>({
    posts: 0,
    categories: 0,
    projects: 0,
  });

  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  /* =======================================================
     CHARGER LES STATISTIQUES
  ======================================================= */

  async function loadStats() {
    try {
      setStatsLoading(true);
      setError("");

      const [
        postsResponse,
        categoriesResponse,
        projectsResponse,
      ] = await Promise.all([
        api.get("/posts"),
        api.get("/categories"),
        api.get("/projects"),
      ]);

      setStats({
        posts: Array.isArray(postsResponse.data)
          ? postsResponse.data.length
          : 0,

        categories: Array.isArray(categoriesResponse.data)
          ? categoriesResponse.data.length
          : 0,

        projects: Array.isArray(projectsResponse.data)
          ? projectsResponse.data.length
          : 0,
      });
    } catch (error) {
      console.error(error);

      setError(
        "Impossible de récupérer les statistiques."
      );
    } finally {
      setStatsLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  /* =======================================================
     CHANGER DE SECTION
  ======================================================= */

  function selectSection(section: Section) {
    setActiveSection(section);
    setSidebarOpen(false);
  }

  /* =======================================================
     DÉCONNEXION
  ======================================================= */

  async function handleLogout() {
    await logout();
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        text-slate-900
        dark:bg-[#080d17]
        dark:text-white
      "
    >
      {/* ==================================================
          MOBILE HEADER
      ================================================== */}

      <header
        className="
          fixed inset-x-0 top-0 z-50
          flex h-16 items-center justify-between
          border-b border-slate-200
          bg-white/90 px-4
          backdrop-blur-xl
          dark:border-slate-800
          dark:bg-[#0b1120]/90
          lg:hidden
        "
      >
        {/* Menu */}

        <button
          type="button"
          onClick={() =>
            setSidebarOpen((prev) => !prev)
          }
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
          aria-label="Menu"
        >
          {sidebarOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>

        {/* Logo */}

        <div className="text-center">
          <p className="text-sm font-bold">
            Frank<span className="text-blue-500">.</span>
          </p>

          <p className="text-[10px] text-slate-500">
            Administration
          </p>
        </div>

        {/* Theme */}

        <button
          type="button"
          onClick={toggleTheme}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
          aria-label="Changer le thème"
        >
          {theme === "dark" ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>
      </header>

      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
            fixed inset-0 z-40
            bg-black/50
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen w-[280px]
          border-r border-slate-200
          bg-white
          transition-transform duration-300
          dark:border-slate-800
          dark:bg-[#0b1120]
          lg:translate-x-0
          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >
        {/* LOGO */}

        <div
          className="
            flex h-20 items-center
            border-b border-slate-200
            px-6
            dark:border-slate-800
          "
        >
          <div>
            <h1 className="text-lg font-bold">
              Frank<span className="text-blue-500">.</span>
            </h1>

            <p className="text-xs text-slate-500">
              Portfolio CMS
            </p>
          </div>
        </div>

        {/* NAVIGATION */}

        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavItem
                key={item.id}
                icon={<Icon size={19} />}
                label={item.label}
                active={activeSection === item.id}
                onClick={() =>
                  selectSection(item.id)
                }
              />
            );
          })}
        </nav>

        {/* USER */}

        <div
          className="
            absolute bottom-0 left-0 right-0
            border-t border-slate-200
            p-4
            dark:border-slate-800
          "
        >
          <div className="mb-4 flex items-center gap-3">
            <div
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-full
                bg-blue-600
                text-sm font-bold
                text-white
              "
            >
              {user?.name?.charAt(0).toUpperCase() ||
                "F"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {user?.name || "Administrateur"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3
              rounded-xl px-3 py-2.5
              text-sm text-red-500
              transition
              hover:bg-red-50
              dark:hover:bg-red-950/30
            "
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="min-h-screen lg:ml-[280px]">
        {/* DESKTOP TOPBAR */}

        <header
          className="
            hidden h-20
            items-center justify-between
            border-b border-slate-200
            bg-white px-8
            dark:border-slate-800
            dark:bg-[#0b1120]
            lg:flex
          "
        >
          <div>
            <p className="text-xs text-slate-500">
              Administration
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              {getSectionTitle(activeSection)}
            </h2>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
            aria-label="Changer le thème"
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>
        </header>

        {/* MOBILE TOP SPACING */}

        <div className="h-16 lg:hidden" />

        {/* CONTENT */}

        <div
          className="
            mx-auto w-full max-w-7xl
            p-4 sm:p-6 lg:p-8
          "
        >
          {/* DASHBOARD */}

          {activeSection === "dashboard" && (
            <DashboardHome
              stats={stats}
              loading={statsLoading}
              error={error}
              onRefresh={loadStats}
              onNavigate={selectSection}
            />
          )}

          {/* ARTICLES */}

          {activeSection === "posts" && (
            <PostsManager />
          )}

          {/* CATÉGORIES */}

          {activeSection === "categories" && (
            <CategoriesManager />
          )}

          {/* PROJETS */}

          {activeSection === "projects" && (
            <ProjectsManager />
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   NAV ITEM
========================================================= */

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center justify-between
        rounded-xl px-3 py-3
        text-sm font-medium
        transition
        ${active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        }
      `}
    >
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>

      {active && <ChevronRight size={16} />}
    </button>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function DashboardHome({
  stats,
  loading,
  error,
  onRefresh,
  onNavigate,
}: {
  stats: Stats;
  loading: boolean;
  error: string;
  onRefresh: () => void;
  onNavigate: (section: Section) => void;
}) {
  return (
    <div>
      {/* HEADER */}

      <div className="mb-8">
        <p
          className="
            mb-2
            text-xs font-medium uppercase
            tracking-wider text-blue-500
          "
        >
          Tableau de bord
        </p>

        <h1
          className="
            text-2xl font-bold tracking-tight
            sm:text-3xl
          "
        >
          Bonjour, bienvenue.
        </h1>

        <p
          className="
            mt-2 max-w-xl
            text-sm leading-6 text-slate-500
          "
        >
          Gérez votre portfolio, vos articles,
          catégories et projets depuis cet espace.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div
          className="
            mb-6 rounded-xl border
            border-red-200 bg-red-50
            px-4 py-3 text-sm text-red-600
            dark:border-red-900/50
            dark:bg-red-950/20
            dark:text-red-400
          "
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={onRefresh}
            className="ml-2 font-semibold underline"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* STATS */}

      <div
        className="
          grid grid-cols-2
          gap-3
          sm:grid-cols-3
          sm:gap-4
        "
      >
        <StatCard
          title="Articles"
          value={stats.posts}
          icon={<FileText size={18} />}
          loading={loading}
        />

        <StatCard
          title="Catégories"
          value={stats.categories}
          icon={<Folder size={18} />}
          loading={loading}
        />

        <StatCard
          title="Projets"
          value={stats.projects}
          icon={<Briefcase size={18} />}
          loading={loading}
        />
      </div>

      {/* QUICK ACTIONS */}

      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold">
          Accès rapide
        </h2>

        <div
          className="
            grid gap-3
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          <QuickAction
            icon={<FileText size={19} />}
            title="Articles"
            description="Créer et gérer vos articles"
            onClick={() => onNavigate("posts")}
          />

          <QuickAction
            icon={<Folder size={19} />}
            title="Catégories"
            description="Organiser vos contenus"
            onClick={() => onNavigate("categories")}
          />

          <QuickAction
            icon={<Briefcase size={19} />}
            title="Projets"
            description="Gérer votre portfolio"
            onClick={() => onNavigate("projects")}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  icon,
  loading,
}: {
  title: string;
  value: number;
  icon: ReactNode;
  loading: boolean;
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-white p-4
        transition
        hover:-translate-y-0.5
        hover:shadow-lg
        dark:border-slate-800
        dark:bg-[#0b1120]
        sm:p-5
      "
    >
      <div
        className="
          mb-4 flex items-center justify-between
        "
      >
        <div
          className="
            flex h-9 w-9
            items-center justify-center
            rounded-xl
            bg-blue-50
            text-blue-600
            dark:bg-blue-500/10
            dark:text-blue-400
          "
        >
          {icon}
        </div>
      </div>

      <p className="text-xs text-slate-500 sm:text-sm">
        {title}
      </p>

      {loading ? (
        <div className="mt-2 flex items-center">
          <Loader2
            size={20}
            className="animate-spin text-slate-400"
          />
        </div>
      ) : (
        <p
          className="
            mt-1 text-2xl font-bold
            sm:text-3xl
          "
        >
          {value}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex items-center gap-4
        rounded-2xl
        border border-slate-200
        bg-white p-4
        text-left
        transition
        hover:border-blue-300
        hover:shadow-md
        dark:border-slate-800
        dark:bg-[#0b1120]
        dark:hover:border-blue-500/40
      "
    >
      <div
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-xl
          bg-slate-100
          text-slate-600
          dark:bg-slate-800
          dark:text-slate-300
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

      <ChevronRight
        size={16}
        className="
          ml-auto shrink-0
          text-slate-400
        "
      />
    </button>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function getSectionTitle(section: Section) {
  switch (section) {
    case "posts":
      return "Articles";

    case "categories":
      return "Catégories";

    case "projects":
      return "Projets";

    default:
      return "Dashboard";
  }
}