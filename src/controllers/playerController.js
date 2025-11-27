const Player = require("../models/Player");
const Team = require("../models/Team");

exports.getAllPlayers = async (req, res) => {
    console.log('hello');

    try {
        const players = await Player.findAll({
            include: [{
                model: Team,
                as: "team",
                attributes: ["name", "country", "flag_url"]
            }],
        });

        res.status(200).json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getPlayerById = async (req, res) => {

    try {
        const { id } = req.params;

        const player = await Player.findByPk(id, {
            include: [{
                model: Team,
                as: "team",
                attributes: ["name", "country", "flag_url"]
            }],
        });

        if (!player) {
            return res.status(404).json({ error: "Player not found" });
        }
        res.status(200).json(player);
    } catch (error) {

        console.error("Error fetching player:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getPlayerByTeam = async (req, res) => {

    try {
        const { teamId } = req.params;
        const players = await Player.findAll({
            where: { team_id: teamId },
        });
        res.status(200).json(players);
    } catch (error) {
        console.log('hello');

        console.error("Error fetching team players:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createPlayer = async (req, res) => {
    try {
        const { name, position, number, age, team_id } = req.body;

        if (!name || !position || !number || !age || !team_id) {
            return res.status(400).json({ error: "All field are required" });
        }

        const player = await Player.create({
            name,
            position,
            number,
            age,
            team_id,
        });

        res.status(201).json(player);
    } catch (error) {
        console.error("Error creating player:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updatePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findByPk(id);
        if (!player) {
            return res.status(404).json({ error: "Player not found" });
        }
        await player.update(req.body);

        res.status(200).json(player);
    } catch (error) {
        console.error("Error updating player:", error);
        res.status(500).json({ error: "Internal server error" });

    }
};


exports.deletePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findByPk(id);

        if (!player) {
            return res.status(404).json({ error: "Player not found" });
        }
        await player.destroy();
        res.status(200).json({ message: "Player deleted successfuly" });
    } catch (error) {
        console.error("Error deleting player:", error);
        res.status(500).json({ error: "Interval server error" });
    }
};