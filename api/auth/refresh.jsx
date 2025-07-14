import { api } from '../api';
import { AsyncStorage } from '@react-native-async-storage/async-storage'; // 1. Importar AsyncStorage

/**
 * @typedef {Object} RefreshResponse
 * @property {boolean} success - Whether the refresh was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the refresh fails.
 */

/**
 * Refreshes the authentication tokens using the stored refresh token.
 * @returns {Promise<RefreshResponse>} The result of the refresh attempt.
 */
export async function refresh() {
  try {
    // 2. Usar AsyncStorage para obtener el token
    const token = await AsyncStorage.getItem('refreshToken');
    if (!token) return { success: false, error: 'No refresh token found' };

    const response = await api.post('/auth/refresh', { token });

    if (response.data.accessToken && response.data.refreshToken) {
      // 3. Guardar tokens con AsyncStorage
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }

    console.log('Refresh:', !!response.data.success, response.status, response.data);
    return { success: !!response.data.success, data: response.data };
  } catch (error) {
    console.error('Refresh error:', error);
    return { success: false, error: error.message || 'An error occurred' };
  }
}