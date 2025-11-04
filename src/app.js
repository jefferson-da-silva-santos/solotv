import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { BASE_URL } from './utils/constant.js';
import userRoutes from './routes/users.routes.js';
import error from './middlewares/error.js';

/**
 * Factory Function Pattern
 * 
 * Creates and configures an Express application instance.
 * This design allows dependency injection (e.g., repositories)
 * and makes the framework modular, testable, and extendable.
 *
 * @param {import('../repositories/AbstractRepository.js').default} userRepository - Repository instance for user operations.
 * @returns {import('express').Express} Configured Express app instance.
 */
export default function createApp(userRepository) {
  const app = express();

  // Core middlewares
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Default route
  app.get('/', (req, res) =>
    res.json({
      sucesso: true,
      message: 'API Solotv',
      version: '1.0.0',
      author: 'Jefferson Dev',
      url: 'https://github.com/jefferson-da-silva-santos/solotv'
    })
  );

  // User routes (default example)
  app.use(`${BASE_URL}/users`, userRoutes(userRepository));

  // Error handling middleware
  app.use(error);

  /**
   * Continue your code below this line
   * 
   * Add new routes, middlewares or modules here.
   * Example:
   * 
   * import productRoutes from './routes/products.routes.js';
   * app.use(`${BASE_URL}/products`, productRoutes(productRepository));
   */
  
  // Example placeholder:
  // app.use(`${BASE_URL}/products`, productRoutes(productRepository));

  return app;
}
