import { useTheme } from "@/contexts/theme-context";
import { getThemeColors } from "@/lib/colors";

/**
 * Hook personalizado para obtener los colores del tema actual
 * @returns Objeto con todos los colores del tema actual
 */
export function useThemeColors() {
  const { theme } = useTheme();
  return getThemeColors(theme);
}

/**
 * Hook para obtener clases CSS de colores del tema
 * @returns Objeto con clases CSS predefinidas para el tema
 */
export function useThemeClasses() {
  const { theme } = useTheme();

  return {
    // Clases de superficie
    surface: {
      primary: "bg-surface-primary",
      secondary: "bg-surface-secondary",
      tertiary: "bg-surface-tertiary",
      elevated: "bg-surface-elevated",
    },
    // Clases de texto
    text: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      tertiary: "text-text-tertiary",
      inverse: "text-text-inverse",
    },
    // Clases de borde
    border: {
      primary: "border-border-primary",
      secondary: "border-border-secondary",
      focus: "border-border-focus",
    },
    // Clases de estado
    state: {
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
      info: "text-info",
    },
    // Clases de fondo de estado
    bgState: {
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
      info: "bg-info",
    },
    // Clases de botones
    button: {
      primary: "bg-primary-600 hover:bg-primary-700 text-white",
      secondary:
        "bg-surface-secondary hover:bg-surface-tertiary text-text-primary border border-border-primary",
      success: "bg-success hover:bg-green-600 text-white",
      warning: "bg-warning hover:bg-yellow-600 text-white",
      error: "bg-error hover:bg-red-600 text-white",
    },
    // Clases de input
    input: {
      base: "bg-surface-primary border-border-primary text-text-primary placeholder-text-tertiary focus:border-border-focus",
      error: "border-error focus:border-error",
    },
    // Clases de card
    card: {
      base: "bg-surface-elevated border border-border-primary text-text-primary",
      elevated:
        "bg-surface-elevated border border-border-secondary shadow-lg text-text-primary",
    },
  };
}
