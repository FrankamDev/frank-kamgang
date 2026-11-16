import { FormEvent, useEffect, useState } from "react";

import {
    Briefcase,
    Edit3,
    Plus,
    Search,
    Trash2,
    X,
    Star,
} from "lucide-react";

import api from "../../api/axios";
import ConfirmDialog from "./ConfirmDialog";
import axios from "axios";

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    category: string;
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

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] =
        useState<Project | null>(null);

    const [form, setForm] = useState<ProjectForm>(emptyForm);

    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    /**
     * Récupération des projets
     */
    async function loadProjects() {
        try {
            setLoading(true);
            setError("");

            const response = await api.get<Project[]>("/projects");

            const data = Array.isArray(response.data)
                ? response.data
                : [];

            setProjects(data);
        } catch (error: any) {
            console.error("LOAD PROJECTS ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Impossible de récupérer les projets."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProjects();
    }, []);

    /**
     * Message de succès temporaire
     */
    function showSuccess(message: string) {
        setSuccess(message);

        setTimeout(() => {
            setSuccess("");
        }, 3000);
    }

    /**
     * Ouvrir modal création
     */
    function openCreateModal() {
        setEditingProject(null);
        setForm({ ...emptyForm });
        setError("");
        setShowModal(true);
    }

    /**
     * Ouvrir modal modification
     */
    function openEditModal(project: Project) {
        setEditingProject(project);

        setForm({
            title: project.title,
            description: project.description,
            image: project.image || "",
            category: project.category,
            technologies:
                project.technologies?.join(", ") || "",
            demo_url: project.demo_url || "",
            github_url: project.github_url || "",
            is_featured: Boolean(project.is_featured),
        });

        setError("");
        setShowModal(true);
    }

    /**
     * Fermer modal
     */
    function closeModal() {
        if (submitting) return;

        setShowModal(false);
        setEditingProject(null);
        setForm({ ...emptyForm });
    }

    /**
     * Modifier un champ
     */

    function updateField<K extends keyof ProjectForm>(
        field: K,
        value: ProjectForm[K]
    ) {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    /**
     * Préparer les données envoyées à Laravel
     */
    function buildPayload() {
        return {
            title: form.title.trim(),
            description: form.description.trim(),
            image: form.image.trim() || null,
            category: form.category.trim(),

            technologies: form.technologies
                .split(",")
                .map((tech) => tech.trim())
                .filter(Boolean),

            demo_url: form.demo_url.trim() || null,
            github_url: form.github_url.trim() || null,

            is_featured: form.is_featured,
        };
    }

    /**
     * Création / modification
     */
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (submitting) return;

        try {
            setSubmitting(true);
            setError("");

            const payload = buildPayload();

            console.log(
                editingProject
                    ? "UPDATE PROJECT:"
                    : "CREATE PROJECT:",
                payload
            );

            if (editingProject) {
                const response = await api.put(
                    `/admin/projects/${editingProject.id}`,
                    payload
                );

                console.log(
                    "UPDATE RESPONSE:",
                    response.data
                );

                showSuccess("Projet modifié avec succès.");
            } else {
                const response = await api.post(
                    "/admin/projects",
                    payload
                );

                console.log(
                    "CREATE RESPONSE:",
                    response.data
                );

                showSuccess("Projet créé avec succès.");
            }

            setShowModal(false);
            setEditingProject(null);
            setForm({ ...emptyForm });

            await loadProjects();
        } catch (error: any) {
            console.error(
                "PROJECT SUBMIT ERROR:",
                error
            );

            console.error(
                "STATUS:",
                error.response?.status
            );

            console.error(
                "DATA:",
                error.response?.data
            );

            if (error.response?.status === 401) {
                setError(
                    "Session expirée ou token administrateur invalide."
                );
            } else if (error.response?.status === 403) {
                setError(
                    "Vous n'avez pas les droits administrateur."
                );
            } else if (error.response?.status === 422) {
                const validationErrors =
                    error.response?.data?.errors;

                if (validationErrors) {
                    const firstError =
                        Object.values(
                            validationErrors
                        )[0];

                    setError(
                        Array.isArray(firstError)
                            ? String(firstError[0])
                            : String(firstError)
                    );
                } else {
                    setError(
                        error.response?.data?.message ||
                        "Les données envoyées sont invalides."
                    );
                }
            } else {
                setError(
                    error.response?.data?.message ||
                    "Une erreur est survenue."
                );
            }
        } finally {
            setSubmitting(false);
        }
    }

    /**
     * Suppression
     */
    async function handleDelete() {
        if (deleteId === null || deleting) return;

        try {
            setDeleting(true);
            setError("");

            console.log(
                "DELETE PROJECT:",
                deleteId
            );

            const response = await api.delete(
                `/admin/projects/${deleteId}`
            );

            console.log(
                "DELETE RESPONSE:",
                response.data
            );

            setProjects((prev) =>
                prev.filter(
                    (project) =>
                        project.id !== deleteId
                )
            );

            setDeleteId(null);

            showSuccess(
                "Projet supprimé avec succès."
            );
        } catch (error: any) {
            console.error(
                "DELETE PROJECT ERROR:",
                error
            );

            console.error(
                "STATUS:",
                error.response?.status
            );

            console.error(
                "DATA:",
                error.response?.data
            );

            if (error.response?.status === 401) {
                setError(
                    "Session expirée ou token administrateur invalide."
                );
            } else if (error.response?.status === 403) {
                setError(
                    "Vous n'avez pas les droits administrateur."
                );
            } else if (error.response?.status === 404) {
                setError(
                    "Projet introuvable."
                );
            } else {
                setError(
                    error.response?.data?.message ||
                    "Impossible de supprimer ce projet."
                );
            }

            setDeleteId(null);
        } finally {
            setDeleting(false);
        }
    }

    /**
     * Recherche
     */
    const filteredProjects = projects.filter(
        (project) => {
            const value =
                search.toLowerCase().trim();

            if (!value) return true;

            return (
                project.title
                    .toLowerCase()
                    .includes(value) ||

                project.category
                    .toLowerCase()
                    .includes(value) ||

                project.description
                    .toLowerCase()
                    .includes(value) ||

                project.technologies?.some(
                    (tech) =>
                        tech
                            .toLowerCase()
                            .includes(value)
                )
            );
        }
    );

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-blue-500">
                        Portfolio
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight">
                        Projets
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Gérez les projets affichés sur votre portfolio.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="
                        inline-flex items-center justify-center gap-2
                        rounded-xl bg-blue-600 px-4 py-2.5
                        text-sm font-semibold text-white
                        transition hover:bg-blue-700
                    "
                >
                    <Plus size={18} />
                    Nouveau projet
                </button>
            </div>

            {/* SUCCESS */}
            {success && (
                <div
                    className="
                        rounded-xl border border-emerald-200
                        bg-emerald-50 px-4 py-3
                        text-sm text-emerald-700
                        dark:border-emerald-900/50
                        dark:bg-emerald-950/20
                        dark:text-emerald-400
                    "
                >
                    {success}
                </div>
            )}

            {/* ERROR */}
            {error && (
                <div
                    className="
                        rounded-xl border border-red-200
                        bg-red-50 px-4 py-3
                        text-sm text-red-600
                        dark:border-red-900/50
                        dark:bg-red-950/20
                        dark:text-red-400
                    "
                >
                    <div className="flex items-start justify-between gap-4">
                        <span>{error}</span>

                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="shrink-0 underline"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            {/* SEARCH */}
            <div className="relative">
                <Search
                    size={17}
                    className="
                        absolute left-3 top-1/2
                        -translate-y-1/2 text-slate-400
                    "
                />

                <input
                    type="search"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Rechercher un projet..."
                    className="
                        w-full rounded-xl border
                        border-slate-200 bg-white
                        py-3 pl-10 pr-4 text-sm
                        outline-none transition
                        focus:border-blue-500
                        dark:border-slate-800
                        dark:bg-[#0b1120]
                    "
                />
            </div>

            {/* PROJECTS */}
            {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="
                                h-72 animate-pulse rounded-2xl
                                border border-slate-200
                                bg-white
                                dark:border-slate-800
                                dark:bg-[#0b1120]
                            "
                        />
                    ))}
                </div>
            ) : filteredProjects.length === 0 ? (
                <div
                    className="
                        rounded-2xl border border-dashed
                        border-slate-300 p-10 text-center
                        text-sm text-slate-500
                        dark:border-slate-700
                    "
                >
                    {search
                        ? "Aucun projet ne correspond à votre recherche."
                        : "Aucun projet trouvé."}
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map(
                        (project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onEdit={() =>
                                    openEditModal(
                                        project
                                    )
                                }
                                onDelete={() =>
                                    setDeleteId(
                                        project.id
                                    )
                                }
                            />
                        )
                    )}
                </div>
            )}

            {/* CREATE / EDIT MODAL */}
            {showModal && (
                <ProjectModal
                    editingProject={editingProject}
                    form={form}
                    submitting={submitting}
                    onChange={updateField}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                />
            )}

            {/* DELETE MODAL */}
            {deleteId !== null && (
                <DeleteModal
                    deleting={deleting}
                    onCancel={() =>
                        !deleting &&
                        setDeleteId(null)
                    }
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
    project,
    onEdit,
    onDelete,
}: {
    project: Project;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div
            className="
                overflow-hidden rounded-2xl
                border border-slate-200
                bg-white transition
                hover:-translate-y-1 hover:shadow-xl
                dark:border-slate-800
                dark:bg-[#0b1120]
            "
        >
            {/* IMAGE */}
            <div
                className="
                    relative aspect-[16/9]
                    bg-slate-100
                    dark:bg-slate-900
                "
            >
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="
                            h-full w-full object-cover
                        "
                        onError={(e) => {
                            e.currentTarget.style.display =
                                "none";
                        }}
                    />
                ) : (
                    <div
                        className="
                            flex h-full items-center
                            justify-center text-slate-400
                        "
                    >
                        <Briefcase size={32} />
                    </div>
                )}

                {project.is_featured && (
                    <span
                        className="
                            absolute left-3 top-3
                            inline-flex items-center gap-1
                            rounded-full bg-yellow-400
                            px-2.5 py-1 text-[10px]
                            font-bold text-yellow-950
                        "
                    >
                        <Star size={12} />
                        Vedette
                    </span>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-4">

                <p className="
                    text-[11px] font-medium
                    uppercase tracking-wide
                    text-blue-500
                ">
                    {project.category}
                </p>

                <h3 className="
                    mt-1 text-base font-bold
                ">
                    {project.title}
                </h3>

                <p className="
                    mt-2 line-clamp-2
                    text-xs leading-5
                    text-slate-500
                ">
                    {project.description}
                </p>

                {/* TECHNOLOGIES */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies
                        ?.slice(0, 4)
                        .map((tech) => (
                            <span
                                key={tech}
                                className="
                                    rounded-md bg-slate-100
                                    px-2 py-1 text-[10px]
                                    font-medium text-slate-600
                                    dark:bg-slate-800
                                    dark:text-slate-300
                                "
                            >
                                {tech}
                            </span>
                        ))}
                </div>

                {/* ACTIONS */}
                <div className="mt-4 flex items-center gap-2">

                    <button
                        type="button"
                        onClick={onEdit}
                        className="
                            flex-1 rounded-lg
                            border border-slate-200
                            px-3 py-2 text-xs
                            font-semibold
                            hover:bg-slate-100
                            dark:border-slate-700
                            dark:hover:bg-slate-800
                        "
                    >
                        <span className="
                            inline-flex items-center gap-1.5
                        ">
                            <Edit3 size={14} />
                            Modifier
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="
                            flex h-9 w-9 items-center
                            justify-center rounded-lg
                            border border-red-200
                            text-red-500
                            hover:bg-red-50
                            dark:border-red-900/50
                            dark:hover:bg-red-950/30
                        "
                        aria-label="Supprimer"
                    >
                        <Trash2 size={15} />
                    </button>

                </div>
            </div>
        </div>
    );
}

/* =========================================================
   PROJECT MODAL
========================================================= */

function ProjectModal({
    editingProject,
    form,
    submitting,
    onChange,
    onClose,
    onSubmit,
}: {
    editingProject: Project | null;
    form: ProjectForm;
    submitting: boolean;

    onChange: <K extends keyof ProjectForm>(
        field: K,
        value: ProjectForm[K]
    ) => void;

    onClose: () => void;
    onSubmit: (e: FormEvent) => void;
}) {
    return (
        <div
            className="
                fixed inset-0 z-[100]
                flex items-center justify-center
                bg-black/60 p-4
                backdrop-blur-sm
            "
        >
            <div
                className="
                    max-h-[90vh] w-full max-w-2xl
                    overflow-y-auto rounded-2xl
                    border border-slate-200
                    bg-white shadow-2xl
                    dark:border-slate-800
                    dark:bg-[#0b1120]
                "
            >

                {/* HEADER */}
                <div
                    className="
                        sticky top-0 z-10
                        flex items-center justify-between
                        border-b border-slate-200
                        bg-white/95 px-5 py-4
                        backdrop-blur
                        dark:border-slate-800
                        dark:bg-[#0b1120]/95
                    "
                >
                    <div>
                        <h2 className="text-lg font-bold">
                            {editingProject
                                ? "Modifier le projet"
                                : "Nouveau projet"}
                        </h2>

                        <p className="
                            mt-1 text-xs
                            text-slate-500
                        ">
                            {editingProject
                                ? "Modifiez les informations du projet."
                                : "Ajoutez un projet à votre portfolio."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        className="
                            flex h-9 w-9
                            items-center justify-center
                            rounded-lg
                            hover:bg-slate-100
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            dark:hover:bg-slate-800
                        "
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* FORM */}
                <form
                    onSubmit={onSubmit}
                    className="space-y-5 p-5"
                >

                    <Field
                        label="Titre"
                        value={form.title}
                        onChange={(value) =>
                            onChange(
                                "title",
                                value
                            )
                        }
                        placeholder="Ex: Plateforme e-learning"
                        required
                    />

                    <Field
                        label="Description"
                        value={form.description}
                        onChange={(value) =>
                            onChange(
                                "description",
                                value
                            )
                        }
                        placeholder="Description du projet..."
                        textarea
                        required
                    />

                    <Field
                        label="Image"
                        value={form.image}
                        onChange={(value) =>
                            onChange(
                                "image",
                                value
                            )
                        }
                        placeholder="https://..."
                    />

                    <Field
                        label="Catégorie"
                        value={form.category}
                        onChange={(value) =>
                            onChange(
                                "category",
                                value
                            )
                        }
                        placeholder="Ex: Web & Applications"
                        required
                    />

                    <Field
                        label="Technologies"
                        value={form.technologies}
                        onChange={(value) =>
                            onChange(
                                "technologies",
                                value
                            )
                        }
                        placeholder="React, Laravel, MySQL, Tailwind"
                    />

                    <div className="
                        grid gap-4 sm:grid-cols-2
                    ">
                        <Field
                            label="Lien démo"
                            value={form.demo_url}
                            onChange={(value) =>
                                onChange(
                                    "demo_url",
                                    value
                                )
                            }
                            placeholder="https://..."
                        />

                        <Field
                            label="GitHub"
                            value={form.github_url}
                            onChange={(value) =>
                                onChange(
                                    "github_url",
                                    value
                                )
                            }
                            placeholder="https://github.com/..."
                        />
                    </div>

                    {/* FEATURED */}
                    <label
                        className="
                            flex cursor-pointer
                            items-center gap-3
                            rounded-xl border
                            border-slate-200 p-3
                            dark:border-slate-800
                        "
                    >
                        <input
                            type="checkbox"
                            checked={form.is_featured}
                            onChange={(e) =>
                                onChange(
                                    "is_featured",
                                    e.target.checked
                                )
                            }
                            disabled={submitting}
                            className="h-4 w-4"
                        />

                        <div>
                            <p className="
                                text-sm font-semibold
                            ">
                                Projet mis en avant
                            </p>

                            <p className="
                                text-xs text-slate-500
                            ">
                                Afficher ce projet comme projet principal.
                            </p>
                        </div>
                    </label>

                    {/* BUTTONS */}
                    <div className="
                        flex flex-col-reverse
                        gap-2 sm:flex-row
                        sm:justify-end
                    ">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="
                                rounded-xl border
                                border-slate-200
                                px-4 py-2.5
                                text-sm font-medium
                                disabled:opacity-50
                                dark:border-slate-700
                            "
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="
                                rounded-xl bg-blue-600
                                px-5 py-2.5 text-sm
                                font-semibold text-white
                                hover:bg-blue-700
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {submitting ? (
                                "Enregistrement..."
                            ) : editingProject ? (
                                "Enregistrer"
                            ) : (
                                "Créer le projet"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
    label,
    value,
    onChange,
    placeholder,
    textarea = false,
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    textarea?: boolean;
    required?: boolean;
}) {
    const className = `
        mt-1 w-full rounded-xl border
        border-slate-200 bg-white
        px-3 py-2.5 text-sm
        outline-none transition
        focus:border-blue-500
        dark:border-slate-800
        dark:bg-[#101827]
    `;

    return (
        <div>
            <label className="
                text-xs font-semibold
                text-slate-600
                dark:text-slate-300
            ">
                {label}
            </label>

            {textarea ? (
                <textarea
                    value={value}
                    onChange={(e) =>
                        onChange(
                            e.target.value
                        )
                    }
                    placeholder={placeholder}
                    required={required}
                    rows={4}
                    className={className}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                        onChange(
                            e.target.value
                        )
                    }
                    placeholder={placeholder}
                    required={required}
                    className={className}
                />
            )}
        </div>
    );
}

/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteModal({
    deleting,
    onCancel,
    onConfirm,
}: {
    deleting: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}) {
    return (
        <div
            className="
                fixed inset-0 z-[110]
                flex items-center justify-center
                bg-black/60 p-4
                backdrop-blur-sm
            "
        >
            <div
                className="
                    w-full max-w-sm
                    rounded-2xl
                    border border-slate-200
                    bg-white p-6 shadow-2xl
                    dark:border-slate-800
                    dark:bg-[#0b1120]
                "
            >
                <h2 className="text-lg font-bold">
                    Supprimer ce projet ?
                </h2>

                <p className="
                    mt-2 text-sm leading-6
                    text-slate-500
                ">
                    Cette action est définitive.
                    Le projet sera supprimé de
                    votre portfolio.
                </p>

                <div className="
                    mt-6 flex gap-2
                ">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={deleting}
                        className="
                            flex-1 rounded-xl border
                            border-slate-200
                            px-4 py-2.5
                            text-sm font-semibold
                            disabled:opacity-50
                            dark:border-slate-700
                        "
                    >
                        Annuler
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={deleting}
                        className="
                            flex-1 rounded-xl
                            bg-red-600
                            px-4 py-2.5
                            text-sm font-semibold
                            text-white
                            hover:bg-red-700
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {deleting
                            ? "Suppression..."
                            : "Supprimer"}
                    </button>
                </div>
            </div>
        </div>
    );
}

