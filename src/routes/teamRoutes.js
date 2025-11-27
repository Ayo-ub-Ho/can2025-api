// routes/teamRoutes.js

const express = require("express");
const router = express.Router();

// Middlewares
//const auth = require("../middleware/auth");
const auth = require("../middlewares/authMiddleware");

const adminOnly = require("../middlewares/admin");

// Controllers
const {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

// -------------------------------------------
//             ROUTES TEAMS
// -------------------------------------------

// Create Team (Admin Only) - POST /api/teams
router.post("/teams", auth, adminOnly, createTeam);

// Get All Teams - GET /api/teams
router.get("/teams", getAllTeams);

// Get Team by ID - GET /api/teams/:id
router.get("/teams/:id", getTeamById);

// Update Team (Admin Only) - PUT /api/teams/:id
router.put("/teams/:id", auth, adminOnly, updateTeam);

// Delete Team (Admin Only) - DELETE /api/teams/:id
router.delete("/teams/:id", auth, adminOnly, deleteTeam);

module.exports = router;
