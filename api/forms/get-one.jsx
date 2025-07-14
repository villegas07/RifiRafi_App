import { api } from '../api';

/**
 * @typedef {Object} GetFormResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Retrieves a form by its ID.
 * @param {string} id - The ID of the form to retrieve.
 * @returns {Promise<GetFormResponse>} The result of the request.
 */
export async function getForm(id) {
  try {
    const response = await api.get(`/forms/${id}`);
    console.log('Get form:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Get form error:', error);
    return { success: false, error: error.message };
  }
}
