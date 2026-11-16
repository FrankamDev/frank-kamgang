import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Copy,
  Check,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  category: Category | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/* ==========================================================
   SKELETON COMPONENTS
========================================================== */

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}

function BlogPostSkeleton() {
  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-[#080d17] dark:text-white">

      {/* HEADER */}

      <div className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8 lg:px-10 lg:pt-32">

        {/* Back */}

        <Skeleton className="h-4 w-28" />

        {/* Article header */}

        <div className="mx-auto mt-10 max-w-[900px]">

          {/* Category */}

          <div className="flex gap-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-28" />
          </div>

          {/* Title */}

          <div className="mt-6 space-y-3">

            <Skeleton className="h-10 w-full sm:h-14" />
            <Skeleton className="h-10 w-[90%] sm:h-14" />

            <div className="sm:hidden">
              <Skeleton className="h-10 w-[75%]" />
            </div>

          </div>

          {/* Excerpt */}

          <div className="mt-7 space-y-3">

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[70%]" />

          </div>

          {/* Meta */}

          <div className="mt-7 flex gap-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-24" />
          </div>

        </div>

        {/* COVER */}

        <div className="mt-10 sm:mt-14">

          <Skeleton className="aspect-[16/10] w-full sm:aspect-[16/8]" />

        </div>

      </div>

      {/* CONTENT */}

      <article className="mx-auto max-w-[780px] px-5 py-12 sm:px-8 sm:py-20">

        <div className="space-y-5">

          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-[95%]" />
          <Skeleton className="h-5 w-[85%]" />

          <div className="h-5" />

          <Skeleton className="h-8 w-[65%]" />

          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-[92%]" />
          <Skeleton className="h-5 w-[80%]" />

          <div className="my-8 rounded-lg bg-slate-50 p-6 dark:bg-slate-900">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-[85%]" />
          </div>

          <Skeleton className="h-8 w-[60%]" />

          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-[95%]" />
          <Skeleton className="h-5 w-[75%]" />

        </div>

      </article>

    </main>
  );
}

