import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import { API_MESSAGES } from '../utils/consts.js';

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        sucesso: false,
        error: API_MESSAGES.TOKEN_NOT_PROVIDED
      });
    }

    const token = authHeader.split(' ')[1];

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