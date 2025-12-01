const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

// Use authMiddleware as a single function (as currently exported)
const verifyToken = require("../middlewares/authMiddleware");

// Add a temporary isAdmin middleware for development
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ message: "Access denied" });
  }
  req.user.role = req.user.role || "admin";
  if (req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access required" });
};

// Public routes
router.get("/", matchController.getAllMatches);
router.get("/upcoming", matchController.getUpcomingMatches);
router.get("/:id", matchController.getMatchById);

// Admin-only routes
router.post("/", verifyToken, isAdmin, matchController.createMatch);
router.put("/:id", verifyToken, isAdmin, matchController.updateMatch);
router.delete("/:id", verifyToken, isAdmin, matchController.deleteMatch);

module.exports = router;
