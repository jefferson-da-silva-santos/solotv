import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import path from "path";
import pg from "pg";
import { fileURLToPath } from "url";
import "dotenv/config";

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

/**
 * @constant sequelize
 * @type {Sequelize}
 * @description 
 * The main Sequelize instance used for all database operations.
 * 
 * Connection settings are loaded from the `.env` file using the variable:
 * `DB_CONNECTION_STRING`.
 * 
 * Example of `.env` configuration:
 * @example
 * DB_CONNECTION_STRING=postgres://username:password@localhost:5432/my_database
 */
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: false // Change to { require: true, rejectUnauthorized: false } if using SSL in production
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0,  // Minimum number of connections
    acquire: 30000, // Maximum time (ms) to try getting a connection before throwing an error
    idle: 10000 // Maximum time (ms) a connection can be idle before being released
  }
});

/**
 * Authenticate the database connection immediately upon initialization.
 * Logs the connection status to the console.
 */
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connection established successfully!");
  })
  .catch((error) => {
    console.error("❌ Unable to connect to database:", error);
  });

/**
 * @function createTables
 * @async
 * @description 
 * Synchronizes all Sequelize models with the database.
 * Automatically creates or alters tables to match model definitions.
 * 
 * @example
 * import { createTables } from "./config/database.js";
 * 
 * // Run table creation at app startup
 * await createTables();
 */
export async function createTables() {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Tables created/updated successfully!");
  } catch (error) {
    console.error("❌ Error synchronizing tables:", error);
  }
}

export default sequelize;

/**
 * 🧭 Developer Guide:
 * -----------------------------------------------------
 * To configure your own database:
 * 1. Edit your `.env` file with the correct connection string:
 *    DB_CONNECTION_STRING=postgres://user:password@host:port/database
 * 
 * 2. To switch databases, change the `dialect` and install the driver:
 *    - MySQL → dialect: "mysql", npm install mysql2
 *    - SQLite → dialect: "sqlite", storage: "./database.sqlite"
 * 
 * 3. To create or update tables automatically:
 *    Call `createTables()` during app initialization.
 * 
 * 4. For production environments:
 *    Set `ssl: { require: true, rejectUnauthorized: false }` in dialectOptions.
 * -----------------------------------------------------
 */
