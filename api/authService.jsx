import { api } from './axiosConfig';

// Login
export const login = async (identifier, password) => {
  try {
    const response = await api.post('/api/auth/login', {
      identifier,
      password
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Error al iniciar sesión' 
    };
  }
};

// Logout
export const logout = async () => {
  try {
    await api.post('/api/auth/logout');
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Error al cerrar sesión' 
    };
  }
};

// Registro
export const register = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Error al registrar' 
    };
  }
};