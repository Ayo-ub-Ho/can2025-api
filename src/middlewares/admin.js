// middleware/admin.js
const jwt = require("jsonwebtoken");
require("dotenv").config();
// adminOnly middleware
module.exports = (req, res, next) => {
  // check if req.user kay exist (auth middleware work)
  if (!req.user) {
    return res.status(401).json({ error: "Token manquant ou invalide" });
  }

  // check role
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Accès refusé : admin uniquement" });
  }

  // user is admin → continue
  next();
};
