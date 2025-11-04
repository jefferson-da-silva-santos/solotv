/**
 * Custom error class for API responses.
 * 
 * Extends the native JavaScript Error class to include
 * an HTTP status code along with the error message.
 *
 * @class ApiError
 * @extends Error
 */
export class ApiError extends Error {
  /**
   * Creates a new ApiError instance.
   *
   * @param {number} [status=500] - HTTP status code representing the error type.
   * @param {string} [message='Internal Server Error'] - Description of the error.
   */
  constructor(status = 500, message = 'Internal Server Error') {
    super(message);
    this.status = status;
  }
}

/**
 * Continue your code below this line.
 * 
 * Add custom API error types or helper methods as needed.
 * Example:
 * 
 * export class ValidationError extends ApiError {
 *   constructor(message = 'Validation failed') {
 *     super(400, message);
 *   }
 * }
 */
