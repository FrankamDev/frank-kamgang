import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import api from "../api/axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("admin_token")
  );

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("admin_user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("admin_user");
      return null;
    }
  });

  /**
   * Connexion
   */
  const login = (token: string, user: User) => {
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  /**
   * Déconnexion
   */
  const logout = async () => {
    try {
      // Déconnexion côté Laravel
      await api.post("/logout");
    } catch (error) {
      console.error(
        "Erreur lors de la déconnexion côté serveur :",
        error
      );
    } finally {
      // Suppression des données locales
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");

      // Mise à jour du contexte React
      setToken(null);
      setUser(null);

      // Retour à la page de connexion
      window.location.href = "/admin/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth doit être utilisé dans AuthProvider"
    );
  }

  return context;
}