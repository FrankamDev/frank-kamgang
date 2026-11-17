import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X, AlertTriangle } from "lucide-react";
import api from "../../api/axios";
import Toast from "./Toast";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ToastState {
  type: "success" | "error";
  message: string;
}

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [toast, setToast] = useState<ToastState | null>(null);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });

    setTimeout(() => {
      setToast(null);
    }, 3500);
  }

  async function loadCategories() {
    try {
      setLoading(true);

      const response = await api.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.error(error);
      showToast("error", "Impossible de charger les catégories.");
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
    setShowModal(true);
  }

  function openEdit(category: Category) {
    setEditing(category);
    setName(category.name);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditing(null);
    setName("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      showToast("error", "Le nom de la catégorie est obligatoire.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: name.trim(),
      };

      if (editing) {
        await api.put(`/admin/categories/${editing.id}`, payload);

        showToast(
          "success",
          "La catégorie a été modifiée avec succès."
        );
      } else {
        await api.post("/admin/categories", payload);

        showToast(
          "success",
          "La catégorie a été créée avec succès."
        );
      }

      await loadCategories();
      closeModal();
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        "Une erreur est survenue.";

      showToast("error", message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      await api.delete(`/admin/categories/${deleteId}`);

      setCategories((prev) =>
        prev.filter((category) => category.id !== deleteId)
      );

      setDeleteId(null);

      showToast(
        "success",
        "La catégorie a été supprimée avec succès."
      );
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        "Impossible de supprimer cette catégorie.";

      showToast("error", message);

      setDeleteId(null);
    }
  }

  return (
    <div className="space-y-6">

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Catégories
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Gérez les catégories de vos articles.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      {/* Liste */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        {loading ? (
          <div className="p-8 text-center text-sm text-zinc-400">
            Chargement...
          </div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-zinc-400">
              Aucune catégorie disponible.
            </p>

            <button
              onClick={openCreate}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              <Plus size={16} />
              Ajouter une catégorie
            </button>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between px-5 py-4 transition hover:bg-zinc-800/50"
              >
                <div>
                  <p className="font-medium text-white">
                    {category.name}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    /{category.slug}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(category)}
                    className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-blue-400"
                    title="Modifier"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => setDeleteId(category.id)}
                    className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-red-400"
                    title="Supprimer"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal création / modification */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">

            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h3 className="font-semibold text-white">
                {editing
                  ? "Modifier la catégorie"
                  : "Ajouter une catégorie"}
              </h3>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Nom de la catégorie
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Développement web"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500"
                  autoFocus
                />
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Enregistrement..."
                    : editing
                    ? "Modifier"
                    : "Ajouter"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Confirmation suppression */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">

            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangle
                  size={24}
                  className="text-red-500"
                />
              </div>
            </div>

            <h3 className="text-center text-lg font-semibold text-white">
              Supprimer cette catégorie ?
            </h3>

            <p className="mt-2 text-center text-sm text-zinc-400">
              Cette action est irréversible.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800"
              >
                Annuler
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}