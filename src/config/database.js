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
 * Detect if DB_CONNECTION_STRING exists.
 * If not, fallback to SQLite (to allow API to run without a real database).
 */
const hasConnectionString = Boolean(process.env.DB_CONNECTION_STRING);

let sequelize;

if (!hasConnectionString) {
  console.warn("⚠️  Nenhum DB_CONNECTION_STRING encontrado. Usando SQLite temporário.");

  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../../dev-db.sqlite"), // arquivo criado automaticamente
    logging: false
  });

} else {
  sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: false // Ajuste conforme produção
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  });
}

/**
 * Authenticate the database connection immediately upon initialization.
 */
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Banco de dados conectado com sucesso!");
  })
  .catch((error) => {
    console.error("❌ Erro na conexão com o banco:", error);
  });

/**
 * @function createTables
 */
export async function createTables() {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Tabelas criadas/atualizadas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao sincronizar tabelas:", error);
  }
}

export default sequelize;
