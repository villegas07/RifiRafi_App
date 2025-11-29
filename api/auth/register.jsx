import { api } from '../api';

/**
 * @typedef {Object} RegisterParams
 * @property {string} username - The username for the new account.
 * @property {string} displayName - The display name for the new account.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} country - The country of the user.
 * @property {string} dniType - The type of DNI (Documento Nacional de Identidad).
 * @property {string} dniNumber - The DNI number of the user.
 * @property {string} phoneNumber - The phone number of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password for the new account.
 */

/**
 * @typedef {Object} RegisterResponse
 * @property {boolean} success - Whether the registration was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the registration fails.
 */

/**
 * Registers a new user with the provided details.
 * @param {RegisterParams} params - The registration parameters.
 * @returns {Promise<RegisterResponse>} The result of the registration attempt.
 */
export async function register({ username, displayName, firstName, lastName, country, dniType, dniNumber, phoneNumber, email, password }) {
  try {
    const response = await api.post('/auth/register', {
      username,
      displayName,
      firstName,
      lastName,
      country,
      dniType,
      dniNumber,
      phoneNumber,
      email,
      password,
    });

    console.log('Register:', !!response.data.success, response.status, response.data);
    return { success: !!response.data.success, data: response.data };
  } catch (error) {
    console.error('Register error:', error);
    
    // Si hay una respuesta del servidor con error específico
    if (error.response && error.response.data) {
      const serverError = error.response.data;
      console.log('Register:', false, error.response.status, serverError);
      
      return { 
        success: false, 
        error: serverError.message || serverError.error || 'Error en el servidor',
        data: { 
          statusCode: error.response.status,
          ...serverError 
        }
      };
    }
    
    return { success: false, error: error.message || 'An error occurred' };
  }
}
