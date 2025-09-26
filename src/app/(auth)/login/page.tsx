"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { FormInput, FormButton } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      console.log("Login submitted:", { ...data, rememberMe });
      // Aquí iría la lógica de autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular API call
    } catch (error) {
      console.error("Error en login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Main Content */}
      <main className="flex items-center justify-center px-4">
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
              register={register}
              error={errors.email}
              required
            />

            {/* Contraseña */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className={`
                    w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                    ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }
                  `}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Recuérdame
                </span>
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
