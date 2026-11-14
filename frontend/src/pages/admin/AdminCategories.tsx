import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Category {
  id: number;
  name: string;
  slug: string;
  posts_count: number;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    setSaving(true);

    try {
      await api.post("/admin/categories", {
        name: name.trim(),
      });

      setName("");
      await fetchCategories();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette catégorie ?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/categories/${id}`);
      await fetchCategories();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4 dark:bg-[#080d17] sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Catégoriesd
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Gérez les catégories de vos articles.
          </p>
        </div>

        {/* Ajouter une catégorie */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Ajouter une catégorie
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex : Laravel"
              className="flex-1 rounded-lg border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:text-white"
            />

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Ajout..." : "Ajouter"}
            </button>
          </form>
        </div>

        {/* Liste */}
        <div className="rounded-2xl bg-white shadow-sm dark:bg-slate-900">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Mes catégories
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-slate-500">
              Chargement...
            </div>
          ) : categories.length === 0 ? (
            <div className="p-6 text-sm text-slate-500">
              Aucune catégorie.
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {category.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {category.posts_count} article
                      {category.posts_count > 1 ? "s" : ""}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(category.id)}
                    className="w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 sm:w-auto dark:border-red-900 dark:hover:bg-red-950"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}