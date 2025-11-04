import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import createApp from './src/app.js';
import AbstractRepository from './src/repositories/AbstractRepository.js';
import User from './src/models/User.js';

dotenv.config();

/**
 * Application entry point.
 * Loads environment variables, initializes the app,
 * and starts the HTTP server.
 */

const PORT = process.env.PORT || 3000;

/**
 * Base repository instance for the User model.
 * @type {AbstractRepository}
 */
const userRepository = new AbstractRepository(User);

/**
 * Express application instance.
 * @type {import('express').Express}
 */
const app = createApp(userRepository);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected!');
  } catch (err) {
    console.error('❌ Error connecting to the database:', err.message);
  }

  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
