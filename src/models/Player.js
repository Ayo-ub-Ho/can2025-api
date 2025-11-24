const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Team = require("./Team");

const Player = sequelize.define(
  "Player",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    team_id: {
      type: DataTypes.INTEGER,
      references: { model: "teams", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "players",
    timestamps: true,
  }
);

module.exports = Player;
