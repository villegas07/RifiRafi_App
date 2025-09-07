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
export async function generateFormToken(id, { userId, expirationDate } = {}) {
  try {
    const payload = {};
    if (userId) payload.userId = userId;
    if (expirationDate) payload.expirationDate = expirationDate;
    
    console.log('Generando token para formulario:', id, payload);
    const response = await api.post(`/forms/${id}/tokens`, payload);
    console.log('Generate form token - Status:', response.status, 'Data:', response.data);
    
    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    } else {
      return { 
        success: false, 
        error: response.data?.message || `Error ${response.status}`,
        status: response.status
      };
    }
  } catch (error) {
    console.error('Generate form token error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || 'Error generando token'
    };
  }
}
