import { api } from '../api';

/**
 * @typedef {Object} GetFormCategoryResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Retrieves a form category by its identifier.
 * @param {string} identifier - The identifier of the form category to retrieve.
 * @returns {Promise<GetFormCategoryResponse>} The result of the request.
 */
export async function getFormCategory(identifier) {
  try {
    const response = await api.get(`/form-categories/${identifier}`);
    console.log('Get form category:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Get form category error:', error);
    return { success: false, error: error.message };
  }
}
