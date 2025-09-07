import { api } from '../api';

/**
 * @typedef {'ASC'|'DESC'} SortOrder
 */

/**
 * @typedef {'id'|'username'|'displayName'|'createdAt'|'updatedAt'} UserOrderBy
 */

/**
 * @typedef {Object} GetAllUsersParams
 * @property {SortOrder} [order='ASC'] - The order of the results, either 'ASC' or 'DESC'.
 * @property {UserOrderBy} [orderBy='createdAt'] - The field to order by (default is 'createdAt').
 * @property {number} [page=1] - The page number for pagination (default is 1).
 * @property {number} [limit=10] - The number of items per page (default is 10).
 */

/**
 * @typedef {Object} GetAllUsersResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Retrieves all users with optional pagination and ordering.
 * @param {GetAllUsersParams} params - Parameters for retrieving users.
 * @returns {Promise<GetAllUsersResponse>} The result of the request.
 */
export async function getAllUsers({ order = 'ASC', orderBy = 'createdAt', page = 1, limit = 10 }) {
  try {
    const response = await api.get('/users', { params: { order, orderBy, page, limit } });
    console.log('Get all users:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Get all users error:', error);
    return { success: false, error: error.message };
  }
}
