import { z } from "zod";

// Esquema para el formulario de registro
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede exceder 50 caracteres"),
    email: z.string().email("Debe ser un email válido").min(1, "El email es requerido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(100, "La contraseña no puede exceder 100 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Esquema para el formulario de login
export const loginSchema = z.object({
  email: z.string().email("Debe ser un email válido").min(1, "El email es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

// Esquema para el formulario de usuario
export const userSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  email: z.string().email("Debe ser un email válido").min(1, "El email es requerido"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val),
      "Debe ser un número de teléfono válido"
    ),
  address: z.string().max(200, "La dirección no puede exceder 200 caracteres").optional(),
});

// Esquema para el formulario de perfil
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  email: z.string().email("Debe ser un email válido").min(1, "El email es requerido"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val),
      "Debe ser un número de teléfono válido"
    ),
  address: z.string().max(200, "La dirección no puede exceder 200 caracteres").optional(),
});

// Esquema para cambio de contraseña
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z
      .string()
      .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
      .max(100, "La nueva contraseña no puede exceder 100 caracteres"),
    confirmNewPassword: z.string().min(1, "Confirma tu nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmNewPassword"],
  });

// Tipos inferidos de los esquemas
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type UserFormData = z.infer<typeof userSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
