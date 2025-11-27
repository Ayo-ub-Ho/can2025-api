const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false, // désactive les logs SQL (plus propre)
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("🔗 PostgreSQL connecté avec succès !");
  } catch (error) {
    console.error("❌ Erreur connexion DB :", error);
  }
}

module.exports = { sequelize, connectDB };
