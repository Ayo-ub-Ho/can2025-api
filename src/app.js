const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/database");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API CAN 2025/2026 is running...");
});

// Database connect
connectDB();

require("./models/index");

// Sync DB
sequelize
  .sync({ alter: true })
  .then(() => console.log("📦 Modèles synchronisés avec PostgreSQL"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
