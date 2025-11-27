const express = require("express");
const router = express.Router();


const auth = require("../middlewares/authMiddleware");


//controllers
const {
    getAllPlayers,
    getPlayerById,
    getPlayerByTeam,
    createPlayer,
    updatePlayer,
    deletePlayer,
} = require("../controllers/playerController");

router.post("/players", auth, createPlayer);

router.get("/players", getAllPlayers);

router.get("/players/:id", getPlayerById);

router.get("/players/team/:teamId", getPlayerByTeam);

router.put("/players/:id", auth, updatePlayer);

router.delete("/players/:id", auth, deletePlayer);
module.exports = router;