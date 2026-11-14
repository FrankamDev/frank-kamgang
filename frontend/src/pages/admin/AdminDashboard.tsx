import { useAuth } from "../../context/AuthContext";


export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 p-6 dark:bg-[#080d17]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>

            <p className="mt-1 text-slate-500">
              Bienvenue, {user?.name}
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <p className="text-sm text-slate-500">Articles</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              0ddd
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <p className="text-sm text-slate-500">Projets</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              0
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <p className="text-sm text-slate-500">Catégories</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}