import Hero from "../components/Hero";
import ExpertiseSection from "../components/ExpertiseSection";
import ProjectsSection from "../components/ProjectsSection";
import LatestArticles from "../components/LatestArticles";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#080d17]">
      {/* =========================
          HERO
      ========================= */}
      <Hero />

      {/* =========================
          SÉPARATEUR
      ========================= */}
      <SectionDivider />

      {/* =========================
          EXPERTISE
      ========================= */}
      <ExpertiseSection />

      {/* =========================
          SÉPARATEUR
      ========================= */}
      <SectionDivider />

      {/* =========================
          PROJETS
      ========================= */}
      <ProjectsSection />

      {/* =========================
          SÉPARATEUR
      ========================= */}
      <SectionDivider />

      {/* =========================
          BLOG
      ========================= */}
      <LatestArticles />

      {/* =========================
          SÉPARATEUR
      ========================= */}
      <Footer />
    </main>
  );
}

function SectionDivider() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative h-px bg-white/[0.06]">
        {/* point gauche */}
        <span
          className="
            absolute
            left-0
            top-1/2
            h-1
            w-1
            -translate-y-1/2
            rounded-full
            bg-emerald-400
            shadow-[0_0_10px_rgba(52,211,153,0.8)]
          "
        />

        {/* lumière centrale */}
        <span
          className="
            absolute
            left-1/2
            top-1/2
            h-px
            w-24
            -translate-x-1/2
            -translate-y-1/2
            bg-gradient-to-r
            from-transparent
            via-emerald-400/50
            to-transparent
          "
        />

        {/* point droit */}
        <span
          className="
            absolute
            right-0
            top-1/2
            h-1
            w-1
            -translate-y-1/2
            rounded-full
            bg-emerald-400
            shadow-[0_0_10px_rgba(52,211,153,0.8)]
          "
        />
      </div>
    </div>
  );
}