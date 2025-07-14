import { api } from '../api';

/**
 * @typedef {Object} UpdateFormCategoryParams
 * @property {string} name - The new name for the form category.
 */

/**
 * @typedef {Object} UpdateFormCategoryResponse
 * @property {boolean} success - Whether the update was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the update fails.
 */

/**
 * Updates a form category with the specified identifier.
 * @param {string} identifier - The identifier of the form category to update.
 * @param {UpdateFormCategoryParams} params - Parameters for updating the form category.
 * @returns {Promise<UpdateFormCategoryResponse>} The result of the form category update.
 */
export async function updateFormCategory(identifier, { name }) {
  try {
    const response = await api.put(`/form-categories/${identifier}`, { name });
    console.log('Update form category:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Update form category error:', error);
    return { success: false, error: error.message };
  }
}
