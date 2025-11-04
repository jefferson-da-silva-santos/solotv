import logger from "../utils/logger.js";

/**
 * @middleware error
 * @description 
 * Global error-handling middleware for Express.  
 * Catches any error thrown during request processing and returns a
 * standardized JSON response with HTTP status code 500.
 * 
 * This middleware should be the **last** one added in the middleware chain.
 * 
 * @example
 * import express from "express";
 * import error from "../middlewares/error.js";
 * 
 * const app = express();
 * 
 * // Your routes and other middlewares here
 * 
 * // Must be placed at the very end
 * app.use(error);
 * 
 * export default app;
 * 
 * @param {Error} err - The error object thrown by previous middleware or controller.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function (required for Express error handlers).
 * @returns {void}
 */
const error = (err, req, res, next) => {
  logger.error(err.message);

  return res.status(500).json({
    sucesso: false,
    error: err.message
  });
};

export default error;
