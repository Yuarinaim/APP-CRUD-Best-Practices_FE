# 🎯 APP CRUD - Best Practices Frontend

Una aplicación CRUD completa construida con Next.js 14, TypeScript, Redux Toolkit, y Tailwind CSS, siguiendo las mejores prácticas de desarrollo moderno.

## 🚀 Características Principales

- **🔐 Sistema de Autenticación Completo** - Login, registro, roles (admin/user)
- **👥 Gestión de Usuarios** - CRUD completo con validaciones
- **🎫 Sistema de Cupones** - Crear, editar, eliminar y canjear cupones
- **🎨 Interfaz Moderna** - Diseño responsive con modo oscuro/claro
- **📱 PWA Ready** - Optimizada para dispositivos móviles
- **🔒 Protección de Rutas** - Middleware para control de acceso
- **📊 Dashboard Administrativo** - Panel completo para administradores

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Redux Toolkit** - Gestión de estado global
- **RTK Query** - Manejo de APIs
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Tailwind CSS** - Framework CSS utilitario
- **Next.js Middleware** - Protección de rutas

### Backend (Requerido)

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para base de datos
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Git**
- **Backend funcionando** en `http://localhost:3001`

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/APP-CRUD-Best-Practices_FE.git
cd APP-CRUD-Best-Practices_FE
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# URL del backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api
```

### 4. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📱 Uso de la Aplicación

### 🔐 Autenticación

#### Registro de Usuario

1. Ve a `/register`
2. Completa el formulario con:
   - **Nombre completo**
   - **Email válido**
   - **Contraseña** (mínimo 8 caracteres)
   - **Rol** (user o admin)
3. Haz clic en "Registrarse"

#### Inicio de Sesión

1. Ve a `/login`
2. Ingresa tu email y contraseña
3. Haz clic en "Iniciar Sesión"
4. Serás redirigido según tu rol:
   - **Admin** → `/admin`
   - **User** → `/` (home)

### 👥 Gestión de Usuarios (Solo Admin)

#### Ver Lista de Usuarios

1. Inicia sesión como admin
2. Ve a `/admin/users`
3. Verás la tabla con todos los usuarios

#### Crear Nuevo Usuario

1. En `/admin/users`, haz clic en "Crear Usuario"
2. Completa el formulario
3. Haz clic en "Crear"

#### Editar Usuario

1. En la tabla de usuarios, haz clic en "Editar"
2. Modifica los campos necesarios
3. Haz clic en "Guardar"

#### Eliminar Usuario

1. En la tabla de usuarios, haz clic en "Eliminar"
2. Confirma la acción

### 🎫 Gestión de Cupones

#### Ver Cupones (Admin)

1. Ve a `/admin/coupons`
2. Verás la tabla con todos los cupones
3. Puedes filtrar por estado (activo, inactivo, canjeado)

#### Crear Cupón (Admin)

1. En `/admin/coupons`, haz clic en "Crear Cupón"
2. Completa el formulario:
   - **Código** (único, solo letras, números, guiones)
   - **Descripción** (mínimo 10 caracteres)
   - **Valor** (número positivo)
   - **Fecha de expiración** (fecha futura)
   - **Estado** (activo/inactivo)
3. Haz clic en "Crear"

#### Editar Cupón (Admin)

1. En la tabla de cupones, haz clic en "Editar"
2. Modifica los campos necesarios
3. Haz clic en "Guardar"

#### Canjear Cupón (Usuarios)

1. Ve a `/redeem`
2. Ingresa el código del cupón
3. Haz clic en "Canjear"
4. El cupón cambiará su estado a "canjeado"

#### Ver Mis Cupones (Usuarios)

1. Ve a `/coupons`
2. Verás tus cupones disponibles
3. Puedes filtrar por estado

## 🎨 Características de la Interfaz

### Modo Oscuro/Claro

- Toggle automático en la barra de navegación
- Persiste la preferencia del usuario

### Diseño Responsive

- Optimizado para móviles, tablets y desktop
- Navegación adaptativa

### Validaciones en Tiempo Real

- Formularios con validación instantánea
- Mensajes de error claros
- Prevención de envío con datos inválidos

## 🔒 Seguridad y Protección

### Middleware de Autenticación

- Protección automática de rutas
- Redirección según roles
- Validación de tokens JWT

### Validaciones

- **Frontend**: Zod schemas para validación
- **Backend**: Validación de datos y permisos
- **Sanitización**: Prevención de XSS

## 📊 Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js 14
│   ├── (auth)/                   # Rutas de autenticación
│   │   ├── login/
│   │   └── register/
│   ├── (home)/                   # Rutas para usuarios
│   │   ├── coupons/
│   │   ├── redeem/
│   │   └── page.tsx
│   ├── admin/                    # Rutas administrativas
│   │   ├── users/
│   │   └── coupons/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # Componentes reutilizables
│   ├── admin/                    # Componentes administrativos
│   ├── users/                    # Componentes de usuario
│   ├── ui/                       # Componentes base
│   └── providers/                # Context providers
├── hooks/                        # Custom hooks
├── lib/                          # Utilidades y configuraciones
│   └── validations.ts            # Esquemas Zod
├── redux/                        # Estado global
│   ├── services/                 # APIs con RTK Query
│   ├── features/                 # Slices de Redux
│   └── store.ts
└── types/                        # Definiciones TypeScript
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar en producción
npm run lint         # Verificar código con ESLint
npm run lint:fix     # Corregir errores de linting automáticamente
```

