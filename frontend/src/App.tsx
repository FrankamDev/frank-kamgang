import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminLayout from "./pages/admin/AdminLayout";
import Contact from "./pages/Contact";


export default function App() {
  function Placeholder({ title }: { title: string }) {
    return (
      <main className="min-h-screen bg-[#070d16] px-6 pt-32 text-white">
        <h1 className="text-4xl font-bold">{title}</h1>
      </main>
    );
  }
  return (
    <BrowserRouter>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/blog"
          element={<Blog />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/projects"
          element={<Projects />}
        />
        <Route path="/admin" element={<AdminLayout />} />
        <Route
          path="/admin/categories"
          element={<AdminCategories />}
        />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route
          path="/setup"
          element={<Placeholder title="Setup" />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
      </Routes>
    </BrowserRouter>
  );
}