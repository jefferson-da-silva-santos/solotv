import rateLimit from "express-rate-limit";
import { API_MESSAGES } from "../utils/consts.js";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 55,
  message: {
    sucesso: false,
    erro: API_MESSAGES.ERROR_MANY_REQUIREMENTS,
  },
  standardHeaders: true,
  legacyHeaders: false,
});