import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => {
    try {
      cb(newToken);
    } catch (e) {
      console.error('callback error', e);
    }
  });
  refreshSubscribers = [];
}

export const api = axios.create({
  baseURL: 'https://rifi-rafi.onrender.com/api',
  withCredentials: true,
  validateStatus: function (status) {
    return true; // Aceptar cualquier status, nunca rechazar la promesa
  },
  headers: {
    'x-lang': 'es',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (isRefreshing) {
          return new Promise((resolve, _reject) => {
            subscribeTokenRefresh((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(api(originalRequest));
            });
          });
        }

        isRefreshing = true;

        // Verificar sesión
        const verifyResponse = await api.get('/auth/verify-session');
        if (verifyResponse.data?.success) return Promise.reject(error);

        // Intentar refresh
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('refreshToken');
          return Promise.reject(error);
        }

        const refreshResponse = await api.post('/auth/refresh', { token: refreshToken });
        const refreshResult = { success: !!refreshResponse.data?.success, data: refreshResponse.data };
        if (refreshResult.success && refreshResponse.data?.accessToken) {
          await AsyncStorage.setItem('accessToken', refreshResponse.data.accessToken);
          await AsyncStorage.setItem('refreshToken', refreshResponse.data.refreshToken);
          onRefreshed(refreshResponse.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
          return api(originalRequest);
        } else {
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('refreshToken');
        }
      } catch (refreshError) {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        console.error('Error during token refresh:', refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
