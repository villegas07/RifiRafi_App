import { api } from '../api';

/**
 * @typedef {Object} CreateFormCategoryParams
 * @property {string} name - The name of the form category to create.
 */

/**
 * @typedef {Object} CreateFormCategoryResponse
 * @property {boolean} success - Whether the creation was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if creation fails.
 */

/**
 * Creates a new form category with the specified name.
 * @param {CreateFormCategoryParams} params - Parameters for creating the form category.
 * @returns {Promise<CreateFormCategoryResponse>} The result of the form category creation.
 */
export async function createFormCategory({ name }) {
  try {
    const response = await api.post(`/form-categories`, { name });
    console.log('Create form category:', response.status === 201, response.status, response.data);
    return { success: response.status === 201, data: response.data };
  } catch (error) {
    console.error('Create form category error:', error);
    return { success: false, error: error.message };
  }
}
