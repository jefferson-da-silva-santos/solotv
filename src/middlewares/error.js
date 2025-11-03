import logger from "../utils/logger.js";

const error = (err, req, res, next) => {
  logger.error(err.message);
  return res.status(500).json({
    sucesso: false,
    error: err.message
  });
}

export default error;