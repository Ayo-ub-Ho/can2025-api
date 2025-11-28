const { Op } = require('sequelize');
const Match = require('../models/Match');
const Team = require('../models/Team');

// GET /api/matches
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'HomeTeam', attributes: ['name', 'country'] },
        { model: Team, as: 'AwayTeam', attributes: ['name', 'country'] }
      ],
      order: [['match_date', 'ASC']]
    });
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching matches', error: error.message });
  }
};

// GET /api/matches/upcoming
const getUpcomingMatches = async (req, res) => {
  try {
    const now = new Date();
    const matches = await Match.findAll({
      where: {
        status: 'scheduled',
        match_date: { [Op.gt]: now }
      },
      include: [
        { model: Team, as: 'HomeTeam', attributes: ['name', 'country'] },
        { model: Team, as: 'AwayTeam', attributes: ['name', 'country'] }
      ],
      order: [['match_date', 'ASC']]
    });
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming matches', error: error.message });
  }
};

// GET /api/matches/:id
const getMatchById = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        { model: Team, as: 'HomeTeam', attributes: ['name', 'country'] },
        { model: Team, as: 'AwayTeam', attributes: ['name', 'country'] }
      ]
    });
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching match', error: error.message });
  }
};

// POST /api/matches (admin only)
const createMatch = async (req, res) => {
  try {
    const { teamhomeid, teamawayid, match_date, stadium, status = 'scheduled' } = req.body;

    if (!teamhomeid || !teamawayid || !match_date || !stadium) {
      return res.status(400).json({ message: 'teamhomeid, teamawayid, match_date, and stadium are required' });
    }
    if (teamhomeid === teamawayid) {
      return res.status(400).json({ message: 'A team cannot play against itself' });
    }

    const homeTeam = await Team.findByPk(teamhomeid);
    const awayTeam = await Team.findByPk(teamawayid);
    if (!homeTeam || !awayTeam) {
      return res.status(400).json({ message: 'One or both teams do not exist' });
    }

    const newMatch = await Match.create({
      teamhomeid,
      teamawayid,
      match_date,
      stadium,
      status,
      score_home: 0,
      score_away: 0
    });

    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ message: 'Error creating match', error: error.message });
  }
};

// PUT /api/matches/:id (admin only)
const updateMatch = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    const { teamhomeid, teamawayid, match_date, stadium, status, score_home, score_away } = req.body;

    if (teamhomeid && teamhomeid !== match.teamhomeid) {
      const home = await Team.findByPk(teamhomeid);
      if (!home) return res.status(400).json({ message: 'Home team does not exist' });
    }
    if (teamawayid && teamawayid !== match.teamawayid) {
      const away = await Team.findByPk(teamawayid);
      if (!away) return res.status(400).json({ message: 'Away team does not exist' });
    }

    await match.update({
      teamhomeid: teamhomeid ?? match.teamhomeid,
      teamawayid: teamawayid ?? match.teamawayid,
      match_date: match_date ?? match.match_date,
      stadium: stadium ?? match.stadium,
      status: status ?? match.status,
      score_home: score_home !== undefined ? score_home : match.score_home,
      score_away: score_away !== undefined ? score_away : match.score_away
    });

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error updating match', error: error.message });
  }
};

// DELETE /api/matches/:id (admin only)
const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    await match.destroy();
    res.status(200).json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting match', error: error.message });
  }
};

module.exports = {
  getAllMatches,
  getUpcomingMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch
};