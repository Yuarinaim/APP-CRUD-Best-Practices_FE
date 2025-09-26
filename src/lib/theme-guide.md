# Guía del Sistema de Colores

## 🎨 Cómo Cambiar Colores de Tema

### 1. **Cambios Globales (Recomendado)**

Para cambiar colores en toda la aplicación, edita **SOLO** estos archivos:

#### `src/app/globals.css`

```css
:root {
  /* Cambia estos valores para el tema claro */
  --surface-primary: #ffffff;
  --text-primary: #0f172a;
  --primary-500: #3b82f6;
}

.dark {
  /* Cambia estos valores para el tema oscuro */
  --surface-primary: #0f172a;
  --text-primary: #f8fafc;
  --primary-500: #3b82f6;
}
```

#### `src/lib/colors.ts`

```typescript
export const colors = {
  primary: {
    500: "#3b82f6", // Cambia este color
    // ... otros tonos
  },
};
```

### 2. **Uso en Componentes**

#### Opción A: Clases CSS (Recomendado)

```tsx
// En lugar de:
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

// Usa:
<div className="bg-surface-primary text-text-primary">
```

#### Opción B: Hook personalizado

```tsx
import { useThemeClasses } from "@/hooks/use-theme-colors";

function MyComponent() {
  const classes = useThemeClasses();

  return (
    <div className={`${classes.surface.primary} ${classes.text.primary}`}>Contenido</div>
  );
}
```

#### Opción C: Variables CSS directas

```tsx
<div
  style={{
    backgroundColor: "var(--surface-primary)",
    color: "var(--text-primary)",
  }}
>
  Contenido
</div>
```

### 3. **Clases Disponibles**

#### Superficie

- `bg-surface-primary` - Fondo principal
- `bg-surface-secondary` - Fondo secundario
- `bg-surface-tertiary` - Fondo terciario
- `bg-surface-elevated` - Fondo elevado (cards, modales)

#### Texto

- `text-text-primary` - Texto principal
- `text-text-secondary` - Texto secundario
- `text-text-tertiary` - Texto terciario
- `text-text-inverse` - Texto inverso

#### Bordes

- `border-border-primary` - Borde principal
- `border-border-secondary` - Borde secundario
- `border-border-focus` - Borde de foco

#### Estados

- `text-success` / `bg-success` - Verde
- `text-warning` / `bg-warning` - Amarillo
- `text-error` / `bg-error` - Rojo
- `text-info` / `bg-info` - Azul

### 4. **Ejemplos de Migración**

#### Antes (problemático):

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
  <h1 className="text-gray-800 dark:text-gray-200">Título</h1>
  <p className="text-gray-600 dark:text-gray-400">Descripción</p>
</div>
```

#### Después (centralizado):

```tsx
<div className="bg-surface-primary text-text-primary border-border-primary">
  <h1 className="text-text-primary">Título</h1>
  <p className="text-text-secondary">Descripción</p>
</div>
```

### 5. **Ventajas del Sistema**

✅ **Un solo lugar** para cambiar colores
✅ **Consistencia** automática en toda la app
✅ **Fácil mantenimiento** y actualización
✅ **Soporte completo** para modo oscuro
✅ **Transiciones suaves** automáticas
✅ **TypeScript** con autocompletado

### 6. **Cambios Rápidos**

Para cambiar el color primario de azul a verde:

1. Edita `--primary-500` en `globals.css`
2. ¡Listo! Todos los botones y elementos primarios cambian automáticamente

Para cambiar el fondo de la app:

1. Edita `--surface-primary` en `globals.css`
2. ¡Listo! Todo el fondo de la aplicación cambia
