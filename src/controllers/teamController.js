const Team = require("../models/Team");

// -----------------------------
// CREATE TEAM (POST /api/teams) - Admin Only
// -----------------------------
exports.createTeam = async (req, res) => {
  try {
    const { name, country, flag_url, coach, group } = req.body;

    if (!name || !country || !group) {
      return res.status(400).json({ error: "name, country et group sont obligatoires" });
    }

    // Vérifier si l'équipe existe déjà
    const existingTeam = await Team.findOne({ where: { name } });
    if (existingTeam) {
      return res.status(409).json({ error: "Cette équipe existe déjà" });
    }

    const newTeam = await Team.create({
      name,
      country,
      flag_url,
      coach,
      group,
    });

    return res.status(201).json({ message: "Équipe créée avec succès", team: newTeam });
  } catch (error) {
    console.error("Erreur création Team:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

// -----------------------------
// GET ALL TEAMS (GET /api/teams)
// -----------------------------
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    return res.status(200).json(teams);
  } catch (error) {
    console.error("Erreur récupération Teams:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

// -----------------------------
// GET TEAM BY ID (GET /api/teams/:id)
// -----------------------------
exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({ error: "Équipe non trouvée" });
    }

    return res.status(200).json(team);
  } catch (error) {
    console.error("Erreur récupération Team:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

// -----------------------------
// UPDATE TEAM (PUT /api/teams/:id) - Admin Only
// -----------------------------
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, country, flag_url, coach, group } = req.body;

    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: "Équipe non trouvée" });
    }

    await team.update({ name, country, flag_url, coach, group });

    return res.status(200).json({ message: "Équipe mise à jour", team });
  } catch (error) {
    console.error("Erreur update Team:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

// -----------------------------
// DELETE TEAM (DELETE /api/teams/:id) - Admin Only
// -----------------------------
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({ error: "Équipe non trouvée" });
    }

    await team.destroy();

    return res.status(200).json({ message: "Équipe supprimée avec succès" });
  } catch (error) {
    console.error("Erreur delete Team:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
