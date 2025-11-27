const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Match = sequelize.define(
  "Match",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    teamhomeid: {
      type: DataTypes.INTEGER,
      references: { model: "teams", key: "id" },
      onDelete: "SET NULL",
    },

    teamawayid: {
      type: DataTypes.INTEGER,
      references: { model: "teams", key: "id" },
      onDelete: "SET NULL",
    },

    score_home: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    score_away: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    match_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    stadium: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("scheduled", "live", "finished"),
      defaultValue: "scheduled",
    },
  },
  {
    tableName: "matches",
    timestamps: true,
  }
);

module.exports = Match;
