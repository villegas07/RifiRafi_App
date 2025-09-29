import { api } from '../api';

/**
 * @typedef {Object} GetUserParticipatedFormsResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Retrieves forms where the user has participated and are still active.
 * @param {string} userId - The ID of the user (use 'me' for current user).
 * @returns {Promise<GetUserParticipatedFormsResponse>} The result of the request.
 */
export async function getUserParticipatedForms(userId = 'me') {
  try {
    const response = await api.get(`/users/${userId}/participated-forms`);
    console.log('Get user participated forms:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Get user participated forms error:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || 'Error de conexión'
    };
  }
}