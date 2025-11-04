import { ApiError } from "../utils/error.js";

/**
 * @class AbstractService
 * @classdesc 
 * Base class for all service layers in the framework.  
 * It defines the structure and expected methods for derived service classes.
 * 
 * Every specific service (e.g., UserService, AuthService, etc.) should extend this class
 * and implement its own logic for the provided abstract methods.
 * 
 * @example
 * // Example of extending this abstract class:
 * import AbstractService from "./AbstractService.js";
 * 
 * export default class UserService extends AbstractService {
 *   async execute(req) {
 *     // Your service logic here...
 *     return await this.repository.findAll();
 *   }
 * 
 *   validateInputs(value, schema) {
 *     // Validate request data using Joi or custom logic
 *   }
 * }
 */
export default class AbstractService {
  /**
   * Creates a new service instance.
   * @param {object} repository - The repository instance associated with this service.
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Execute the main business logic.
   * Must be implemented by derived classes.
   * 
   * @async
   * @param {object} req - The Express request object or equivalent.
   * @throws {ApiError} When the method is not implemented.
   */
  async execute(req) {
    throw new ApiError(500, "Method not implemented");
  }

  /**
   * Validate inputs using a given schema or logic.
   * 
   * @param {*} value - The value or payload to validate.
   * @param {object} schema - The validation schema (e.g., Joi schema).
   * @throws {ApiError} When the method is not implemented.
   */
  validateInputs(value, schema) {
    throw new ApiError(500, "Method not implemented");
  }

  /**
   * Format user data before returning or storing.
   * Useful for removing sensitive data (like passwords) or
   * adjusting field names.
   * 
   * @param {object} user - The user data object to format.
   * @throws {ApiError} When the method is not implemented.
   */
  formatUser(user) {
    throw new ApiError(500, "Method not implemented");
  }

  /**
   * Parse and process a file (e.g., CSV, JSON, or uploads).
   * 
   * @param {object} file - The file object received from the request.
   * @throws {ApiError} When the method is not implemented.
   */
  parseFile(file) {
    throw new ApiError(500, "Method not implemented");
  }
}

/**
 * 🧭 Developer Guide:
 * -----------------------------------------------------
 * To create your own service:
 * 1. Create a new class that extends AbstractService.
 * 2. Implement at least the `execute()` method.
 * 3. Use `validateInputs()` to handle validation.
 * 4. Optionally, override `formatUser()` and `parseFile()` if needed.
 * -----------------------------------------------------
 */
