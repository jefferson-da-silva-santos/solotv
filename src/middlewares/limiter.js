import rateLimit from "express-rate-limit";
import { API_MESSAGES } from "../utils/consts.js";

/**
 * @module Middleware/RateLimiter
 * @description
 * Middleware that limits the number of incoming requests from a single IP address
 * within a specified time window.  
 * This helps prevent abuse and brute-force attacks. ⚔️
 *
 * @example
 * // Example usage in Express:
 * import express from "express";
 * import { rateLimiter } from "./middlewares/rateLimiter.js";
 *
 * const app = express();
 * app.use("/login", rateLimiter); // Apply limiter to login route
 */
export const rateLimiter = rateLimit({
  /**
   * @property {number} windowMs - Time window in milliseconds (15 minutes)
   */
  windowMs: 15 * 60 * 1000,

  /**
   * @property {number} max - Maximum number of requests per IP during the window
   */
  max: 55,

  /**
   * @property {object} message - Custom JSON response returned when limit is reached
   */
  message: {
    sucesso: false,
    erro: API_MESSAGES.ERROR_MANY_REQUIREMENTS,
  },

  /**
   * @property {boolean} standardHeaders - Whether to include `RateLimit-*` headers in responses
   */
  standardHeaders: true,

  /**
   * @property {boolean} legacyHeaders - Disable deprecated `X-RateLimit-*` headers
   */
  legacyHeaders: false,
});

/**
 * 🧩 How to extend:
 * - You can create different limiters for different endpoints, e.g.:
 *   const loginLimiter = rateLimit({ windowMs: 5*60*1000, max: 5 });
 * - Add a custom `keyGenerator` to identify users by token instead of IP.
 * - Integrate with Redis or another store for distributed environments.
 */
