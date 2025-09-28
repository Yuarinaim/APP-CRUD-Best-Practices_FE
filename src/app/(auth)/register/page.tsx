"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { FormInput, FormButton } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCreateUserMutation } from "@/redux/services/userApi";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [createUser] = useCreateUserMutation();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Aquí iría la lógica de registro
      await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        // role: "user", // Rol por defecto
        // isActive: true, // Usuario activo por defecto
      }).unwrap();
    } catch (error) {
      console.error("Error en registro:", error);
    } finally {
      setIsLoading(false);
      router.push("/login");
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Main Content */}
      <main className="flex md:py-8 py-6 items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w12 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">REGISTRATE</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre */}
            <FormInput
              label="Nombre"
              name="name"
              type="text"
              placeholder="Escribe tu nombre"
              control={control}
              error={errors.name}
              required
            />

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

            {/* Confirmar Contraseña */}
            <FormInput
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              placeholder="••••••••••••"
              control={control}
              error={errors.confirmPassword}
              required
            />

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <FormButton
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="w-full py-3"
              >
                {isLoading ? "REGISTRANDO..." : "CONTINUAR"}
              </FormButton>
              <FormButton
                type="button"
                variant="secondary"
                onClick={handleCancel}
                disabled={isLoading}
                className="w-full py-3"
              >
                CANCELAR
              </FormButton>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                INICIAR SESIÓN
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
