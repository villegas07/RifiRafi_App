import { api } from '../api';

/**
 * @typedef {Object} GetUserFormTokensResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Retrieves form tokens for a user by their identifier.
 * @param {string} identifier - The identifier of the user (e.g., 'me', user ID, or email).
 * @returns {Promise<GetUserFormTokensResponse>} The result of the request.
 */
export async function getUserFormTokens(identifier) {
  try {
    const response = await api.get(`/users/${identifier}/form-tokens`);
    console.log('Get user form tokens:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Get user form tokens error:', error);
    return { success: false, error: error.message };
  }
}
