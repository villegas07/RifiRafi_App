import { useState } from 'react';
import { createTransaction } from '../api/transactions/create';
import { updateUserBalance } from '../api/users/update-balance';
import { useUser } from './useUser';

/**
 * Hook personalizado para manejar transacciones de pago y actualizar balance
 */
export const useTransactions = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { refetch: refetchUser } = useUser();

  /**
   * Calcula cuántos RF coins corresponden al monto pagado
   * @param {number} amountInCOP - Monto pagado en COP
   * @returns {number} - Cantidad de RF coins
   */
  const calculateRFCoins = (amountInCOP) => {
    // Conversión: 1 RF = 200 COP, entonces RF = COP / 200
    return Math.floor(amountInCOP / 200);
  };

  /**
   * Procesa una transacción exitosa de pago
   * @param {Object} paymentData - Datos del pago de Wompi
   * @param {number} paymentData.amount - Monto pagado en COP
   * @param {string} paymentData.reference - Referencia del pago
   * @param {string} paymentData.status - Estado del pago
   * @param {Object} [paymentData.additionalData] - Datos adicionales del pago
   * @returns {Promise<{success: boolean, rfCoins?: number, message?: string}>}
   */
  const processPayment = async (paymentData) => {
    try {
      setIsProcessing(true);
      setError(null);

      const { amount, reference, status = 'APPROVED', additionalData = {} } = paymentData;
      
      // Calcular RF coins
      const rfCoins = calculateRFCoins(amount);
      
      console.log(`Processing payment: ${amount} COP = ${rfCoins} RF`);

      // Solo procesar si el pago fue aprobado
      if (status !== 'APPROVED') {
        console.log('Payment not approved, skipping balance update');
        return { success: false, message: 'Pago no aprobado' };
      }

      // 1. Crear registro de transacción
      const transactionResult = await createTransaction({
        amount,
        rfCoins,
        paymentReference: reference,
        status,
        paymentMethod: 'wompi',
        paymentData: additionalData
      });

      if (!transactionResult.success) {
        console.error('Failed to create transaction record:', transactionResult.message);
        setError(transactionResult.message);
        return { success: false, message: transactionResult.message };
      }

      // 2. Actualizar balance del usuario
      const balanceResult = await updateUserBalance({
        rfCoins,
        operation: 'add',
        reason: `Payment transaction ${reference}`
      });

      if (!balanceResult.success) {
        console.error('Failed to update user balance:', balanceResult.message);
        setError(balanceResult.message);
        return { success: false, message: balanceResult.message };
      }

      // 3. Actualizar datos del usuario en el contexto
      await refetchUser();

      console.log(`Payment processed successfully: +${rfCoins} RF added to balance`);
      
      return { 
        success: true, 
        rfCoins,
        message: `¡Pago exitoso! Se agregaron ${rfCoins} RF a tu monedero.`
      };

    } catch (error) {
      console.error('Error processing payment:', error);
      const errorMessage = error.message || 'Error inesperado al procesar el pago';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Procesa un pago pendiente
   * @param {Object} paymentData - Datos del pago
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  const processPendingPayment = async (paymentData) => {
    try {
      setIsProcessing(true);
      setError(null);

      const { amount, reference, additionalData = {} } = paymentData;
      const rfCoins = calculateRFCoins(amount);

      // Crear registro de transacción pendiente (sin actualizar balance)
      const transactionResult = await createTransaction({
        amount,
        rfCoins,
        paymentReference: reference,
        status: 'PENDING',
        paymentMethod: 'wompi',
        paymentData: additionalData
      });

      if (!transactionResult.success) {
        setError(transactionResult.message);
        return { success: false, message: transactionResult.message };
      }

      return { 
        success: true, 
        message: 'Pago registrado como pendiente. Te notificaremos cuando se complete.'
      };

    } catch (error) {
      console.error('Error processing pending payment:', error);
      const errorMessage = error.message || 'Error al registrar pago pendiente';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    processPayment,
    processPendingPayment,
    calculateRFCoins
  };
};