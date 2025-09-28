# Configuración de API

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api
```

## Configuración Actual

- **Base URL**: `http://localhost:3001/api`
- **Fallback**: Si no se define `NEXT_PUBLIC_BACKEND_URL`, se usa `http://localhost:3001/api`

## Endpoints Configurados

### Usuarios
- `GET /users/all` - Obtener todos los usuarios
- `POST /users/create` - Crear usuario
- `PUT /users/update/:id` - Actualizar usuario
- `DELETE /users/delete/:id` - Eliminar usuario
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión

### Cupones
- `GET /coupons` - Obtener todos los cupones
- `POST /coupons/create` - Crear cupón
- `PUT /coupons/update/:id` - Actualizar cupón
- `DELETE /coupons/delete/:id` - Eliminar cupón
- `GET /coupons/status/:status` - Filtrar por estado
- `GET /coupons/date-range` - Filtrar por rango de fechas

## URLs Completas de Ejemplo

```
http://localhost:3001/api/users/create
http://localhost:3001/api/coupons/create
http://localhost:3001/api/auth/login
```
