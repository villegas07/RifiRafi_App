import { api } from '../api';

/**
 * @typedef {Object} CreateTransactionParams
 * @property {number} amount - Amount paid in COP
 * @property {number} rfCoins - RF coins to add to user balance
 * @property {string} paymentReference - Unique payment reference from Wompi
 * @property {'APPROVED'|'DECLINED'|'PENDING'} status - Payment status
 * @property {string} [paymentMethod] - Payment method used
 * @property {Object} [paymentData] - Additional payment data from Wompi
 */

/**
 * @typedef {Object} CreateTransactionResponse
 * @property {boolean} success - Whether the transaction was recorded successfully.
 * @property {any} [data] - The transaction data if successful.
 * @property {string} [error] - The error message if creation fails.
 */

/**
 * Creates a new transaction record and updates user balance if payment is approved.
 * @param {CreateTransactionParams} params - Parameters for creating the transaction.
 * @returns {Promise<CreateTransactionResponse>} The result of the transaction creation.
 */
export async function createTransaction({
  amount,
  rfCoins,
  paymentReference,
  status,
  paymentMethod = 'wompi',
  paymentData = {}
}) {
  try {
    console.log('Creating transaction:', { amount, rfCoins, paymentReference, status });
    
    const response = await api.post('/transactions', {
      amount,
      rfCoins,
      paymentReference,
      status,
      paymentMethod,
      paymentData,
      timestamp: new Date().toISOString()
    });
    
    console.log('Transaction creation response:', {
      status: response.status,
      success: response.status === 201,
      data: response.data
    });

    if (response.status === 201) {
      return { success: true, data: response.data };
    } else {
      const errorMessage = response.data?.message || response.data?.error || `Error del servidor: ${response.status}`;
      console.error('Error del servidor:', errorMessage, response.data);
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.error('Error de red al crear transacción:', error);
    
    let errorMessage = 'Error de conexión. Verifica tu internet.';
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        errorMessage = 'No estás autorizado. Inicia sesión nuevamente.';
      } else if (status === 400) {
        errorMessage = data?.message || 'Datos de transacción inválidos.';
      } else if (status === 500) {
        errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
      } else {
        errorMessage = data?.message || `Error del servidor (${status})`;
      }
    }
    
    return { success: false, message: errorMessage };
  }
}