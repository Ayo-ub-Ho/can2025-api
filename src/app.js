const matchRoutes = require("./routes/matchRoutes");
const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/database");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  .then(() => console.log(" Modèles synchronisés avec PostgreSQL"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);

const teamRoutes = require("./routes/teamRoutes");
const playerRouter = require("./routes/playerRoutes");
//app.use(express.json());

app.use("/api", teamRoutes); // prefix
app.use("/api/matches", matchRoutes);

// Start server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(` Serveur lancé sur le port http://localhost:${PORT}`);
});
