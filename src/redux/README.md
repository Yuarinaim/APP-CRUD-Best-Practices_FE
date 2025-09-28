# Redux Setup - Usuarios y Cupones

Este directorio contiene la configuración completa de Redux para la gestión de usuarios y cupones en la aplicación.

## Estructura

```
redux/
├── features/           # Slices de Redux Toolkit
│   ├── userSlice.ts   # Estado y acciones de usuarios
│   ├── couponSlice.ts # Estado y acciones de cupones
│   └── index.ts       # Exportaciones de features
├── services/          # APIs con RTK Query
│   ├── baseApi.ts     # Configuración base de la API
│   ├── userApi.ts     # Endpoints de usuarios
│   ├── couponApi.ts   # Endpoints de cupones
│   └── index.ts       # Exportaciones de servicios
├── hooks.ts           # Hooks tipados de Redux
├── providers.tsx      # Provider de Redux
├── store.ts           # Configuración del store
└── README.md          # Este archivo
```

## Configuración

### 1. Store Principal

El store está configurado en `store.ts` con:

- **userReducer**: Manejo del estado de autenticación y usuario actual
- **couponReducer**: Manejo del estado de cupones (filtros, modal, selección)
- **baseApi**: Middleware para RTK Query

### 2. APIs (RTK Query)

#### UserApi - Endpoints de Usuarios

```typescript
// Usuarios simplificados (nuevos)
useGetUsersSimpleQuery(); // Obtener todos los usuarios
useCreateUserSimpleMutation(); // Crear usuario
useUpdateUserSimpleMutation(); // Actualizar usuario
useDeleteUserSimpleMutation(); // Eliminar usuario

// Usuarios heredados (compatibilidad)
useGetUsersQuery(); // Obtener usuarios (formato anterior)
useLoginMutation(); // Iniciar sesión
useLogoutMutation(); // Cerrar sesión
// ... más endpoints heredados
```

#### CouponApi - Endpoints de Cupones

```typescript
useGetCouponsQuery(); // Obtener cupones con filtros
useGetCouponByIdQuery(); // Obtener cupón por ID
useGetCouponsByStatusQuery(); // Obtener cupones por estado
useGetCouponsByDateRangeQuery(); // Obtener cupones por rango de fechas
useCreateCouponMutation(); // Crear cupón
useUpdateCouponMutation(); // Actualizar cupón
useDeleteCouponMutation(); // Eliminar cupón (físico)
useDeactivateCouponMutation(); // Desactivar cupón (lógico)
useActivateCouponMutation(); // Activar cupón
```

### 3. Slices (Estado Local)

#### UserSlice

- **isAuth**: Estado de autenticación
- **user**: Datos del usuario actual

#### CouponSlice

- **selectedCoupon**: Cupón seleccionado
- **filters**: Filtros aplicados
- **isModalOpen**: Estado del modal
- **modalMode**: Modo del modal (create/edit/view)

## Tipos de Datos

### Usuario (TUser)

```typescript
interface TUser {
  id?: number;
  nombre: string;
  email: string;
  contrasenia?: string;
  rol: string;
}
```

### Cupón (TCoupon)

```typescript
interface TCoupon {
  id?: number;
  codigo: string;
  descripcion: string;
  valor: number;
  fechaExpiracion: string;
  estado: "activo" | "inactivo";
  fechaCreacion?: string;
  fechaActualizacion?: string;
}
```

### Filtros de Cupones (TCouponFilters)

```typescript
interface TCouponFilters {
  estado?: "activo" | "inactivo";
  fechaDesde?: string;
  fechaHasta?: string;
  valorMinimo?: number;
  valorMaximo?: number;
}
```

## Uso Básico

### 1. Configurar el Provider

```tsx
// En tu app principal
import { ReduxProvider } from "@/redux/providers";

function App() {
  return (
    <ReduxProvider>
      <YourApp />
    </ReduxProvider>
  );
}
```

### 2. Usar en Componentes

```tsx
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetUsersSimpleQuery, useCreateUserSimpleMutation } from '@/redux/services/userApi';
import { useGetCouponsQuery, useCreateCouponMutation } from '@/redux/services/couponApi';
import { selectCoupon, setFilters } from '@/redux/features/couponSlice';

function MyComponent() {
  const dispatch = useAppDispatch();

  // Queries
  const { data: users, isLoading } = useGetUsersSimpleQuery(null);
  const { data: coupons } = useGetCouponsQuery({ estado: 'activo' });

  // Mutations
  const [createUser] = useCreateUserSimpleMutation();
  const [createCoupon] = useCreateCouponMutation();

  // Estado del slice
  const couponState = useAppSelector(state => state.couponReducer);

  // Acciones
  const handleSelectCoupon = (coupon) => {
    dispatch(selectCoupon(coupon));
  };

  const handleSetFilters = (filters) => {
    dispatch(setFilters(filters));
  };

  return (
    // Tu componente
  );
}
```

## Endpoints de la API

Los endpoints están configurados en `config/endpoints.ts`:

### Usuarios

- `GET /users` - Obtener todos los usuarios
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión

### Cupones

- `GET /coupons` - Obtener cupones (con filtros query params)
- `GET /coupons/:id` - Obtener cupón por ID
- `POST /coupons` - Crear cupón
- `PUT /coupons/:id` - Actualizar cupón
- `DELETE /coupons/:id` - Eliminar cupón
- `GET /coupons/status/:status` - Obtener por estado
- `GET /coupons/date-range` - Obtener por rango de fechas

## Funcionalidades de Cupones

### Operaciones CRUD

1. **Crear**: Formulario con código, descripción, valor, fecha de expiración y estado
2. **Leer**: Lista con filtros por estado, fechas y valor
3. **Actualizar**: Modificar cualquier campo del cupón
4. **Eliminar**: Eliminación física o desactivación lógica

### Filtros Disponibles

- **Estado**: activo/inactivo
- **Rango de fechas**: desde/hasta
- **Rango de valor**: mínimo/máximo

### Estados de Cupón

- **Activo**: Cupón disponible para uso
- **Inactivo**: Cupón deshabilitado (eliminación lógica)

## Ejemplo Completo

Revisa el archivo `src/examples/redux-usage.tsx` para un ejemplo completo de implementación con formularios, listas y manejo de estado.

## Notas Importantes

1. **Compatibilidad**: Se mantienen las interfaces y endpoints anteriores para usuarios
2. **Caché**: RTK Query maneja automáticamente el caché y las invalidaciones
3. **Tipos**: Todos los endpoints están completamente tipados con TypeScript
4. **Errores**: Los errores se manejan automáticamente y están disponibles en los hooks
5. **Loading**: Los estados de carga están disponibles en todos los hooks de query y mutation
