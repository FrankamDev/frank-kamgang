import { useState } from "react";
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
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import CategoriesManager from "./CategoriesManager";
import PostsManager from "./PostsManager";



type Section =
  | "dashboard"
  | "posts"
  | "categories"
  | "projects";

export default function AdminLayout() {
  const [activeSection, setActiveSection] =
    useState<Section>("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  function selectSection(section: Section) {
    setActiveSection(section);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#080d17] dark:text-white">

      {/* MOBILE HEADER */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-[#0b1120]/90 lg:hidden">

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <span className="font-bold">
          Frank Admin
        </span>

        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {theme === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </header>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-64
          border-r border-slate-200
          bg-white dark:border-slate-800 dark:bg-[#0b1120]
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* LOGO */}
        <div className="flex h-20 items-center border-b border-slate-200 px-6 dark:border-slate-800">
          <div>
            <h1 className="text-lg font-bold">
              Frank Admin
            </h1>

            <p className="text-xs text-slate-500">
              Portfolio CMS
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-1 p-4">

          <NavItem
            icon={<LayoutDashboard size={19} />}
            label="Dashboard"
            active={activeSection === "dashboard"}
            onClick={() => selectSection("dashboard")}
          />

          <NavItem
            icon={<FileText size={19} />}
            label="Articles"
            active={activeSection === "posts"}
            onClick={() => selectSection("posts")}
          />

          <NavItem
            icon={<Folder size={19} />}
            label="Catégories"
            active={activeSection === "categories"}
            onClick={() => selectSection("categories")}
          />

          <NavItem
            icon={<Briefcase size={19} />}
            label="Projets"
            active={activeSection === "projects"}
            onClick={() => selectSection("projects")}
          />

        </nav>

        {/* USER */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4 dark:border-slate-800">

          <div className="mb-3">
            <p className="text-sm font-medium">
              {user?.name}
            </p>

            <p className="truncate text-xs text-slate-500">
              {user?.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <LogOut size={18} />
            Déconnexion
          </button>

        </div>
      </aside>

      {/* MAIN */}
      <main className="min-h-screen lg:ml-64">

        {/* TOP BAR DESKTOP */}
        <header className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-slate-800 dark:bg-[#0b1120] lg:flex">

          <div>
            <p className="text-sm text-slate-500">
              Administration
            </p>

            <h2 className="text-xl font-semibold">
              {getSectionTitle(activeSection)}
            </h2>
          </div>

          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

        </header>

        {/* MOBILE SPACING */}
        <div className="h-16 lg:hidden" />

        {/* CONTENT */}
        <div className="p-4 sm:p-6 lg:p-8">

          {activeSection === "dashboard" && (
            <DashboardHome />
          )}

          {activeSection === "posts" && (
  <PostsManager />
)}

          {activeSection === "categories" && (
  <CategoriesManager />
)}

          {activeSection === "projects" && (
            <Placeholder title="Projets" />
          )}

        </div>

      </main>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex w-full items-center gap-3 rounded-lg px-3 py-3
        text-sm font-medium transition
        ${
          active
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}

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

function DashboardHome() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Bonjour, bienvenue.
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Gérez votre portfolio depuis cet espace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <StatCard
          title="Articles"
          value="0"
        />

        <StatCard
          title="Projets"
          value="0"
        />

        <StatCard
          title="Catégories"
          value="0"
        />

      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0b1120]">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        {title}
      </h1>

      <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500 dark:border-slate-700">
        Module {title} — nous allons le construire ici.
      </div>
    </div>
  );
}