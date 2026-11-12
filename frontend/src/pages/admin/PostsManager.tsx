import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FileText,
  Calendar,
  Eye,
  X,
  Save,
  Loader2,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import api from "../../api/axios";
import RichTextEditor from "./RichTextEditor";

import ConfirmDialog from "./ConfirmDialog";
import type { ToastType } from "./AdminToast";
import AdminToast from "./AdminToast";

interface Category {
  id: number;
  name: string;
  slug: string;
  posts_count?: number;
}

interface Post {
  id: number;
  category_id: number | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  published_at: string | null;
  category?: Category | null;
  created_at: string;
  updated_at: string;
}

interface PostForm {
  category_id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  published_at: string;
}

const emptyForm: PostForm = {
  category_id: "",
  title: "",
  excerpt: "",
  content: "",
  image: "",
  published_at: "",
};

export default function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] =
    useState<Post | null>(null);

  const [form, setForm] =
    useState<PostForm>(emptyForm);

  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    show: false,
    type: "success" as ToastType,
    title: "",
    message: "",
  });

  const [deleteTarget, setDeleteTarget] =
    useState<Post | null>(null);

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  /* =====================================================
     TOAST
  ===================================================== */

  const showToast = (
    type: ToastType,
    title: string,
    message = ""
  ) => {
    setToast({
      show: true,
      type,
      title,
      message,
    });
  };

  const hideToast = () => {
    setToast((previous) => ({
      ...previous,
      show: false,
    }));
  };

  /* =====================================================
     LOAD
  ===================================================== */

  const loadPosts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/posts");

      setPosts(response.data);
    } catch (error) {
      console.error(error);

      showToast(
        "error",
        "Erreur",
        "Impossible de charger les articles."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response =
        await api.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.error(error);

      showToast(
        "error",
        "Erreur",
        "Impossible de charger les catégories."
      );
    }
  };

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredPosts = useMemo(() => {
    const term = search
      .toLowerCase()
      .trim();

    if (!term) {
      return posts;
    }

    return posts.filter((post) => {
      return (
        post.title
          .toLowerCase()
          .includes(term) ||
        post.excerpt
          .toLowerCase()
          .includes(term) ||
        post.category?.name
          ?.toLowerCase()
          .includes(term)
      );
    });
  }, [posts, search]);

  const publishedCount =
    posts.filter(
      (post) => post.published_at
    ).length;

  const draftCount =
    posts.filter(
      (post) => !post.published_at
    ).length;

  /* =====================================================
     MODAL
  ===================================================== */

  const openCreateModal = () => {
    setEditingPost(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (post: Post) => {
    setEditingPost(post);

    setForm({
      category_id:
        post.category_id
          ? String(post.category_id)
          : "",

      title: post.title,

      excerpt: post.excerpt,

      content: post.content,

      image: post.image ?? "",

      published_at:
        post.published_at
          ? formatDateTimeForInput(
              post.published_at
            )
          : "",
    });

    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingPost(null);
    setForm(emptyForm);
    setError("");
  };

  const handleChange = (
    field: keyof PostForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =====================================================
     CREATE / UPDATE
  ===================================================== */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }

    if (!form.excerpt.trim()) {
      setError("L'extrait est obligatoire.");
      return;
    }

    if (!form.content.trim()) {
      setError("Le contenu est obligatoire.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        category_id:
          form.category_id
            ? Number(form.category_id)
            : null,

        title: form.title.trim(),

        excerpt:
          form.excerpt.trim(),

        content:
          form.content,

        image:
          form.image.trim()
            ? form.image.trim()
            : null,

        published_at:
          form.published_at
            ? new Date(
                form.published_at
              ).toISOString()
            : null,
      };

      /* UPDATE */
      if (editingPost) {
        const response =
          await api.put(
            `/admin/posts/${editingPost.id}`,
            payload
          );

        const updatedPost =
          response.data.post;

        setPosts((previous) =>
          previous.map((post) =>
            post.id ===
            updatedPost.id
              ? updatedPost
              : post
          )
        );

        closeModal();

        showToast(
          "success",
          "Article modifié",
          "Les modifications ont été enregistrées avec succès."
        );

        return;
      }

      /* CREATE */
      const response =
        await api.post(
          "/admin/posts",
          payload
        );

      const createdPost =
        response.data.post;

      setPosts((previous) => [
        createdPost,
        ...previous,
      ]);

      closeModal();

      showToast(
        "success",
        "Article créé",
        "Ton nouvel article a été créé avec succès."
      );
    } catch (error: any) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Une erreur est survenue lors de l'opération.";

      setError("");

      showToast(
        "error",
        "Opération impossible",
        message
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const askDeletePost = (
    post: Post
  ) => {
    setDeleteTarget(post);
  };

  const deletePost = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(
        `/admin/posts/${deleteTarget.id}`
      );

      setPosts((previous) =>
        previous.filter(
          (post) =>
            post.id !==
            deleteTarget.id
        )
      );

      const deletedTitle =
        deleteTarget.title;

      setDeleteTarget(null);

      showToast(
        "success",
        "Article supprimé",
        `"${deletedTitle}" a été supprimé avec succès.`
      );
    } catch (error: any) {
      console.error(error);

      showToast(
        "error",
        "Suppression impossible",
        error.response?.data?.message ||
          "Impossible de supprimer cet article."
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =====================================================
     DATE
  ===================================================== */

  const formatDate = (
    date: string | null
  ) => {
    if (!date) {
      return "Brouillon";
    }

    return new Intl.DateTimeFormat(
      "fr-FR",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    ).format(new Date(date));
  };

  const formatDateTimeForInput = (
    date: string
  ) => {
    const parsed =
      new Date(date);

    const year =
      parsed.getFullYear();

    const month =
      String(
        parsed.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        parsed.getDate()
      ).padStart(2, "0");

    const hours =
      String(
        parsed.getHours()
      ).padStart(2, "0");

    const minutes =
      String(
        parsed.getMinutes()
      ).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Gestion du contenu
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Articles
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Crée, modifie et publie tes articles.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          <Plus size={18} />
          Nouvel article
        </button>
      </div>

      {/* =================================================
          STATS
      ================================================= */}

      <div className="grid gap-4 sm:grid-cols-3">

        <StatCard
          icon={
            <FileText size={20} />
          }
          label="Total"
          value={posts.length}
        />

        <StatCard
          icon={
            <CheckCircle2
              size={20}
            />
          }
          label="Publiés"
          value={publishedCount}
        />

        <StatCard
          icon={
            <Clock3 size={20} />
          }
          label="Brouillons"
          value={draftCount}
        />

      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Rechercher un article..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500"
          />

        </div>
      </div>

      {/* =================================================
          ARTICLES
      ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2
              size={28}
              className="animate-spin text-slate-400"
            />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <FileText
                size={25}
                className="text-slate-400"
              />
            </div>

            <h3 className="font-semibold text-slate-900 dark:text-white">
              Aucun article
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              {search
                ? "Aucun article ne correspond à ta recherche."
                : "Commence par créer ton premier article."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
              >
                <Plus size={17} />
                Créer un article
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">

            {filteredPosts.map(
              (post) => (
                <div
                  key={post.id}
                  className="group flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center dark:hover:bg-slate-800/40"
                >

                  {/* Image */}
                  <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-32 dark:bg-slate-800">

                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FileText
                          size={24}
                          className="text-slate-400"
                        />
                      </div>
                    )}

                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">

                    <div className="mb-2 flex flex-wrap items-center gap-2">

                      {post.category && (
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                          {post.category.name}
                        </span>
                      )}

                      {post.published_at ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                          <CheckCircle2 size={12} />
                          Publié
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                          <Clock3 size={12} />
                          Brouillon
                        </span>
                      )}

                    </div>

                    <h3 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                      {post.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                      {post.excerpt}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                      <Calendar size={14} />
                      {formatDate(
                        post.published_at
                      )}
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2">

                    {post.published_at && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                        title="Voir l'article"
                      >
                        <Eye size={17} />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(
                          post
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                      title="Modifier"
                    >
                      <Edit size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        askDeletePost(
                          post
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30"
                      title="Supprimer"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

      {/* =================================================
          CREATE / EDIT MODAL
      ================================================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingPost
                    ? "Modifier l'article"
                    : "Nouvel article"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {editingPost
                    ? "Modifie les informations de ton article."
                    : "Crée un nouvel article pour ton blog."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={19} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={
                handleSubmit
              }
              className="flex min-h-0 flex-1 flex-col"
            >

              {/* Body */}
              <div className="flex-1 space-y-6 overflow-y-auto p-5">

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                    {error}
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Titre
                  </label>

                  <input
                    type="text"
                    value={
                      form.title
                    }
                    onChange={(
                      event
                    ) =>
                      handleChange(
                        "title",
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Ex : Comment créer une API Laravel..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500"
                    required
                  />
                </div>

                {/* Category + Date */}
                <div className="grid gap-4 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Catégorie
                    </label>

                    <select
                      value={
                        form.category_id
                      }
                      onChange={(
                        event
                      ) =>
                        handleChange(
                          "category_id",
                          event
                            .target
                            .value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500"
                    >
                      <option value="">
                        Sans catégorie
                      </option>

                      {categories.map(
                        (
                          category
                        ) => (
                          <option
                            key={
                              category.id
                            }
                            value={
                              category.id
                            }
                          >
                            {
                              category.name
                            }
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Date de publication
                    </label>

                    <input
                      type="datetime-local"
                      value={
                        form.published_at
                      }
                      onChange={(
                        event
                      ) =>
                        handleChange(
                          "published_at",
                          event
                            .target
                            .value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Laisse vide pour enregistrer comme brouillon.
                    </p>
                  </div>

                </div>

                {/* Image */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Image de couverture
                  </label>

                  <input
                    type="url"
                    value={
                      form.image
                    }
                    onChange={(
                      event
                    ) =>
                      handleChange(
                        "image",
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Extrait
                  </label>

                  <textarea
                    value={
                      form.excerpt
                    }
                    onChange={(
                      event
                    ) =>
                      handleChange(
                        "excerpt",
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Une courte description de l'article..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500"
                    required
                  />

                  <p className="mt-1.5 text-xs text-slate-400">
                    Cet extrait sera utilisé sur la page du blog.
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Contenu
                  </label>

                  <RichTextEditor
                    value={
                      form.content
                    }
                    onChange={(
                      value
                    ) =>
                      handleChange(
                        "content",
                        value
                      )
                    }
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-end dark:border-slate-700 dark:bg-slate-800/50">

                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  disabled={
                    saving
                  }
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-white disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={
                    saving
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={
                          17
                        }
                        className="animate-spin"
                      />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save
                        size={
                          17
                        }
                      />

                      {editingPost
                        ? "Enregistrer les modifications"
                        : "Créer l'article"}
                    </>
                  )}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* =================================================
          DELETE CONFIRMATION
      ================================================= */}

      <ConfirmDialog
        show={
          !!deleteTarget
        }
        title="Supprimer cet article ?"
        message={
          deleteTarget
            ? `L'article "${deleteTarget.title}" sera définitivement supprimé. Cette action est irréversible.`
            : ""
        }
        loading={
          deleting
        }
        onCancel={() => {
          if (!deleting) {
            setDeleteTarget(
              null
            );
          }
        }}
        onConfirm={
          deletePost
        }
      />

      {/* =================================================
          TOAST
      ================================================= */}

      <AdminToast
        show={
          toast.show
        }
        type={
          toast.type
        }
        title={
          toast.title
        }
        message={
          toast.message
        }
        onClose={
          hideToast
        }
      />

    </div>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {icon}
        </div>

        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </span>

      </div>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {label}
      </p>

    </div>
  );
}