## 🚀 Despliegue

### Variables de Entorno para Producción

```bash
# Para AWS Amplify, Vercel, etc.
NEXT_PUBLIC_BACKEND_URL=https://tu-backend-url.com/api
```

### AWS Amplify

1. Conecta tu repositorio de GitHub
2. Configura la variable de entorno `NEXT_PUBLIC_BACKEND_URL`
3. El archivo `amplify.yml` ya está configurado

### Vercel

1. Conecta tu repositorio
2. Configura la variable de entorno
3. Despliega automáticamente

## 🐛 Solución de Problemas

### Error: "Cannot connect to backend"

- Verifica que el backend esté ejecutándose en `http://localhost:3001`
- Revisa la variable `NEXT_PUBLIC_BACKEND_URL` en `.env.local`

### Error: "Invalid token"

- Cierra sesión y vuelve a iniciar sesión
- Verifica que el backend esté generando tokens válidos

### Error: "Route not found"

- Verifica que estés autenticado
- Revisa que tengas los permisos correctos (admin vs user)

### Error de Build

```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📝 API Endpoints

La aplicación consume estos endpoints del backend:

### Autenticación

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrarse
- `POST /auth/logout` - Cerrar sesión

### Usuarios

- `GET /users` - Listar usuarios (admin)
- `POST /users` - Crear usuario (admin)
- `PUT /users/:id` - Actualizar usuario (admin)
- `DELETE /users/:id` - Eliminar usuario (admin)

### Cupones

- `GET /coupons` - Listar cupones
- `POST /coupons` - Crear cupón (admin)
- `PUT /coupons/:id` - Actualizar cupón (admin)
- `DELETE /coupons/:id` - Eliminar cupón (admin)
- `POST /coupons/redeem` - Canjear cupón

## 🎯 Información del Proyecto

**Este es un proyecto de prueba técnica que demuestra:**

- **Desarrollo Full-Stack** - Frontend y Backend completamente implementados
- **Despliegue en AWS** - Infraestructura en la nube con EC2, RDS y Amplify
- **Arquitectura Moderna** - Uso de las últimas tecnologías y mejores prácticas
- **Funcionalidad Completa** - Sistema CRUD con autenticación y roles
- **Código de Producción** - Listo para ser usado en un entorno real

**Tecnologías dominadas:** Next.js, TypeScript, Redux Toolkit, NestJS, PostgreSQL, AWS, Tailwind CSS, React Hook Form, Zod

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de [Solución de Problemas](#-solución-de-problemas)
2. Busca en los [Issues](../../issues) existentes
3. Crea un nuevo issue con detalles del problema

## ✅ Características Implementadas

- [x] **Sistema de autenticación completo** - Login, registro, roles, middleware de protección
- [x] **Componentes CRUD completos** - Gestión de usuarios y cupones
- [x] **Integración con API backend** - RTK Query para manejo de estado
- [x] **Validaciones robustas** - React Hook Form + Zod schemas
- [x] **Interfaz moderna** - Tailwind CSS con modo oscuro/claro
- [x] **Protección de rutas** - Middleware de Next.js
- [x] **Gestión de estado global** - Redux Toolkit
- [x] **Despliegue en AWS** - Backend en EC2, Frontend en Amplify, DB en RDS
- [x] **Arquitectura escalable** - Estructura modular y tipado TypeScript
- [x] **Experiencia de usuario optimizada** - Responsive design y validaciones en tiempo real

## 🏆 Logros Técnicos

- **✅ Aplicación Full-Stack Completa** - Frontend, Backend y Base de Datos desplegados en AWS
- **✅ Autenticación JWT** - Sistema seguro con roles y protección de rutas
- **✅ CRUD Completo** - Gestión de usuarios y cupones con validaciones
- **✅ Arquitectura Moderna** - Next.js 14, TypeScript, Redux Toolkit, Tailwind CSS
- **✅ Despliegue en Producción** - AWS EC2, RDS, Amplify configurados y funcionando
- **✅ Mejores Prácticas** - Código limpio, tipado estático, validaciones robustas

---

**🚀 Aplicación completamente funcional y desplegada en producción**
