import { api } from '../api';

/**
 * @typedef {Object} RecoverAccountResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Recovers a user account using the provided token.
 * @param {string} token - The token used for account recovery.
 * @returns {Promise<RecoverAccountResponse>} The result of the account recovery.
 */
export async function recoverAccount(token) {
  try {
    const response = await api.post('/users/recover-account', { token });
    console.log('Recover account:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Recover account error:', error);
    return { success: false, error: error.message || 'An error occurred' };
  }
}
