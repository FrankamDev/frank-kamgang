import { BrowserRouter, Route, Routes } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Expertise from "./pages/Expertise";
import Contact from "./pages/Contact";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminCategories from "./pages/admin/AdminCategories";
import Footer from "./components/Footer";

export default function App() {
  function Placeholder({ title }: { title: string }) {
    return (
      <main className="min-h-screen bg-white px-6 pt-32 text-slate-900 dark:bg-[#070d16] dark:text-white">
        <h1 className="text-4xl font-bold">{title}</h1>
      </main>
    );
  }
  
  return (
    <>
    <div id="google_translate_element" className="hidden" />
    <BrowserRouter>
      <Routes>
        {/* ==================== */}
        {/* PUBLIC ROUTES */}
        {/* ==================== */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/setup" element={<Placeholder title="Setup" />} />

        {/* ==================== */}
        {/* ADMIN ROUTES */}
        {/* ==================== */}

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
      </Routes>
    </BrowserRouter>
    
    </>
  );
}