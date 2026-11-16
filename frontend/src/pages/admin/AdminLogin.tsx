import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email: email.trim(),
        password,
      });

      console.log("LOGIN RESPONSE :", response.data);

      login(
        response.data.token,
        response.data.user
      );

      navigate("/admin");
    } catch (error: any) {
      console.error("LOGIN ERROR :", error);

      if (error.response) {
        console.error("STATUS :", error.response.status);
        console.error("DATA :", error.response.data);

        if (error.response.status === 401) {
          setError("Email ou mot de passe incorrect.");
        } else if (error.response.status === 403) {
          setError("Accès refusé : ce compte n'est pas administrateur.");
        } else {
          setError(
            error.response.data?.message ||
              "Une erreur est survenue lors de la connexion."
          );
        }
      } else {
        setError(
          "Impossible de contacter le serveur Laravel."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-[#080d17]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">

        <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          Administration
        </h1>

        <p className="mb-6 text-sm text-slate-500">
          Connectez-vous à votre espace administrateur.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>
      </div>
    </div>
  );
}