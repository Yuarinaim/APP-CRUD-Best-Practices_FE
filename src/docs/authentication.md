# Sistema de Autenticación y Roles

## 🔐 **Arquitectura de Autenticación**

### **Componentes Principales:**

1. **AuthProvider** - Contexto global para manejo de estado de autenticación
2. **ProtectedRoute** - Componente para proteger rutas según roles
3. **Middleware** - Middleware de Next.js para redirecciones automáticas
4. **useAuth Hook** - Hook para acceder al estado de autenticación

## 🚀 **Flujo de Autenticación**

### **1. Login Process:**

```typescript
// En el componente de login
const { login: authLogin } = useAuth();

const result = await loginMutation({
  email: data.email,
  password: data.password,
}).unwrap();

// El backend debe devolver: { user: {...}, token: "..." }
authLogin(result.user, result.token);
```

### **2. Almacenamiento de Datos:**

- **Cookies utilizadas:**
  - `auth-token` - JWT token del usuario
  - `user-role` - Rol del usuario (admin/user)
  - `user-data` - Datos completos del usuario (JSON)

### **3. Redirecciones Automáticas:**

- **Admin** → `/admin` (acceso completo)
- **User** → `/home` (solo rutas de home)
- **No autenticado** → `/login`

## 🛡️ **Sistema de Roles**

### **Roles Disponibles:**

- **`admin`** - Acceso completo a toda la aplicación
- **`user`** - Acceso limitado solo a rutas `/home/*`

### **Protección de Rutas:**

#### **Layout Admin** (solo admins):

```tsx
<ProtectedRoute allowedRoles={["admin"]}>
  <AdminLayout />
</ProtectedRoute>
```

#### **Layout Home** (usuarios y admins):

```tsx
<ProtectedRoute allowedRoles={["user", "admin"]}>
  <HomeLayout />
</ProtectedRoute>
```

## 🔄 **Middleware de Next.js**

### **Rutas Configuradas:**

- **Públicas:** `/`, `/login`, `/register`, `/forgot-password`
- **Protegidas:** `/admin`, `/home`
- **Solo Admin:** `/admin/*`
- **Usuarios:** `/home/*`

### **Lógica del Middleware:**

1. **No autenticado** + ruta protegida → `redirect('/login')`
2. **Usuario** + ruta admin → `redirect('/home')`
3. **Usuario** + ruta fuera de home → `redirect('/home')`
4. **Admin** → acceso completo

## 📝 **Uso en Componentes**

### **Hook useAuth:**

```tsx
const { user, isAuthenticated, isLoading, login, logout } = useAuth();

// Verificar si es admin
const isAdmin = user?.role === "admin";

// Obtener datos del usuario
const userName = user?.name;
```

### **Componente ProtectedRoute:**

```tsx
// Proteger una página específica
<ProtectedRoute allowedRoles={["admin"]}>
  <AdminOnlyComponent />
</ProtectedRoute>

// Proteger con redirección personalizada
<ProtectedRoute
  allowedRoles={["user"]}
  redirectTo="/unauthorized"
>
  <UserOnlyComponent />
</ProtectedRoute>
```

## 🔧 **Configuración del Backend**

### **Respuesta esperada del login:**

```json
{
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "admin", // o "user"
    "isActive": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Headers requeridos:**

- El token se enviará automáticamente en las cookies
- El middleware verificará el token en cada request

## 🚨 **Consideraciones de Seguridad**

1. **Cookies seguras:** `sameSite: "strict"` para prevenir CSRF
2. **Expiración:** Cookies expiran en 7 días
3. **Validación:** El middleware verifica tokens en cada request
4. **Limpieza:** Logout limpia todas las cookies de autenticación

## 🧪 **Testing**

### **Casos de Prueba:**

1. Login exitoso con admin → redirige a `/admin`
2. Login exitoso con user → redirige a `/home`
3. Usuario intenta acceder a `/admin` → redirige a `/home`
4. No autenticado intenta acceder a rutas protegidas → redirige a `/login`
5. Logout → limpia cookies y redirige a `/login`
