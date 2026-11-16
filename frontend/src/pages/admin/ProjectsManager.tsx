import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  category: Category | null;
  author: string | null;
  reading_time: number | null;
  published_at: string | null;
  created_at: string;
}

export default function BlogPost() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);

  // ==========================================================
  // FETCH ARTICLE
  // ==========================================================

  useEffect(() => {
    if (!slug) {
      setError("Article introuvable.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<Post>(`/posts/${slug}`);

        setPost(response.data);
      } catch (err: any) {
        console.error("Erreur récupération article :", err);

        if (err.response?.status === 404) {
          setError("Cet article n'existe pas ou a été supprimé.");
        } else {
          setError(
            "Impossible de charger l'article. Vérifie la connexion à l'API."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // ==========================================================
  // COPY CODE
  // ==========================================================

  const copyCode = async () => {
    const code = `Route::apiResource('posts', PostController::class);`;

    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Impossible de copier le code :", error);
    }
  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (date: string | null) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-slate-950 dark:bg-[#080d17] dark:text-white">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <Loader2 size={18} className="animate-spin" />
          Chargement de l'article...
        </div>
      </main>
    );
  }

  // ==========================================================
  // ERROR / 404
  // ==========================================================

  if (error || !post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5 text-slate-950 dark:bg-[#080d17] dark:text-white">
        <div className="max-w-md text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Article introuvable
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {error || "Cet article n'existe pas."}
          </h1>

          <button
            onClick={() => navigate("/blog")}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-60"
          >
            <ArrowLeft size={15} />
            Retour au blog
          </button>
        </div>
      </main>
    );
  }

  // ==========================================================
  // ARTICLE
  // ==========================================================

  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-[#080d17] dark:text-white">

      {/* ======================================================
          TOP
      ====================================================== */}

      <div className="mx-auto max-w-[1180px] px-5 pt-24 sm:px-8 lg:px-10 lg:pt-32">

        {/* Retour */}

        <button
          onClick={() => navigate("/blog")}
          className="mb-10 inline-flex items-center gap-2 text-[12px] font-medium text-slate-500 transition hover:text-slate-950 dark:hover:text-white"
        >
          <ArrowLeft size={15} />
          Retour au blog
        </button>

        {/* ====================================================
            HEADER ARTICLE
        ==================================================== */}

        <div className="mx-auto max-w-[900px]">

          {/* Catégorie */}

          <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
  <span className="text-slate-950 dark:text-white">
    {post.category?.name || "Article"}
  </span>

  <span>•</span>

  <span>Développement web</span>
</div>

          {/* Titre */}

          <h1 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[52px] lg:text-[68px]">
            {post.title}
          </h1>

          {/* Extrait */}

          {post.excerpt && (
            <p className="mt-7 max-w-[760px] text-[17px] leading-8 text-slate-500 dark:text-slate-400 sm:text-[18px]">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] text-slate-400">

            {post.author && (
              <span className="font-medium text-slate-950 dark:text-white">
                {post.author}
              </span>
            )}

            {post.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(post.published_at)}
              </span>
            )}

            {post.reading_time && (
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.reading_time} min de lecture
              </span>
            )}

          </div>

        </div>

        {/* ====================================================
            COVER IMAGE
        ==================================================== */}

        {post.image && (
          <div className="mt-12 overflow-hidden sm:mt-16">

            <img
              src={post.image}
              alt={post.title}
              className="h-auto w-full object-cover"
            />

          </div>
        )}

      </div>

      {/* ======================================================
          ARTICLE CONTENT
      ====================================================== */}

      <article className="mx-auto max-w-[780px] px-5 py-14 sm:px-8 sm:py-20">

        {/* ====================================================
            CONTENU DYNAMIQUE
        ==================================================== */}

        <div
          className="
            prose
            prose-slate
            max-w-none

            dark:prose-invert

            prose-headings:font-semibold
            prose-headings:tracking-[-0.035em]

            prose-h2:mt-14
            prose-h2:text-[30px]
            prose-h2:leading-tight

            sm:prose-h2:text-[36px]

            prose-h3:mt-10
            prose-h3:text-[23px]

            prose-p:text-[17px]
            prose-p:leading-[1.9]

            prose-p:text-slate-600
            dark:prose-p:text-slate-400

            prose-strong:text-slate-950
            dark:prose-strong:text-white

            prose-a:text-slate-950
            dark:prose-a:text-white

            prose-li:text-slate-600
            dark:prose-li:text-slate-400

            prose-blockquote:border-slate-900
            dark:prose-blockquote:border-white

            prose-code:text-slate-950
            dark:prose-code:text-white

            prose-pre:bg-[#0b1220]
          "
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />

        {/* ====================================================
            BLOC CODE EXEMPLE
            À garder si tu veux conserver ton bouton Copier
        ==================================================== */}

        <div className="relative my-10 overflow-hidden bg-[#0b1220]">

          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">

            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              routes/api.php
            </span>

            <button
              onClick={copyCode}
              className="flex items-center gap-2 text-[11px] text-slate-400 transition hover:text-white"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copié
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copier
                </>
              )}
            </button>

          </div>

          <pre className="overflow-x-auto p-5 text-[13px] leading-7 text-slate-300">
            <code>
              {"Route::apiResource('posts', PostController::class);"}
            </code>
          </pre>

        </div>

        {/* ====================================================
            CONCLUSION
        ==================================================== */}

        <div className="my-12 border-y border-slate-200 py-8 dark:border-slate-800">

          <p className="text-[13px] font-semibold">
            Ce qu'il faut retenir
          </p>

          <p className="mt-3 text-[15px] leading-7 text-slate-500 dark:text-slate-400">
            Un contenu bien structuré permet de faire évoluer facilement
            ton application et de garder une séparation claire entre
            le frontend et le backend.
          </p>

        </div>

      </article>

      {/* ======================================================
          FOOTER ARTICLE
      ====================================================== */}

      <div className="mx-auto max-w-[780px] border-t border-slate-200 px-5 py-12 dark:border-slate-800 sm:px-8">

        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-2 text-[13px] font-semibold"
        >
          <ArrowLeft size={15} />
          Voir tous les articles
        </button>

      </div>

    </main>
  );
}