// Configuración de la API

// URL base para el backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

// Configuración de endpoints base
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
};

// URLs completas de ejemplo para referencia:
// GET    http://localhost:3001/api/users/all
// POST   http://localhost:3001/api/users/create  
// PUT    http://localhost:3001/api/users/update/1
// DELETE http://localhost:3001/api/users/delete/1
// POST   http://localhost:3001/api/auth/login
// POST   http://localhost:3001/api/auth/logout
