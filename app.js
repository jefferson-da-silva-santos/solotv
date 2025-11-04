import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import error from './src/middlewares/error.js';
import { BASE_URL } from './src/utils/constant.js';

dotenv.config();


// Models import
import User from './src/models/User.js';

// Routes import
import userRoutes from './src/routes/users.routes.js';

// Base repository
import AbstractRepository from './src/repositories/AbstractRepository.js';

// Services import
import sequelize, { createTables } from './src/config/database.js';

const PORT = process.env.PORT || 3000;

// Repositories
const userRepository = new AbstractRepository(User);
// const gatewayRepository = new AbstractRepository(Gateway);

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({
  sucesso: true,
  message: 'API Solotv',
  version: '1.0.0',
  author: 'Jefferson Dev',
  url: 'https://github.com/jefferson-da-silva-santos/solotv'
}));

app.use(`${BASE_URL}/users`, userRoutes(userRepository));

app.use(error);

server.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    // await createTables();
    console.log('✅ Database connected!');
  } catch (err) {
    console.error('❌ Error connecting to the database:', err.message);
  }

  console.log(`🚀 Server running on http://localhost:${PORT}`);
});