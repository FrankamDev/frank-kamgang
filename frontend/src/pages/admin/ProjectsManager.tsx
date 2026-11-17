import { useEffect, useState, type FormEvent } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  ExternalLink,

  Star,
} from "lucide-react";
import api from "../../api/axios";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  category: string | null;
  technologies: string[];
  demo_url: string | null;
  github_url: string | null;
  is_featured: boolean;
}

interface ProjectForm {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string;
  demo_url: string;
  github_url: string;
  is_featured: boolean;
}

const emptyForm: ProjectForm = {
  title: "",
  description: "",
  image: "",
  category: "",
  technologies: "",
  demo_url: "",
  github_url: "",
  is_featured: false,
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [form, setForm] = useState<ProjectForm>(emptyForm);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await api.get<Project[]>("/projects");

      setProjects(response.data);
    } catch (error: any) {
      console.error("Erreur récupération projets :", error);

      alert(
        error.response?.data?.message ||
        "Impossible de récupérer les projets."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);

    setForm({
      title: project.title || "",
      description: project.description || "",
      image: project.image || "",
      category: project.category || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      demo_url: project.demo_url || "",
      github_url: project.github_url || "",
      is_featured: Boolean(project.is_featured),
    });

    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingProject(null);
    setForm(emptyForm);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Le titre du projet est obligatoire.");
      return;
    }

    if (!form.description.trim()) {
      alert("La description du projet est obligatoire.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        image: form.image.trim() || null,
        category: form.category.trim() || null,
        technologies: form.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        demo_url: form.demo_url.trim() || null,
        github_url: form.github_url.trim() || null,
        is_featured: form.is_featured,
      };

      if (editingProject) {
        await api.put(
          `/admin/projects/${editingProject.id}`,
          payload
        );

        alert("Projet modifié avec succès.");
      } else {
        await api.post("/admin/projects", payload);

        alert("Projet créé avec succès.");
      }

      closeModal();
      await fetchProjects();
    } catch (error: any) {
      console.error("Erreur sauvegarde projet :", error);

      console.error("Status :", error.response?.status);
      console.error("Response :", error.response?.data);

      if (error.response?.status === 401) {
        alert("Session administrateur expirée. Reconnecte-toi.");
      } else if (error.response?.status === 403) {
        alert("Tu n'as pas les droits administrateur.");
      } else if (error.response?.status === 422) {
        alert(
          error.response?.data?.message ||
          "Les données envoyées sont invalides."
        );
      } else {
        alert(
          error.response?.data?.message ||
          "Impossible d'enregistrer le projet."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce projet ?"
    );

    if (!confirmed) return;

    try {
      setDeleting(id);

      await api.delete(`/admin/projects/${id}`);

      setProjects((prev) => prev.filter((project) => project.id !== id));

      alert("Projet supprimé avec succès.");
    } catch (error: any) {
      console.error("Erreur suppression projet :", error);

      alert(
        error.response?.data?.message ||
        "Impossible de supprimer le projet."
      );
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Projets
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Gérez les projets affichés sur votre portfolio.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          <Plus size={17} />
          Nouveau projet
        </button>
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Loader2 size={20} className="animate-spin" />
            Chargement des projets...
          </div>
        </div>
      ) : projects.length === 0 ? (
        /* EMPTY */

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Aucun projet
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Commencez par créer votre premier projet.
          </p>

          <button
            onClick={openCreateModal}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
          >
            <Plus size={17} />
            Créer un projet
          </button>
        </div>
      ) : (
        /* PROJECTS */

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              {/* IMAGE */}

              <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                    Aucune image
                  </div>
                )}

                {project.is_featured && (
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-900 backdrop-blur">
                    <Star size={12} />
                    Featured
                  </div>
                )}
              </div>

              {/* CONTENT */}

              <div className="p-5">

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>

                    {project.category && (
                      <p className="mt-1 text-xs text-slate-400">
                        {project.category}
                      </p>
                    )}
                  </div>

                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    #{project.id}
                  </span>
                </div>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {project.description}
                </p>

                {/* TECHNOLOGIES */}

                {project.technologies?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                )}

                {/* LINKS */}

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <ExternalLink size={13} />
                      Demo
                    </a>
                  )}

                  {/* {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <Github size={13} />
                      GitHub
                    </a>
                  )} */}
                </div>

                {/* ACTIONS */}

                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <button
                    onClick={() => openEditModal(project)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Pencil size={13} />
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={deleting === project.id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
                  >
                    {deleting === project.id ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}

                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-900">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingProject
                    ? "Modifier le projet"
                    : "Nouveau projet"}
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {editingProject
                    ? "Modifiez les informations du projet."
                    : "Ajoutez un projet à votre portfolio."}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="space-y-5 p-6">

              {/* TITLE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Titre
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ex: Plateforme e-learning"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                  required
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Décrivez brièvement le projet..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                  required
                />
              </div>

              {/* IMAGE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  URL de l'image
                </label>

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Catégorie
                </label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Ex: Web Application"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                />
              </div>

              {/* TECHNOLOGIES */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Technologies
                </label>

                <input
                  type="text"
                  name="technologies"
                  value={form.technologies}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Laravel, MySQL"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                />

                <p className="mt-1.5 text-[11px] text-slate-400">
                  Séparez les technologies par des virgules.
                </p>
              </div>

              {/* URLS */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    URL Demo
                  </label>

                  <input
                    type="url"
                    name="demo_url"
                    value={form.demo_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    URL GitHub
                  </label>

                  <input
                    type="url"
                    name="github_url"
                    value={form.github_url}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white"
                  />
                </div>

              </div>

              {/* FEATURED */}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Projet mis en avant
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Afficher ce projet comme projet principal.
                  </p>
                </div>
              </label>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      {editingProject ? (
                        <Pencil size={16} />
                      ) : (
                        <Plus size={16} />
                      )}

                      {editingProject
                        ? "Enregistrer"
                        : "Créer le projet"}
                    </>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}