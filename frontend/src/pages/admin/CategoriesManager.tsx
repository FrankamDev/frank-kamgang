import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import api from "../../api/axios";

interface Category {
  id: number;
  name: string;
  slug: string;
  posts_count: number;
}

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function openCreate() {
    setEditing(null);
    setName("");
  }

  function openEdit(category: Category) {
    setEditing(category);
    setName(category.name);
  }

  function closeModal() {
    setEditing(null);
    setName("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    setSaving(true);

    try {
      if (editing) {
        await api.put(`/admin/categories/${editing.id}`, {
          name: name.trim(),
        });
      } else {
        await api.post("/admin/categories", {
          name: name.trim(),
        });
      }

      await loadCategories();
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Supprimer cette catégorie ?")) return;

    try {
      await api.delete(`/admin/categories/${id}`);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      console.error(error);
      alert("Impossible de supprimer cette catégorie.");
    }
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Catégories</h1>

          <p className="mt-1 text-sm text-slate-500">
            Organisez vos articles.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Nouvelle catégorie
        </button>
      </div>

      {/* LISTE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0b1120]">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Chargement...
          </div>
        ) : categories.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Aucune catégorie.
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-medium">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    /{category.slug} · {category.posts_count} article
                    {category.posts_count > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(category)}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <Pencil size={16} />
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {(name !== "" || editing !== null) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#0b1120]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {editing
                    ? "Modifier la catégorie"
                    : "Nouvelle catégorie"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Le slug sera généré automatiquement.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="mb-2 block text-sm font-medium">
                Nom
              </label>

              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Laravel"
                className="mb-5 w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700"
              />

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving
                    ? "Enregistrement..."
                    : editing
                      ? "Modifier"
                      : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}