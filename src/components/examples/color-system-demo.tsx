"use client";

import { useThemeClasses } from "@/hooks/use-theme-colors";

/**
 * Componente de demostración del sistema de colores
 * Muestra cómo usar las clases de tema centralizadas
 */
export function ColorSystemDemo() {
  const classes = useThemeClasses();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">
        Sistema de Colores Centralizado
      </h2>

      {/* Superficies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Superficies</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            className={`p-4 rounded-lg ${classes.surface.primary} border border-border-primary`}
          >
            <p className="text-text-primary font-medium">Primary</p>
            <p className="text-text-secondary text-sm">bg-surface-primary</p>
          </div>
          <div
            className={`p-4 rounded-lg ${classes.surface.secondary} border border-border-primary`}
          >
            <p className="text-text-primary font-medium">Secondary</p>
            <p className="text-text-secondary text-sm">bg-surface-secondary</p>
          </div>
          <div
            className={`p-4 rounded-lg ${classes.surface.tertiary} border border-border-primary`}
          >
            <p className="text-text-primary font-medium">Tertiary</p>
            <p className="text-text-secondary text-sm">bg-surface-tertiary</p>
          </div>
          <div
            className={`p-4 rounded-lg ${classes.surface.elevated} border border-border-primary`}
          >
            <p className="text-text-primary font-medium">Elevated</p>
            <p className="text-text-secondary text-sm">bg-surface-elevated</p>
          </div>
        </div>
      </div>

      {/* Textos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Textos</h3>
        <div className={`p-4 rounded-lg ${classes.surface.secondary} space-y-2`}>
          <p className={`text-lg ${classes.text.primary}`}>Texto Primario</p>
          <p className={`text-base ${classes.text.secondary}`}>Texto Secundario</p>
          <p className={`text-sm ${classes.text.tertiary}`}>Texto Terciario</p>
        </div>
      </div>

      {/* Estados */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Estados</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${classes.bgState.success} text-white`}>
            <p className="font-medium">Success</p>
            <p className="text-sm opacity-90">bg-success</p>
          </div>
          <div className={`p-4 rounded-lg ${classes.bgState.warning} text-white`}>
            <p className="font-medium">Warning</p>
            <p className="text-sm opacity-90">bg-warning</p>
          </div>
          <div className={`p-4 rounded-lg ${classes.bgState.error} text-white`}>
            <p className="font-medium">Error</p>
            <p className="text-sm opacity-90">bg-error</p>
          </div>
          <div className={`p-4 rounded-lg ${classes.bgState.info} text-white`}>
            <p className="font-medium">Info</p>
            <p className="text-sm opacity-90">bg-info</p>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Botones</h3>
        <div className="flex flex-wrap gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${classes.button.primary}`}
          >
            Primary
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${classes.button.secondary}`}
          >
            Secondary
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${classes.button.success}`}
          >
            Success
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${classes.button.warning}`}
          >
            Warning
          </button>
          <button className={`px-4 py-2 rounded-lg font-medium ${classes.button.error}`}>
            Error
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-6 rounded-lg ${classes.card.base}`}>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Card Básica</h4>
            <p className="text-text-secondary">
              Esta card usa las clases base del sistema de colores.
            </p>
          </div>
          <div className={`p-6 rounded-lg ${classes.card.elevated}`}>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Card Elevada</h4>
            <p className="text-text-secondary">
              Esta card usa las clases elevadas con sombra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
