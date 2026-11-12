import { useState } from "react";
import { ArrowLeft, Clock, Calendar, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BlogPost() {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const article = {
    category: "Laravel",
    title:
      "Construire une API Laravel propre, moderne et évolutive",
    excerpt:
      "Les principes essentiels pour concevoir une API Laravel robuste, maintenable et prête à évoluer avec ton application React.",
    author: "Frank Kamgang",
    date: "12 novembre 2026",
    readingTime: "8 min de lecture",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85",
  };

  function copyCode() {
    navigator.clipboard.writeText(`Route::apiResource('posts', PostController::class);`);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-[#080d17] dark:text-white">

      {/* ==========================================================
          TOP
      =========================================================== */}

      <div className="mx-auto max-w-[1180px] px-5 pt-24 sm:px-8 lg:px-10 lg:pt-32">

        {/* Retour */}

        <button
          onClick={() => navigate("/blog")}
          className="mb-10 inline-flex items-center gap-2 text-[12px] font-medium text-slate-500 transition hover:text-slate-950 dark:hover:text-white"
        >
          <ArrowLeft size={15} />
          Retour au blog
        </button>

        {/* ========================================================
            HEADER ARTICLE
        ========================================================= */}

        <div className="mx-auto max-w-[900px]">

          {/* Catégorie */}

          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            <span className="text-slate-950 dark:text-white">
              {article.category}
            </span>

            <span>•</span>

            <span>Développement web</span>
          </div>

          {/* Titre */}

          <h1 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[52px] lg:text-[68px]">
            {article.title}
          </h1>

          {/* Extrait */}

          <p className="mt-7 max-w-[760px] text-[17px] leading-8 text-slate-500 dark:text-slate-400 sm:text-[18px]">
            {article.excerpt}
          </p>

          {/* Meta */}

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] text-slate-400">

            <span className="font-medium text-slate-950 dark:text-white">
              {article.author}
            </span>

            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {article.date}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {article.readingTime}
            </span>

          </div>

        </div>

        {/* ========================================================
            COVER IMAGE
        ========================================================= */}

        <div className="mt-12 overflow-hidden sm:mt-16">
          <img
            src={article.image}
            alt={article.title}
            className="h-auto w-full object-cover"
          />
        </div>

      </div>

      {/* ==========================================================
          ARTICLE CONTENT
      =========================================================== */}

      <article className="mx-auto max-w-[780px] px-5 py-14 sm:px-8 sm:py-20">

        {/* Introduction */}

        <p className="text-[18px] leading-[1.9] text-slate-700 dark:text-slate-300">
          Construire une API ne consiste pas simplement à créer quelques
          routes et à retourner du JSON. Lorsque ton application commence
          à grandir, la structure du backend devient rapidement déterminante
          pour la maintenance et l'évolution du projet.
        </p>

        <p className="mt-7 text-[17px] leading-[1.9] text-slate-600 dark:text-slate-400">
          Dans cet article, nous allons voir comment organiser une API
          Laravel moderne afin qu'elle puisse communiquer efficacement avec
          une application React, tout en gardant une architecture claire.
        </p>

        {/* ========================================================
            SOMMAIRE
        ========================================================= */}

        <div className="my-12 border-y border-slate-200 py-7 dark:border-slate-800">

          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Dans cet article
          </p>

          <ol className="space-y-2 text-[14px]">
            <li>01 — Structurer son API Laravel</li>
            <li>02 — Créer les ressources</li>
            <li>03 — Connecter React à Laravel</li>
            <li>04 — Organiser son code</li>
            <li>05 — Préparer l'évolution du projet</li>
          </ol>

        </div>

        {/* ========================================================
            H2
        ========================================================= */}

        <h2 className="mt-14 text-[30px] font-semibold leading-tight tracking-[-0.035em] sm:text-[36px]">
          01. Structurer son API Laravel
        </h2>

        <p className="mt-6 text-[17px] leading-[1.9] text-slate-600 dark:text-slate-400">
          Une bonne API commence par une structure claire. Laravel fournit
          déjà plusieurs outils permettant de séparer les responsabilités
          entre les routes, les contrôleurs, les modèles et les ressources.
        </p>

        <p className="mt-6 text-[17px] leading-[1.9] text-slate-600 dark:text-slate-400">
          L'objectif est simple : chaque partie de l'application doit avoir
          une responsabilité précise.
        </p>

        {/* ========================================================
            NOTE
        ========================================================= */}

        <div className="my-10 border-l-2 border-slate-900 bg-slate-50 px-6 py-5 dark:border-white dark:bg-slate-900/50">

          <p className="text-[14px] font-semibold">
            À retenir
          </p>

          <p className="mt-2 text-[14px] leading-7 text-slate-500 dark:text-slate-400">
            Une architecture simple au départ devient beaucoup plus facile
            à faire évoluer lorsqu'elle respecte déjà des responsabilités
            bien séparées.
          </p>

        </div>

        {/* ========================================================
            CODE
        ========================================================= */}

        <h2 className="mt-14 text-[30px] font-semibold leading-tight tracking-[-0.035em] sm:text-[36px]">
          02. Créer les ressources API
        </h2>

        <p className="mt-6 text-[17px] leading-[1.9] text-slate-600 dark:text-slate-400">
          Laravel permet de générer rapidement les routes CRUD nécessaires
          à une ressource.
        </p>

        <div className="relative my-8 overflow-hidden bg-[#0b1220]">

          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">

            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              routes/api.php
            </span>

            <button
              onClick={copyCode}
              className="flex items-center gap-2 text-[11px] text-slate-400 hover:text-white"
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
              {`Route::apiResource('posts', PostController::class);`}
            </code>
          </pre>

        </div>

        {/* ========================================================
            H3
        ========================================================= */}

        <h3 className="mt-10 text-[23px] font-semibold">
          Pourquoi utiliser apiResource ?
        </h3>

        <p className="mt-5 text-[17px] leading-[1.9] text-slate-600 dark:text-slate-400">
          Cette approche permet de générer rapidement les routes standards
          d'une ressource tout en gardant une convention cohérente dans
          l'application.
        </p>

        {/* ========================================================
            LIST
        ========================================================= */}

        <ul className="my-8 space-y-4 text-[16px] leading-7 text-slate-600 dark:text-slate-400">

          <li>
            <strong className="text-slate-950 dark:text-white">
              GET
            </strong>{" "}
            — récupérer les articles
          </li>

          <li>
            <strong className="text-slate-950 dark:text-white">
              POST
            </strong>{" "}
            — créer un article
          </li>

          <li>
            <strong className="text-slate-950 dark:text-white">
              PUT
            </strong>{" "}
            — modifier un article
          </li>

          <li>
            <strong className="text-slate-950 dark:text-white">
              DELETE
            </strong>{" "}
            — supprimer un article
          </li>

        </ul>

        {/* ========================================================
            TABLE
        ========================================================= */}

        <h2 className="mt-14 text-[30px] font-semibold leading-tight tracking-[-0.035em] sm:text-[36px]">
          03. Comparaison des responsabilités
        </h2>

        <div className="my-8 overflow-x-auto border border-slate-200 dark:border-slate-800">

          <table className="w-full min-w-[620px] border-collapse text-left text-[13px]">

            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="px-4 py-4 font-semibold">
                  Élément
                </th>

                <th className="px-4 py-4 font-semibold">
                  Responsabilité
                </th>

                <th className="px-4 py-4 font-semibold">
                  Exemple
                </th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-slate-200 dark:border-slate-800">
                <td className="px-4 py-4">
                  Route
                </td>

                <td className="px-4 py-4 text-slate-500">
                  Définir l'URL
                </td>

                <td className="px-4 py-4 text-slate-500">
                  /api/posts
                </td>
              </tr>

              <tr className="border-b border-slate-200 dark:border-slate-800">
                <td className="px-4 py-4">
                  Controller
                </td>

                <td className="px-4 py-4 text-slate-500">
                  Gérer la requête
                </td>

                <td className="px-4 py-4 text-slate-500">
                  PostController
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4">
                  Model
                </td>

                <td className="px-4 py-4 text-slate-500">
                  Gérer les données
                </td>

                <td className="px-4 py-4 text-slate-500">
                  Post
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* ========================================================
            CONCLUSION
        ========================================================= */}

        <h2 className="mt-14 text-[30px] font-semibold leading-tight tracking-[-0.035em] sm:text-[36px]">
          Conclusion
        </h2>

        <p className="mt-6 text-[17px] leading-[1.9] text-slate-600 dark:text-slate-400">
          Une API bien structurée permet de faire évoluer plus facilement
          une application. En séparant clairement les responsabilités,
          tu réduis la complexité et tu facilites le travail entre le
          frontend et le backend.
        </p>

        <div className="my-12 border-y border-slate-200 py-8 dark:border-slate-800">

          <p className="text-[13px] font-semibold">
            Ce qu'il faut retenir
          </p>

          <p className="mt-3 text-[15px] leading-7 text-slate-500 dark:text-slate-400">
            Commence simple, structure correctement ton projet et prépare
            ton architecture pour les fonctionnalités qui viendront ensuite.
          </p>

        </div>

      </article>

      {/* ==========================================================
          FOOTER ARTICLE
      =========================================================== */}

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