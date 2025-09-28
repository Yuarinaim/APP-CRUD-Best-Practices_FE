"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { FormInput, FormButton } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLoginMutation } from "@/redux/services/userApi";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginMutation] = useLoginMutation();
  const { login: authLogin } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await loginMutation({
        email: data.email,
        password: data.password,
      }).unwrap();

      // Función para decodificar JWT
      const decodeJWT = (token: string) => {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
          return JSON.parse(jsonPayload);
        } catch (error) {
          return null;
        }
      };

      // Manejar respuesta del backend
      let userData, token;

      if (result.user && (result.token || result.access_token)) {
        userData = result.user;
        token = result.token || result.access_token;
      } else if (result.access_token || result.accessToken) {
        token = result.access_token || result.accessToken;
        const decodedToken = decodeJWT(token);
        userData = {
          id: result.id || decodedToken?.sub,
          name: result.name || decodedToken?.name,
          email: result.email || decodedToken?.email,
          role: result.role || decodedToken?.role || "user",
          isActive: result.isActive ?? true,
        };
      } else {
        token = result.token || "temp-token-" + Date.now();
        const decodedToken = decodeJWT(token);
        userData = {
          id: result.id || decodedToken?.sub,
          name: result.name || decodedToken?.name,
          email: result.email || decodedToken?.email,
          role: result.role || decodedToken?.role || "user",
          isActive: result.isActive ?? true,
        };
      }

      if (userData && token) {
        authLogin(userData, token);
      } else {
        throw new Error("Respuesta de login inválida");
      }
    } catch (error) {
      console.error("Error en login:", error);
      // Aquí puedes mostrar un mensaje de error al usuario
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Main Content */}
      <main className="flex md:py-8 py-6 items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              INICIAR SESIÓN
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Inicia sesión escribiendo tu correo electrónico y contraseña.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Correo electrónico */}
            <FormInput
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="ejemplo@gmail.com"
              control={control}
              error={errors.email}
              required
            />

            {/* Contraseña */}
            <FormInput
              label="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••••••"
              control={control}
              error={errors.password}
              required
            />

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Recuérdame</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Login button */}
            <FormButton
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="w-full py-3"
            >
              {isLoading ? "INICIANDO SESIÓN..." : "INICIAR SESIÓN"}
            </FormButton>

            {/* Register link */}
            <div className="text-center pt-4">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                ¿No tienes una cuenta?{" "}
              </span>
              <Link
                href="/register"
                className="text-gray-800 dark:text-gray-200 text-sm font-medium underline hover:text-gray-600 dark:hover:text-gray-400"
              >
                REGISTRARME
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
