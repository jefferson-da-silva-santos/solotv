import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { API_MESSAGES } from "../utils/constant.js";

/**
 * @middleware auth
 * @description 
 * Middleware that validates the presence and integrity of a JWT token 
 * in the `Authorization` header of incoming HTTP requests.
 * 
 * If the token is valid, the decoded payload is attached to `req.user`
 * and the request continues to the next middleware or controller.
 * 
 * If invalid or missing, a 401 (Unauthorized) response is returned.
 * 
 * @example
 * import express from "express";
 * import auth from "../middlewares/auth.js";
 * 
 * const router = express.Router();
 * 
 * // Protect a route using the auth middleware
 * router.get("/dashboard", auth, (req, res) => {
 *   res.json({ message: `Welcome, ${req.user.username}` });
 * });
 * 
 * export default router;
 * 
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        sucesso: false,
        error: API_MESSAGES.TOKEN_NOT_PROVIDED
      });
    }

    // Extract token from header: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify JWT and attach payload to request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    logger.error(`${API_MESSAGES.USER_NOT_AUTHENTICATED} - ${error.message}`);
    return res.status(401).json({
      sucesso: false,
      error: API_MESSAGES.USER_NOT_AUTHENTICATED
    });
  }
};

export default auth;

/**
 * 🧭 Developer Guide:
 * -----------------------------------------------------
 * To use this middleware:
 * 1. Ensure your `.env` contains:
 *    JWT_SECRET=your_secret_key
 * 
 * 2. Protect routes like this:
 *    router.get("/private", auth, controller.handle);
 * 
 * 3. The middleware expects the header:
 *    Authorization: Bearer <your_token>
 * 
 * 4. On success:
 *    - The decoded token payload is available as `req.user`.
 * 
 * 5. On failure:
 *    - A 401 response is returned with an error message.
 * 
 * ⚙️ Tip: Combine this middleware with your logging system (`logger.js`)
 * to monitor unauthorized access attempts.
 * -----------------------------------------------------
 */
