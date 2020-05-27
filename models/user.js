// model:generate --name User --attributes id:UUID

'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  }, {});

  User.associate = function (models) {
    this.hasMany(models.PodcastUserData);
    this.hasMany(models.PodcastEpisodeUserData);
  };

  return User;
};
