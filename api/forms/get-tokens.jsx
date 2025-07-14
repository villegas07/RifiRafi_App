import { api } from '../api';

/**
 * @typedef {Object} GetAllFormTokensParams
 * @property {string} [order='ASC'] - The order of the tokens (ASC or DESC).
 * @property {string} [orderBy='createdAt'] - The field to order by (default is 'createdAt').
 * @property {number} [page=1] - The page number for pagination (default is 1).
 * @property {number} [limit=10] - The number of tokens per page (default is 10).
 */

/**
 * @typedef {Object} GetAllFormTokensResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Retrieves all tokens for a form with optional pagination and ordering.
 * @param {string} id - The ID of the form for which to retrieve tokens.
 * @param {GetAllFormTokensParams} params - Parameters for retrieving tokens.
 * @returns {Promise<GetAllFormTokensResponse>} The result of the request.
 */
export async function getAllFormTokens(id, { order = 'ASC', orderBy = 'createdAt', page = 1, limit = 10 }) {
  try {
    const response = await api.get(`/forms/${id}/tokens`, { params: { order, orderBy, page, limit } });
    console.log('Get all form tokens:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Get all form tokens error:', error);
    return { success: false, error: error.message };
  }
}
