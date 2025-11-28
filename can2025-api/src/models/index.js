const User = require("./User");
const Team = require("./Team");
const Player = require("./Player");
const Match = require("./Match");

// ===== RELATIONS =====

// TEAM → PLAYERS (1:N)
Team.hasMany(Player, {
  foreignKey: "team_id",
  as: "players",
});
Player.belongsTo(Team, {
  foreignKey: "team_id",
  as: "team",
});

// TEAM → MATCHES (home)
Team.hasMany(Match, {
  foreignKey: "teamhomeid",
  as: "homeMatches",
});
Match.belongsTo(Team, {
  foreignKey: "teamhomeid",
  as: "homeTeam",
});

// TEAM → MATCHES (away)
Team.hasMany(Match, {
  foreignKey: "teamawayid",
  as: "awayMatches",
});
Match.belongsTo(Team, {
  foreignKey: "teamawayid",
  as: "awayTeam",
});

module.exports = {
  User,
  Team,
  Player,
  Match,
};
