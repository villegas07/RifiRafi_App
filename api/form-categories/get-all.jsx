import { api } from '../api';

/**
 * @typedef {Object} GetAllFormCategoriesParams
 * @property {string} [order='ASC'] - The order of the results, either 'ASC' or 'DESC'.
 * @property {string} [orderBy='createdAt'] - The field to order by (default is 'createdAt').
 * @property {number} [page=1] - The page number for pagination (default is 1).
 * @property {number} [limit=10] - The number of items per page (default is 10).
 */

/**
 * @typedef {Object} GetAllFormCategoriesResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Retrieves all form categories with optional pagination and ordering.
 * @param {GetAllFormCategoriesParams} params - Parameters for retrieving form categories.
 * @returns {Promise<GetAllFormCategoriesResponse>} The result of the request.
 */
export async function getAllFormCategories({ order = 'ASC', orderBy = 'createdAt', page = 1, limit = 10 }) {
  try {
    const response = await api.get('/form-categories', { params: { order, orderBy, page, limit } });
    console.log('Get all form categories:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Get all form categories error:', error);
    return { success: false, error: error.message };
  }
}
