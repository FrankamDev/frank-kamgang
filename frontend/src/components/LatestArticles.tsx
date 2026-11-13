import { useEffect, useState } from "react";
import { FiArrowRight, FiClock, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image?: string | null;
  published_at: string | null;
  category?: Category | null;
}

export default function LatestArticles() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/posts"
        );

        if (!response.ok) {
          throw new Error("Impossible de récupérer les articles.");
        }

        const data = await response.json();

        /*
         * Laravel peut retourner directement un tableau
         * ou un objet contenant "data".
         */
        const articles = Array.isArray(data)
          ? data
          : data.data ?? [];

        setPosts(articles.slice(0, 2));
      } catch (error) {
        console.error(
          "Erreur récupération articles :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (date: string | null) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const getReadingTime = (content: string = "") => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));

    return `${minutes} min de lecture`;
  };

  return (
    <section
      className="
        w-full
        bg-[#080d17]
        px-4
        py-16
        text-white

        sm:px-6
        sm:py-20

        lg:px-8
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* ==========================
            HEADER
        ========================== */}

        <div className="max-w-2xl">

          <div
            className="
              inline-flex
              items-center
              rounded-md
              border
              border-emerald-500
              px-3
              py-1.5
              text-[10px]
              font-semibold
              text-white
            "
          >
            <span
              className="
                mr-2
                h-3
                w-px
                bg-emerald-400
              "
            />

            Blog & Réflexions
          </div>

          <h2
            className="
              mt-4
              text-3xl
              font-medium
              tracking-tight

              sm:text-4xl
            "
          >
            Derniers{" "}
            <span className="font-bold text-emerald-400">
              Articles
            </span>
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-400

              sm:text-base
              sm:leading-7
            "
          >
            Partages d'expérience, retours techniques et analyses
            sur le développement web, l'architecture logicielle
            et le design visuel.
          </p>

          {/* BOUTON */}

          <Link
            to="/blog"
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-md
              border
              border-white/10
              bg-[#111b2b]
              px-4
              py-3
              text-xs
              font-semibold
              text-white
              transition

              hover:border-emerald-500/30
              hover:bg-[#162238]
            "
          >
            Voir tous les articles

            <FiArrowRight
              className="text-emerald-400"
              size={17}
            />
          </Link>
        </div>

        {/* ==========================
            ARTICLES
        ========================== */}

        <div className="mt-8 space-y-5">

          {loading ? (
            <>
              <ArticleSkeleton />
              <ArticleSkeleton />
            </>
          ) : posts.length === 0 ? (
            <div
              className="
                rounded-xl
                border
                border-white/[0.08]
                bg-[#101827]
                px-5
                py-8
                text-center
                text-sm
                text-slate-500
              "
            >
              Aucun article publié pour le moment.
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="
                  group
                  block
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-[#101827]
                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-emerald-500/30
                  hover:bg-[#111c2d]

                  sm:p-6
                "
              >
                {/* TOP */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  {/* CATEGORY */}

                  <span
                    className="
                      rounded-md
                      border
                      border-slate-600
                      bg-[#18243a]
                      px-2.5
                      py-1.5
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-slate-300
                    "
                  >
                    {post.category?.name ?? "Article"}
                  </span>

                  {/* READING TIME */}

                  <span
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1.5
                      text-[10px]
                      font-mono
                      text-slate-400
                    "
                  >
                    <FiClock size={12} />

                    {getReadingTime(post.content)}
                  </span>
                </div>

                {/* TITLE */}

                <h3
                  className="
                    mt-4
                    text-lg
                    font-medium
                    leading-snug
                    tracking-tight
                    text-white

                    transition-colors
                    group-hover:text-emerald-400

                    sm:text-xl
                  "
                >
                  {post.title}
                </h3>

                {/* EXCERPT */}

                <p
                  className="
                    mt-2
                    line-clamp-2
                    text-xs
                    leading-6
                    text-slate-400

                    sm:text-sm
                    sm:leading-6
                  "
                >
                  {post.excerpt}
                </p>

                {/* DIVIDER */}

                <div
                  className="
                    my-5
                    h-px
                    bg-white/[0.08]
                  "
                />

                {/* FOOTER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      text-slate-400
                    "
                  >
                    <FiCalendar size={13} />

                    {formatDate(post.published_at)}
                  </div>

                  <span
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-[10px]
                      font-semibold
                      text-emerald-400
                    "
                  >
                    Lire l'article

                    <FiArrowRight
                      size={13}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   SKELETON
========================================== */

function ArticleSkeleton() {
  return (
    <div
      className="
        animate-pulse
        rounded-xl
        border
        border-white/[0.06]
        bg-[#101827]
        p-5
        sm:p-6
      "
    >
      <div className="h-6 w-20 rounded bg-slate-800" />

      <div className="mt-5 h-6 w-4/5 rounded bg-slate-800" />

      <div className="mt-3 h-4 w-full rounded bg-slate-800" />

      <div className="mt-2 h-4 w-2/3 rounded bg-slate-800" />

      <div className="my-5 h-px bg-slate-800" />

      <div className="h-4 w-28 rounded bg-slate-800" />
    </div>
  );
}