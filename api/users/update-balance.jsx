import { api } from '../api';

/**
 * @typedef {Object} UpdateBalanceParams
 * @property {number} rfCoins - RF coins to add to user balance
 * @property {'add'|'subtract'} operation - Operation to perform on balance
 * @property {string} [reason] - Reason for balance update
 */

/**
 * @typedef {Object} UpdateBalanceResponse
 * @property {boolean} success - Whether the balance update was successful.
 * @property {any} [data] - The updated user data if successful.
 * @property {string} [error] - The error message if update fails.
 */

/**
 * Updates the user's RF coin balance.
 * @param {UpdateBalanceParams} params - Parameters for updating the balance.
 * @returns {Promise<UpdateBalanceResponse>} The result of the balance update.
 */
export async function updateUserBalance({
  rfCoins,
  operation = 'add',
  reason = 'Payment transaction'
}) {
  try {
    console.log('Updating user balance:', { rfCoins, operation, reason });
    
    const response = await api.patch('/users/me/balance', {
      rfCoins,
      operation,
      reason,
      timestamp: new Date().toISOString()
    });
    
    console.log('Balance update response:', {
      status: response.status,
      success: response.status === 200,
      data: response.data
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      const errorMessage = response.data?.message || response.data?.error || `Error del servidor: ${response.status}`;
      console.error('Error del servidor:', errorMessage, response.data);
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.error('Error de red al actualizar balance:', error);
    
    let errorMessage = 'Error de conexión. Verifica tu internet.';
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        errorMessage = 'No estás autorizado. Inicia sesión nuevamente.';
      } else if (status === 400) {
        errorMessage = data?.message || 'Datos de balance inválidos.';
      } else if (status === 404) {
        errorMessage = 'Usuario no encontrado.';
      } else if (status === 500) {
        errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
      } else {
        errorMessage = data?.message || `Error del servidor (${status})`;
      }
    }
    
    return { success: false, message: errorMessage };
  }
}