import { api } from '../api';

/**
 * @typedef {Object} GetUserResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Retrieves a user by their identifier.
 * @param {string} identifier - The identifier of the user (e.g., 'me', user ID, or email).
 * @returns {Promise<GetUserResponse>} The result of the request.
 */
export async function getUser(identifier) {
  try {
    const response = await api.get(`/users/${identifier}`);
    console.log('Get user:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Get user error:', error);
    return { success: false, error: error.message };
  }
}
