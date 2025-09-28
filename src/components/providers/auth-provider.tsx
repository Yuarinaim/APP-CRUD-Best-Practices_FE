"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useLogoutMutation } from "@/redux/services/userApi";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    // Verificar si hay un usuario autenticado al cargar
    const token = Cookies.get("auth-token");
    const userData = Cookies.get("user-data");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    // Guardar en cookies
    Cookies.set("auth-token", token, { expires: 7, sameSite: "strict" });
    Cookies.set("user-role", userData.role, { expires: 7, sameSite: "strict" });
    Cookies.set("user-data", JSON.stringify(userData), { expires: 7, sameSite: "strict" });

    // Actualizar estado
    setUser(userData);

    // Redirigir según el rol
    if (userData.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  const logout = async () => {
    try {
      // Llamar al endpoint de logout del backend
      await logoutMutation(null).unwrap();
    } catch (error) {
      console.error("Error al hacer logout en el backend:", error);
      // Continuar con el logout local aunque falle el backend
    } finally {
      // Limpiar cookies
      Cookies.remove("auth-token");
      Cookies.remove("user-role");
      Cookies.remove("user-data");

      // Limpiar estado
      setUser(null);

      // Redirigir al login
      router.push("/login");
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      Cookies.set("user-data", JSON.stringify(updatedUser), { expires: 7, sameSite: "strict" });
      setUser(updatedUser);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
