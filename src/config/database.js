import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';
import pg from 'pg';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: false
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Database connection established successfully!'
    );
  })
  .catch((error) => {
    console.error(
      'Unable to connect to database:', error
    );
  });


export async function createTables() {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Tables created/updated successfully!");
  } catch (error) {
    console.error("❌ Error synchronizing tables:", error);
  }
}

export default sequelize;