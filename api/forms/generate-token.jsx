import { api } from '../api';

/**
 * @typedef {Object} GenerateFormTokenParams
 * @property {string} [userId] - The ID of the user for whom the token is being generated.
 * @property {string} [expirationDate] - The expiration date for the token.
 */

/**
 * @typedef {Object} GenerateFormTokenResponse
 * @property {boolean} success - Whether the token generation was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if token generation fails.
 */

/**
 * Generates a token for a form.
 * @param {string} id - The ID of the form for which the token is being generated.
 * @param {GenerateFormTokenParams} params - Parameters for generating the token.
 * @returns {Promise<GenerateFormTokenResponse>} The result of the token generation.
 */
export async function generateFormToken(id, { userId, expirationDate }) {
  try {
    const response = await api.post(`/forms/${id}/tokens`, { userId, expirationDate });
    console.log('Generate form token:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Generate form token error:', error);
    return { success: false, error: error.message };
  }
}