/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function BlogPost() {
  const navigate = useNavigate();

  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);

  /* ========================================================
     FETCH ARTICLE
  ======================================================== */

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

  /* ========================================================
     COPY CODE
  ======================================================== */

  const copyCode = async () => {
    const code =
      "Route::apiResource('posts', PostController::class);";

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

  /* ========================================================
     FORMAT DATE
  ======================================================== */

  const formatDate = (date: string | null) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  /* ========================================================
     LOADING
  ======================================================== */

  if (loading) {
    return <BlogPostSkeleton />;
  }

  /* ========================================================
     ERROR
  ======================================================== */

  if (error || !post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5 text-slate-950 dark:bg-[#080d17] dark:text-white">

        <div className="w-full max-w-md text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900">
            <ArrowLeft size={20} className="text-slate-500" />
          </div>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Article introuvable
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {error || "Cet article n'existe pas."}
          </h1>

          <button
            onClick={() => navigate("/blog")}
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-5 text-sm font-medium transition active:scale-95 dark:border-slate-800"
          >
            <ArrowLeft size={15} />
            Retour au blog
          </button>

        </div>

      </main>
    );
  }

  /* ========================================================
     ARTICLE
  ======================================================== */

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-950 dark:bg-[#080d17] dark:text-white">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <header className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8 lg:px-10 lg:pt-32">

        {/* BACK */}

        <button
          onClick={() => navigate("/blog")}
          className="mb-8 inline-flex min-h-10 items-center gap-2 text-[12px] font-medium text-slate-500 transition active:scale-95 hover:text-slate-950 dark:hover:text-white sm:mb-10"
        >
          <ArrowLeft size={15} />
          Retour au blog
        </button>

        {/* ARTICLE HEADER */}

        <div className="mx-auto max-w-[900px]">

          {/* CATEGORY */}

          <div className="mb-5 flex flex-wrap items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:text-[11px] sm:tracking-[0.18em]">

            <span className="text-slate-950 dark:text-white">
              {post.category?.name || "Article"}
            </span>

            <span>•</span>

            <span>Développement web</span>

          </div>

          {/* TITLE */}

          <h1
            className="
              max-w-[850px]
              text-[36px]
              font-semibold
              leading-[1.02]
              tracking-[-0.045em]

              sm:text-[52px]

              lg:text-[68px]
            "
          >
            {post.title}
          </h1>

          {/* EXCERPT */}

          {post.excerpt && (
            <p
              className="
                mt-6
                max-w-[760px]
                text-[16px]
                leading-7
                text-slate-500

                dark:text-slate-400

                sm:mt-7
                sm:text-[18px]
                sm:leading-8
              "
            >
              {post.excerpt}
            </p>
          )}

          {/* META */}

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-[10px] text-slate-400 sm:mt-8 sm:gap-x-5 sm:text-[11px]">

            {/* AUTHOR */}

            <span className="font-medium text-slate-950 dark:text-white">
              Frank Kamgang
            </span>

            {/* DATE */}

            {post.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(post.published_at)}
              </span>
            )}

          </div>

        </div>

        {/* ==================================================
            COVER IMAGE
        ================================================== */}

        {post.image && (
          <div className="mt-9 overflow-hidden rounded-2xl sm:mt-14 sm:rounded-none">

            <img
              src={post.image}
              alt={post.title}
              loading="eager"
              className="
                aspect-[16/10]
                w-full
                object-cover

                sm:aspect-[16/8]
              "
            />

          </div>
        )}

      </header>

      {/* ====================================================
          ARTICLE CONTENT
      ==================================================== */}

      <article
        className="
          mx-auto
          max-w-[780px]
          px-5
          py-12

          sm:px-8
          sm:py-20
        "
      >

        {/* CONTENT */}

        <div
          className="
            prose
            prose-slate
            max-w-none
            dark:prose-invert

            prose-headings:font-semibold
            prose-headings:tracking-[-0.035em]

            prose-h2:mt-12
            prose-h2:text-[28px]
            prose-h2:leading-tight

            prose-h3:mt-9
            prose-h3:text-[21px]

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

            prose-pre:overflow-x-auto
            prose-pre:bg-[#0b1220]

            sm:prose-h2:text-[36px]
            sm:prose-h3:text-[23px]
          "
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />

        {/* ==================================================
            CODE BLOCK
        ================================================== */}

        <div className="my-10 overflow-hidden rounded-xl bg-[#0b1220] shadow-sm sm:rounded-none">

          {/* CODE HEADER */}

          <div className="flex min-h-12 items-center justify-between border-b border-white/10 px-4">

            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              routes/api.php
            </span>

            <button
              onClick={copyCode}
              className="flex min-h-10 items-center gap-2 text-[11px] text-slate-400 transition active:scale-95 hover:text-white"
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

          {/* CODE */}

          <div className="overflow-x-auto">

            <pre className="min-w-max p-5 text-[12px] leading-7 text-slate-300 sm:text-[13px]">

              <code>
                {"Route::apiResource('posts', PostController::class);"}
              </code>

            </pre>

          </div>

        </div>

        {/* ==================================================
            CONCLUSION
        ================================================== */}

        <div className="my-10 border-y border-slate-200 py-7 dark:border-slate-800 sm:my-12 sm:py-8">

          <p className="text-[12px] font-semibold">
            Ce qu'il faut retenir
          </p>

          <p className="mt-3 text-[14px] leading-7 text-slate-500 dark:text-slate-400 sm:text-[15px]">
            Un contenu bien structuré permet de faire évoluer facilement
            ton application et de garder une séparation claire entre
            le frontend et le backend.
          </p>

        </div>

      </article>

      {/* ====================================================
          FOOTER
      ==================================================== */}

      <footer className="mx-auto max-w-[780px] border-t border-slate-200 px-5 py-10 dark:border-slate-800 sm:px-8 sm:py-12">

        <button
          onClick={() => navigate("/blog")}
          className="
            inline-flex
            min-h-11
            items-center
            gap-2
            text-[13px]
            font-semibold
            transition
            active:scale-95
          "
        >
          <ArrowLeft size={15} />
          Voir tous les articles
        </button>

      </footer>

    </main>
  );
}