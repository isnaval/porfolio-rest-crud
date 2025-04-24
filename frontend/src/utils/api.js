/**
 * @fileoverview Configuración centralizada de Axios para las peticiones API
 * @description Configura una instancia de Axios con los parámetros base para todas las peticiones
 */

import axios from "axios";
import config from "../config/config";

// Crear instancia de axios con la configuración base
const api = axios.create({
  baseURL: config.backendUrl,
  timeout: config.axios.timeout,
  withCredentials: true,
  headers: config.headers,
});

// Interceptor para las peticiones
api.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar lógica antes de que se envíe la petición
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para las respuestas
api.interceptors.response.use(
  (response) => {
    // Aquí puedes procesar las respuestas exitosas
    return response;
  },
  (error) => {
    if (error.response) {
      // Manejar diferentes códigos de error
      switch (error.response.status) {
        case 400:
          console.error("Error de solicitud:", error.response.data);
          break;
        case 401:
          console.error("No autorizado");
          break;
        case 404:
          console.error("Recurso no encontrado");
          break;
        case 500:
          console.error("Error del servidor");
          break;
        default:
          console.error("Error en la petición:", error.response.data);
      }
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor");
    } else {
      console.error("Error al configurar la petición:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
