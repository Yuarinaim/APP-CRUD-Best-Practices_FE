# App CRUD - Best Practices Frontend

Una aplicación CRUD moderna construida con Next.js 14, TypeScript y Tailwind CSS, siguiendo las mejores prácticas de desarrollo.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **ESLint** para linting
- **Estructura modular** y escalable

## 📦 Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🛠️ Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## 📁 Estructura del Proyecto

```
src/
├── app/                 # App Router de Next.js 14
│   ├── globals.css     # Estilos globales con Tailwind
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página de inicio
├── components/         # Componentes reutilizables
├── lib/               # Utilidades y configuraciones
└── types/             # Definiciones de tipos TypeScript
```

## 🎨 Tecnologías Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Superset de JavaScript
- **Tailwind CSS** - Framework CSS utilitario
- **ESLint** - Linter para JavaScript/TypeScript

## 📝 Próximos Pasos

- [ ] Implementar sistema de autenticación
- [ ] Crear componentes CRUD
- [ ] Integrar con API backend
- [ ] Añadir tests unitarios
- [ ] Configurar CI/CD

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
