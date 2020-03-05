'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: `username cannot be empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: `email cannot be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: `password cannot be empty`
        }
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};