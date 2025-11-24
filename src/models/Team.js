const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Team = sequelize.define(
  "Team",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    flag_url: {
      type: DataTypes.STRING,
    },

    coach: {
      type: DataTypes.STRING,
    },

    group: {
      type: DataTypes.STRING, // ex: "A", "B", "C"
      allowNull: false,
    },
  },
  {
    tableName: "teams",
    timestamps: true,
  }
);

module.exports = Team;
