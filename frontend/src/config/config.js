/**
 * @fileoverview Configuración global de la aplicación
 * @description Define las constantes y configuraciones utilizadas en toda la aplicación
 */

const config = {
  // URL base del backend
  backendUrl: "http://localhost:5000",

  // Configuración de las rutas API
  api: {
    clients: "/api/clientes",
    products: "/api/productos",
    sales: "/api/ventas",
  },

  // Configuración de headers comunes
  headers: {
    "Content-Type": "application/json",
  },

  // Timeouts y reintentos
  axios: {
    timeout: 5000,
    retryAttempts: 3,
  },
};

export default config;
