/**
 * Base URL for all API routes.
 * 
 * @constant
 * @type {string}
 */
export const BASE_URL = '/api/v1';

/**
 * Centralized collection of reusable API messages.
 * 
 * Used for maintaining consistent response texts
 * across the entire application.
 *
 * @constant
 * @type {Object.<string, string>}
 */
export const API_MESSAGES = {
  // Token-related messages
  TOKEN_NOT_PROVIDED: 'Token was not provided',

  // User-related messages
  USER_NOT_AUTHENTICATED: 'User is not authenticated',

  // Error-related messages
  ERROR_MANY_REQUIREMENTS: 'Too many requests, please try again later',
};

/**
 * Continue your code below this line.
 * 
 * Add new constants or grouped configuration objects as needed.
 * Example:
 * 
 * export const APP_INFO = {
 *   NAME: 'Solotv Framework',
 *   VERSION: '1.0.0',
 * };
 */
