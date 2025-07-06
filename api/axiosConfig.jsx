import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { axiosCookieJarSupport } from 'axios-cookiejar-support';

// Habilitar soporte para cookies
axiosCookieJarSupport(axios);

// Crear jar de cookies (persiste entre requests)
const cookieJar = new CookieJar();

// Cliente Axios configurado
export const api = axios.create({
  baseURL: 'https://rifi-rafi.onrender.com', // URL base de tu API
  withCredentials: true, // Enviar cookies automáticamente
  jar: cookieJar, // Usar el jar de cookies
  headers: {
    'x-lang': 'es', // Idioma por defecto
    'Content-Type': 'application/json',
  }
});

// Interceptor para manejar refresh de tokens
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si es 401 (no autorizado) y no se ha intentado refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar refresh de token
        const refreshResponse = await api.post('/api/auth/refresh');
        
        // Si el refresh fue exitoso, reintentar la request original
        return api(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, redirigir a login
        console.log('Sesión expirada, redirigiendo a login...');
        // Aquí podrías usar navigation para redirigir (necesitas contexto)
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);