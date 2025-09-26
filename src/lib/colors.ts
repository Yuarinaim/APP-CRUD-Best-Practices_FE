// Sistema de tokens de color centralizado
export const colors = {
  // Colores base
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },
  secondary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  // Colores de superficie para temas
  surface: {
    light: {
      primary: "#ffffff",
      secondary: "#f8fafc",
      tertiary: "#f1f5f9",
      elevated: "#ffffff",
    },
    dark: {
      primary: "#0f172a",
      secondary: "#1e293b",
      tertiary: "#334155",
      elevated: "#1e293b",
    },
  },
  // Colores de texto para temas
  text: {
    light: {
      primary: "#0f172a",
      secondary: "#475569",
      tertiary: "#64748b",
      inverse: "#ffffff",
    },
    dark: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
      inverse: "#0f172a",
    },
  },
  // Colores de borde para temas
  border: {
    light: {
      primary: "#e2e8f0",
      secondary: "#cbd5e1",
      focus: "#3b82f6",
    },
    dark: {
      primary: "#334155",
      secondary: "#475569",
      focus: "#60a5fa",
    },
  },
} as const;

// Función para obtener colores del tema actual
export const getThemeColors = (theme: "light" | "dark") => ({
  surface: colors.surface[theme],
  text: colors.text[theme],
  border: colors.border[theme],
  primary: colors.primary,
  secondary: colors.secondary,
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
});

// Tipos para TypeScript
export type ColorScale = keyof typeof colors.primary;
export type ThemeColors = ReturnType<typeof getThemeColors>;
