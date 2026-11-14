import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowUpRight,
  X,
  Command,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Category {
  id: number;
  name: string;
  slug: string;
  posts_count?: number;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  published_at: string | null;
  category: Category | null;
}

function formatDate(date: string | null) {
  if (!date) return "";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800" />

      <div className="mt-5 space-y-3">
        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800" />
        <div className="h-6 w-4/5 bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default function Blog() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [searchOpen, setSearchOpen] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Chargement initial
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [postsResponse, categoriesResponse] = await Promise.all([
        api.get<Post[]>("/posts"),
        api.get<Category[]>("/categories"),
      ]);

      setPosts(postsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Erreur chargement blog :", error);
    } finally {
      setLoading(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Recherche + catégorie
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);

        const response = await api.get<Post[]>("/posts", {
          params: {
            search: search || undefined,
            category:
              activeCategory !== "all"
                ? activeCategory
                : undefined,
          },
        });

        setPosts(response.data);
      } catch (error) {
        console.error("Erreur recherche :", error);
      } finally {
        setSearchLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [search, activeCategory, loading]);

  const featuredPost = useMemo(() => posts[0], [posts]);

  const otherPosts = useMemo(
    () => posts.slice(1),
    [posts]
  );

  /*
  |--------------------------------------------------------------------------
  | Navigation vers l'article
  |--------------------------------------------------------------------------
  */

  function openPost(slug: string) {
    navigate(`/blog/${slug}`);
  }

  /*
  |--------------------------------------------------------------------------
  | Rendu
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-white text-slate-950 transition-colors dark:bg-[#080d17] dark:text-white">

      {/* ================================================================
          HERO
      ================================================================= */}
      <Navbar />
      <section className="mx-auto max-w-[1240px] px-5 pb-12 pt-24 sm:px-8 lg:px-10 lg:pb-16 lg:pt-32">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[850px]"
        >

          {/* Petit label */}

          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
            Blog & réflexions
          </p>

          {/* Grand titre */}

          <h1 className="mt-5 text-[42px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[56px] lg:text-[72px]">
            Je partage ce que
            <span className="block text-slate-400 dark:text-slate-600">
              j'apprends.
            </span>
          </h1>

          <p className="mt-7 max-w-[650px] text-[15px] leading-7 text-slate-600 dark:text-slate-400 sm:text-[17px]">
            Développement web, Laravel, React, TypeScript,
            design, freelancing et construction de produits
            digitaux.
          </p>

        </motion.div>

        {/* ================================================================
            SEARCH
        ================================================================= */}

        <motion.button
          onClick={() => setSearchOpen(true)}
          whileHover={{ y: -1 }}
          className="mt-10 flex h-[58px] w-full max-w-[620px] items-center gap-4 border border-slate-200 bg-slate-50 px-5 text-left transition hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-600"
        >

          <Search
            size={19}
            strokeWidth={1.8}
            className="text-slate-400"
          />

          <span className="flex-1 text-[14px] text-slate-400">
            Rechercher un article...
          </span>

          <span className="hidden items-center gap-1 border border-slate-200 px-2 py-1 text-[11px] text-slate-400 dark:border-slate-700 sm:flex">
            <Command size={11} />
            K
          </span>

        </motion.button>

      </section>

      {/* ================================================================
          CATEGORIES
      ================================================================= */}

      <section className="border-y border-slate-200 dark:border-slate-800">

        <div className="mx-auto flex max-w-[1240px] gap-7 overflow-x-auto px-5 py-4 sm:px-8 lg:px-10">

          <button
            onClick={() => setActiveCategory("all")}
            className={`whitespace-nowrap text-[13px] transition ${activeCategory === "all"
              ? "font-semibold text-slate-950 dark:text-white"
              : "text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
          >
            Tous
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                setActiveCategory(category.slug)
              }
              className={`whitespace-nowrap text-[13px] transition ${activeCategory === category.slug
                ? "font-semibold text-slate-950 dark:text-white"
                : "text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
            >
              {category.name}
            </button>
          ))}

        </div>

      </section>

      {/* ================================================================
          ARTICLES
      ================================================================= */}

      <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

        {/* SKELETON */}

        {loading || searchLoading ? (

          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">

            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}

          </div>

        ) : posts.length === 0 ? (

          /* EMPTY */

          <div className="border border-dashed border-slate-300 py-24 text-center dark:border-slate-700">

            <Search
              size={30}
              className="mx-auto mb-5 text-slate-400"
            />

            <h2 className="text-xl font-semibold">
              Aucun article trouvé
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Essaie avec un autre mot-clé ou une autre
              catégorie.
            </p>

          </div>

        ) : (

          <>
            {/* ==========================================================
                FEATURED ARTICLE
            =========================================================== */}

            {/* ==========================================================
    FEATURED ARTICLE
=========================================================== */}

            {featuredPost && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => openPost(featuredPost.slug)}
                className="
      group cursor-pointer
      overflow-hidden rounded-2xl
      border border-slate-200
      bg-white
      dark:border-slate-800
      dark:bg-[#0d1522]

      lg:grid
      lg:grid-cols-[1.15fr_0.85fr]
      lg:rounded-none
      lg:border-y
      lg:border-x-0
      lg:bg-transparent
      dark:lg:bg-transparent
    "
              >

                {/* IMAGE */}

                <div
                  className="
        relative aspect-[16/9]
        overflow-hidden
        bg-slate-200
        dark:bg-slate-800

        sm:aspect-[16/8]

        lg:aspect-auto
        lg:min-h-[470px]
      "
                >
                  {featuredPost.image && (
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="
            h-full w-full object-cover
            transition duration-700
            group-hover:scale-[1.03]
          "
                    />
                  )}

                  <div
                    className="
          absolute left-3 top-3
          rounded-md
          bg-white/95
          px-2.5 py-1.5
          text-[9px]
          font-bold
          uppercase
          tracking-wider
          text-slate-950
          backdrop-blur
          dark:bg-slate-950/90
          dark:text-white
        "
                  >
                    À la une
                  </div>
                </div>

                {/* CONTENT */}

                <div
                  className="
        flex flex-col justify-center
        border-t border-slate-200
        p-5
        dark:border-slate-800

        sm:p-7

        lg:border-y-0
        lg:border-x
        lg:p-12
      "
                >

                  <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-wide text-slate-400">
                    <span className="font-semibold text-emerald-500">
                      {featuredPost.category?.name}
                    </span>

                    <span>•</span>

                    <span>
                      {formatDate(featuredPost.published_at)}
                    </span>
                  </div>

                  <h2
                    className="
          mt-3
          text-[20px]
          font-bold
          leading-[1.12]
          tracking-[-0.03em]

          sm:text-[28px]

          lg:mt-5
          lg:text-[35px]
        "
                  >
                    {featuredPost.title}
                  </h2>

                  <p
                    className="
          mt-3
          line-clamp-2
          text-[11px]
          leading-5
          text-slate-500
          dark:text-slate-400

          sm:text-[14px]
          sm:leading-6

          lg:mt-5
          lg:text-[15px]
        "
                  >
                    {featuredPost.excerpt}
                  </p>

                  <div
                    className="
          mt-5
          flex w-fit items-center gap-2
          text-[11px]
          font-semibold
          text-emerald-500

          sm:mt-7
          sm:text-[13px]
        "
                  >
                    Lire l'article
                    <ArrowUpRight size={14} />
                  </div>

                </div>
              </motion.article>
            )}

            {/* ==========================================================
                ARTICLE GRID
            =========================================================== */}

            {/* ==========================================================
    ARTICLE GRID
=========================================================== */}

            {otherPosts.length > 0 && (
              <div
                className="
      mt-10
      grid
      gap-3

      md:mt-16
      md:grid-cols-2
      md:gap-x-8
      md:gap-y-16

      lg:grid-cols-3
    "
              >

                {otherPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    onClick={() => openPost(post.slug)}
                    className="
          group
          cursor-pointer

          rounded-xl
          border border-slate-200
          bg-white
          p-2.5

          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-emerald-500/30
          hover:shadow-lg
          hover:shadow-slate-200/40

          dark:border-slate-800
          dark:bg-[#0d1522]
          dark:hover:border-emerald-500/30
          dark:hover:shadow-black/20

          md:rounded-none
          md:border-0
          md:bg-transparent
          md:p-0
          md:hover:translate-y-0
          md:hover:shadow-none
        "
                  >

                    {/* IMAGE */}

                    <div
                      className="
            relative
            aspect-[16/9]
            overflow-hidden
            rounded-lg

            bg-slate-200
            dark:bg-slate-800

            md:rounded-none
          "
                    >
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          className="
                h-full w-full
                object-cover
                transition duration-500
                group-hover:scale-[1.03]
              "
                        />
                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="px-1.5 pb-1.5 pt-3 md:px-0 md:pb-0 md:pt-5">

                      {/* META */}

                      <div
                        className="
              flex items-center gap-2
              text-[8px]
              font-semibold
              uppercase
              tracking-wider
              text-slate-400

              md:text-[10px]
            "
                      >
                        <span className="text-emerald-500">
                          {post.category?.name}
                        </span>

                        <span>•</span>

                        <span>
                          {formatDate(post.published_at)}
                        </span>
                      </div>

                      {/* TITLE */}

                      <h3
                        className="
              mt-2
              line-clamp-2
              text-[14px]
              font-bold
              leading-[1.2]
              tracking-[-0.02em]

              transition-colors
              group-hover:text-emerald-500

              md:mt-3
              md:text-[21px]
            "
                      >
                        {post.title}
                      </h3>

                      {/* EXCERPT */}

                      <p
                        className="
              mt-2
              line-clamp-2
              text-[10px]
              leading-[1.5]
              text-slate-500
              dark:text-slate-400

              md:mt-3
              md:text-[13px]
              md:leading-6
            "
                      >
                        {post.excerpt}
                      </p>

                      {/* LINK */}

                      <div
                        className="
              mt-3
              inline-flex
              items-center
              gap-1.5
              text-[9px]
              font-bold
              text-emerald-500

              md:mt-5
              md:text-[12px]
            "
                      >
                        Lire
                        <ArrowUpRight size={13} />
                      </div>

                    </div>

                  </motion.article>
                ))}

              </div>
            )}

          </>

        )}

      </section>

      {/* ================================================================
          SEARCH COMMAND
      ================================================================= */}

      <AnimatePresence>

        {searchOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setSearchOpen(false)}
          >

            <motion.div
              initial={{
                opacity: 0,
                y: -30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="mx-auto mt-4 max-h-[90vh] max-w-[720px] overflow-hidden border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0b1220] sm:mt-16"
            >

              {/* SEARCH HEADER */}

              <div className="flex items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-800">

                <Search
                  size={19}
                  className="text-slate-400"
                />

                <input
                  autoFocus
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Rechercher dans les articles..."
                  className="h-16 flex-1 bg-transparent text-[14px] outline-none placeholder:text-slate-400"
                />

                {search && (

                  <button
                    onClick={() => setSearch("")}
                    className="text-slate-400"
                  >
                    <X size={18} />
                  </button>

                )}

                <button
                  onClick={() =>
                    setSearchOpen(false)
                  }
                  className="border border-slate-200 px-2 py-1 text-[10px] text-slate-400 dark:border-slate-700"
                >
                  ESC
                </button>

              </div>

              {/* RESULTS */}

              <div className="max-h-[70vh] overflow-y-auto p-5">

                {search ? (

                  <div className="space-y-1">

                    {posts.length > 0 ? (

                      posts.map((post) => (

                        <button
                          key={post.id}
                          onClick={() => {
                            setSearchOpen(false);
                            openPost(post.slug);
                          }}
                          className="flex w-full items-center gap-4 border-b border-slate-100 p-3 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                        >

                          <div className="h-14 w-20 shrink-0 overflow-hidden bg-slate-200 dark:bg-slate-800">

                            {post.image && (
                              <img
                                src={post.image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            )}

                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-[13px] font-semibold">
                              {post.title}
                            </p>

                            <p className="mt-1 text-[11px] text-slate-500">
                              {post.category?.name}
                            </p>

                          </div>

                          <ArrowUpRight
                            size={16}
                            className="ml-auto shrink-0 text-slate-400"
                          />

                        </button>

                      ))

                    ) : (

                      <p className="py-10 text-center text-sm text-slate-500">
                        Aucun résultat.
                      </p>

                    )}

                  </div>

                ) : (

                  <div>

                    <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Explorer
                    </p>

                    <div className="grid gap-0 sm:grid-cols-2">

                      {categories.map((category) => (

                        <button
                          key={category.id}
                          onClick={() => {
                            setActiveCategory(
                              category.slug
                            );

                            setSearchOpen(false);
                          }}
                          className="border-b border-slate-200 p-4 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                        >

                          <p className="text-sm font-medium">
                            {category.name}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-500">
                            {category.posts_count ?? 0} articles
                          </p>

                        </button>

                      ))}

                    </div>

                  </div>

                )}

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
      <Footer />
    </main>
  );
}

