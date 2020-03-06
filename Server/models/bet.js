'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bet = sequelize.define('Bet', {
    home_name: DataTypes.STRING,
    away_name: DataTypes.STRING,
    real_id: DataTypes.INTEGER,
    schedule: DataTypes.DATE,
    winner: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Bet.associate = function(models) {
    // associations can be defined here
  };
  return Bet;
};