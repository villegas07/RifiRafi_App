import { api } from '../api';

/**
 * @typedef {Object} SendRecoverAccountEmailResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Sends a recover account email to the specified identifier.
 * @param {string} identifier - The identifier of the user (e.g., 'me', user ID, or email).
 * @returns {Promise<SendRecoverAccountEmailResponse>} The result of the request.
 */
export async function sendRecoverAccountEmail(identifier) {
  try {
    const response = await api.get(`/users/${identifier}/recover-account`);
    console.log('Send recover account:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Send recover account error:', error);
    return { success: false, error: error.message };
  }
}
