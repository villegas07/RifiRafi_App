import { api } from '../api';

/**
 * @typedef {Object} DeleteFormCategoryResponse
 * @property {boolean} success - Whether the deletion was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if deletion fails.
 */

/**
 * Deletes a form category by its identifier.
 * @param {string} identifier - The identifier of the form category to delete.
 * @returns {Promise<DeleteFormCategoryResponse>} The result of the deletion.
 */
export async function deleteFormCategory(identifier) {
  try {
    const response = await api.delete(`/form-categories/${identifier}`);
    console.log('Delete form category:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Delete form category error:', error);
    return { success: false, error: error.message };
  }
}
